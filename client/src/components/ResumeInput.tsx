interface ResumeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ResumeInput({
  value,
  onChange,
}: ResumeInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="resume"
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        Resume
      </label>

      <textarea
        id="resume"
        rows={16}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your resume here..."
        className="w-full rounded-lg border border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      />

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Paste your resume text. PDF/DOCX upload will be added later.
      </p>
    </div>
  );
}
