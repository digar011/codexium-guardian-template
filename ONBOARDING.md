# Onboarding Guide -- Codexium Guardian Template

Welcome to the Codexium V4 + Neo V4 AI Development Automation System. This guide will get you productive as quickly as possible.

## What This Project Is

Codexium Guardian Template is an enterprise-grade GitHub Actions-based system that:
- **Generates production-ready code** via AI (Codexium V4 Generator)
- **Reviews all code automatically** via 16 specialized AI agents (Neo V4 Reviewer)

It is designed as a GitHub Template repository -- teams clone it to add AI-powered code generation and review to any project.

## Prerequisites

- A GitHub account with repository admin access
- An OpenAI API key (starts with `sk-`)
- Basic familiarity with GitHub Actions
- (Optional) Python 3.8+ for local script testing

## First-Day Setup

### 1. Clone the Repository

```bash
git clone https://github.com/digar011/codexium-guardian-template.git
cd codexium-guardian-template
```

### 2. Add Your OpenAI API Key

Go to your GitHub repo: **Settings > Secrets and variables > Actions > New repository secret**

- **Name:** `OPENAI_API_KEY`
- **Value:** Your OpenAI API key

### 3. Understand the Directory Structure

```
codexium-guardian-template/
  .github/
    workflows/          -- GitHub Actions workflow definitions
      codex-generator.yml       -- Triggers AI code generation
      neo-orchestrator.yml      -- Orchestrates the 16-agent review
      codex-guardian.yml        -- Individual agent executor
      codex-materialize.yml     -- (Optional) MCP integration
      codex-comment-trigger.yml -- Comment-based triggers
    scripts/
      config/
        codex-unified-guardrails.yml  -- Safety and cost rules
        guardrails.yml                -- Legacy guardrails
      neo/agents/       -- 16 agent instruction files (role_*_instruction.txt)
      call_openai.py    -- OpenAI API interface
      telemetry.py      -- Metrics and logging
  src/components/       -- Sample React/TypeScript components with tests
  docs/                 -- Full system documentation
```

### 4. Run Your First Code Generation

1. Go to the **Actions** tab in GitHub
2. Select **Codexium V4 Generator**
3. Click **Run workflow**
4. Enter a prompt like: `Create a card component with TypeScript and Tailwind CSS`
5. Codexium generates code, opens a PR, and Neo reviews it automatically

### 5. Run Your First Code Review

1. Create a feature branch, make a code change, and open a PR
2. Neo V4 automatically selects relevant agents based on file types
3. Review the feedback posted as PR comments

## Key Concepts

### The 16 Review Agents

Each agent specializes in a domain. They are defined in `.github/scripts/neo/agents/`:

| Agent | File | Focus |
|-------|------|-------|
| General | `role_general_instruction.txt` | Core code quality |
| Security | `role_security_instruction.txt` | Vulnerabilities, secrets |
| QA | `role_qa_instruction.txt` | Test coverage |
| UI/UX | `role_ui_ux_instruction.txt` | Design, usability |
| Performance | `role_performance_instruction.txt` | Speed, optimization |
| SEO | `role_seo_instruction.txt` | Search visibility |
| Architecture | `role_architect_instruction.txt` | Design patterns |
| Critical Analysis | `role_critic_instruction.txt` | Deep review |
| DevOps | `role_devops_instruction.txt` | CI/CD, deployment |
| Compliance | `role_compliance_instruction.txt` | GDPR, HIPAA |
| i18n | `role_i18n_instruction.txt` | Internationalization |
| Accessibility | `role_a11y_instruction.txt` | WCAG compliance |
| Documentation | `role_documentation_instruction.txt` | API docs |
| Conversion | `role_conversion_instruction.txt` | CRO, revenue |
| Privacy | `role_privacy_instruction.txt` | Data protection |
| n8n | `role_n8n_instruction.txt` | Workflow automation |

### Guardrails

Safety rules are defined in `.github/scripts/config/codex-unified-guardrails.yml`. They control:
- Confidence thresholds for auto-generation
- Blocked patterns (DROP TABLE, hardcoded secrets, etc.)
- Cost limits per request

### Gate Enforcement

Neo can block a merge if critical issues are found. The gate system uses severity levels: `info`, `warn`, `error`, `critical`.

## Common Tasks

### Customize an Agent

Edit the relevant `role_*_instruction.txt` file. Each file contains natural language instructions that tell the AI agent what to look for.

### Adjust Cost Limits

Edit `.github/scripts/config/codex-unified-guardrails.yml`:
```yaml
cost_limits:
  max_per_request: 1.00
  warn_threshold: 0.25
```

### Add a New Agent

1. Create `role_yourname_instruction.txt` in `.github/scripts/neo/agents/`
2. Define the agent's specialty and review criteria
3. Update `neo-orchestrator.yml` to include the new agent

## Where to Get Help

- **Docs:** See the `docs/` directory for full documentation
- **Issues:** Open an issue on GitHub for bugs or feature requests
- **Architecture:** Read `ARCHITECTURE.md` for system design overview
