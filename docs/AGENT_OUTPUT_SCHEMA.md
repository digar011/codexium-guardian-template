# Agent Output Schema - Standard Contract

## Overview

Every Neo V4 agent MUST return a standardized JSON output that follows this schema. This enables:
- Reliable aggregation
- Consistent severity tracking
- Failure recovery
- Cost tracking
- Quality metrics

---

## Standard Schema

```json
{
  "agent": "string",           // Agent name (security, qa, etc.)
  "status": "string",          // success | failed | timeout | skipped
  "severity": "string",        // info | warn | critical
  "findings": [                // Array of issues found
    {
      "id": "string",          // Unique finding ID
      "type": "string",        // Issue type (e.g., "sql_injection")
      "file": "string",        // File path
      "line": "number",        // Line number (optional)
      "severity": "string",    // info | warn | critical
      "message": "string",     // Human-readable description
      "suggestion": "string",  // How to fix
      "code_snippet": "string" // (optional) Relevant code
    }
  ],
  "summary": "string",         // Brief summary of review
  "pass": "boolean",           // Overall pass/fail
  "execution_time": "number",  // Seconds taken
  "cost": "number",           // USD cost
  "error": "string|null",     // Error message if failed
  "metadata": {               // Additional context
    "files_reviewed": "number",
    "confidence": "number",   // 0-100
    "model_used": "string"
  }
}
```

---

## Example Outputs

### Success with Findings

```json
{
  "agent": "security",
  "status": "success",
  "severity": "critical",
  "findings": [
    {
      "id": "SEC-001",
      "type": "hardcoded_secret",
      "file": "src/config/database.ts",
      "line": 42,
      "severity": "critical",
      "message": "Hardcoded database password detected",
      "suggestion": "Move credentials to environment variables",
      "code_snippet": "const PASSWORD = 'admin123';"
    },
    {
      "id": "SEC-002",
      "type": "sql_injection",
      "file": "src/api/users.ts",
      "line": 78,
      "severity": "critical",
      "message": "SQL query vulnerable to injection",
      "suggestion": "Use parameterized queries",
      "code_snippet": "db.query('SELECT * FROM users WHERE id=' + userId)"
    }
  ],
  "summary": "Found 2 critical security issues requiring immediate attention",
  "pass": false,
  "execution_time": 15.3,
  "cost": 0.03,
  "error": null,
  "metadata": {
    "files_reviewed": 5,
    "confidence": 95,
    "model_used": "gpt-4o"
  }
}
```

### Success with No Issues

```json
{
  "agent": "qa",
  "status": "success",
  "severity": "info",
  "findings": [],
  "summary": "All code has comprehensive test coverage",
  "pass": true,
  "execution_time": 8.2,
  "cost": 0.02,
  "error": null,
  "metadata": {
    "files_reviewed": 3,
    "confidence": 90,
    "model_used": "gpt-4o"
  }
}
```

### Agent Failure

```json
{
  "agent": "performance",
  "status": "failed",
  "severity": "info",
  "findings": [],
  "summary": "Agent failed to complete review",
  "pass": true,
  "execution_time": 0,
  "cost": 0,
  "error": "OpenAI API timeout after 30 seconds",
  "metadata": {
    "files_reviewed": 0,
    "confidence": 0,
    "model_used": "gpt-4o"
  }
}
```

### Agent Skipped

```json
{
  "agent": "n8n",
  "status": "skipped",
  "severity": "info",
  "findings": [],
  "summary": "No n8n workflow files detected",
  "pass": true,
  "execution_time": 0.1,
  "cost": 0,
  "error": null,
  "metadata": {
    "files_reviewed": 0,
    "confidence": 100,
    "model_used": null
  }
}
```

---

## Severity Levels

| Level    | Meaning                           | Gate Action        |
|----------|-----------------------------------|--------------------|
| info     | Suggestion, best practice         | Pass               |
| warn     | Should fix, not blocking          | Pass with warning  |
| critical | Must fix, security/stability risk | Block merge        |

---

## Status Values

| Status   | Meaning                           | Action             |
|----------|-----------------------------------|--------------------|
| success  | Agent completed successfully      | Use findings       |
| failed   | Agent encountered error           | Continue degraded  |
| timeout  | Agent exceeded time limit         | Continue degraded  |
| skipped  | Agent not applicable for this PR  | Continue normal    |

