# 🚀 BetterAuth

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/dikshantsingh510/betterauth?sort=semver&display_name=tag)
![Release Workflow](https://github.com/dikshantsingh510/betterauth/actions/workflows/release.yml/badge.svg)
![Auto Merge](https://github.com/dikshantsingh510/betterauth/actions/workflows/auto-merge.yml/badge.svg)
![npm version](https://img.shields.io/npm/v/betterauth)
![License](https://img.shields.io/github/license/dikshantsingh510/betterauth)
![GitHub stars](https://img.shields.io/github/stars/dikshantsingh510/betterauth?style=social)

> **BetterAuth** is a modern, secure, and developer-friendly authentication system designed for scalable web applications. Built with simplicity, flexibility, and performance in mind.

## 🎯 What is BetterAuth?

BetterAuth is a comprehensive authentication solution that provides:

- **🔐 Secure Authentication**: Modern security practices with JWT tokens, bcrypt hashing, and session management
- **⚡ Framework Agnostic**: Works seamlessly with Next.js, Express, Fastify, and any Node.js framework
- **🛠️ Developer Experience**: Simple APIs, TypeScript support, and extensive customization options
- **🔄 Session Management**: Flexible session handling with refresh tokens and secure storage
- **🌐 Social Login**: Built-in support for Google, GitHub, Discord, and custom OAuth providers
- **📱 Multi-Factor Auth**: TOTP, SMS, and email-based 2FA support
- **🚀 Production Ready**: Battle-tested, scalable, and optimized for high-performance applications

---

## ✨ Features

### Core Authentication

- 🔑 **Email/Password Authentication** - Secure login with password hashing
- 🔗 **Social Login** - Google, GitHub, Discord, Twitter, and custom OAuth
- 📧 **Email Verification** - Secure account activation workflow
- 🔄 **Password Reset** - Secure password recovery with time-limited tokens
- 🛡️ **Session Management** - JWT with refresh token rotation
- 🔐 **Two-Factor Authentication** - TOTP, SMS, and email-based 2FA

### Developer Experience

- 📦 **Framework Agnostic** - Works with any Node.js framework
- 🎨 **Customizable UI** - Pre-built components with full customization
- 📘 **TypeScript Support** - Full type safety and IntelliSense
- 🔧 **Middleware Support** - Easy integration with existing apps
- 🧪 **Testing Utilities** - Built-in helpers for testing auth flows

### Production Features

- 🚀 **High Performance** - Optimized for scale with Redis support
- 🛠️ **Database Agnostic** - Works with PostgreSQL, MySQL, MongoDB, SQLite
- 📊 **Analytics Ready** - Built-in hooks for tracking and monitoring
- 🔒 **Security First** - Rate limiting, CSRF protection, and security headers
- 🌍 **Internationalization** - Multi-language support out of the box

---

## 🚀 Quick Start

### Installation

```bash
npm install betterauth
# or
yarn add betterauth
# or
pnpm add betterauth
```

### Basic Setup

```javascript
// lib/auth.js
import { BetterAuth } from "betterauth";

export const auth = new BetterAuth({
  database: {
    provider: "postgresql", // or 'mysql', 'mongodb', 'sqlite'
    url: process.env.DATABASE_URL,
  },
  session: {
    cookieName: "better-auth-session",
    expiresIn: "7d",
  },
  emailProvider: {
    provider: "resend", // or 'nodemailer', 'sendgrid'
    apiKey: process.env.EMAIL_API_KEY,
  },
});
```

### Next.js Integration

```javascript
// app/api/auth/[...auth]/route.js
import { auth } from "@/lib/auth";

export const { GET, POST } = auth.handler();
```

### React Hook Usage

```jsx
// components/LoginForm.jsx
import { useAuth } from "betterauth/react";

export function LoginForm() {
  const { signIn, user, loading } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      await signIn({ email, password });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (user) return <div>Welcome, {user.name}!</div>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        handleLogin(formData.get("email"), formData.get("password"));
      }}
    >
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

---

## 📚 Documentation

### Authentication Methods

#### Email/Password

```javascript
// Sign up
await auth.signUp({
  email: "user@example.com",
  password: "securePassword123",
  name: "John Doe",
});

// Sign in
await auth.signIn({
  email: "user@example.com",
  password: "securePassword123",
});
```

#### Social Authentication

```javascript
// Google OAuth
await auth.signIn({ provider: "google" });

// GitHub OAuth
await auth.signIn({ provider: "github" });

// Custom OAuth
await auth.signIn({
  provider: "custom",
  redirectUri: "/auth/callback",
});
```

#### Two-Factor Authentication

```javascript
// Enable 2FA
const { secret, qrCode } = await auth.setup2FA();

// Verify 2FA
await auth.verify2FA({
  token: "123456",
  secret: secret,
});
```

### Session Management

```javascript
// Get current session
const session = await auth.getSession();

// Refresh session
const newSession = await auth.refreshSession();

// Sign out
await auth.signOut();

// Sign out all devices
await auth.signOutAll();
```

### Middleware Protection

```javascript
// middleware.js (Next.js)
import { auth } from "@/lib/auth";

export async function middleware(request) {
  const session = await auth.getSession(request);

  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", request.url));
  }
}
```

---

## 🔧 Configuration

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/betterauth"

# JWT Secrets
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-token-secret"

# Email Provider
EMAIL_API_KEY="your-email-provider-api-key"
EMAIL_FROM="noreply@yourdomain.com"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Redis (Optional - for sessions)
REDIS_URL="redis://localhost:6379"
```

### Advanced Configuration

```javascript
export const auth = new BetterAuth({
  database: {
    provider: "postgresql",
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production",
  },
  session: {
    strategy: "jwt", // or 'database'
    cookieName: "auth-session",
    expiresIn: "7d",
    refreshExpiresIn: "30d",
    secure: process.env.NODE_ENV === "production",
  },
  providers: {
    email: true,
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  security: {
    rateLimit: {
      login: { attempts: 5, window: "15m" },
      signup: { attempts: 3, window: "1h" },
    },
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSymbols: true,
    },
  },
  ui: {
    theme: "dark", // or 'light', 'auto'
    customCss: "/path/to/custom.css",
  },
});
```

---

## 🤖 GitHub Actions & CI/CD

This project uses an advanced GitHub Actions setup for automated workflows. You can use this setup for your own projects!

### 🔄 Automated Workflows

#### 1. Auto-Merge with Owner Privileges

- **Owner**: PRs with `[automerge]` merge instantly (no review needed)
- **Contributors**: PRs with `[automerge]` wait for approval, then auto-merge
- **Any branch** → `main` supported (feature/, task/, bugfix/, etc.)

#### 2. Semantic Release Automation

- Automatic version bumping based on commit messages
- GitHub releases with auto-generated changelogs
- Supports semver (major.minor.patch)

### 📋 Setup Guide for Your Projects

#### Step 1: Repository Protection Rules

1. **Go to Repository Settings**

   ```
   Your Repo → Settings → Rules → Rulesets → New branch ruleset
   ```

2. **Configure Basic Settings**

   - Name: `Main Branch Protection`
   - Target: `main` branch
   - Enforcement: `Active`

3. **Enable Rules**

   - ✅ **Require pull request before merging** (1 approval)
   - ✅ **Allow specified actors to bypass pull request requirements**

4. **Add Bypass for Owner**
   - Actor type: `Actor`
   - Actor: `your-github-username`

#### Step 2: Create Personal Access Token

1. **Generate Fine-Grained PAT**

   ```
   GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
   ```

2. **Set Permissions**

   - Repository: Your specific repo
   - Permissions:
     - Contents: `Write`
     - Metadata: `Read`
     - Pull requests: `Write`

3. **Add to Repository Secrets**
   ```
   Your Repo → Settings → Secrets and variables → Actions → New repository secret
   Name: RELEASE_TOKEN
   Value: Your PAT
   ```

#### Step 3: Install Dependencies

```bash
npm install --save-dev semantic-release @semantic-release/github
```

#### Step 4: Add Configuration Files

**`.releaserc.json`**

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github"
  ]
}
```

#### Step 5: Create Workflow Files

**`.github/workflows/auto-merge.yml`**

```yaml
name: Auto Merge

on:
  pull_request:
    types: [opened, synchronize, ready_for_review]

jobs:
  auto-merge:
    if: |
      github.event.pull_request.base.ref == 'main' &&
      !github.event.pull_request.draft
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v7
        with:
          script: |
            const pr = context.payload.pull_request;
            const isOwner = pr.user.login === 'dikshantsingh510';

            // Check for [automerge] keyword
            const commits = await github.rest.pulls.listCommits({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: pr.number
            });

            const hasAutomerge = commits.data.some(c => 
              c.commit.message.includes('[automerge]')
            );

            if (!hasAutomerge) {
              console.log('⏭️ No [automerge] keyword found');
              return;
            }

            console.log(`🚀 Auto-merge requested by ${pr.user.login}`);

            // ALWAYS approve first (works for both owner and contributors)
            try {
              await github.rest.pulls.createReview({
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: pr.number,
                event: 'APPROVE',
                body: isOwner ? '✅ Auto-approved by owner' : '✅ Auto-approved after manual review'
              });
              console.log('✅ PR approved by bot');
            } catch (error) {
              console.log('ℹ️ Could not approve (might already be approved)');
            }

            // Wait a moment for approval to register
            await new Promise(resolve => setTimeout(resolve, 3000));

            // For non-owner, double-check manual approval exists
            if (!isOwner) {
              const reviews = await github.rest.pulls.listReviews({
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: pr.number
              });
              
              const manualApproval = reviews.data.some(r => 
                r.state === 'APPROVED' && r.user.login !== 'github-actions[bot]'
              );
              
              if (!manualApproval) {
                console.log('⏳ Non-owner PR needs manual approval first');
                await github.rest.issues.createComment({
                  owner: context.repo.owner,
                  repo: context.repo.repo,
                  issue_number: pr.number,
                  body: '⏳ **Auto-merge requested** but waiting for manual approval from @dikshantsingh510'
                });
                return;
              }
            }

            // Now attempt merge
            try {
              await github.rest.pulls.merge({
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: pr.number,
                merge_method: 'squash',
                commit_title: `${pr.title} (#${pr.number})`,
                commit_message: `Auto-merged via [automerge] keyword\n\n${pr.body || ''}`
              });
              
              console.log('✅ PR auto-merged successfully');
              
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: pr.number,
                body: `🎉 **Auto-merged successfully!**\n\n${isOwner ? '🔑 Owner privileges used' : '👥 Manual approval satisfied'}`
              });
              
            } catch (error) {
              console.error('❌ Merge failed:', error.message);
              
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: pr.number,
                body: `❌ **Auto-merge failed**: ${error.message}\n\nPlease merge manually or check repository rules.`
              });
            }
