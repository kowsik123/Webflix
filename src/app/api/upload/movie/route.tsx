import { findDocument, ref, updateDocumentArray, uploadDocument } from "@/services/firestore";
import { MovieDataType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const capitalize = (str: string) => {
    return str.split(" ").map( word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}

const createOrGetCast = async ({node: {name}}:any) => {
    const person = await findDocument("persons", "name", name);
    if(person) return person;
    else {
        const personDoc = await uploadDocument("persons", {
            profileImgSrc: "https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg",
            name: name,
            description: name,
        });
        console.log(`created cast: ${personDoc?.id}`);
        return personDoc;
    }
}
const createGenre = (genre: string) => {
    return genre;
}

const createOrGetCategoryId = async (name: string) => {
    const category = await findDocument("categories", "name", name);
    if(category) {
        return category.id;
    } else {
        const categoryDoc = await uploadDocument("categories", {
            name: name,
            movieRefList: [],
        });
        console.log(`created category: ${categoryDoc.id}`);
        return categoryDoc.id;
    }
}

export async function POST(request: NextRequest) {
    const reqData = await request.json();
    const data = reqData.data.movieData;
    const categoryId = await createOrGetCategoryId(reqData.data.categoryName);

    const uploadData = {
        ageRating: data.contentAdvisory.certificationValue,
        contentWarnings: data.contentAdvisory.reasons.map( (reason: any)=>capitalize(reason.text) ),
        castRefList: await Promise.all(data.cast.edges.map( createOrGetCast )),
        collectionRef: null,
        description: data.contextualSynopsis.text,
        directorRefList: await Promise.all(data.directors.edges.map( createOrGetCast )),
        genres: data.genreTags.edges.map((edge: any)=>createGenre(edge.node.name)),
        tags: data.moodTags.map((tag: any)=>createGenre(tag.displayName)),
        moreVideoRefList: [],
        posterImgSrc: data.boxartHighRes.url,
        title: data.title,
        titleImgSrc: data.logoArtwork.url,
        videoRef: ref( "videos", "NubkDkMfbzu6BihflZxK"),
        writerRefList: await Promise.all(data.writers.edges.map( createOrGetCast )),
        creatorRefList: await Promise.all(data.creators.edges.map( createOrGetCast )),
        promoVideoRef: ref( "videos", "ygmBjFGWMeid8FLiXOKc"),
    }
    let movie = await findDocument("movies", "title", uploadData.title);
    if( !movie ) {
        movie = await uploadDocument("movies", uploadData);
        console.log(`created movie: ${movie.id}`);
    }
    await updateDocumentArray("categories", categoryId, "movieRefList", movie);
    return NextResponse.json({id: `movies/${movie.id}`});
}