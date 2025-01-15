import { fetchDocumentData } from "@/services/firestore";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: Promise<{ id: string }> }) {
    const videoId  = (await params).id;
    const video = await fetchDocumentData(videoId, "videos");
    return NextResponse.json(video);
}