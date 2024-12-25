import { fetchDocument, removeReference } from "../../helpPack";

export async function GET(request: any, { params }: { params: Promise<{ id: string }> }) {  
    const movieId  = (await params).id;
    const movie = await fetchDocument(movieId, "movies");
    return new Response(JSON.stringify( movie ), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
}