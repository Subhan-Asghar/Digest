import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { generateText } from 'ai';
import { chat, message, file, fileChunk } from "@/db/schema";
import { google } from "@ai-sdk/google";
import { desc, eq, and, inArray, sql } from "drizzle-orm";
import {
    streamText,
    convertToModelMessages,
    createUIMessageStreamResponse,
     toUIMessageStream,
} from 'ai';
import { embed } from "ai";


export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {

    try {
        const { id: chatId } = await params

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return NextResponse.json({
                message: "Unauthorized user",

            }, { status: 401 })
        }

        const userId = session.user.id as string
        const result = await db.select().from(message).where(and(eq(message.chatId, chatId), eq(message.userId, userId)))

        const messages = result.map((items) => {
            return {
                id: items.id.toString(),
                role: items.role,
                parts: [
                    {
                        type: items.type,
                        text: items.content
                    }
                ]
            }
        })
        return NextResponse.json({
            message: "Chat Messages",
            data: messages
        })

    }
    catch (error) {
        console.error("Error fetching chat:", error);
        return NextResponse.json({
            message: "Failed to fetch chat",
        }, { status: 500 })
    }
}



export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {

    try {
        const { id: chatId } = await params
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return NextResponse.json({
                message: "Unauthorized user",

            }, { status: 401 })
        }

        const userId = session.user.id as string
        const {attachment,message:userMessage, generateOnly} = await req.json();


        const { embedding } = await embed({
            model: google.embeddingModel("gemini-embedding-001"),
            value: userMessage,
            providerOptions: {
                google: {
                    outputDimensionality: 768
                }
            }
        });


        const { completeChat, contextChunks } = await db.transaction(async (tx) => {

            if (!generateOnly){
                await tx.insert(message).values({
                chatId: chatId,
                userId: userId,
                role: "user",
                content: userMessage,
                type: "text",
            })

            }
            

            let retrievedChunks: {
                id: string;
                fileId: string;
                userId: string;
                content: string;
                chunkIndex: number;
                createdAt: Date | null;
                similarity: unknown;
            }[] = [];

            if (attachment && attachment.length > 0) {

                const similarityExpression = sql`1 - (${fileChunk.embedding} <=> ${JSON.stringify(embedding)}::vector)`;

                retrievedChunks = await tx
                    .select({
                        id: fileChunk.id,
                        fileId: fileChunk.fileId,
                        userId: fileChunk.userId,
                        content: fileChunk.content,
                        chunkIndex: fileChunk.chunkIndex,
                        createdAt: fileChunk.createdAt,
                        similarity: similarityExpression,
                    })
                    .from(fileChunk)
                    .where(
                        and(
                            eq(fileChunk.userId, userId),
                            inArray(fileChunk.fileId, attachment)
                        )
                    )
                    .orderBy(sql`${similarityExpression} DESC`)
                    .limit(2);
            }


            const history = await tx.select().from(message).where(and(eq(message.chatId, chatId), eq(message.userId, userId)))
            return { completeChat: history, contextChunks: retrievedChunks }
        })
        const chat = completeChat.map((msg) => ({
            id: msg.id.toString(),
            role: msg.role,
            parts: [
                {
                    type: "text" as const,
                    text: msg.content,
                },
            ],
        }))

        const contextText = contextChunks.map((c) => c.content).join("\n\n");
        const systemPrompt = `You are a helpful assistant. Use the following context documents to answer the user request:\n\n${contextText}`;
        const formattedMessages = await convertToModelMessages(chat);


        const result = streamText({
            model: google("gemini-3.1-flash-lite-preview"),
            system: contextText ? systemPrompt : "You are a helpful assistant.",
            maxRetries: 0,
            messages: formattedMessages,
            onFinish: async ({ text }) => {
                try {
                    await db.insert(message).values({
                        chatId,
                        userId,
                        role: "assistant",
                        content: text,
                        type: "text",
                    });
                } catch (dbError) {
                    console.error("Failed to save AI response message to database:", dbError);
                }
            },
        });

        return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });

    }
    catch (error) {
        console.error("Error fetching chat:", error);
        return NextResponse.json({
            message: "Failed to fetch chat",
        }, { status: 500 })
    }
}