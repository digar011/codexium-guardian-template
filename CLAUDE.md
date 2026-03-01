# CLAUDE.md -- Codexium Guardian Template

## Project Overview

This is the Codexium V4 + Neo V4 AI Development Automation System. It is a GitHub Template repository that provides AI-powered code generation (Codexium V4) and multi-agent code review (Neo V4) via GitHub Actions.

**GitHub:** https://github.com/digar011/codexium-guardian-template.git

## Tech Stack

- **Platform:** GitHub Actions (CI/CD workflows)
- **AI Provider:** OpenAI GPT models
- **Scripts:** Python (call_openai.py, telemetry.py)
- **Sample Code:** React 18, TypeScript (strict mode), Tailwind CSS, shadcn/ui, Vitest
- **Configuration:** YAML (workflows, guardrails)

## Key Directories

- `.github/workflows/` -- Workflow definitions (codex-generator, neo-orchestrator, codex-guardian, codex-materialize, codex-comment-trigger)
- `.github/scripts/neo/agents/` -- 16 agent instruction files (role_*_instruction.txt)
- `.github/scripts/config/` -- Guardrails and safety configuration
- `src/components/` -- Sample React/TypeScript components with co-located tests
- `docs/` -- System documentation

## Coding Standards

- Use functional React components with hooks
- Export default for components
- All components must have a TypeScript props interface
- Include data-testid attributes for testing
- Tests go in co-located `*.test.tsx` files
- Use Tailwind utility classes exclusively (no custom CSS)
- Follow shadcn/ui component patterns
- Minimum 80% test coverage target

## Agent Instruction Files

Agent instructions are plain-text files in `.github/scripts/neo/agents/`. Each contains natural language instructions for a specialized review domain. When editing these files:
- Keep instructions clear and actionable
- Specify what to flag vs. what to suggest
- Include severity guidance (info, warn, error, critical)
- Do not include API keys or secrets in instruction files

## Secrets and Security

- The only required secret is `OPENAI_API_KEY` (stored as a GitHub Actions secret, never committed)
- Guardrails in `codex-unified-guardrails.yml` block dangerous patterns (DROP TABLE, hardcoded credentials, etc.)
- Never commit API keys, tokens, or credentials to the repository

## Testing

- Sample components use Vitest for unit tests
- Tests are co-located with components (e.g., `Button.tsx` / `Button.test.tsx`)
- Test user interactions and edge cases

## Build and Run

This is primarily a GitHub Actions template -- there is no traditional "run" step. To test locally:
- Python scripts can be tested with Python 3.8+
- Sample React components can be tested with `npx vitest` (if a test runner is configured)

## Common Pitfalls

- Forgetting to add `OPENAI_API_KEY` as a GitHub secret will cause all workflows to fail
- Editing workflow YAML syntax incorrectly will silently break pipelines -- validate YAML before committing
- Agent instruction files are read as plain text; formatting matters for AI comprehension
