# SkillBridge AI

**Smart India Hackathon 2026 · Problem SIH26044 · Theme: Smart Automation**

An Academia–Industry collaboration platform that connects students, recruiters, institutions, and academicians through skill assessment, gap analysis, learning recommendations, and explainable opportunity matching.

Built by **Team DOOMED MINDS** · **Coded by Abhinav**

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


<img width="1877" height="953" alt="image" src="https://github.com/user-attachments/assets/597b921f-a877-496d-b01c-b452ca0969fa" />

<img width="1846" height="926" alt="image" src="https://github.com/user-attachments/assets/a42cfb2c-5bf6-4ef9-bc76-8293a60e2f88" />

<img width="1907" height="900" alt="image" src="https://github.com/user-attachments/assets/02c713f5-7525-4cf2-bef0-e13678b79ddc" />

<img width="1781" height="657" alt="image" src="https://github.com/user-attachments/assets/529257bb-0aef-4aad-b7cf-79afdfb438da" />


<img width="1881" height="883" alt="image" src="https://github.com/user-attachments/assets/1be9d906-fd8e-4c09-90cd-8708953ef5ac" />

<img width="1901" height="827" alt="image" src="https://github.com/user-attachments/assets/9ae4a2c7-abec-4d0b-8c98-ab793e02f39e" />

<img width="1915" height="897" alt="image" src="https://github.com/user-attachments/assets/5ae3b1a7-7a63-422e-a394-689f5b61fbbe" />

<img width="1900" height="935" alt="image" src="https://github.com/user-attachments/assets/b7a36edf-9a94-4619-ab83-57715ddae978" />

<img width="1915" height="962" alt="image" src="https://github.com/user-attachments/assets/e3fff287-302f-4c22-9c46-fd4ba030270e" />

<img width="1912" height="953" alt="image" src="https://github.com/user-attachments/assets/fd7b411e-7178-4b33-a27b-056e34ba6b69" />

<img width="1907" height="845" alt="image" src="https://github.com/user-attachments/assets/46065da6-5736-4b77-87ef-ae31ba7aa07c" />

<img width="1917" height="947" alt="image" src="https://github.com/user-attachments/assets/70573d8e-8021-4c22-a1eb-b8086ebbfa89" />

<img width="1915" height="922" alt="image" src="https://github.com/user-attachments/assets/32df7a72-135a-4360-8045-b5ebdb29b57d" />

<img width="1891" height="827" alt="image" src="https://github.com/user-attachments/assets/ea5a59ac-ef68-4101-ab5d-615c37c71f1c" />

<img width="1917" height="932" alt="image" src="https://github.com/user-attachments/assets/cec580cb-0bff-41c5-bfff-d0534819ec55" />

<img width="1917" height="945" alt="image" src="https://github.com/user-attachments/assets/45e541f2-df58-4105-8bda-ad11e8dfded7" />

<img width="1912" height="922" alt="image" src="https://github.com/user-attachments/assets/e79dbd5b-684c-4802-b65d-e26550b8dbde" />

<img width="1905" height="917" alt="image" src="https://github.com/user-attachments/assets/b306299c-6cd6-4659-a993-e943d17fb53b" />

<img width="1916" height="952" alt="image" src="https://github.com/user-attachments/assets/c32f2c09-2815-4ffe-b3d2-077883d0ac7a" />

<img width="1908" height="935" alt="image" src="https://github.com/user-attachments/assets/af9280ab-01e7-46b3-8fcc-344a0153333a" />

<img width="1917" height="852" alt="image" src="https://github.com/user-attachments/assets/6cc6dbe0-0773-4892-aa0f-a339f99d3144" />

<img width="1911" height="901" alt="image" src="https://github.com/user-attachments/assets/ab80f506-7bea-458f-92b3-73723c94f0de" />

<img width="1916" height="911" alt="image" src="https://github.com/user-attachments/assets/b7e128a0-cc42-40df-bacb-d51835662111" />

<img width="1912" height="942" alt="image" src="https://github.com/user-attachments/assets/40b6d15a-9e2a-4ec8-8892-9fe5ea6fd102" />

<img width="1917" height="911" alt="image" src="https://github.com/user-attachments/assets/e2ef5949-bd1e-474d-9caa-95fd94dadc17" />

<img width="1913" height="960" alt="image" src="https://github.com/user-attachments/assets/6a61049c-ccbe-426a-9e3f-4b1cf66f3127" />

<img width="1917" height="930" alt="image" src="https://github.com/user-attachments/assets/301ce18b-fbc4-4dba-897b-16cbe10fbb0d" />

<img width="1912" height="945" alt="image" src="https://github.com/user-attachments/assets/aeba79fb-6c7d-4617-a441-e2c9780f5bfb" />

<img width="1917" height="946" alt="image" src="https://github.com/user-attachments/assets/bf31d6ab-9df2-43d8-b066-ffaf2d4f4bc2" />

<img width="1900" height="927" alt="image" src="https://github.com/user-attachments/assets/f1f41bc8-c281-4aa9-9a2e-c44c84a819bf" />

<img width="1917" height="942" alt="image" src="https://github.com/user-attachments/assets/9714e0f4-2f92-483a-9778-0771988d0a26" />

<img width="1917" height="907" alt="image" src="https://github.com/user-attachments/assets/34d401e8-2de0-487a-bdf4-6a66744f53ea" />


























