interface JobTitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SUGGESTED_TITLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "React Developer",
  "Software Engineer",
  "Data Analyst",
  "Project Manager",
  "UI/UX Designer",
];

export default function JobTitleInput({
  value,
  onChange,
}: JobTitleInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="job-title"
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        Target Job Title
      </label>

      <input
        id="job-title"
        type="text"
        list="job-titles"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Frontend Developer"
        className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      />

      <datalist id="job-titles">
        {SUGGESTED_TITLES.map((title) => (
          <option key={title} value={title} />
        ))}
      </datalist>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Select a suggestion or type any job title.
      </p>
    </div>
  );
}
