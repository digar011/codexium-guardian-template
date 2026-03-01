# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Initial repository standardization (ONBOARDING.md, PRODUCT.md, CHANGELOG.md, TODO.md, CLAUDE.md)

## [1.0.0] - 2025-12-30

### Added
- Codexium V4 Generator workflow for AI-powered code generation
- Neo V4 Reviewer with 16 specialized review agents
- Multi-layer guardrail system with configurable safety rules
- Automatic PR creation from code generation requests
- Gate enforcement to block merges on critical issues
- Degraded mode for review resilience when agents fail
- Memory system to prevent duplicate reviews
- Cost estimation and spending controls
- Telemetry and metrics tracking
- Sample React/TypeScript components (Button, Hello, Login, SearchBar) with tests
- Comprehensive documentation (usage guide, architecture, agent schemas, failure recovery, installation guide)
- Comment-based trigger workflow
- Codex materializer workflow for optional MCP integration
- Unified guardrails configuration (codex-unified-guardrails.yml)
