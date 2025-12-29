# Failure Recovery & Resilience Strategy

## Overview

This document defines how the Codexium V4 + Neo V4 system handles failures gracefully without blocking the entire review process.

---

## 🎯 **Core Principle: Degraded Operation Over Complete Failure**

**Philosophy:**
- One agent fails → Continue with remaining agents
- Partial review > No review
- Always provide feedback, even if incomplete

---

## 🔄 **Failure Recovery Matrix**

| Component | Failure Type | Recovery Strategy | User Impact |
|-----------|--------------|-------------------|-------------|
| OpenAI API | Timeout | Retry 3x with backoff → Mark agent as failed | Review continues |
| OpenAI API | Rate limit | Wait + retry → If still fails, skip agent | Review continues |
| OpenAI API | Auth error | Fail fast → Report config issue | Review blocked |
| Single Agent | Crash | Catch exception → Mark failed → Continue | Review continues |
| All Agents | Fail | Report system issue → Block merge | Merge blocked |
| Generator | Timeout | Retry 2x → Fail request | No code generated |
| Generator | Invalid code | Validation fails → Retry once → Report | No PR created |
| PR Creation | Fails | Log error → Require manual PR | Code generated but needs manual PR |
| Memory Write | Fails | Log warning → Continue | Possible duplicate review |

---

## 🛠️ **Implementation Patterns**

### Pattern 1: Retry with Exponential Backoff

```yaml
- name: Security Review
  id: security
  run: |
    # Retry logic
    MAX_RETRIES=3
    RETRY_COUNT=0
    WAIT_TIME=5
    
    while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
      echo "Attempt $((RETRY_COUNT + 1)) of $MAX_RETRIES"
      
      if python call_openai.py security; then
        echo "✅ Security review completed"
        exit 0
      fi
      
      RETRY_COUNT=$((RETRY_COUNT + 1))
      
      if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
        echo "⚠️ Retry in ${WAIT_TIME}s..."
        sleep $WAIT_TIME
        WAIT_TIME=$((WAIT_TIME * 2))  # Exponential backoff
      fi
    done
    
    echo "❌ Security review failed after $MAX_RETRIES attempts"
    echo '{"agent":"security","status":"failed","pass":true}' > security-result.json
    exit 0  # Don't fail workflow!
```

### Pattern 2: Timeout Protection

```yaml
- name: Performance Review
  id: performance
  timeout-minutes: 5  # Kill if exceeds 5 minutes
  continue-on-error: true  # Don't stop workflow
  run: |
    timeout 4m python call_openai.py performance || {
      echo "⏱️ Performance review timed out"
      echo '{"agent":"performance","status":"timeout","pass":true}' > performance-result.json
    }
```

### Pattern 3: Graceful Degradation

```yaml
- name: Aggregate Results
  run: |
    RESULTS="[]"
    
    # Collect all agent results (even failures)
    for agent in general security qa ui_ux performance; do
      if [ -f "${agent}-result.json" ]; then
        RESULT=$(cat "${agent}-result.json")
        RESULTS=$(echo "$RESULTS" | jq ". += [$RESULT]")
      else
        # Agent didn't run - create default result
        echo "⚠️ $agent result missing - marking as skipped"
        DEFAULT='{"agent":"'$agent'","status":"skipped","pass":true}'
        RESULTS=$(echo "$RESULTS" | jq ". += [$DEFAULT]")
      fi
    done
    
    # Calculate gate status with degraded mode
    FAILED_COUNT=$(echo "$RESULTS" | jq '[.[] | select(.status == "failed")] | length')
    CRITICAL_COUNT=$(echo "$RESULTS" | jq '[.[] | select(.severity == "critical")] | length')
    
    if [ $CRITICAL_COUNT -gt 0 ]; then
      GATE="BLOCKED"
    elif [ $FAILED_COUNT -gt 2 ]; then
      GATE="BLOCKED_INSUFFICIENT_REVIEW"
    elif [ $FAILED_COUNT -gt 0 ]; then
      GATE="PASSED_DEGRADED"
    else
      GATE="PASSED"
    fi
    
    echo "gate_status=$GATE" >> $GITHUB_OUTPUT
```

