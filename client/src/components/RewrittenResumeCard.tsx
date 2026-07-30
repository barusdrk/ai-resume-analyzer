interface Props {
  resume: string;
}

export default function RewrittenResumeCard({
  resume,
}: Props) {
  return (
    <div className="rounded-xl border p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">
        ATS Optimized Resume
      </h2>

      <textarea
        value={resume}
        readOnly
        rows={22}
        className="w-full rounded border p-4 font-mono"
      />
    </div>
  );
}
