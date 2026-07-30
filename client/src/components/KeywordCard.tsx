interface KeywordCardProps {
  score: number;
}

export default function KeywordCard({
  score,
}: KeywordCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-xl font-semibold">
        Keyword Match
      </h2>

      <div className="mt-6 text-center">
        <p className="text-6xl font-bold text-green-600">
          {score}
        </p>

        <p className="text-gray-500">/100</p>
      </div>
    </div>
  );
}
