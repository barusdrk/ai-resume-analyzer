interface ComparisonCardProps {
  matchScore: number;
  atsScore: number;
  keywordMatchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
}

export default function ComparisonCard({
  matchScore,
  atsScore,
  keywordMatchScore,
  matchedKeywords,
  missingKeywords,
}: ComparisonCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold">
        Resume vs Job Description
      </h2>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-blue-100 p-4 text-center dark:bg-blue-950">
          <p className="text-sm">Match Score</p>

          <p className="mt-2 text-3xl font-bold">
            {matchScore}%
          </p>
        </div>

        <div className="rounded-lg bg-green-100 p-4 text-center dark:bg-green-950">
          <p className="text-sm">ATS Score</p>

          <p className="mt-2 text-3xl font-bold">
            {atsScore}%
          </p>
        </div>

        <div className="rounded-lg bg-purple-100 p-4 text-center dark:bg-purple-950">
          <p className="text-sm">
            Keyword Match
          </p>

          <p className="mt-2 text-3xl font-bold">
            {keywordMatchScore}%
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 font-semibold text-green-600">
            Matched Keywords
          </h3>

          <div className="flex flex-wrap gap-2">
            {matchedKeywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-900 dark:text-green-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-red-600">
            Missing Keywords
          </h3>

          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded bg-red-100 px-3 py-1 text-sm text-red-700 dark:bg-red-900 dark:text-red-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
