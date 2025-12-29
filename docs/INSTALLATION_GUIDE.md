# Neo V4 Installation Guide

## 📁 Recommended Folder Structure

```
your-repo/
├── .github/
│   ├── workflows/
│   │   ├── neo-orchestrator.yml
│   │   └── codex-guardian.yml
│   │
│   └── scripts/
│       ├── neo/                        # ← All Neo files here
│       │   ├── agents/                 # Agent instruction files
│       │   │   ├── role_general_instruction.txt
│       │   │   ├── role_architect_instruction.txt
│       │   │   ├── role_security_instruction.txt
│       │   │   ├── role_qa_instruction.txt
│       │   │   ├── role_ui_ux_instruction.txt
│       │   │   ├── role_critic_instruction.txt
│       │   │   ├── role_seo_instruction.txt
│       │   │   ├── role_performance_instruction.txt
│       │   │   ├── role_n8n_instruction.txt
│       │   │   ├── role_devops_instruction.txt
│       │   │   ├── role_compliance_instruction.txt
│       │   │   ├── role_i18n_instruction.txt
│       │   │   ├── role_a11y_instruction.txt
│       │   │   ├── role_documentation_instruction.txt
│       │   │   ├── role_conversion_instruction.txt
│       │   │   └── role_privacy_instruction.txt
│       │   │
│       │   ├── config/
│       │   │   └── guardrails.yml      # Enforcement rules
│       │   │
│       │   ├── call_openai.py          # API caller
│       │   ├── telemetry.py            # Metrics tracker
│       │   └── README.md               # Neo-specific docs
│       │
│       └── (other scripts...)
│
└── docs/
    └── NEO_V4_ENTERPRISE_SUITE.md      # Full documentation
```

---

## ✅ Why Save In Repo?

### 1. **Version Control**
```bash
# Track changes to agent behavior
git log .github/scripts/neo/agents/role_security_instruction.txt

# See what changed
git diff HEAD~1 .github/scripts/neo/agents/

# Rollback if needed
git checkout HEAD~1 .github/scripts/neo/agents/role_security_instruction.txt
```

### 2. **Team Collaboration**
```bash
# Someone improves the security agent
git checkout -b improve-security-agent
# Edit role_security_instruction.txt
git add .github/scripts/neo/agents/role_security_instruction.txt
git commit -m "feat: add check for JWT secret strength"
# Create PR for review
```

### 3. **Customization Per Repo**
```
frontend-repo/.github/scripts/neo/agents/
  → Strict UI/UX checks
  → Relaxed backend rules

backend-repo/.github/scripts/neo/agents/
  → Strict security checks
  → Relaxed UI rules
```

### 4. **Transparency**
```
Developer: "Why did Neo flag this?"
You: "Check .github/scripts/neo/agents/role_security_instruction.txt line 45"
Developer: "Ah, makes sense!"
```

---

## 🚀 Installation Steps

### Step 1: Create Folder Structure
```bash
cd your-repo

# Create directories
mkdir -p .github/workflows
mkdir -p .github/scripts/neo/agents
mkdir -p .github/scripts/neo/config
mkdir -p docs
```

### Step 2: Copy Workflow Files
```bash
# Copy workflows
cp neo-orchestrator.yml .github/workflows/
cp codex-guardian.yml .github/workflows/
```

### Step 3: Copy Agent Instructions
```bash
# Copy all agent instruction files
cp role_*_instruction.txt .github/scripts/neo/agents/
```

### Step 4: Copy Supporting Files
```bash
# Copy Python scripts
cp call_openai.py .github/scripts/neo/
cp telemetry.py .github/scripts/neo/

# Copy config
cp guardrails.yml .github/scripts/neo/config/

# Copy documentation
cp NEO_V4_ENTERPRISE_SUITE.md docs/
```

### Step 5: Make Scripts Executable
```bash
chmod +x .github/scripts/neo/call_openai.py
chmod +x .github/scripts/neo/telemetry.py
```

### Step 6: Add GitHub Secret
```bash
# Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions
# Click "New repository secret"
# Name: OPENAI_API_KEY
# Value: sk-your-key-here
```

