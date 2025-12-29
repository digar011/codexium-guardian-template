# Codexium V4 + Neo V4 Integration Guide

## 🎯 **System Overview**

You now have TWO AI systems working together:

1. **Codexium V4 Generator** - Creates code automatically
2. **Neo V4 Reviewer** - Reviews ALL code (yours + Codexium's)

---

## 🚀 **How to Use Codexium Generator**

### **Method 1: GitHub UI (Recommended)**

1. Go to your repo: https://github.com/digar011/codexium-guardian-template
2. Click **Actions** tab
3. Click **Codexium V4 Generator** workflow
4. Click **Run workflow** button
5. Fill in the form:
   ```
   Request: Create a React login component with JWT authentication
   Context: Should include form validation and error handling
   ```
6. Click **Run workflow**

**What happens:**
- ✅ Codexium evaluates safety (10 seconds)
- ✅ Generates complete code files (30-60 seconds)
- ✅ Creates branch automatically
- ✅ Opens PR with generated code
- ✅ Neo reviews it automatically
- ✅ You review Neo's findings
- ✅ Merge when ready

---

### **Method 2: API/Webhook (Advanced)**

```bash
# Trigger via API
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/digar011/codexium-guardian-template/dispatches \
  -d '{
    "event_type": "generate_code",
    "client_payload": {
      "request": "Create a REST API endpoint for user registration",
      "context": "Should validate email, hash password with bcrypt, and save to PostgreSQL"
    }
  }'
```

---

## 📋 **What Can Codexium Generate?**

### ✅ **Supported (Auto-Generate)**

**Frontend:**
- React/Vue/Svelte components
- Forms with validation
- API integration
- State management
- Responsive layouts

**Backend:**
- REST API endpoints
- GraphQL resolvers
- Database models
- Authentication logic
- Middleware

**Full-Stack:**
- CRUD operations
- User authentication
- Payment integration (reviewed)
- Email notifications (reviewed)
- File uploads (reviewed)

**Database:**
- Schema definitions
- Migrations (reviewed)
- Seed data
- Queries

**Configuration:**
- Docker files
- CI/CD configs
- Environment templates
- Package configs

**Testing:**
- Unit tests
- Integration tests
- E2E tests

---

### ⚠️ **Requires Review**

These will be generated but flagged for extra scrutiny:

- Payment processing (Stripe, PayPal)
- Database migrations (ALTER TABLE)
- Authentication/authorization
- Cryptography operations
- Email sending
- File uploads
- Admin operations

---

### ❌ **Blocked (Never Generated)**

For safety, these require manual implementation:

- Bulk data deletion
- Database destruction (DROP TABLE)
- Arbitrary code execution
- System file operations
- Overly permissive permissions

---

## 🎮 **Example Requests**

### **Simple Request:**
```
Request: Create a button component
Context: Should accept onClick prop and have primary/secondary variants
```

**Result:**
- `components/Button.tsx` - Component
- `components/Button.test.tsx` - Tests
- `components/Button.stories.tsx` - Storybook

---

### **Medium Complexity:**
```
Request: Create a user profile page
Context: Display user info, allow editing, save to API endpoint
```

**Result:**
- `pages/Profile.tsx` - Main page
- `components/ProfileForm.tsx` - Form component
- `hooks/useProfile.ts` - Custom hook
- `api/profile.ts` - API calls
- `types/user.ts` - TypeScript types
- `**/*.test.tsx` - Tests

---

### **Complex Request:**
```
Request: Create a complete blog system
Context: Posts, comments, authentication, markdown support
```

**Result:**
- Full folder structure
- Multiple components
- API endpoints
- Database schema
- Tests
- README with setup instructions

---

## 🔍 **Understanding the Decision Engine**

When you request code, Codexium evaluates:

### **1. Confidence Score (0-100%)**

- **90-100%**: "I'm very confident I can generate this correctly"
- **75-89%**: "I can do this but it's complex"
- **60-74%**: "I might need clarification"
- **< 60%**: "Too uncertain - blocked"

### **2. Severity Level**

- **info**: Simple, safe operations
- **warn**: Complex or sensitive operations
- **critical**: High-risk operations

### **3. Decision Matrix**

| Confidence | Severity | Decision |
|------------|----------|----------|
| > 85% | info | ✅ AUTO-GENERATE |
| > 85% | warn | ⚠️ GENERATE + REVIEW |
| > 65% | warn | ⚠️ GENERATE + REVIEW |
| > 65% | critical | 🚨 REQUIRE APPROVAL |
| < 65% | any | ❌ BLOCK |

---

## 📊 **Example Decision Flow**

### **Example 1: Simple Component**
```
Request: "Create a loading spinner component"

Decision Engine:
├─ Confidence: 95% ✅ (very simple)
├─ Severity: info ✅ (no risk)
├─ Cost: $0.02
└─ Decision: PROCEED

Action: Auto-generate → Open PR → Neo reviews
```

---

### **Example 2: Payment Processing**
```
Request: "Create Stripe payment endpoint"

Decision Engine:
├─ Confidence: 85% ✅ (I know Stripe)
├─ Severity: warn ⚠️ (payment = sensitive)
├─ Cost: $0.12
├─ Safety: Payment processing detected
└─ Decision: GENERATE + REVIEW REQUIRED

Action: Generate → Flag for security review → Neo scrutinizes extra carefully
```

---

### **Example 3: Dangerous Operation**
```
Request: "Create script to delete all users"

Decision Engine:
├─ Confidence: 20% 🚨 (too dangerous)
├─ Severity: critical 🚨
├─ Safety: Bulk deletion detected
└─ Decision: BLOCK

Action: Reject with explanation → Suggest manual implementation
```

---

## 🛡️ **How Neo Reviews Codexium's Code**

Neo treats Codexium-generated code the same as human code:

1. **General Agent** - Always runs
2. **Security Agent** - If sensitive operations detected
3. **QA Agent** - Checks for tests
4. **Architect Agent** - For large generations
5. **Other agents** - Based on file types

**Codexium gets NO special treatment!**

---

## 🔄 **Complete Workflow Example**

### **Your Request:**
```
"Create a user authentication system with JWT tokens"
```

### **Step 1: Codexium Evaluates (10s)**
```
🧠 Decision Engine:
├─ Confidence: 82%
├─ Severity: warn (authentication = sensitive)
├─ Cost: $0.18
└─ Decision: GENERATE + REVIEW REQUIRED
```

### **Step 2: Codexium Generates (45s)**
```
📁 Files created:
├─ src/auth/login.ts
├─ src/auth/register.ts
├─ src/auth/jwt.ts
├─ src/middleware/auth.ts
├─ src/types/user.ts
├─ tests/auth.test.ts
└─ CODEXIUM_GENERATION.md

🌿 Branch created: codexium/user-auth-20251229-123456
📝 PR #45 opened
```

### **Step 3: Neo Reviews (30s)**
```
🤖 Neo V4 Review:

✅ General Agent: Clean code structure
⚠️  Security Agent: 
    - Missing rate limiting on login endpoint
    - JWT secret should be rotated
    - No account lockout after failed attempts
✅ QA Agent: Tests included
⚠️  Architect Agent: Consider separating auth service

Gate Status: PASSED (with warnings)
Severity: warn
```

### **Step 4: You Decide**
```
Options:
1. ✅ Merge as-is (warnings are acceptable)
2. 💬 Comment to request fixes
3. 🔧 Make changes yourself
4. ❌ Close PR
```

---

## 💡 **Pro Tips**

### **Be Specific**
```
❌ Bad: "Create a form"
✅ Good: "Create a user registration form with email, password, name fields, validation, and submit to /api/register"
```

### **Provide Context**
```
Request: Create a blog post component
Context: Should render markdown, show author, date, tags, and support code syntax highlighting
```

### **Specify Tech Stack**
```
Request: Create a login page
Context: Use React, TypeScript, Tailwind CSS, React Hook Form, Zod validation
```

### **Request Tests**
```
Request: Create a calculator function
Context: Should add, subtract, multiply, divide. Include unit tests with edge cases
```

---

## 🚨 **Troubleshooting**

### **"Request was blocked"**
- Check if it involves dangerous operations
- Rephrase to be more specific
- Break into smaller requests
- Or implement manually

### **"Low confidence score"**
- Request is too vague or complex
- Add more context
- Simplify the request
- Break into multiple smaller requests

### **"Neo found critical issues"**
- Review Neo's findings carefully
- Fix the issues (or ask Codexium to regenerate)
- Don't merge until resolved

### **"Generation failed"**
- Check GitHub Actions logs
- Might be API error
- Try again
- Report in Issues if persists

---

## 📈 **Monitoring**

### **Check Generation History:**
```
GitHub Actions → Codexium V4 Generator → Workflow runs
```

### **View All Codexium PRs:**
```
Pull Requests → Filter by label: "codexium-generated"
```

### **See Neo's Reviews:**
```
Any PR → Checks tab → Neo Orchestrator
```

---

## 🎯 **Best Practices**

1. **Start Small**: Test with simple components first
2. **Review Everything**: Always review Neo's findings
3. **Iterate**: Request changes if needed
4. **Learn Patterns**: See what works well
5. **Provide Feedback**: Use thumbs up/down on PRs
6. **Trust But Verify**: Codexium is good but not perfect
7. **Keep Context**: More context = better code

---

## 🔑 **Quick Reference**

| I Want... | Command |
|-----------|---------|
| Generate code | Actions → Codexium V4 Generator |
| See what Codexium can do | Read "What Can Codexium Generate?" above |
| Check if request is safe | It auto-evaluates, but avoid dangerous patterns |
| View generated files | Check PR → Files changed tab |
| See Neo's review | PR → Checks → Neo Orchestrator |
| Request changes | Comment on PR |
| Merge code | PR → Merge button (if checks pass) |

---

## 📞 **Need Help?**

- Check Neo's review comments
- Review guardrails in `codex-unified-guardrails.yml`
- Open an issue in the repo
- Check GitHub Actions logs

---

**You now have a full AI development team! Codexium generates, Neo reviews, you decide.** 🚀
