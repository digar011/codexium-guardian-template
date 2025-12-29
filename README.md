# 🤖 Codexium V4 + Neo V4 - AI Development Automation System

**Enterprise-grade AI-powered code generation and review system with 16 specialized agents.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenAI](https://img.shields.io/badge/Powered%20by-OpenAI-412991.svg)](https://openai.com/)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF.svg)](https://github.com/features/actions)

---

## 🎯 **What This System Does**

This repository provides a complete AI development automation platform with two integrated systems:

### **1. Codexium V4 Generator** 🔨
- **Generates production-ready code** on demand
- Creates complete files with tests, types, and documentation
- Evaluates safety before generation (confidence scoring)
- Opens pull requests automatically

### **2. Neo V4 Reviewer** 🛡️
- **Reviews ALL code** (human-written and AI-generated)
- **16 specialized agents** for comprehensive analysis
- Enforces quality gates and security standards
- Provides actionable feedback

**Together:** Request code → Codexium generates → Neo reviews → You merge

---

## ⚡ **Quick Start**

### **1. Use This Template**
Click **"Use this template"** → Create your repository

### **2. Add Required Secret**
Go to **Settings → Secrets → Actions** → Add:
- **Name:** `OPENAI_API_KEY`
- **Value:** Your OpenAI API key (starts with `sk-`)

### **3. Test It!**

#### **Option A: Generate Code**
1. Go to **Actions** tab
2. Click **"Codexium V4 Generator"**
3. Click **"Run workflow"**
4. Enter: `Create a button component with TypeScript and Tailwind CSS`
5. Watch Codexium generate code + Neo review it!

#### **Option B: Review Existing Code**
1. Make any code change
2. Create a pull request
3. Watch Neo's 16 agents review it automatically!

---

## 🚀 **Features**

### **Code Generation (Codexium V4)**
- ✅ Generates complete, production-ready code
- ✅ Includes tests, types, and documentation
- ✅ Safety evaluation before generation
- ✅ Confidence scoring (0-100%)
- ✅ Cost estimation and tracking
- ✅ Automatic PR creation
- ✅ Supports: React, Vue, Node, Python, SQL, Docker, and more

### **Code Review (Neo V4)**
- ✅ **16 Specialized Agents:**
  - 📋 General - Core code quality
  - 🔒 Security - Vulnerabilities, secrets
  - ✅ QA - Test coverage, quality
  - 🎨 UI/UX - Design, accessibility
  - ⚡ Performance - Speed, optimization
  - 🔍 SEO - Search visibility
  - 🏗️ Architecture - Design patterns
  - 🔎 Critical Analysis - Deep review
  - 🚀 DevOps - CI/CD, deployment
  - 📋 Compliance - GDPR, HIPAA
  - 🌐 i18n - Internationalization
  - ♿ Accessibility - WCAG compliance
  - 📚 Documentation - API docs
  - 💰 Conversion - CRO, revenue
  - 🔐 Privacy - Data protection
  - 🔄 n8n - Workflow automation

### **Safety & Quality**
- ✅ Multi-layer guardrails (blocks dangerous operations)
- ✅ Gate enforcement (blocks critical issues)
- ✅ Degraded mode (continues even if agents fail)
- ✅ Memory system (prevents duplicate reviews)
- ✅ Cost controls (limits spending)
- ✅ Comprehensive logging and telemetry

---

## 📊 **System Architecture**

```
┌─────────────────────────────────────────────────┐
│              YOU REQUEST CODE                    │
│         "Create a login component"               │
└──────────────────┬──────────────────────────────┘
                   │
    ┌──────────────▼──────────────┐
    │  CODEXIUM V4 EVALUATES      │
    │  - Confidence: 85%          │
    │  - Severity: warn           │
    │  - Decision: PROCEED        │
    └──────────────┬──────────────┘
                   │
    ┌──────────────▼──────────────┐
    │  CODEXIUM V4 GENERATES      │
    │  - Login.tsx                │
    │  - Login.test.tsx           │
    │  - Opens PR automatically   │
    └──────────────┬──────────────┘
                   │
    ┌──────────────▼──────────────┐
    │  NEO V4 REVIEWS (16 agents) │
    │  - Security: ✅             │
    │  - QA: ⚠️ Add edge cases   │
    │  - Gate: PASSED             │
    └──────────────┬──────────────┘
                   │
    ┌──────────────▼──────────────┐
    │  YOU DECIDE                  │
    │  - Merge to production       │
    │  - Request changes           │
    │  - Close PR                  │
    └──────────────────────────────┘
```

---

## 🎮 **Usage Examples**

### **Generate a React Component**
```
Request: Create a modal component
Context: Should have open/close animations, overlay, and close button. Use TypeScript and Tailwind CSS.
```

### **Generate an API Endpoint**
```
Request: Create a REST API endpoint for user registration
Context: Validate email format, hash password with bcrypt, save to PostgreSQL, return JWT token
```

### **Generate a Full Feature**
```
Request: Create a todo list application
Context: Add, edit, delete, mark complete. Store in localStorage. Include tests. TypeScript + React.
```

### **Review Existing Code**
Just create a PR - Neo automatically:
- Selects relevant agents based on files changed
- Reviews for security, quality, performance
- Posts comprehensive feedback
- Blocks merge if critical issues found

---

## 📂 **Repository Structure**

```
codexium-guardian-template/
├── .github/
│   ├── workflows/
│   │   ├── codex-generator.yml       # 🔨 Code generation
│   │   ├── neo-orchestrator.yml      # 🧠 Review orchestration
│   │   ├── codex-guardian.yml        # 🤖 Agent executor
│   │   └── codex-materialize.yml     # 🔄 (Optional) MCP integration
│   │
│   └── scripts/
│       ├── config/
│       │   └── codex-unified-guardrails.yml  # 🛡️ Safety rules
│       │
│       ├── neo/agents/                # 16 specialized agents
│       │   ├── role_general_instruction.txt
│       │   ├── role_security_instruction.txt
│       │   └── ... (14 more agents)
│       │
│       ├── call_openai.py             # 🤖 AI interface
│       └── telemetry.py               # 📊 Metrics
│
├── docs/
│   ├── CODEXIUM_USAGE_GUIDE.md       # 📖 Complete usage guide
│   ├── SYSTEM_ARCHITECTURE.md         # 🏗️ Architecture docs
│   ├── AGENT_OUTPUT_SCHEMA.md         # 📋 Agent contracts
│   ├── FAILURE_RECOVERY.md            # 🛡️ Resilience patterns
│   └── NEO_V4_ENTERPRISE_SUITE.md     # 📚 Neo documentation
│
└── README.md                          # 👈 You are here
```

---

## 🔧 **Configuration**

### **Required Secrets**
- `OPENAI_API_KEY` - Your OpenAI API key (required)

### **Optional Customization**

#### **Adjust Guardrails**
Edit `.github/scripts/config/codex-unified-guardrails.yml`:
```yaml
generation:
  confidence_gates:
    auto_proceed: 85      # Lower = more auto-generation
    require_review: 65    # Lower = more reviews
```

#### **Customize Agents**
Edit agent instructions in `.github/scripts/neo/agents/`:
- Each agent has its own instruction file
- Modify to fit your team's standards
- Add project-specific rules

#### **Adjust Cost Limits**
In `codex-unified-guardrails.yml`:
```yaml
cost_limits:
  max_per_request: 1.00   # Maximum spend per generation
  warn_threshold: 0.25    # Warn if exceeds this
```

---

## 📈 **Performance Metrics**

### **Typical Execution Times**
- Simple component: **~90 seconds** (evaluation + generation + review)
- Medium feature: **2-3 minutes**
- Complex system: **3-5 minutes**

### **Cost Estimates**
- Simple component: **$0.02 - $0.05**
- Medium feature: **$0.10 - $0.25**
- Complex system: **$0.50 - $1.00**

### **Success Rates**
- Generation success: **>95%**
- Review completion: **100%**
- Gate accuracy: **>95%**

---

## 🛡️ **Safety Features**

### **What Codexium WON'T Generate:**
- ❌ Bulk data deletion
- ❌ Database destruction (DROP TABLE)
- ❌ Arbitrary code execution
- ❌ Hardcoded credentials
- ❌ Overly permissive security

### **What Neo BLOCKS:**
- ❌ SQL injection vulnerabilities
- ❌ XSS risks
- ❌ Hardcoded secrets
- ❌ Command injection
- ❌ Missing critical security

### **Multi-Layer Protection:**
1. **Request evaluation** - Block dangerous requests
2. **Generation guardrails** - Enforce safety during creation
3. **Neo review** - Comprehensive security analysis
4. **Gate enforcement** - Block merge on critical issues
5. **Human approval** - Final decision always yours

---

## 🎓 **Documentation**

Comprehensive guides available in `/docs/`:

- **[Usage Guide](docs/CODEXIUM_USAGE_GUIDE.md)** - How to use the system
- **[Architecture](docs/SYSTEM_ARCHITECTURE.md)** - Complete system design
- **[Agent Schema](docs/AGENT_OUTPUT_SCHEMA.md)** - Agent output contracts
- **[Failure Recovery](docs/FAILURE_RECOVERY.md)** - Resilience patterns
- **[Neo V4 Suite](docs/NEO_V4_ENTERPRISE_SUITE.md)** - Neo documentation

---

## 🤝 **Contributing**

### **Add Custom Agents**
1. Create `role_yourname_instruction.txt` in `.github/scripts/neo/agents/`
2. Define agent's specialty and review criteria
3. Update `neo-orchestrator.yml` to include new agent
4. Test with sample PRs

### **Improve Guardrails**
1. Edit `codex-unified-guardrails.yml`
2. Add patterns to block/warn
3. Test with generation requests
4. Submit PR with improvements

---

## 📊 **What Can It Generate?**

### **Frontend**
- React/Vue/Svelte components
- Forms with validation
- Responsive layouts
- State management
- API integration

### **Backend**
- REST/GraphQL APIs
- Database models
- Authentication logic
- Middleware
- Background jobs

### **Full-Stack**
- CRUD operations
- User authentication
- Payment integration
- Email notifications
- File uploads

### **Infrastructure**
- Docker configurations
- CI/CD pipelines
- Database migrations
- Environment configs
- Deployment scripts

### **Testing**
- Unit tests
- Integration tests
- E2E tests
- Mock data
- Test fixtures

---

## 🚨 **Troubleshooting**

### **"Workflow failed - OpenAI API error"**
- Check API key is valid
- Verify you have credits
- Check OpenAI service status

### **"Agent timed out"**
- Normal for complex PRs
- Review continues in degraded mode
- Check logs for details

### **"Request blocked by guardrails"**
- Safety system working correctly
- Review the blocked pattern
- Rephrase request or implement manually

### **"No code generated"**
- Check workflow logs
- Verify request is clear
- Ensure confidence > 60%

---

## 🎯 **Best Practices**

1. **Be Specific** - More detail = better code
   - ❌ "Create a form"
   - ✅ "Create a user registration form with email, password, validation, and error handling"

2. **Provide Context** - Mention tech stack
   - ✅ "Use TypeScript, React Hook Form, Zod validation, Tailwind CSS"

3. **Request Tests** - Always include tests
   - ✅ "Include unit tests with edge cases"

4. **Review Neo's Feedback** - Don't ignore warnings
   - Even if gate passes, consider suggestions

5. **Start Small** - Test with simple components first
   - Build confidence before complex systems

---

## 📄 **License**

MIT License - See [LICENSE](LICENSE) file for details

---

## 🙏 **Credits**

- **OpenAI** - GPT models powering generation and review
- **GitHub Actions** - Automation platform
- **Community** - Contributors and testers

---

## 📞 **Support**

- 📚 Check [documentation](docs/)
- 🐛 Report [issues](../../issues)
- 💬 Ask [questions](../../discussions)
- ⭐ Star this repo if it helps you!

---

## 🎉 **You Now Have:**

✅ AI that generates production code  
✅ AI that reviews all code automatically  
✅ 16 specialized review agents  
✅ Multi-layer safety system  
✅ Automatic PR workflow  
✅ Cost controls and monitoring  
✅ Comprehensive documentation  
✅ Enterprise-grade quality  

**Start building faster with AI assistance!** 🚀

---

**Version:** Codexium V4 + Neo V4 Enterprise Suite  
**Last Updated:** December 2025  
**Status:** ✅ Production Ready
