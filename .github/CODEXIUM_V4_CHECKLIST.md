# Codexium V4 — Frozen Checklist  
_Autonomous Dev Team Pipeline_

---

## Scope rules
- No new features beyond this checklist.
- Only reliability, bugfix, or governance changes allowed.
- All future capability expansion must occur in **V5** or higher.

---

## 1) Orchestrator foundation (25%)
- [x] PR triggers wired
- [x] Global kill-switch (`NEO_AUTOMATION_ENABLED`)
- [x] Decision engine (`SKIP_AUTOMATION` / `PROCEED`)
- [x] Auto-labeling
- [x] Consensus comment posting

**Status:** 25 / 25

---

## 2) Merge blocking (35%)
- [x] Neo Merge Gate exists
- [x] Fail-safe behavior (missing outputs do not block)
- [x] Block condition: `Severity=critical` + `Confidence=high`
- [x] Branch protection requires Neo Merge Gate

**Status:** 35 / 35

---

## 3) Memory / persistence (20%)
- [x] Decision recorded via PR comment
- [x] Severity / confidence preserved in Guardian output
- [x] Timestamped via workflow execution

> Note: Persistence is **ephemeral by design** in V4  
> (GitHub PR + workflow history = source of truth)

**Status:** 20 / 20

---

## 4) Operational safety (20%)
- [x] No circular job dependencies
- [x] Jobs gated by decision + cost gate
- [x] Kill-switch disables all automation
- [x] Failure modes documented:
  - Invalid secrets → fail closed
  - Missing Guardian output → allow merge
  - Draft PRs → automation skipped
  - Kill-switch off → full bypass

**Status:** 20 / 20

---

## V4 completion
**Total:** 100 / 100  
**State:** **FROZEN**

**Frozen at:** 2025-12-27

---

## Governance guarantee
This repository represents the **canonical Codexium V4 baseline**.

- Any deviation requires a new version (V5+)
- No feature expansion allowed in V4
- This template is safe to clone, fork, and reuse across organizations
