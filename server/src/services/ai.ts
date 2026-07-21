export interface AnalyzeRequest {
  resume: string;
  jobTitle: string;
  jobDescription?: string;
}

export interface ResumeAnalysis {
  matchScore: number;
  atsScore: number;
  keywordMatchScore: number;

  strengths: string[];
  missingSkills: string[];

  matchedKeywords: string[];
  missingKeywords: string[];

  suggestions: string[];

  rewrittenResume: string;

  coverLetter: string;

  interviewQuestions: {
    category: string;
    question: string;
  }[];
}

export async function analyzeResume({
  resume,
  jobTitle,
  jobDescription = "",
}: AnalyzeRequest): Promise<ResumeAnalysis> {
  const text =
    `${resume}\n${jobDescription}`.toLowerCase();

  const keywords = [
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

  const matchedKeywords = keywords.filter((keyword) =>
    text.includes(keyword)
  );

  const missingKeywords = keywords.filter(
    (keyword) => !text.includes(keyword)
  );

  const keywordMatchScore = Math.round(
    (matchedKeywords.length / keywords.length) * 100
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
      "Include more role-specific keywords.",
      "Quantify project impact.",
      "Use ATS-friendly section headings.",
      "Tailor your resume to each job.",
    ],

    rewrittenResume: `Professional Summary

Experienced ${jobTitle} with strong technical skills and a proven record of delivering high-quality software solutions.

Skills

${matchedKeywords.join(", ")}

Experience

• Built scalable web applications.
• Collaborated with cross-functional teams.
• Improved application performance and maintainability.`,

    coverLetter: `Dear Hiring Manager,

I am excited to apply for the ${jobTitle} position.

My experience aligns well with your requirements, and I am confident that my technical background and passion for software development would allow me to contribute immediately.

Thank you for your consideration.

Sincerely,
Candidate`,

    interviewQuestions: [
      {
        category: "Technical",
        question:
          "Describe a React project you built.",
      },
      {
        category: "Technical",
        question:
          "How do you optimize a React application?",
      },
      {
        category: "Behavioral",
        question:
          "Tell me about a difficult bug you solved.",
      },
      {
        category: "Behavioral",
        question:
          "Describe a time you worked in a team.",
      },
      {
        category: "System Design",
        question:
          "How would you design a scalable REST API?",
      },
    ],
  };
}