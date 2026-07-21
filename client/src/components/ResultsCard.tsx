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
    <div className="space-y-6 rounded-xl border bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-semibold">
        Analysis Results
      </h2>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-green-600">
          Strengths
        </h3>

        <ul className="list-inside list-disc space-y-2">
          {results.strengths.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-red-600">
          Missing Skills
        </h3>

        <ul className="list-inside list-disc space-y-2">
          {results.missingSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-blue-600">
          Improvement Suggestions
        </h3>

        <ul className="list-inside list-disc space-y-2">
          {results.suggestions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
