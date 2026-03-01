# Product Overview -- Codexium Guardian Template

## Product Name

Codexium V4 + Neo V4 AI Development Automation System

## Description

Codexium Guardian Template is an enterprise-grade, open-source GitHub Template repository that integrates AI-powered code generation and code review directly into any GitHub-based development workflow. It consists of two tightly integrated subsystems:

1. **Codexium V4 Generator** -- An AI code generation engine that creates production-ready code from natural language prompts, complete with tests, types, and documentation.
2. **Neo V4 Reviewer** -- A multi-agent AI code review system with 16 specialized agents that automatically review every pull request for security, quality, performance, accessibility, compliance, and more.

## Target Audience

- Development teams that want AI-assisted code generation with built-in quality gates
- Organizations that need automated, multi-dimensional code review
- Teams adopting AI development tools while maintaining security and quality standards
- Solo developers who want enterprise-grade review coverage

## Core Features

### Code Generation (Codexium V4)
- Natural language to production code via GitHub Actions
- Supports React, Vue, Node.js, Python, SQL, Docker, and more
- Safety evaluation and confidence scoring before generation
- Automatic pull request creation with generated code
- Cost estimation and spending controls

### Code Review (Neo V4)
- 16 specialized AI review agents covering security, QA, UI/UX, performance, SEO, architecture, DevOps, compliance, i18n, accessibility, documentation, conversion, privacy, and workflow automation
- Automatic agent selection based on files changed in the PR
- Gate enforcement that can block merges for critical issues
- Degraded mode -- review continues even if individual agents fail
- Memory system to prevent duplicate reviews

### Safety and Quality
- Multi-layer guardrails block dangerous operations (DROP TABLE, hardcoded secrets, command injection)
- Configurable confidence thresholds and cost limits
- Human approval always required as the final step

## Technical Specifications

| Attribute | Value |
|-----------|-------|
| Platform | GitHub Actions |
| AI Provider | OpenAI (GPT models) |
| Languages Supported | TypeScript, JavaScript, Python, SQL, Docker, and more |
| Number of Review Agents | 16 |
| Typical Generation Time | 90 seconds to 5 minutes |
| Typical Cost per Request | $0.02 to $1.00 |
| Required Secret | `OPENAI_API_KEY` |
| License | MIT |

## Architecture Summary

```
User Request --> Codexium V4 Evaluates (confidence scoring)
             --> Codexium V4 Generates (code + tests + docs)
             --> PR Created Automatically
             --> Neo V4 Reviews (16 agents in parallel)
             --> Gate Decision (pass / warn / block)
             --> Human Decision (merge / request changes / close)
```

## Repository Structure

- `.github/workflows/` -- GitHub Actions workflow definitions
- `.github/scripts/neo/agents/` -- 16 agent instruction files
- `.github/scripts/config/` -- Guardrails and safety configuration
- `.github/scripts/call_openai.py` -- OpenAI API interface
- `.github/scripts/telemetry.py` -- Metrics and logging
- `src/components/` -- Sample React/TypeScript components with tests
- `docs/` -- Full system documentation (usage guide, architecture, schemas, failure recovery)

## Roadmap Considerations

- Persistence layer for long-term data storage and analysis (not yet implemented)
- Expanded operational safety measures
- Additional agent types based on team feedback
- Multi-repo centralized configuration support

## Success Metrics

- Generation success rate: >95%
- Review completion rate: 100%
- Gate accuracy: >95%
- Cost per generation within defined limits
