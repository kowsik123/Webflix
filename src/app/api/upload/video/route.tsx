import { NextResponse } from "next/server";
import { adminAuth } from "../login/route";
import firestoreDB from "@/services/firestore";

export async function POST(request: NextResponse) {
    const {adminAccessId, data} = await request.json();
    if(adminAuth(adminAccessId)) {
        if(data.id) {
            const {id, ...uploadData} = data;
            const uploadedData = await firestoreDB.updateDocument( "videos", id, uploadData );
            if(uploadedData.id) return NextResponse.json(uploadedData);
            else return NextResponse.error();
        }
        else {
            const uploadedData = await firestoreDB.uploadDocument( "videos", data );
            if(uploadedData.id) return NextResponse.json(uploadedData);
            else return NextResponse.error();
        }
    } else {
        return NextResponse.json({login: "failed"});
    }
}