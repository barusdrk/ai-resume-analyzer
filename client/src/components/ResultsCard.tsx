interface Results {
  strengths: string[];
  missingSkills: string[];
  suggestions: string[];
}

interface ResultsCardProps {
  results: Results;
}

export default function ResultsCard({
  results,
}: ResultsCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold">
        Resume Analysis
      </h2>

      <div className="grid gap-6 lg:grid-cols-3">
        <section>
          <h3 className="mb-3 text-lg font-semibold text-green-600">
            Strengths
          </h3>

          {results.strengths.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No strengths detected.
            </p>
          ) : (
            <ul className="space-y-2">
              {results.strengths.map((item) => (
                <li
                  key={item}
                  className="rounded bg-green-50 p-2 dark:bg-green-900/20"
                >
                  ✓ {item}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-red-600">
            Missing Skills
          </h3>

          {results.missingSkills.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No missing skills found.
            </p>
          ) : (
            <ul className="space-y-2">
              {results.missingSkills.map((item) => (
                <li
                  key={item}
                  className="rounded bg-red-50 p-2 dark:bg-red-900/20"
                >
                  ✗ {item}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-blue-600">
            Suggestions
          </h3>

          {results.suggestions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No suggestions available.
            </p>
          ) : (
            <ul className="space-y-2">
              {results.suggestions.map((item) => (
                <li
                  key={item}
                  className="rounded bg-blue-50 p-2 dark:bg-blue-900/20"
                >
                  • {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
