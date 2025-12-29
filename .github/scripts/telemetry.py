#!/usr/bin/env python3
"""
Neo V4 Telemetry System
Tracks usage, metrics, and performance of code review agents
"""

import json
import os
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import hashlib

# =============================================================================
# TELEMETRY EVENT LOGGER
# =============================================================================

class NeoTelemetry:
    """Track Neo review system usage and performance"""
    
    def __init__(self, output_dir="/tmp/neo-telemetry"):
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
        self.session_id = self._generate_session_id()
        
    def _generate_session_id(self):
        """Generate unique session ID"""
        timestamp = datetime.utcnow().isoformat()
        return hashlib.sha256(timestamp.encode()).hexdigest()[:16]
    
    def track_event(self, event_type: str, data: Dict):
        """Log a telemetry event"""
        event = {
            "timestamp": datetime.utcnow().isoformat(),
            "session_id": self.session_id,
            "event_type": event_type,
            "data": data
        }
        
        # Write to daily log file
        date_str = datetime.utcnow().strftime("%Y-%m-%d")
        log_file = f"{self.output_dir}/neo-{date_str}.jsonl"
        
        with open(log_file, 'a') as f:
            f.write(json.dumps(event) + "\n")
    
    # =========================================================================
    # REVIEW LIFECYCLE EVENTS
    # =========================================================================
    
    def review_started(self, pr_number: int, role: str, repo: str):
        """Track when a review starts"""
        self.track_event("review_started", {
            "pr_number": pr_number,
            "role": role,
            "repository": repo,
            "start_time": datetime.utcnow().isoformat()
        })
    
    def review_completed(self, pr_number: int, role: str, 
                        duration_seconds: float, severity: str):
        """Track when a review completes"""
        self.track_event("review_completed", {
            "pr_number": pr_number,
            "role": role,
            "duration_seconds": duration_seconds,
            "severity": severity,
            "end_time": datetime.utcnow().isoformat()
        })
    
    def review_failed(self, pr_number: int, role: str, error: str):
        """Track review failures"""
        self.track_event("review_failed", {
            "pr_number": pr_number,
            "role": role,
            "error": error,
            "timestamp": datetime.utcnow().isoformat()
        })
    
    # =========================================================================
    # GUARDRAIL EVENTS
    # =========================================================================
    
    def guardrail_triggered(self, rule_name: str, severity: str, 
                           blocked: bool, pr_number: int):
        """Track guardrail violations"""
        self.track_event("guardrail_violation", {
            "rule_name": rule_name,
            "severity": severity,
            "blocked_merge": blocked,
            "pr_number": pr_number
        })
    
    def merge_blocked(self, pr_number: int, violations: List[str], 
                     blocking_agent: str):
        """Track when PR merge is blocked"""
        self.track_event("merge_blocked", {
            "pr_number": pr_number,
            "violations": violations,
            "blocking_agent": blocking_agent,
            "requires_approval": True
        })
    
    def override_used(self, pr_number: int, overridden_by: str, 
                     reason: str, rule_name: str):
        """Track guardrail overrides"""
        self.track_event("guardrail_override", {
            "pr_number": pr_number,
            "overridden_by": overridden_by,
            "reason": reason,
            "rule_name": rule_name,
            "timestamp": datetime.utcnow().isoformat()
        })
    
    # =========================================================================
    # PERFORMANCE METRICS
    # =========================================================================
    
    def api_call(self, model: str, tokens_used: int, cost: float, 
                latency_ms: float):
        """Track OpenAI API usage"""
        self.track_event("api_call", {
            "model": model,
            "tokens_used": tokens_used,
            "estimated_cost": cost,
            "latency_ms": latency_ms
        })
    
    def agent_performance(self, agent_name: str, pr_count: int, 
                         avg_duration: float, accuracy_score: float):
        """Track individual agent performance"""
        self.track_event("agent_performance", {
            "agent_name": agent_name,
            "reviews_completed": pr_count,
            "avg_duration_seconds": avg_duration,
            "accuracy_score": accuracy_score  # Based on user feedback
        })
    
    # =========================================================================
    # USER FEEDBACK
    # =========================================================================
    
    def feedback_received(self, pr_number: int, role: str, 
                         helpful: bool, comment: Optional[str] = None):
        """Track user feedback on reviews"""
        self.track_event("user_feedback", {
            "pr_number": pr_number,
            "role": role,
            "helpful": helpful,
            "comment": comment
        })
    
    def false_positive(self, pr_number: int, role: str, issue: str):
        """Track false positive detections"""
        self.track_event("false_positive", {
            "pr_number": pr_number,
            "role": role,
            "issue_flagged": issue,
            "actual_result": "false_positive"
        })
    
    # =========================================================================
    # USAGE ANALYTICS
    # =========================================================================
    
    def daily_summary(self, date: str, stats: Dict):
        """Generate daily usage summary"""
        self.track_event("daily_summary", {
            "date": date,
            "total_reviews": stats.get("total_reviews", 0),
            "by_agent": stats.get("by_agent", {}),
            "blocked_merges": stats.get("blocked_merges", 0),
            "avg_review_time": stats.get("avg_review_time", 0),
            "total_cost": stats.get("total_cost", 0),
            "top_violations": stats.get("top_violations", [])
        })
    
    def user_activity(self, user: str, action: str, pr_number: int):
        """Track user interactions"""
        self.track_event("user_activity", {
            "user": user,
            "action": action,  # approved, rejected, overridden, etc.
            "pr_number": pr_number
        })

