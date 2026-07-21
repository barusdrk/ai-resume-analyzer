interface ScoreCardProps {
  score: number;
  title?: string;
}

export default function ScoreCard({
  score,
  title = "Resume Match Score",
}: ScoreCardProps) {
  let color = "text-red-600";

  if (score >= 80) {
    color = "text-green-600";
  } else if (score >= 60) {
    color = "text-yellow-500";
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-4 text-xl font-semibold">
        {title}
      </h2>

      <div className="flex items-center justify-center">
        <div
          className={`text-6xl font-bold ${color}`}
        >
          {score}%
        </div>
      </div>

      <div className="mt-6 h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
