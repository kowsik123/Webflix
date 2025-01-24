import { fetchCollections, resolveDoc, resolveDocRef } from "@/services/firestore";
import { NextResponse } from "next/server";

export async function GET() {
    const categories = await fetchCollections("categories");
    for (let index = 0; index < categories.length; index++) {
        const category = categories[index];
        category.movieRefList = await Promise.all(category.movieRefList.map(async (movie: any) => {
            return await resolveDocRef(await resolveDoc(movie), 'persons', 'videos');
        }));
    }
    return NextResponse.json(categories);
};
