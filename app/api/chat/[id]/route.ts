import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { generateText } from 'ai';
import { chat, message } from "@/db/schema";
import { google } from "@ai-sdk/google";
import { desc, eq, and } from "drizzle-orm";


export async function GET() {
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
        const result=await db.select({message}).from(message).leftJoin(chat,and(eq(message.userId,userId),eq(message.chatId,chat.id)))
        
        const messages=result.map((items)=>{
            return {
                id:items.message.id.toString(),
                role:items.message.role,
                parts:[
                    {
                        type:items.message.type,
                        text:items.message.content
                    }
                ]
            }
        })
        return NextResponse.json({
            message:"Chat Messages",
            data:messages
        })

    }
    catch (error) {
        console.error("Error fetching chat:", error);
        return NextResponse.json({
            message: "Failed to fetch chat",
        }, { status: 500 })
    }
}