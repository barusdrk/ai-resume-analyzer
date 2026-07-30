export interface AnalyzeRequest {
  resume: string;
  jobTitle: string;
  jobDescription?: string;
}

export interface RankedApplicant {
  name: string;
  score: number;
  strengths: string[];
  missingSkills: string[];
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

  const matchedKeywords = KEYWORDS.filter((keyword) =>
    text.includes(keyword)
  );

  const missingKeywords = KEYWORDS.filter(
    (keyword) => !text.includes(keyword)
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
      `Tailor your resume for the ${jobTitle} role.`,
      "Add measurable achievements.",
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

Experienced ${jobTitle} with a strong background developing scalable software solutions.

SKILLS

• React
• TypeScript
• Node.js
• Express
• REST APIs
• Git

EXPERIENCE

• Built modern web applications.
• Improved performance and reliability.
• Worked with cross-functional teams.

ORIGINAL RESUME

${resume}`,
  };
}

export async function generateCoverLetter({
  jobTitle,
}: AnalyzeRequest) {
  return {
    coverLetter: `Dear Hiring Manager,

I am excited to apply for the ${jobTitle} position.

My experience building modern software solutions, solving complex technical problems, and collaborating with cross-functional teams makes me a strong candidate for this role.

I would welcome the opportunity to contribute my skills to your organization.

Thank you for your time and consideration.

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
        question: `Describe your experience working as a ${jobTitle}.`,
      },
      {
        category: "Technical",
        question:
          "Explain the most challenging project you have completed.",
      },
      {
        category: "Behavioral",
        question:
          "Tell me about a difficult problem you solved.",
      },
      {
        category: "Behavioral",
        question:
          "Describe a time you handled conflicting priorities.",
      },
      {
        category: "System Design",
        question:
          "How would you design a scalable REST API?",
      },
    ],
  };
}

export async function rankApplicants(
  resumes: string[],
  jobTitle: string,
  jobDescription: string
) {
  const ranking: RankedApplicant[] = resumes.map(
    (resume, index) => {
      const text =
        `${resume} ${jobDescription}`.toLowerCase();

      const matched = KEYWORDS.filter((keyword) =>
        text.includes(keyword)
      );

      const missing = KEYWORDS.filter(
        (keyword) => !text.includes(keyword)
      );

      const score = Math.round(
        (matched.length / KEYWORDS.length) * 100
      );

      return {
        name: `Applicant ${index + 1}`,
        score,
        strengths: matched,
        missingSkills: missing,
      };
    }
  );

  ranking.sort(
    (first, second) => second.score - first.score
  );

  return ranking;
}
