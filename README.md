# SkillBridge AI

**Smart India Hackathon 2026 · Problem SIH26044 · Theme: Smart Automation**

An Academia–Industry collaboration platform that connects students, recruiters, institutions, and academicians through skill assessment, gap analysis, learning recommendations, and explainable opportunity matching.

Built by **Team DOOMED MINDS**.

---

## Overview

SkillBridge AI is a fully interactive demo prototype for SIH26044. It models the complete workflow from student skill assessment to recruiter shortlisting and institution-level analytics — all driven by shared application state and a transparent client-side matching engine.

> **Note:** This is a frontend demo prototype. Data is stored in-memory with browser persistence (`localStorage` / `sessionStorage`). There is no backend, and matching uses a rule-based scoring engine — not machine learning or LLM claims.

---

## Features

### Student
- Comprehensive skill assessment (MCQ-based)
- Skill profile with radar visualization
- Skill gap analysis against real opportunities
- Personalized learning recommendations
- AI-ranked internship & job matches with explainable scores
- Application tracking with live recruiter status updates
- Digital portfolio

### Recruiter / Industry
- Post jobs and internships with required skills
- AI-ranked candidate discovery
- Explainable match breakdown per candidate
- Shortlist → Interview → Select pipeline
- Company profile

### Institution
- Campus readiness dashboard
- Live skill analytics (demand vs supply, department heatmap)
- Placement trends from actual application data
- Student directory and internship overview

### Academician
- FDP programs, research opportunities, industry projects
- Collaboration listings

---

## End-to-End Data Flow

Every P0 interaction is connected through shared state:

```
Assessment → Skill Profile → Skill Gap → Learning Recommendations
     → Opportunity Match → Application → Recruiter Ranking → Shortlist
     → Institution Analytics
```

Recruiter-created opportunities appear in student recommendations. Applications appear in the recruiter dashboard. Status changes propagate back to the student.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build | Vite 8 |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 + custom design system |
| Charts | Recharts |
| Icons | Lucide React |
| State | React Context + localStorage persistence |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
# Clone / navigate to the project
cd skillbridge-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Other Scripts

```bash
npm run build    # Type-check + production build
npm run preview  # Preview production build locally
```

---

## Demo Walkthrough

1. Go to **http://localhost:5173/demo**
2. Choose a role:

| Role | Demo User |
|------|-----------|
| Student | Arjun Sharma |
| Recruiter | Priya Nair — Razorpay |
| Institution | IIT Bombay Admin |
| Academician | Dr. Ramesh Iyer — IIT Bombay |

### Recommended Judge Flow

1. **Student** → Take assessment at `/student/assessment`
2. View updated skills at `/student/skills`
3. Check learning plan at `/student/learning`
4. Browse matched opportunities at `/student/opportunities`
5. Apply to a role → track at `/student/applications`
6. Switch to **Recruiter** (TopBar) → Post a new opportunity at `/recruiter/post`
7. Switch back to **Student** → New role appears in recommendations
8. **Recruiter** → Rank candidates at `/recruiter/candidates` → Shortlist
9. **Student** → Application status updates live
10. **Institution** → View analytics at `/institution/analytics`

Demo session and application data persist across page refreshes during the demo.

---

## Matching Engine

Located in `src/engine/`, the scoring engine produces transparent, explainable match scores (0–100):

| Component | Weight | Description |
|-----------|--------|-------------|
| Skill Match | 50% | Compares student skills vs opportunity requirements (required / preferred / nice-to-have) |
| Proficiency | 25% | Average proficiency against minimum required levels |
| Career Interest | 15% | Keyword overlap with student career interests |
| Eligibility | 10% | Year, CGPA, department checks |

Each match includes a human-readable explanation, matched/partial/missing skill breakdown, and sub-scores.

---

## Project Structure

```
src/
├── App.tsx                 # Routes & providers
├── main.tsx                # React entry point
├── components/layout/      # DashboardLayout, Sidebar, TopBar
├── context/
│   ├── AuthContext.tsx     # Demo auth & role switching
│   └── DataContext.tsx     # Shared app state & mutations
├── data/                   # Seed datasets (students, opportunities, etc.)
├── engine/
│   ├── matching.ts         # Match score & candidate ranking
│   ├── skill-gap.ts        # Gap analysis
│   └── recommendations.ts  # Opportunity & learning recommendations
├── hooks/
│   └── useStudent.ts       # Live student data from shared state
├── pages/
│   ├── student/            # Assessment, skills, learning, opportunities
│   ├── recruiter/          # Jobs, candidates, shortlist, post
│   ├── institution/        # Analytics, placements, reports
│   └── academician/        # FDP, research, collaboration
├── types/                  # TypeScript definitions
└── utils/
    ├── analytics.ts        # Institution chart computations
    └── storage.ts          # localStorage persistence
```

---

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/demo` | Role-based demo login |
| `/student/*` | Student dashboard & modules |
| `/recruiter/*` | Recruiter dashboard & modules |
| `/institution/*` | Institution dashboard & modules |
| `/academician/*` | Academician dashboard & modules |

---

## License

This project was built for Smart India Hackathon 2026 (SIH26044).
