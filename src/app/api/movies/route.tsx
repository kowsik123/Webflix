import { fetchCollectionData } from "@/services/firestore";
import { NextResponse } from "next/server";

export async function GET() {
    const movies = await fetchCollectionData("movies");
    return NextResponse.json(movies);
};