```

**`.github/workflows/release.yml`**

```yaml
name: Release

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  release:
    if: "!contains(github.event.head_commit.message, '[skip ci]')"
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.RELEASE_TOKEN }} # Use PAT instead

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.RELEASE_TOKEN }} # Use PAT instead
```

### 🎯 How to Use

#### For Repository Owners

```bash
# Create any branch
git checkout -b feature/awesome-feature

# Commit with [automerge] - merges instantly
git commit -m "feat: add awesome feature [automerge]"

# Push and create PR
git push origin feature/awesome-feature
```

#### For Contributors

```bash
# Same process, but waits for owner approval
git commit -m "fix: bug fix [automerge]"
```

#### Commit Message Conventions

```bash
# Version bumps
feat: new feature      # Minor version (1.0.0 → 1.1.0)
fix: bug fix          # Patch version (1.0.0 → 1.0.1)
feat!: breaking       # Major version (1.0.0 → 2.0.0)

# No version bump
docs: update docs     # Documentation
chore: maintenance    # Chores
refactor: refactor    # Code refactoring
```

### 🔍 Troubleshooting GitHub Actions

#### Common Issues & Solutions

1. **"Push declined due to repository rule violations"**

   - Make sure your PAT is added to repository secrets
   - Verify your username is in the bypass list
   - Check PAT permissions (Contents: Write, PR: Write)

2. **Auto-merge not working**

   - Ensure `[automerge]` is in commit message (case-sensitive)
   - Check if PR is from draft (drafts are ignored)
   - Verify workflow has correct permissions

3. **Release workflow failing**

   - Confirm `RELEASE_TOKEN` secret exists
   - Check token hasn't expired
   - Verify semantic-release dependencies are installed

4. **Permissions issues**
   - Repository Settings → Actions → General
   - Set "Workflow permissions" to "Read and write permissions"
   - Enable "Allow GitHub Actions to create and approve pull requests"

---

## 🛠️ Development

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/dikshantsingh510/betterauth.git
cd betterauth

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Contributing

We welcome contributions! Here's how to contribute:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with proper commit messages
4. **Add `[automerge]` to commit** if you want auto-merge: `git commit -m "feat: amazing feature [automerge]"`
5. **Push and create PR**: The auto-merge workflow will handle the rest!

#### Development Workflow with Auto-merge

```bash
# Contributors (need approval)
git commit -m "feat: new feature [automerge]"