# =============================================================================
# METRICS AGGREGATOR
# =============================================================================

class MetricsAggregator:
    """Aggregate telemetry data for reporting"""
    
    def __init__(self, telemetry_dir="/tmp/neo-telemetry"):
        self.telemetry_dir = telemetry_dir
    
    def load_events(self, days=7) -> List[Dict]:
        """Load events from last N days"""
        events = []
        for i in range(days):
            date = (datetime.utcnow() - timedelta(days=i)).strftime("%Y-%m-%d")
            log_file = f"{self.telemetry_dir}/neo-{date}.jsonl"
            
            if os.path.exists(log_file):
                with open(log_file, 'r') as f:
                    for line in f:
                        events.append(json.loads(line))
        
        return events
    
    def generate_report(self, days=7) -> Dict:
        """Generate usage report"""
        events = self.load_events(days)
        
        report = {
            "period": f"Last {days} days",
            "total_reviews": 0,
            "by_agent": {},
            "by_severity": {"info": 0, "warn": 0, "critical": 0},
            "guardrail_stats": {
                "total_violations": 0,
                "blocked_merges": 0,
                "overrides": 0
            },
            "performance": {
                "avg_review_time": 0,
                "total_api_cost": 0,
                "total_tokens": 0
            },
            "user_satisfaction": {
                "helpful_reviews": 0,
                "unhelpful_reviews": 0,
                "feedback_count": 0
            }
        }
        
        review_times = []
        
        for event in events:
            event_type = event.get("event_type")
            data = event.get("data", {})
            
            # Count reviews
            if event_type == "review_completed":
                report["total_reviews"] += 1
                
                # By agent
                role = data.get("role", "unknown")
                report["by_agent"][role] = report["by_agent"].get(role, 0) + 1
                
                # By severity
                severity = data.get("severity", "info")
                report["by_severity"][severity] += 1
                
                # Duration
                duration = data.get("duration_seconds", 0)
                review_times.append(duration)
            
            # Guardrails
            elif event_type == "guardrail_violation":
                report["guardrail_stats"]["total_violations"] += 1
                if data.get("blocked_merge"):
                    report["guardrail_stats"]["blocked_merges"] += 1
            
            elif event_type == "guardrail_override":
                report["guardrail_stats"]["overrides"] += 1
            
            # API costs
            elif event_type == "api_call":
                report["performance"]["total_api_cost"] += data.get("estimated_cost", 0)
                report["performance"]["total_tokens"] += data.get("tokens_used", 0)
            
            # Feedback
            elif event_type == "user_feedback":
                report["user_satisfaction"]["feedback_count"] += 1
                if data.get("helpful"):
                    report["user_satisfaction"]["helpful_reviews"] += 1
                else:
                    report["user_satisfaction"]["unhelpful_reviews"] += 1
        
        # Calculate averages
        if review_times:
            report["performance"]["avg_review_time"] = sum(review_times) / len(review_times)
        
        # Calculate satisfaction rate
        feedback_count = report["user_satisfaction"]["feedback_count"]
        if feedback_count > 0:
            helpful = report["user_satisfaction"]["helpful_reviews"]
            report["user_satisfaction"]["rate"] = (helpful / feedback_count) * 100
        
        return report
    
    def export_to_json(self, report: Dict, output_file: str):
        """Export report to JSON"""
        with open(output_file, 'w') as f:
            json.dump(report, f, indent=2)
    
    def export_to_csv(self, events: List[Dict], output_file: str):
        """Export events to CSV for analysis"""
        import csv
        
        if not events:
            return
        
        # Get all unique keys
        keys = set()
        for event in events:
            keys.update(event.keys())
            keys.update(event.get('data', {}).keys())
        
        with open(output_file, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=sorted(keys))
            writer.writeheader()
            
            for event in events:
                # Flatten event data
                row = {**event, **event.get('data', {})}
                writer.writerow({k: row.get(k, '') for k in sorted(keys)})