---

## 📊 **Failure Scenarios & Responses**

### Scenario 1: One Agent Times Out

**What Happens:**
```
✅ General Review: SUCCESS
⏱️ Security Review: TIMEOUT (5 min exceeded)
✅ QA Review: SUCCESS
✅ UI/UX Review: SUCCESS
```

**System Response:**
- Mark Security as `status: timeout`
- Continue with other agents
- Final gate: `PASSED_DEGRADED`
- Comment: "⚠️ Security review timed out - manual security review recommended"

**User Impact:** 
- PR not blocked
- Clear warning about missing security review
- Can merge at own risk or request manual review

---

### Scenario 2: Multiple Agents Fail

**What Happens:**
```
✅ General Review: SUCCESS
❌ Security Review: FAILED (API error)
❌ QA Review: FAILED (API error)
✅ UI/UX Review: SUCCESS
```

**System Response:**
- Mark failed agents as `status: failed`
- If < 3 agents succeeded: `BLOCKED_INSUFFICIENT_REVIEW`
- If ≥ 3 agents succeeded: `PASSED_DEGRADED`
- Comment: "⚠️ 2 agents failed - review may be incomplete"

**User Impact:**
- If too many failures: PR blocked
- Clear explanation of what failed
- Guidance on next steps

---

### Scenario 3: Critical Issues Found

**What Happens:**
```
✅ General Review: SUCCESS (info)
✅ Security Review: SUCCESS (critical - hardcoded secret)
✅ QA Review: SUCCESS (warn)
```

**System Response:**
- All agents succeeded
- Max severity: `critical`
- Gate: `BLOCKED`
- Comment: "🚨 Critical security issue: hardcoded secret detected"

**User Impact:**
- PR blocked (correct behavior)
- Must fix before merge
- Clear instructions on fix

---

### Scenario 4: Generator Fails

**What Happens:**
```
🧠 Decision: PROCEED
🔨 Code Generation: FAILED (OpenAI timeout)
```

**System Response:**
- Retry generation 2 times
- If still fails: Report error to user
- No PR created
- No code committed

**User Impact:**
- Clear error message
- Can retry the request
- No partial/broken code in repo

---

### Scenario 5: PR Creation Fails

**What Happens:**
```
🧠 Decision: PROCEED
🔨 Code Generation: SUCCESS
📝 PR Creation: FAILED (GitHub API error)
```

**System Response:**
- Code is generated and committed to branch
- Branch: `codexium/feature-name-123456`
- User notified: "Code generated but PR creation failed"
- Instructions to create PR manually

**User Impact:**
- Code exists on branch
- Must create PR manually
- Can continue workflow

---

## 🚨 **Critical Failures (Block Everything)**

These failures should BLOCK the workflow:

1. **OpenAI API Key Missing/Invalid**
   - Can't proceed without API access
   - Clear error: "Configure OPENAI_API_KEY secret"

2. **GitHub Token Invalid**
   - Can't create PRs or comments
   - Clear error: "Check GitHub token permissions"

3. **All Agents Fail**
   - No review possible
   - Block: "System failure - contact admin"

4. **Guardrails Detect Dangerous Operation**
   - Safety system working correctly
   - Block: "Request blocked by guardrails"

---

## 🔧 **Updated call_openai.py with Resilience**