# Maintainers (instant merge)
git commit -m "fix: quick fix [automerge]"

# Skip auto-merge
git commit -m "wip: work in progress"
```

---

## 📊 Roadmap

### Current Version (v1.x)

- ✅ Core authentication (email/password)
- ✅ Social login (Google, GitHub)
- ✅ Session management
- ✅ Basic 2FA support
- ✅ TypeScript support

### Upcoming (v2.x)

- 🔄 **Enhanced Social Providers** - Discord, Twitter, LinkedIn
- 🔄 **Advanced 2FA** - Hardware keys, biometric authentication
- 🔄 **Enterprise Features** - SAML, LDAP, SSO
- 🔄 **Mobile SDKs** - React Native, Flutter support
- 🔄 **Advanced Analytics** - User behavior tracking, security insights

### Future (v3.x)

- 🔮 **AI-Powered Security** - Anomaly detection, risk scoring
- 🔮 **Passwordless Authentication** - WebAuthn, magic links
- 🔮 **Multi-tenant Support** - Organization-based auth
- 🔮 **Edge Computing** - Cloudflare Workers, Deno Deploy

---

## 🤝 Community & Support

### Getting Help

- 📖 **Documentation**: [docs.betterauth.dev](https://docs.betterauth.dev)
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/betterauth)
- 🐛 **Issues**: [GitHub Issues](https://github.com/dikshantsingh510/betterauth/issues)
- 💡 **Discussions**: [GitHub Discussions](https://github.com/dikshantsingh510/betterauth/discussions)

### Enterprise Support

Need enterprise-level support? Contact us:

- 📧 **Email**: enterprise@betterauth.dev
- 📞 **Enterprise Sales**: [Schedule a call](https://calendly.com/betterauth)
- 🔒 **Security**: security@betterauth.dev

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Why MIT?

- ✅ **Commercial Use** - Use in commercial projects freely
- ✅ **Modification** - Modify the source code as needed
- ✅ **Distribution** - Distribute original or modified versions
- ✅ **Private Use** - Use privately without restrictions
- ❌ **Liability** - No warranty or liability
- ❌ **Trademark Use** - Cannot use project trademarks

---

## 🌟 Acknowledgments

### Built With Love Using

- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment
- **JWT** - Secure token-based authentication
- **bcrypt** - Password hashing
- **Zod** - Schema validation
- **Prisma** - Database ORM
- **React** - UI framework support

### Special Thanks

- All our **contributors** who make this project possible
- The **open-source community** for inspiration and feedback
- **Early adopters** who provided valuable feedback

---

## 📈 Stats

![GitHub repo size](https://img.shields.io/github/repo-size/dikshantsingh510/betterauth)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dikshantsingh510/betterauth)
![GitHub top language](https://img.shields.io/github/languages/top/dikshantsingh510/betterauth)
![GitHub last commit](https://img.shields.io/github/last-commit/dikshantsingh510/betterauth)
![GitHub contributors](https://img.shields.io/github/contributors/dikshantsingh510/betterauth)
![GitHub issues](https://img.shields.io/github/issues/dikshantsingh510/betterauth)
![GitHub pull requests](https://img.shields.io/github/issues-pr/dikshantsingh510/betterauth)

---

<div align="center">

**[⭐ Star us on GitHub](https://github.com/dikshantsingh510/betterauth)** • **[🐛 Report Bug](https://github.com/dikshantsingh510/betterauth/issues)** • **[💡 Request Feature](https://github.com/dikshantsingh510/betterauth/issues/new?template=feature_request.md)**

**Made with ❤️ by [Dikshant Singh](https://github.com/dikshantsingh510)**

_BetterAuth - Authentication made simple, secure, and scalable._

</div>
