interface Applicant {
  name: string;
  score: number;
  strengths: string[];
  missingSkills: string[];
}

interface ApplicantRankingCardProps {
  ranking: Applicant[];
}

export default function ApplicantRankingCard({
  ranking,
}: ApplicantRankingCardProps) {
  if (!ranking.length) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold">
        Applicant Ranking
      </h2>

      <div className="space-y-4">
        {ranking.map((applicant, index) => (
          <div
            key={`${applicant.name}-${index}`}
            className="rounded-lg border p-4 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  #{index + 1} {applicant.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Score: {applicant.score}%
                </p>
              </div>

              <div
                className={`text-2xl font-bold ${
                  applicant.score >= 80
                    ? "text-green-600"
                    : applicant.score >= 60
                    ? "text-yellow-500"
                    : "text-red-600"
                }`}
              >
                {applicant.score}%
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-green-600">
                  Strengths
                </h4>

                <ul className="list-inside list-disc text-sm">
                  {applicant.strengths.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-red-600">
                  Missing Skills
                </h4>

                <ul className="list-inside list-disc text-sm">
                  {applicant.missingSkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
