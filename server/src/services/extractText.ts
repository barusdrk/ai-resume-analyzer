import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

export async function extractText(
  buffer: Buffer,
  filename: string
): Promise<string> {
  const extension = filename
    .split(".")
    .pop()
    ?.toLowerCase();

  if (extension === "txt") {
    return buffer.toString("utf-8");
  }

  if (extension === "docx") {
    const result = await mammoth.extractRawText({
      buffer,
    });

    return result.value;
  }

  if (extension === "pdf") {
    const parser = new PDFParse({
      data: buffer,
    });

    const result = await parser.getText();

    return result.text;
  }

  throw new Error(
    "Unsupported file format"
  );
}
