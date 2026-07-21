import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { file, fileChunk } from "@/db/schema";
import { chunkText, parseDocx, parsePdf } from "@/lib/textExtract";
import { embed } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return NextResponse.json({
                message: "Unauthorized user",

            }, { status: 401 })
        }

        const userId = session.user.id as string

        const data = await req.formData()
        const files = data.getAll("files") as File[]

        await db.transaction(async (tx) => {

            for (const item of files) {

                const newFile = await tx.insert(file).values({
                    userId: userId,
                    name: item.name,
                    size: item.size,
                    type: item.type,
                }).returning();

                const fileId = newFile[0].id;
                let text: string = "";

                if (item.type === "application/pdf") {
                    text = await parsePdf(item);
                }
                else if (item.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                    text = await parseDocx(item);
                }

                const chunks = chunkText(text, 1000);

                for (const [index, chunk] of chunks.entries()) {
                    const { embedding } = await embed({
                        model: google.embeddingModel("gemini-embedding-001"),
                        value: chunk,
                        providerOptions: {
                            google: {
                                outputDimensionality: 768
                            }
                        }
                    });

                    await tx.insert(fileChunk).values({
                        fileId,
                        userId,
                        content: chunk,
                        embedding,
                        chunkIndex: index,
                    });
                }

            }

        });

        return NextResponse.json({
            message: "Files uploaded successfully",
        }, { status: 200 })

    }
    catch (error) {
        console.error("Error uploading files:", error);
        return NextResponse.json({
            message: "Failed to upload files",
        }, { status: 500 })
    }
}