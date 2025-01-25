import { getMovies } from "@/services/dataModel";
import { MovieWithData } from "../components/Movie";
import { MovieDataType } from "@/types";
import PagePad from "../components/PagePad";
import { MovieList } from "./styled";

export default async function MyListPage() {
    const movies = await getMovies();
    return <>
        <PagePad />
        <MovieList>
            {movies.map((movieData: MovieDataType) => <MovieWithData key={`movie-${movieData.id}`} movieData={movieData} />)}
        </MovieList>
    </>
}