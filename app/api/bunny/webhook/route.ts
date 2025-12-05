/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { videos } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

const BUNNY_API_KEY = process.env.BUNNY_API_KEY!;
const BUNNY_LIBRARY_ID = process.env.BUNNY_LIBRARY_ID!;

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
        console.log("📦 Received Bunny webhook payload:", payload);

        const { videoId } = payload;
        if (!videoId) throw new Error("Missing videoId in Bunny webhook payload.");

        const filesRes = await fetch(
            `https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/videos/${videoId}/files`,
            { headers: { AccessKey: BUNNY_API_KEY } }
        );

        const files = await filesRes.json();
        const mp4File = files?.items?.find((f: any) => f.path.endsWith(".mp4"));

        // ✅ Construct the Bunny download URL
        const downloadUrl = `https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/videos/${videoId}/download`;
        const fallbackUrl = `https://iframe.mediadelivery.net/play/${BUNNY_LIBRARY_ID}/${videoId}`;

        const finalUrl = mp4File ? downloadUrl : fallbackUrl;

        // ✅ Update the video's record in Xata (via Drizzle ORM)
        await db
            .update(videos)
            .set({ downloadUrl: finalUrl })
            .where(eq(videos.videoId, videoId));

        console.log("✅ Updated video with download URL:", finalUrl)
        return NextResponse.json({ success: true, finalUrl });
    } catch (error: any) {
        console.error("❌ Webhook error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}