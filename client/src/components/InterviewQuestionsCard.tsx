import type { InterviewQuestion } from "../services/api";

interface InterviewQuestionsCardProps {
  questions: InterviewQuestion[];
}

export default function InterviewQuestionsCard({
  questions,
}: InterviewQuestionsCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Interview Questions
      </h2>

      <div className="space-y-5">
        {questions.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border p-4"
          >
            <span className="rounded bg-blue-100 px-2 py-1 text-sm font-medium text-blue-700">
              {item.category}
            </span>

            <p className="mt-3 font-medium">
              {index + 1}. {item.question}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
