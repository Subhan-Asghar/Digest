import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { generateText } from 'ai';
import { chat} from "@/db/schema";
import { google } from "@ai-sdk/google";
import { desc, eq, and} from "drizzle-orm";



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
        const { message } = await req.json() as {message:string}

        const { text } = await generateText({
            model: google('gemini-2.5-flash'),
              prompt: `You are an expert UI/UX system component. Your sole task is to generate a concise, natural, and engaging chat conversation title based on this initial user message:

"${message}"

STRICT INSTRUCTIONS:
1. The title MUST be exactly between 3 and 5 words long.
2. Capture the core topic, intent, or theme of the message (e.g., if the user asks about a coding bug, title it "Debugging React State Error").
3. Do NOT use conversational filler, greetings, or introductory phrases (do not say "Here is your title:").
4. If the user message is just a greeting (like "hi", "hello", "hey"), return "New Conversation" or "General Discussion".
5. Return ONLY the raw plain text of the title. Do NOT include quotes, periods, or markdown formatting (no asterisks, no hashtags).`,
});

        console.log(text)

        const result=await db.insert(chat).values({
            userId:userId,
            title:text
        }).returning()

        return NextResponse.json({
            message: "Chat Created",
            id:result[0].id

        }, { status: 200 })

        
    }
     catch (error) {
        console.error("Error creating chat:", error);
        return NextResponse.json({
            message: "Failed to create chat",
        }, { status: 500 })
    }

}



export async function GET(req: NextRequest) {
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
        const result = await db.select().from(chat).where(eq(chat.userId, userId)).orderBy(desc(chat.createdAt));

        return NextResponse.json({
            message: "Chat fetched successfully",
            data: result
        }, { status: 200 })
    }
    catch (error) {
        console.error("Error fetching chat:", error);
        return NextResponse.json({
            message: "Failed to get chat",
        }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
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
        const data = await req.json()
        const { id } = data
        await db.delete(chat).where(and(eq(chat.id, id),eq(chat.userId, userId)));

        return NextResponse.json({
            message: "Chat deleted successfully",
        }, { status: 200 })
    }
    catch (error) {
        console.error("Error deleting chat:", error);
        return NextResponse.json({
            message: "Failed to delete chat",
        }, { status: 500 })
    }
}