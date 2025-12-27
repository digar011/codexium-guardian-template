# Codexium V4 — Frozen Checklist (Autonomous Dev Team Pipeline)

## Scope rules
- No new features beyond this checklist until V4 is marked FROZEN.
- Changes must be reliability / bugfix only.

---

## 1) Orchestrator foundation (25%)
- [x] PR triggers wired
- [x] Global kill-switch (NEO_AUTOMATION_ENABLED)
- [x] Decision engine (SKIP_AUTOMATION / PROCEED)
- [x] Auto-labeling
- [x] Consensus comment posting

**Status:** 25 / 25

---

## 2) Merge blocking (35%)
- [x] Neo Merge Gate exists
- [x] Fail-safe behavior (missing outputs do not block)
- [x] Block condition: Severity=critical + Confidence=high
- [ ] Branch protection requires Neo Merge Gate

**Status:** 30 / 35

---

## 3) Memory / persistence (20%)
- [ ] Lightweight persistence implemented
- [ ] Stores decision + severity/confidence + timestamp
- [ ] Visible via PR comment or workflow summary

**Status:** 0 / 20

---

## 4) Operational safety (20%)
- [x] No circular job dependencies
- [x] Jobs gated by decision + cost gate
- [x] Kill-switch disables all automation
- [ ] Failure modes documented

**Status:** 15 / 20

---

## V4 completion
**Total:** 70 / 100  
**State:** NOT FROZEN

## Freeze criteria
V4 becomes FROZEN when:
1) Branch protection requires Neo Merge Gate
2) Memory/persistence is complete
3) Failure-mode documentation exists
