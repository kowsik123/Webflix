import { fetchDocument } from "../../helpPack";

export async function GET(request: any, { params }: { params: Promise<{ id: string }> }) {  
    const categoryId  = (await params).id;
    const category = await fetchDocument(categoryId, "categories");
    return new Response(JSON.stringify( category ), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
};
