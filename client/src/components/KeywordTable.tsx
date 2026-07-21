interface KeywordTableProps {
  matchedKeywords: string[];
  missingKeywords: string[];
}

export default function KeywordTable({
  matchedKeywords,
  missingKeywords,
}: KeywordTableProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h2 className="mb-3 text-lg font-semibold text-green-600">
          Matched Keywords
        </h2>

        <ul className="space-y-2">
          {matchedKeywords.map((keyword) => (
            <li key={keyword}>
              ✓ {keyword}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-red-600">
          Missing Keywords
        </h2>

        <ul className="space-y-2">
          {missingKeywords.map((keyword) => (
            <li key={keyword}>
              ✗ {keyword}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
