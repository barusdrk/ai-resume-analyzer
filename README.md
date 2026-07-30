# AI Resume Analyzer

An AI-powered web application that analyzes resumes against a target job, calculates compatibility scores, identifies missing skills and keywords, and generates personalized career documents.

---

## Features

### Resume Analysis

* Analyze resume against a target job title
* Optional job description comparison
* Resume Match Score
* ATS Compatibility Score
* Keyword Match Score
* Skills comparison
* Missing skills detection
* Missing keyword detection
* Personalized improvement suggestions

### AI Resume Rewrite

Generate an improved version of your resume tailored to the target role.

### AI Cover Letter

Generate a professional cover letter customized for the selected job.

### AI Interview Questions

Generate interview questions based on:

* Resume
* Job title
* Job description

### Resume Upload

Supported formats:

* PDF
* DOCX
* TXT

The application automatically extracts text from uploaded files.

### Authentication

* User registration
* User login
* JWT authentication
* Protected API endpoints

### User Interface

* Responsive layout
* Dark mode
* Copy-to-clipboard buttons
* Loading states
* Modern Tailwind CSS UI

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express
* TypeScript
* OpenAI API
* JWT
* bcrypt
* MongoDB
* Multer
* Mammoth
* pdf-parse

---

## Project Structure

```text
client/
    src/
        components/
        context/
        services/

server/
    src/
        middleware/
        models/
        prompts/
        routes/
        services/
```

---

## Installation

### Clone

```bash
git clone https://github.com/barusdrk/ai-resume-analyzer.git
cd ai-resume-analyzer
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Install Backend

```bash
cd ../server
npm install
```

---

## Environment Variables

### Server

Create:

```text
server/.env
```

```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key
```

### Client

Create:

```text
client/.env
```

```env
VITE_API_URL=http://localhost:3001/api
```

---

## Development

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

---

## Build

### Client

```bash
npm run build
```

### Server

```bash
npm run build
```

---

## API Endpoints

### Authentication

```
POST /api/register
POST /api/login
GET  /api/me
```

### Resume

```
POST /api/upload
POST /api/analyze
POST /api/rewrite
POST /api/cover-letter
POST /api/interview
```

---

## Example Analysis Output

```text
Resume Match Score: 86%

ATS Score: 91%

Keyword Match Score: 82%

Strengths
✓ React
✓ TypeScript
✓ Node.js

Missing Skills
✗ Docker
✗ AWS

Suggestions
• Add measurable achievements
• Include more ATS-friendly keywords
• Quantify project impact
```

---

## Deployment

### Backend

Deploy the Express server to Render.

Example:

```
https://ai-resume-analyzer-z3i0.onrender.com
```

Set the environment variables:

* OPENAI_API_KEY
* JWT_SECRET
* MONGODB_URI

---

### Frontend

Deploy the React application to Vercel.

Example:

```
https://ai-resume-analyzer-nine-gray.vercel.app
```

Set:

```env
VITE_API_URL=https://ai-resume-analyzer-z3i0.onrender.com/api
```

---

## Learning Achievements

This project demonstrates:

* Prompt engineering
* Resume scoring systems
* ATS compatibility analysis
* Keyword extraction
* Resume optimization
* Cover letter generation
* Interview question generation
* Authentication with JWT
* File upload handling
* PDF and DOCX parsing
* REST API development
* React Context API
* Dark mode implementation
* TypeScript full-stack development
* Deploying React and Express applications

---

# Author

Derek Barus

GitHub: https://github.com/barusdrk/ai-resume-analyzer