---

## Aggregation Rules

### Gate Decision Logic

```javascript
const results = [agent1, agent2, agent3]; // All agent outputs

// Check for any failures
const hasFailed = results.some(r => r.status === 'failed');
const hasTimeout = results.some(r => r.status === 'timeout');

// Get max severity from successful agents
const successfulAgents = results.filter(r => r.status === 'success');
const maxSeverity = getMaxSeverity(successfulAgents.map(r => r.severity));

// Gate decision
if (maxSeverity === 'critical') {
  gateStatus = 'BLOCKED';
} else if (hasFailed || hasTimeout) {
  gateStatus = 'PASSED_WITH_WARNINGS'; // Degraded mode
} else if (maxSeverity === 'warn') {
  gateStatus = 'PASSED_WITH_WARNINGS';
} else {
  gateStatus = 'PASSED';
}
```

### Total Cost Calculation

```javascript
const totalCost = results.reduce((sum, r) => sum + r.cost, 0);
```

### Total Findings

```javascript
const allFindings = results.flatMap(r => r.findings);
const criticalCount = allFindings.filter(f => f.severity === 'critical').length;
const warnCount = allFindings.filter(f => f.severity === 'warn').length;
const infoCount = allFindings.filter(f => f.severity === 'info').length;
```

---

## Implementation in Python

### call_openai.py (Updated)

```python
import json
import sys
import time
from openai import OpenAI

def run_agent(agent_name, context):
    """Run agent and return standardized output"""
    
    start_time = time.time()
    
    try:
        # Call OpenAI
        response = call_openai_api(agent_name, context)
        
        # Parse response
        findings = parse_agent_response(response)
        
        # Calculate severity
        max_severity = get_max_severity(findings)
        
        # Build output
        output = {
            "agent": agent_name,
            "status": "success",
            "severity": max_severity,
            "findings": findings,
            "summary": f"Reviewed {context['files_count']} files",
            "pass": max_severity != "critical",
            "execution_time": time.time() - start_time,
            "cost": estimate_cost(response),
            "error": None,
            "metadata": {
                "files_reviewed": context['files_count'],
                "confidence": 90,
                "model_used": "gpt-4o"
            }
        }
        
    except TimeoutError as e:
        output = {
            "agent": agent_name,
            "status": "timeout",
            "severity": "info",
            "findings": [],
            "summary": "Agent timed out",
            "pass": True,  # Don't block on timeout
            "execution_time": time.time() - start_time,
            "cost": 0,
            "error": str(e),
            "metadata": {
                "files_reviewed": 0,
                "confidence": 0,
                "model_used": "gpt-4o"
            }
        }
        
    except Exception as e:
        output = {
            "agent": agent_name,
            "status": "failed",
            "severity": "info",
            "findings": [],
            "summary": "Agent failed",
            "pass": True,  # Don't block on failure
            "execution_time": time.time() - start_time,
            "cost": 0,
            "error": str(e),
            "metadata": {
                "files_reviewed": 0,
                "confidence": 0,
                "model_used": "gpt-4o"
            }
        }
    
    return output

# Output as JSON
print(json.dumps(output, indent=2))
```

---

## Validation

Every agent output must:
1. ✅ Be valid JSON
2. ✅ Include all required fields
3. ✅ Use only allowed status values
4. ✅ Use only allowed severity values
5. ✅ Include error message if status is failed/timeout
6. ✅ Set pass=True if status is failed/timeout (degraded mode)

---

## Benefits

✅ **Reliable aggregation** - Standard format enables easy parsing  
✅ **Failure recovery** - Failed agents don't block review  
✅ **Cost tracking** - Each agent reports cost  
✅ **Performance monitoring** - Execution time tracked  
✅ **Quality metrics** - Confidence scores available  
✅ **Debugging** - Error messages preserved  
✅ **Extensibility** - New agents just follow schema  

---

## Migration Path

1. Update `call_openai.py` to output this schema
2. Update each agent to parse and structure findings
3. Update aggregation logic to use standardized fields
4. Add validation to reject non-conforming outputs
5. Add retry logic for failed/timeout agents (optional)

---

**This schema is the contract between agents and the orchestrator.**
