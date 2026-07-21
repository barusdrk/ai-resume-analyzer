import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "http://localhost:3001/api",
});

API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

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

export interface AnalyzeRequest {
  resume: string;
  jobTitle: string;
  jobDescription: string;
}

export async function register(
  data: RegisterRequest
) {
  const response =
    await API.post<AuthResponse>(
      "/auth/register",
      data
    );

  return response.data;
}

export async function login(
  data: LoginRequest
) {
  const response =
    await API.post<AuthResponse>(
      "/auth/login",
      data
    );

  return response.data;
}

export async function getCurrentUser() {
  const response =
    await API.get<User>("/auth/me");

  return response.data;
}

export async function analyzeResume(
  data: AnalyzeRequest
) {
  const response =
    await API.post(
      "/analyze",
      data
    );

  return response.data;
}

export async function rewriteResume(
  resume: string,
  jobTitle: string,
  jobDescription: string
) {
  const response =
    await API.post("/rewrite", {
      resume,
      jobTitle,
      jobDescription,
    });

  return response.data;
}

export async function generateCoverLetter(
  resume: string,
  jobTitle: string,
  jobDescription: string
) {
  const response =
    await API.post(
      "/cover-letter",
      {
        resume,
        jobTitle,
        jobDescription,
      }
    );

  return response.data;
}

export async function generateInterviewQuestions(
  resume: string,
  jobTitle: string,
  jobDescription: string
) {
  const response =
    await API.post(
      "/interview",
      {
        resume,
        jobTitle,
        jobDescription,
      }
    );

  return response.data;
}

export async function uploadResume(
  file: File
) {
  const formData =
    new FormData();

  formData.append("resume", file);

  const response =
    await API.post(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
}

export default API;