# =============================================================================
# DASHBOARD DATA GENERATOR
# =============================================================================

class DashboardData:
    """Generate data for Neo dashboard"""
    
    def __init__(self, aggregator: MetricsAggregator):
        self.aggregator = aggregator
    
    def get_overview(self) -> Dict:
        """Get overview metrics for dashboard"""
        report_7d = self.aggregator.generate_report(days=7)
        report_30d = self.aggregator.generate_report(days=30)
        
        return {
            "current_week": {
                "total_reviews": report_7d["total_reviews"],
                "blocked_merges": report_7d["guardrail_stats"]["blocked_merges"],
                "avg_review_time": round(report_7d["performance"]["avg_review_time"], 2),
                "satisfaction_rate": report_7d["user_satisfaction"].get("rate", 0)
            },
            "current_month": {
                "total_reviews": report_30d["total_reviews"],
                "total_cost": round(report_30d["performance"]["total_api_cost"], 2),
                "top_agents": self._get_top_agents(report_30d),
                "top_violations": self._get_top_violations(30)
            }
        }
    
    def _get_top_agents(self, report: Dict) -> List[Dict]:
        """Get most active agents"""
        by_agent = report.get("by_agent", {})
        sorted_agents = sorted(by_agent.items(), key=lambda x: x[1], reverse=True)
        return [{"agent": k, "count": v} for k, v in sorted_agents[:5]]
    
    def _get_top_violations(self, days: int) -> List[Dict]:
        """Get most common violations"""
        events = self.aggregator.load_events(days)
        violations = {}
        
        for event in events:
            if event.get("event_type") == "guardrail_violation":
                rule = event.get("data", {}).get("rule_name", "unknown")
                violations[rule] = violations.get(rule, 0) + 1
        
        sorted_violations = sorted(violations.items(), key=lambda x: x[1], reverse=True)
        return [{"rule": k, "count": v} for k, v in sorted_violations[:10]]

# =============================================================================
# USAGE EXAMPLE
# =============================================================================

if __name__ == "__main__":
    # Initialize telemetry
    telemetry = NeoTelemetry()
    
    # Track a review
    telemetry.review_started(
        pr_number=123,
        role="security",
        repo="digar011/my-app"
    )
    
    # Simulate API call
    telemetry.api_call(
        model="gpt-4",
        tokens_used=1500,
        cost=0.045,
        latency_ms=2300
    )
    
    # Complete review
    telemetry.review_completed(
        pr_number=123,
        role="security",
        duration_seconds=45.2,
        severity="warn"
    )
    
    # Track violation
    telemetry.guardrail_triggered(
        rule_name="hardcoded_secrets",
        severity="critical",
        blocked=True,
        pr_number=123
    )
    
    # Generate report
    aggregator = MetricsAggregator()
    report = aggregator.generate_report(days=7)
    
    print(json.dumps(report, indent=2))
    
    # Export
    aggregator.export_to_json(report, "/tmp/neo-report.json")
    
    # Dashboard data
    dashboard = DashboardData(aggregator)
    overview = dashboard.get_overview()
    print("\nDashboard Overview:")
    print(json.dumps(overview, indent=2))
