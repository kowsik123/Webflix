import { VideoPlayer } from "@/components";
import { fetchDocument } from "@/services/firestore";
import { MovieDataType } from "@/types";

const getMovieData = async (id: string): Promise<MovieDataType> => {
    const movie: any = await fetchDocument(id, "movies", ['videos']);
    return movie;
}

const WatchPage = async ({params}: any) => {
    const { id } = await params;
    const movieData = await getMovieData(id);
    return (
        <VideoPlayer movieData={movieData} />
    )
}

export default WatchPage;