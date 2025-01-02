import { NextResponse } from "next/server";

export function adminAuth(accessId: string) {
    return accessId == process.env.ADMIN_ACCESS_ID;
}

export async function POST(request: any) {
    const { adminAccessId } = await request.json();
    if(adminAuth(adminAccessId)) return NextResponse.json( { login: "success" } );
    else return NextResponse.json( { login: "failed" } );
};