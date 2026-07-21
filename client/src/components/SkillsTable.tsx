interface SkillsTableProps {
  strengths: string[];
  missingSkills: string[];
}

export default function SkillsTable({
  strengths,
  missingSkills,
}: SkillsTableProps) {
  const rows = Math.max(
    strengths.length,
    missingSkills.length
  );

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow dark:border-gray-700 dark:bg-gray-900">
      <div className="border-b px-6 py-4 dark:border-gray-700">
        <h2 className="text-xl font-bold">
          Skills Comparison
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left">
                Existing Skills
              </th>

              <th className="px-6 py-3 text-left">
                Missing Skills
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rows }).map(
              (_, index) => (
                <tr
                  key={index}
                  className="border-t dark:border-gray-700"
                >
                  <td className="px-6 py-3 align-top">
                    {strengths[index] ? (
                      <span className="font-medium text-green-600">
                        ✓ {strengths[index]}
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        —
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-3 align-top">
                    {missingSkills[index] ? (
                      <span className="font-medium text-red-600">
                        ✗{" "}
                        {
                          missingSkills[
                            index
                          ]
                        }
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        —
                      </span>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t bg-gray-50 px-6 py-4 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <p>
          <strong>
            Existing Skills:
          </strong>{" "}
          {strengths.length}
        </p>

        <p>
          <strong>
            Missing Skills:
          </strong>{" "}
          {missingSkills.length}
        </p>
      </div>
    </div>
  );
}
