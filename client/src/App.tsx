import { useState } from "react";

import { useAuth } from "./context/AuthContext";

import ThemeToggle from "./components/ThemeToggle";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ResumeInput from "./components/ResumeInput";
import ResumeUpload from "./components/ResumeUpload";
import JobTitleInput from "./components/JobTitleInput";
import JobDescriptionInput from "./components/JobDescriptionInput";
import ScoreCard from "./components/ScoreCard";
import ATSScoreCard from "./components/ATSScoreCard";
import ResultsCard from "./components/ResultsCard";
import SkillsTable from "./components/SkillsTable";
import SuggestionsCard from "./components/SuggestionsCard";
import ResumeRewriteCard from "./components/ResumeRewriteCard";
import CoverLetterCard from "./components/CoverLetterCard";
import InterviewQuestionsCard from "./components/InterviewQuestionsCard";

import {
  analyzeResume,
  uploadResume,
  rewriteResume,
  generateCoverLetter,
  generateInterviewQuestions,
} from "./services/api";

export default function App() {
  const { user, logout, loading } =
    useAuth();

  const [showLogin, setShowLogin] =
    useState(true);

  const [resume, setResume] =
    useState("");

  const [jobTitle, setJobTitle] =
    useState("");

  const [
    jobDescription,
    setJobDescription,
  ] = useState("");

  const [analysis, setAnalysis] =
    useState<any>(null);

  const [
    rewrittenResume,
    setRewrittenResume,
  ] = useState("");

  const [
    coverLetter,
    setCoverLetter,
  ] = useState("");

  const [
    interviewQuestions,
    setInterviewQuestions,
  ] = useState<any[]>([]);

  const [busy, setBusy] =
    useState(false);

  async function handleAnalyze() {
    if (!resume.trim()) return;

    setBusy(true);

    try {
      const request = {
        resume,
        jobTitle,
        jobDescription,
      };

      const analysisResult =
        await analyzeResume(request);

      setAnalysis(analysisResult);

      const rewritten =
        await rewriteResume(request);

      setRewrittenResume(
        rewritten.rewrittenResume
      );

      const cover =
        await generateCoverLetter(
          request
        );

      setCoverLetter(
        cover.coverLetter
      );

      const interview =
        await generateInterviewQuestions(
          request
        );

      setInterviewQuestions(
        interview.questions
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleUpload(
    file: File
  ) {
    const text =
      await uploadResume(file);

    setResume(text);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 dark:text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6 transition-colors dark:bg-gray-950 dark:text-white">
        {showLogin ? (
          <LoginForm
            onSwitchToRegister={() =>
              setShowLogin(false)
            }
          />
        ) : (
          <RegisterForm
            onSwitchToLogin={() =>
              setShowLogin(true)
            }
          />
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-7xl space-y-8 p-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">
              AI Resume Analyzer
            </h1>

            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Welcome, {user.name}
            </p>
          </div>

          <div className="flex gap-3">
            <ThemeToggle />

            <button
              onClick={logout}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>

        <ResumeUpload
          onUpload={handleUpload}
        />

        <ResumeInput
          value={resume}
          onChange={setResume}
        />

        <JobTitleInput
          value={jobTitle}
          onChange={setJobTitle}
        />

        <JobDescriptionInput
          value={jobDescription}
          onChange={
            setJobDescription
          }
        />

        <button
          onClick={handleAnalyze}
          disabled={busy}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {busy
            ? "Analyzing..."
            : "Analyze Resume"}
        </button>

        {analysis && (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              <ScoreCard
                score={analysis.matchScore}
              />

              <ATSScoreCard
                score={analysis.atsScore}
              />

              <ScoreCard
                title="Keyword Match Score"
                score={analysis.keywordMatchScore}
              />
            </div>

            <ResultsCard
              results={{
                strengths: analysis.strengths,
                missingSkills: analysis.missingSkills,
                suggestions: analysis.suggestions,
              }}
            />

            <SkillsTable
              strengths={analysis.strengths}
              missingSkills={analysis.missingSkills}
            />

            <SuggestionsCard
              suggestions={analysis.suggestions}
            />

            <ResumeRewriteCard
              rewrittenResume={rewrittenResume}
            />

            <CoverLetterCard
              coverLetter={coverLetter}
            />

            <InterviewQuestionsCard
              questions={interviewQuestions}
            />
          </>
        )}
      </div>
    </main>
  );
}
