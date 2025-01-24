import { fetchCollectionData } from "@/services/firestore";
import { NextResponse } from "next/server";

const getTodayMovie = async () => {
    const movies: any = await fetchCollectionData( "movies" );
    return movies[Math.floor(Math.random() * 10)];
}

export async function GET() {  
    const movie = await getTodayMovie();
    return NextResponse.json(movie);
}