import { fetchMovies } from "../../services/tmdb";

export async function getServerSideProps({ params }) {
    const movie = await fetchMovies(`/movie/${params.id}`);
    return { props: { movie } };
}

export default function MovieDetails({ movie }) {
    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
    );
}