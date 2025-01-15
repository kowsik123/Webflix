import { NextResponse } from "next/server";
import { adminAuth } from "../login/route";
import { setDocument, uploadDocument } from "@/services/firestore";

export async function POST(request: NextResponse) {
    const {adminAccessId, data} = await request.json();
    if(adminAuth(adminAccessId)) {
        if(data.id) {
            const {id, ...uploadData} = data;
            await setDocument( "videos", id, uploadData );
            return NextResponse.json(data);
        }
        else {
            const videoRef = await uploadDocument( "videos", data );
            return NextResponse.json( {id: videoRef.id, ...data} );
        }
    } else {
        return NextResponse.error();
    }
}