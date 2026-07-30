import type { ChangeEvent } from "react";

interface ResumeUploadProps {
  onUpload: (file: File) => void;
}

export default function ResumeUpload({
  onUpload,
}: ResumeUploadProps) {

  function handleFile(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    onUpload(file);
  }


  return (
    <div className="space-y-3">
      <label className="block font-semibold">
        Upload Resume
      </label>

      <input
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleFile}
        className="rounded-lg border p-3"
      />

      <p className="text-sm text-gray-500">
        Supported formats: PDF, DOCX, TXT
      </p>
    </div>
  );
}
