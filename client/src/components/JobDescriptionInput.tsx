interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionInput({
  value,
  onChange,
}: JobDescriptionInputProps) {
  return (
    <div className="space-y-2">
      <label className="block font-semibold">
        Job Description
      </label>

      <textarea
        rows={10}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Paste the complete job description here..."
        className="w-full rounded-lg border p-3"
      />
    </div>
  );
}
