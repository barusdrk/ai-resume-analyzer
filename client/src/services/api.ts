import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "http://localhost:3001/api",
});

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

export interface AnalyzeResumeRequest {
  resume: string;
  jobTitle: string;
  jobDescription: string;
}

export async function analyzeResume(
  data: AnalyzeResumeRequest
): Promise<ResumeAnalysis> {
  const response =
    await API.post<ResumeAnalysis>(
      "/analyze",
      data
    );

  return response.data;
}

export async function uploadResume(
  file: File
): Promise<string> {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await API.post<{
    text: string;
  }>("/upload", formData, {
    headers: {
      "Content-Type":
        "multipart/form-data",
    },
  });

  return response.data.text;
}

export interface RewriteResumeResponse {
  rewrittenResume: string;
}

export async function rewriteResume(
  data: AnalyzeResumeRequest
): Promise<RewriteResumeResponse> {
  const response =
    await API.post<RewriteResumeResponse>(
      "/rewrite",
      data
    );

  return response.data;
}

export interface CoverLetterResponse {
  coverLetter: string;
}

export async function generateCoverLetter(
  data: AnalyzeResumeRequest
): Promise<CoverLetterResponse> {
  const response =
    await API.post<CoverLetterResponse>(
      "/cover-letter",
      data
    );

  return response.data;
}

export interface InterviewQuestion {
  category: string;
  question: string;
}

export interface InterviewQuestionsResponse {
  questions: InterviewQuestion[];
}

export async function generateInterviewQuestions(
  data: AnalyzeResumeRequest
): Promise<InterviewQuestionsResponse> {
  const response =
    await API.post<InterviewQuestionsResponse>(
      "/interview",
      data
    );

  return response.data;
}

export default API;