```python
import json
import sys
import time
from openai import OpenAI
from openai import OpenAIError, APITimeoutError, RateLimitError

def run_agent_with_retry(agent_name, context, max_retries=3):
    """Run agent with retry logic and failure recovery"""
    
    for attempt in range(max_retries):
        try:
            result = run_agent(agent_name, context)
            return result
            
        except APITimeoutError as e:
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt  # Exponential backoff
                print(f"⏱️ Timeout - retrying in {wait_time}s...", file=sys.stderr)
                time.sleep(wait_time)
                continue
            else:
                # Final failure - return timeout result
                return create_failure_result(agent_name, "timeout", str(e))
                
        except RateLimitError as e:
            if attempt < max_retries - 1:
                wait_time = 30  # Wait longer for rate limits
                print(f"⚠️ Rate limited - retrying in {wait_time}s...", file=sys.stderr)
                time.sleep(wait_time)
                continue
            else:
                return create_failure_result(agent_name, "failed", "Rate limit exceeded")
                
        except OpenAIError as e:
            # Other OpenAI errors - fail immediately
            return create_failure_result(agent_name, "failed", str(e))
            
        except Exception as e:
            # Unexpected errors
            return create_failure_result(agent_name, "failed", f"Unexpected error: {str(e)}")
    
def create_failure_result(agent_name, status, error_msg):
    """Create standardized failure result"""
    return {
        "agent": agent_name,
        "status": status,
        "severity": "info",
        "findings": [],
        "summary": f"Agent {status}",
        "pass": True,  # Don't block on agent failure
        "execution_time": 0,
        "cost": 0,
        "error": error_msg,
        "metadata": {
            "files_reviewed": 0,
            "confidence": 0,
            "model_used": None
        }
    }

# Main execution
if __name__ == "__main__":
    agent_name = sys.argv[1]
    context = load_context()
    
    result = run_agent_with_retry(agent_name, context)
    
    # Always output JSON (even on failure)
    print(json.dumps(result, indent=2))
    
    # Exit 0 even on failure (don't break workflow)
    sys.exit(0)
```

---

## 📈 **Monitoring & Alerting**

### Metrics to Track

```yaml
- agent_success_rate:
    description: "% of agents that complete successfully"
    target: "> 95%"
    alert_if: "< 90%"

- agent_timeout_rate:
    description: "% of agents that timeout"
    target: "< 2%"
    alert_if: "> 5%"

- avg_retry_count:
    description: "Average retries per agent"
    target: "< 0.5"
    alert_if: "> 1.0"

- degraded_reviews:
    description: "% of reviews with failed agents"
    target: "< 5%"
    alert_if: "> 10%"
```

### Alert Triggers

```yaml
alerts:
  - name: "High Agent Failure Rate"
    condition: "agent_success_rate < 90% over 1 hour"
    action: "Page on-call engineer"
    
  - name: "OpenAI API Issues"
    condition: "timeout_rate > 5% over 15 min"
    action: "Check OpenAI status page"
    
  - name: "Multiple Critical Failures"
    condition: "all_agents_failed > 3 in 1 hour"
    action: "Disable auto-generation"
```

---

## ✅ **Testing Failure Recovery**

### Test 1: Simulate Agent Timeout

```bash
# In call_openai.py, add artificial delay
time.sleep(600)  # Force timeout

# Expected: Agent marked as timeout, review continues
```

### Test 2: Simulate API Error

```bash
# Use invalid API key
export OPENAI_API_KEY="sk-invalid"

# Expected: Agent retries 3x, then fails gracefully
```

### Test 3: Simulate All Agents Fail

```bash
# Break API completely
export OPENAI_API_KEY=""

# Expected: Review blocked with clear error message
```

---

## 🎯 **Success Criteria**

A resilient system means:

✅ **One agent fails** → Review continues  
✅ **Multiple agents fail** → Degraded mode with warning  
✅ **API timeout** → Auto-retry with backoff  
✅ **Rate limit hit** → Wait and retry  
✅ **Clear errors** → User knows what failed and why  
✅ **No silent failures** → All failures logged and reported  
✅ **Graceful degradation** → Partial review > No review  

---

## 📝 **Implementation Checklist**

- [ ] Add retry logic to `call_openai.py`
- [ ] Add timeout protection to all agent steps
- [ ] Add `continue-on-error: true` to agent steps
- [ ] Implement standardized failure results
- [ ] Update aggregation to handle failed agents
- [ ] Add degraded mode gate status
- [ ] Update PR comments to explain failures
- [ ] Add failure rate monitoring
- [ ] Test all failure scenarios
- [ ] Document recovery procedures

---

**With these patterns, your system can handle failures gracefully while maintaining code quality standards.** 🛡️
