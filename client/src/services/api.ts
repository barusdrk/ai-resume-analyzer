import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "http://localhost:3001/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//
// Authentication
//

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export async function register(
  data: RegisterRequest
): Promise<AuthResponse> {
  const response =
    await API.post<AuthResponse>(
      "/auth/register",
      data
    );

  return response.data;
}

export async function login(
  data: LoginRequest
): Promise<AuthResponse> {
  const response =
    await API.post<AuthResponse>(
      "/auth/login",
      data
    );

  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response =
    await API.get<User>("/auth/me");

  return response.data;
}

//
// Resume Analysis
//

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

//
// Resume Upload
//

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

//
// Resume Rewrite
//

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

//
// Cover Letter
//

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

//
// Interview Questions
//

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
