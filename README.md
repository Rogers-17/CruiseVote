# ClipCast – Video Streaming Platform

## 1. Project Overview

ClipCasta is a renowed Video Streaming Platform designed to watch videos, stream and also upload videos, insipred by YOUTUBE, it is a great tool for content creator

**Core Features**:

- Users Authentication (email/password, Google, Facebook etc.)
- Video Systems (uploads, generate thumbnails, video metadata)
- Notifications
- Engagements (views, likes, comments etc.)
- Channel System (create channel, subscribe)

---

## 2. 🛠 Tech Stack

### Frontend

- **Framework**: NEXTJs + TypeScript (via Vite)
- **UI Libraries**:
  - ShadCN

- **Styles**: Tailwind CSS with CSS Variables for theming
- **State Management**: React Context API | Redux | Zustand
- **Fetch API**: Fetch

### Backend

- **Infrastructure**: Supabase
- **Database**: Postgre SQL
- **Cache**: Uptash (Redis)
- **Authentication**: Email/Password

### Infrastructures

- **Frontend Hosting**: Vercel
- **Domain**: Vercel
- **Storage**: Supabase storage bucket
- **Version Control**: Git + GitHub

---

## 3. 📂 Project Structure

### Monorepo Layout

```
clip-cast/
    app/                    # Main directory for NEXTjs app router
      /auth                 # Route for Authentication
      /home                 # Routes for the entire dashboard, home, trending, history etc..
      /profile              # Route for profile
    assets/
      design/               # UI/UX Designs for the project
      fonts/                # Contains Poppins font for the project
    components/
        /ui                 # Shared reusable UI components created by SHADCN
        /layout             # Reusable smaller components
    hooks/                  # Customs hooks for fetching and adding data
    lib/                    # Contains functions for merging ShadCN styles
    public/                 # Images and favicons directory
    supabase/               # Supabase configurations and table migrations
    utils/                  # Supbase functions

```

📌 **Folder Naming Convention**: use **kebab-case**.
📌 **Component Naming**: React components use **PascalCase**.
📌 **Variable Naming**: use **camelCase**.
📌 **Database tables and columns Naming**: MySQL use **snake_case**.

---

## 4. 🚀 Getting Started

### Prerequisites

- NextJS (v14+)
- Typescript
- Supabase credentials for storage
- ENV variable setup

### Installation

```bash
git clone https://github.com/Rogers-17/ClipCast.git
cd clip-cast
```

#### Project Setup

```bash

cd clip-cast
npm install
npm run dev

```

---

## 5. ⚙️ Environment Variables

### ENV examples `.env`

```
NEXT_PUBLIC_SUPABASE_ANON_KEY= your_supase_anon_key
NEXT_PUBLIC_SUPABASE_URL= your_supase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY= your_supabase_publishable_key


```

---

## 6. 👥 Collaboration Guide

### Branching Strategy

- **Main (`main`)** → production-ready branch
- **Feature branches** → `feature/<name>`
- **Refactor branches** → `refactor/<name>`
- **Bugfix branches** → `fix/<name>`

👉 Example:

- `feature/user-login`
- `refactor/profile-page`
- `fix/display-videos-bug`

### Commit Messages (Conventional Commits)

- `feat(UI): add login form`
- `fix(API): resolve user ID mismatch`
- `refactor(DB): simplify user schema`
- `docs(README): update project overview`

### Rules of Thumb

- ❌ No direct pushes to `main`
- ✅ Every change must go through a Pull Request (PR)
- ✅ PRs require at least 1 reviewer approval
- ✅ Squash merges to keep history clean

---

## 8. 📏 Coding Conventions

- **Folder names**: kebab-case
- **React components**: PascalCase
- **Services**: contain business logic, keep controllers lean
- **Models**: database schemas only
- **Linter & Formatter**: ESLint + Prettier

---
