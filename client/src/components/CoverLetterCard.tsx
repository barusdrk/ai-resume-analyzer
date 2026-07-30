interface CoverLetterCardProps {
  coverLetter: string;
}

export default function CoverLetterCard({
  coverLetter,
}: CoverLetterCardProps) {
  async function copyToClipboard() {
    await navigator.clipboard.writeText(
      coverLetter
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          AI Cover Letter
        </h2>

        <button
          onClick={copyToClipboard}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Copy
        </button>
      </div>

      <textarea
        readOnly
        value={coverLetter}
        rows={20}
        className="w-full rounded border p-4"
      />
    </div>
  );
}
