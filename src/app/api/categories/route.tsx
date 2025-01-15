import { fetchCollectionData } from "@/services/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {  
    const categories = await fetchCollectionData("categories");
    return NextResponse.json(categories);
};
