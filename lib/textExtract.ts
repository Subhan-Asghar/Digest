import { extractText } from "unpdf";
import mammoth from "mammoth";

export const parsePdf = async (file: File) => {

    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const { text } = await extractText(
            new Uint8Array(buffer)
        );
        return text[0] || "";

    }
    catch (error) {
        console.error("Error parsing PDF:", error);
        throw new Error("Failed to parse PDF");
    }

}

export const parseDocx = async (file: File): Promise<string> => {
    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const { value: text } = await mammoth.extractRawText({
            buffer,
        });
        return text;
    }
    catch (error) {
        console.error("Error parsing DOCX:", error);
        throw new Error("Failed to parse DOCX");
    }
}

export const chunkText = (text: string, chunkSize: number, overlap: number = 200): string[] => {
    const chunks: string[] = [];
    let start = 0;
    while (start < text.length) {
        chunks.push(text.slice(start, start + chunkSize));
        start += chunkSize - overlap;
    }

    return chunks
}
