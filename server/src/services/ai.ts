export interface AnalyzeRequest {
  resume: string;
  jobTitle: string;
  jobDescription?: string;
}

const KEYWORDS = [
  "react",
  "typescript",
  "javascript",
  "node",
  "express",
  "mongodb",
  "sql",
  "docker",
  "aws",
  "git",
  "rest",
  "api",
  "html",
  "css",
  "tailwind",
];

export async function analyzeResume({
  resume,
  jobTitle,
  jobDescription = "",
}: AnalyzeRequest) {
  const text =
    `${resume} ${jobDescription}`.toLowerCase();

  const matchedKeywords = KEYWORDS.filter((k) =>
    text.includes(k)
  );

  const missingKeywords = KEYWORDS.filter(
    (k) => !text.includes(k)
  );

  const keywordMatchScore = Math.round(
    (matchedKeywords.length / KEYWORDS.length) * 100
  );

  const atsScore = Math.min(
    100,
    keywordMatchScore + 15
  );

  const matchScore = Math.round(
    (keywordMatchScore + atsScore) / 2
  );

  return {
    matchScore,
    atsScore,
    keywordMatchScore,

    strengths: matchedKeywords,

    missingSkills: missingKeywords,

    matchedKeywords,

    missingKeywords,

    suggestions: [
      "Add measurable achievements.",
      "Tailor your resume to the job description.",
      "Include more industry keywords.",
      "Use ATS-friendly formatting.",
      "Quantify your accomplishments.",
    ],
  };
}

export async function rewriteResume({
  resume,
  jobTitle,
}: AnalyzeRequest) {
  return {
    rewrittenResume: `PROFESSIONAL SUMMARY

Experienced ${jobTitle} with a strong background in software development and delivering scalable applications.

SKILLS

React
TypeScript
Node.js
REST APIs
Git

EXPERIENCE

• Developed modern web applications.
• Collaborated with cross-functional teams.
• Improved application performance.

Original Resume

${resume}`,
  };
}

export async function generateCoverLetter({
  jobTitle,
}: AnalyzeRequest) {
  return {
    coverLetter: `Dear Hiring Manager,

I am excited to apply for the ${jobTitle} position.

My background in software engineering and experience building modern web applications make me a strong candidate for this role.

I enjoy solving complex problems, collaborating with teams, and continuously learning new technologies.

Thank you for your consideration.

Sincerely,

Your Name`,
  };
}

export async function generateInterviewQuestions({
  jobTitle,
}: AnalyzeRequest) {
  return {
    questions: [
      {
        category: "Technical",
        question: `Describe your experience as a ${jobTitle}.`,
      },
      {
        category: "Technical",
        question:
          "Explain a challenging project you completed.",
      },
      {
        category: "Behavioral",
        question:
          "Tell me about a conflict within your team.",
      },
      {
        category: "Behavioral",
        question:
          "Describe a project you're most proud of.",
      },
      {
        category: "System Design",
        question:
          "How would you design a scalable REST API?",
      },
    ],
  };
}
