import { fetchDocumentData } from "@/services/firestore";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: Promise<{ id: string }> }) {  
    const movieId  = (await params).id;
    const movie = await fetchDocumentData(movieId, "movies");
    return NextResponse.json(movie);
}