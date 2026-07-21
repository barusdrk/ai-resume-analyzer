import { RESUME_PROMPT } from "../prompts/resumePrompt.js";
import { REWRITE_PROMPT } from "../prompts/rewritePrompt.js";
import { COVER_LETTER_PROMPT } from "../prompts/coverLetterPrompt.js";
import { INTERVIEW_PROMPT } from "../prompts/interviewPrompt.js";

export interface ResumeAnalysis {
  matchScore: number;
  atsScore: number;
  keywordMatchScore: number;

  strengths: string[];
  missingSkills: string[];

  matchedKeywords: string[];
  missingKeywords: string[];

  suggestions: string[];
}

export interface InterviewQuestion {
  category: string;
  question: string;
}

const COMMON_KEYWORDS = [
  "react",
  "typescript",
  "javascript",
  "node",
  "express",
  "next.js",
  "vue",
  "angular",
  "html",
  "css",
  "tailwind",
  "mongodb",
  "mysql",
  "postgresql",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "gcp",
  "git",
  "github",
  "rest",
  "graphql",
  "jest",
  "vitest",
  "playwright",
  "cypress",
  "python",
  "java",
  "c#",
  ".net",
  "ci/cd",
  "agile",
  "scrum",
];

function delay(ms = 1500) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

export async function analyzeResume(
  resume: string,
  jobTitle: string,
  jobDescription: string
): Promise<ResumeAnalysis> {
  console.log(RESUME_PROMPT);

  await delay();

  const resumeText = resume.toLowerCase();
  const jobText =
    `${jobTitle} ${jobDescription}`.toLowerCase();

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const keyword of COMMON_KEYWORDS) {
    if (!jobText.includes(keyword)) continue;

    if (resumeText.includes(keyword)) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  }

  const total =
    matchedKeywords.length +
    missingKeywords.length;

  const keywordMatchScore =
    total === 0
      ? 100
      : Math.round(
          (matchedKeywords.length / total) *
            100
        );

  const matchScore = Math.min(
    100,
    Math.round(
      keywordMatchScore * 0.85 + 15
    )
  );

  const atsScore = Math.min(
    100,
    Math.round(
      keywordMatchScore * 0.6 +
        matchScore * 0.4
    )
  );

  return {
    matchScore,

    atsScore,

    keywordMatchScore,

    strengths: [...matchedKeywords],

    missingSkills: [...missingKeywords],

    matchedKeywords,

    missingKeywords,

    suggestions: [
      "Tailor your professional summary to the target role.",
      "Use measurable achievements whenever possible.",
      "Include keywords from the job description naturally.",
      "Use ATS-friendly section headings.",
      "Highlight projects relevant to this position.",
    ],
  };
}

export async function rewriteResume(
  resume: string,
  jobTitle: string,
  jobDescription: string
): Promise<string> {
  console.log(REWRITE_PROMPT);

  await delay();

  return `# ATS Optimized Resume

Target Role:
${jobTitle}

Professional Summary

${resume}

Recommendations

• Use stronger action verbs.

• Add measurable achievements.

• Include relevant keywords from the job description.

• Highlight projects matching the role.

(Job description length: ${jobDescription.length} characters.)`;
}

export async function generateCoverLetter(
  resume: string,
  jobTitle: string,
  jobDescription: string
): Promise<string> {
  console.log(COVER_LETTER_PROMPT);

  await delay();

  return `Dear Hiring Manager,

I am excited to apply for the ${jobTitle} position.

My experience and technical background align well with the responsibilities described in your job posting. I enjoy solving challenging problems, collaborating with teams, and continuously learning new technologies.

I believe my background would allow me to contribute positively to your organization, and I would welcome the opportunity to discuss my qualifications further.

Thank you for your time and consideration.

Sincerely,

[Your Name]

(Resume length: ${resume.length} characters)

(Job description length: ${jobDescription.length} characters)`;
}

export async function generateInterviewQuestions(
  resume: string,
  jobTitle: string,
  jobDescription: string
): Promise<InterviewQuestion[]> {
  console.log(INTERVIEW_PROMPT);

  await delay();

  return [
    {
      category: "Technical",
      question: `Explain your experience related to the ${jobTitle} role.`,
    },
    {
      category: "Technical",
      question:
        "Describe a challenging technical problem you solved.",
    },
    {
      category: "Projects",
      question:
        "Tell us about your most successful project.",
    },
    {
      category: "Projects",
      question:
        "What project are you most proud of and why?",
    },
    {
      category: "Behavioral",
      question:
        "Describe a time you worked under pressure.",
    },
    {
      category: "Behavioral",
      question:
        "Tell me about a conflict within your team.",
    },
    {
      category: "Problem Solving",
      question:
        "How do you approach debugging complex software?",
    },
    {
      category: "Career",
      question: `Why do you want to become a ${jobTitle}?`,
    },
    {
      category: "Leadership",
      question:
        "Describe a time you influenced a technical decision.",
    },
    {
      category: "General",
      question:
        `Which parts of the job description (${jobDescription.length} characters) best match your experience?`,
    },
  ];
}
