interface ATSScoreCardProps {
  score: number;
}


export default function ATSScoreCard({
  score,
}: ATSScoreCardProps) {

  let label = "Needs Improvement";

  if (score >= 85) {
    label = "Excellent";
  } else if (score >= 70) {
    label = "Good";
  }


  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-6
        shadow
        dark:border-gray-700
        dark:bg-gray-900
      "
    >

      <h2 className="text-xl font-semibold">
        ATS Compatibility Score
      </h2>


      <div
        className="
          mt-4
          text-center
        "
      >

        <p
          className="
            text-6xl
            font-bold
            text-blue-600
          "
        >
          {score}
        </p>


        <p className="mt-2 text-gray-500">
          / 100
        </p>


        <p
          className="
            mt-4
            font-medium
          "
        >
          {label}
        </p>

      </div>


      <div
        className="
          mt-6
          h-3
          rounded-full
          bg-gray-200
          dark:bg-gray-700
        "
      >

        <div
          className="
            h-3
            rounded-full
            bg-blue-600
          "
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>
  );
}
