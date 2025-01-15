import { fetchDocumentData } from "@/services/firestore";
import { NextResponse } from "next/server";

export async function GET(request: any, { params }: { params: Promise<{ id: string }> }) {  
    const categoryId  = (await params).id;
    const category = await fetchDocumentData(categoryId, "categories");
    return NextResponse.json(category);
};