### Step 7: Commit Everything
```bash
git add .github/ docs/
git commit -m "feat: add Neo V4 AI code review system with 17 agents"
git push origin main
```

### Step 8: Test
```bash
# Create test PR
git checkout -b test-neo
echo "# Test" > test.md
git add test.md
git commit -m "test: trigger Neo review"
git push origin test-neo

# Create PR on GitHub and watch Neo review it!
```

---

## 🎨 Customization

### Option A: Keep Default Structure (Simple)
```
.github/scripts/
├── role_general_instruction.txt
├── role_security_instruction.txt
└── ... (all files in one folder)
```

**Pros:**
- ✅ Simple, flat structure
- ✅ Easy to find files
- ✅ Works out of the box

**Cons:**
- ❌ Gets messy with 17 files
- ❌ Harder to organize

### Option B: Organized Structure (Recommended)
```
.github/scripts/neo/
├── agents/          # All agent instructions
├── config/          # Guardrails, settings
├── call_openai.py   # Scripts
└── telemetry.py
```

**Pros:**
- ✅ Clean organization
- ✅ Easy to navigate
- ✅ Scales well
- ✅ Clear purpose of each folder

**Cons:**
- ❌ Slightly more setup
- ❌ Need to update workflow paths (if using file reading)

---

## 🔧 Alternative: External Configuration

### For Multi-Repo Setups:

**Option C: Centralized Config Repo**
```
codexium-neo-config/          # Separate repo
├── agents/
│   └── role_*_instruction.txt
├── config/
│   └── guardrails.yml
└── scripts/
    ├── call_openai.py
    └── telemetry.py

# Then in each project repo:
.github/workflows/
└── neo-orchestrator.yml  # Points to config repo
```

**Pros:**
- ✅ Single source of truth
- ✅ Update once, affects all repos
- ✅ Easier to maintain standards

**Cons:**
- ❌ Can't customize per repo easily
- ❌ More complex setup
- ❌ Need to manage access

---

## 📝 .gitignore Recommendations

Add this to your `.gitignore`:

```gitignore
# Neo telemetry (local only)
/tmp/neo-telemetry/
*.neo-telemetry.log

# Neo local overrides (if you use them)
.github/scripts/neo/local-overrides/
```

---

## 🎯 **RECOMMENDATION:**

**For most cases, go with Option B (Organized In-Repo):**

```bash
.github/scripts/neo/
├── agents/          # All 17 agent instruction files
├── config/          # guardrails.yml
├── call_openai.py
└── telemetry.py
```

**Why?**
1. Clean and organized
2. Easy version control
3. Team can contribute improvements
4. Each repo can customize if needed
5. Everything in one place
6. Professional structure

---

## 🚨 Important Notes

### DO Commit:
- ✅ Agent instruction files
- ✅ Workflow files (.yml)
- ✅ Guardrails config
- ✅ Python scripts
- ✅ Documentation

### DON'T Commit:
- ❌ OPENAI_API_KEY (use GitHub Secrets)
- ❌ Telemetry logs
- ❌ Temporary files
- ❌ Local test results

---

## 📊 Size Considerations

**Total size of all Neo files:**
```
Workflows:          ~30 KB
Agent instructions: ~150 KB
Scripts:            ~25 KB
Config:             ~10 KB
Docs:               ~15 KB
------------------------
TOTAL:              ~230 KB
```

**Impact on repo:**
- Negligible (0.23 MB)
- Git handles it efficiently
- No performance impact
- Worth it for the value!

---

## 🎉 Summary

**YES, save them in the repo!**

```bash
# Quick setup
mkdir -p .github/scripts/neo/{agents,config}
cp role_*_instruction.txt .github/scripts/neo/agents/
cp *.py .github/scripts/neo/
cp guardrails.yml .github/scripts/neo/config/
cp *.yml .github/workflows/
git add .github/
git commit -m "feat: add Neo V4"
```

**Benefits:**
- Version controlled
- Team collaboration
- Repo-specific customization
- Full transparency
- Easy to maintain

**You're ready to ship!** 🚀
