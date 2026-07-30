interface InterviewQuestion {
  category: string;
  question: string;
}

interface InterviewQuestionsCardProps {
  questions: InterviewQuestion[];
}

export default function InterviewQuestionsCard({
  questions,
}: InterviewQuestionsCardProps) {
  if (!questions.length) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold">
        AI Interview Questions
      </h2>

      <div className="space-y-4">
        {questions.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border p-4 dark:border-gray-700"
          >
            <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              {item.category}
            </span>

            <p className="mt-3">
              {index + 1}. {item.question}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
