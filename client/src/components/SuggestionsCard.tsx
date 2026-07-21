interface SuggestionsCardProps {
  suggestions: string[];
}

export default function SuggestionsCard({
  suggestions,
}: SuggestionsCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-5 text-xl font-semibold">
        Improvement Suggestions
      </h2>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950"
          >
            <div className="flex gap-3">
              <span className="font-bold text-blue-600">
                {index + 1}.
              </span>

              <p>{suggestion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
