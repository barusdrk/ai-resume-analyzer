# AI Resume Analyzer

An AI-powered resume analysis tool that compares a candidate's resume with a target job role and provides a match score, missing skills, and improvement suggestions.

## Features

### Resume Analysis

- Paste resume text
- Enter target job title
- Analyze resume compatibility

### AI-Powered Results

The application provides:

- Resume match score
- Existing skills
- Missing skills
- Improvement suggestions

### Demo Mode

The project currently includes mocked AI responses for demonstration purposes.

The AI service can later be connected to OpenAI API.

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express
- TypeScript

## AI

- OpenAI API integration ready
- Structured JSON responses

## Development Tools

- npm
- Git
- VS Code

---

# Project Structure

ai-resume-analyzer/

├── client/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ResumeInput.tsx
│ │ │ ├── JobTitleInput.tsx
│ │ │ ├── ScoreCard.tsx
│ │ │ ├── SkillsTable.tsx
│ │ │ └── SuggestionsCard.tsx
│ │ │
│ │ ├── services/
│ │ │ └── api.ts
│ │ │
│ │ └── App.tsx
│
└── server/
└── src/
├── routes/
│ └── analyze.ts
│
├── services/
│ └── ai.ts
│
├── prompts/
│ └── resumePrompt.ts
│
└── server.ts

---

# Installation

## Clone Repository

```bash
git clone <repository-url>

cd ai-resume-analyzer
```

---

## Author

Derek Barus

GitHub: https://github.com/barusdrk
