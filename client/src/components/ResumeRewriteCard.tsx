interface ResumeRewriteCardProps {
  rewrittenResume: string;
}

export default function ResumeRewriteCard({
  rewrittenResume,
}: ResumeRewriteCardProps) {
  async function copyToClipboard() {
    if (!rewrittenResume) return;

    await navigator.clipboard.writeText(
      rewrittenResume
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          AI Resume Rewrite
        </h2>

        <button
          onClick={copyToClipboard}
          disabled={!rewrittenResume}
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Copy
        </button>
      </div>

      {rewrittenResume ? (
        <textarea
          readOnly
          value={rewrittenResume}
          rows={20}
          className="w-full rounded-lg border p-4 font-mono text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
          Your AI-generated rewritten resume will appear here after analysis.
        </div>
      )}
    </div>
  );
}
