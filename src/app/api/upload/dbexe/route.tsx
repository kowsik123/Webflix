// TODO: Delete

import { exe } from "@/services/firestore";
import { NextResponse } from "next/server";

export async function GET(request: any) {
    return NextResponse.json(await exe());
};