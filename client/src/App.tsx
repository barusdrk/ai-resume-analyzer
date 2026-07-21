import { useState } from "react";

import ResumeInput from "./components/ResumeInput";
import ResumeUpload from "./components/ResumeUpload";
import JobTitleInput from "./components/JobTitleInput";
import JobDescriptionInput from "./components/JobDescriptionInput";

import ScoreCard from "./components/ScoreCard";
import ATSScoreCard from "./components/ATSScoreCard";
import KeywordCard from "./components/KeywordCard";
import KeywordTable from "./components/KeywordTable";
import SkillsTable from "./components/SkillsTable";
import SuggestionsCard from "./components/SuggestionsCard";

import RewrittenResumeCard from "./components/RewrittenResumeCard";
import CoverLetterCard from "./components/CoverLetterCard";
import InterviewQuestionsCard from "./components/InterviewQuestionsCard";

import {
  analyzeResume,
  uploadResume,
  rewriteResume,
  generateCoverLetter,
  generateInterviewQuestions,
  type ResumeAnalysis,
  type InterviewQuestion,
} from "./services/api";

export default function App() {
  const [resume, setResume] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [analysis, setAnalysis] =
    useState<ResumeAnalysis | null>(null);

  const [rewrittenResume, setRewrittenResume] =
    useState("");

  const [coverLetter, setCoverLetter] =
    useState("");

  const [questions, setQuestions] =
    useState<InterviewQuestion[]>([]);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [rewriting, setRewriting] = useState(false);
  const [generatingLetter, setGeneratingLetter] =
    useState(false);
  const [generatingQuestions, setGeneratingQuestions] =
    useState(false);

  const [error, setError] = useState("");

  async function handleUpload(file: File) {
    try {
      setUploading(true);
      setError("");

      const text = await uploadResume(file);
      setResume(text);
    } catch {
      setError("Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  }

  async function handleAnalyze() {
    if (!resume.trim()) {
      setError("Please provide a resume.");
      return;
    }

    if (!jobTitle.trim()) {
      setError("Please enter a target job title.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await analyzeResume({
        resume,
        jobTitle,
        jobDescription,
      });

      setAnalysis(result);

      setRewrittenResume("");
      setCoverLetter("");
      setQuestions([]);
    } catch {
      setError("Analysis failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRewrite() {
    try {
      setRewriting(true);

      const result = await rewriteResume({
        resume,
        jobTitle,
        jobDescription,
      });

      setRewrittenResume(result.rewrittenResume);
    } finally {
      setRewriting(false);
    }
  }

  async function handleCoverLetter() {
    try {
      setGeneratingLetter(true);

      const result =
        await generateCoverLetter({
          resume,
          jobTitle,
          jobDescription,
        });

      setCoverLetter(result.coverLetter);
    } finally {
      setGeneratingLetter(false);
    }
  }

  async function handleInterviewQuestions() {
    try {
      setGeneratingQuestions(true);

      const result =
        await generateInterviewQuestions({
          resume,
          jobTitle,
          jobDescription,
        });

      setQuestions(result.questions);
    } finally {
      setGeneratingQuestions(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-6">
      <header className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">
          AI Resume Analyzer
        </h1>

        <p className="text-gray-600">
          Analyze your resume, improve ATS compatibility,
          generate a tailored cover letter, and prepare for
          interviews.
        </p>
      </header>

      <JobTitleInput
        value={jobTitle}
        onChange={setJobTitle}
      />

      <JobDescriptionInput
        value={jobDescription}
        onChange={setJobDescription}
      />

      <ResumeUpload onUpload={handleUpload} />

      {uploading && (
        <p className="text-blue-600">
          Extracting resume...
        </p>
      )}

      <ResumeInput
        value={resume}
        onChange={setResume}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Analyzing..."
          : "Analyze Resume"}
      </button>

      {error && (
        <div className="rounded bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {analysis && (
        <>
          <div className="grid gap-6 md:grid-cols-3">
            <ScoreCard score={analysis.matchScore} />

            <ATSScoreCard score={analysis.atsScore} />

            <KeywordCard
              score={analysis.keywordMatchScore}
            />
          </div>

          <KeywordTable
            matchedKeywords={
              analysis.matchedKeywords
            }
            missingKeywords={
              analysis.missingKeywords
            }
          />

          <SkillsTable
            strengths={analysis.strengths}
            missingSkills={
              analysis.missingSkills
            }
          />

          <SuggestionsCard
            suggestions={
              analysis.suggestions
            }
          />

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleRewrite}
              disabled={rewriting}
              className="rounded bg-green-600 px-5 py-3 text-white"
            >
              {rewriting
                ? "Rewriting..."
                : "Rewrite Resume"}
            </button>

            <button
              onClick={handleCoverLetter}
              disabled={generatingLetter}
              className="rounded bg-indigo-600 px-5 py-3 text-white"
            >
              {generatingLetter
                ? "Generating..."
                : "Generate Cover Letter"}
            </button>

            <button
              onClick={
                handleInterviewQuestions
              }
              disabled={
                generatingQuestions
              }
              className="rounded bg-purple-600 px-5 py-3 text-white"
            >
              {generatingQuestions
                ? "Generating..."
                : "Interview Questions"}
            </button>
          </div>
        </>
      )}

      {rewrittenResume && (
        <RewrittenResumeCard
          resume={rewrittenResume}
        />
      )}

      {coverLetter && (
        <CoverLetterCard
          coverLetter={coverLetter}
        />
      )}

      {questions.length > 0 && (
        <InterviewQuestionsCard
          questions={questions}
        />
      )}
    </main>
  );
}
