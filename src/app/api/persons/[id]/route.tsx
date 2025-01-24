import { fetchDocumentData } from "@/services/firestore";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: Promise<{ id: string }> }) {
    const personId  = (await params).id;
    const person = await fetchDocumentData(personId, "persons");
    return NextResponse.json(person);
}