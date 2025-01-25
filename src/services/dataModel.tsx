import { CategoryType, MovieDataType } from "@/types";
import { fetchCollectionData } from "./firestore";

let currMovie: MovieDataType;
let currMovieTime: Date = new Date();
const minutes = 10;

export const getTodayMovie: any = async (): Promise<MovieDataType> => {
    const movies: any = await fetchCollectionData("movies");
    if(new Date() > currMovieTime) {
      currMovieTime = new Date( Date.now() + minutes * 60 * 1000 );
      currMovie = movies[Math.floor(Math.random() * 10)];
    }
    return currMovie;
}

export const getCategories: any = async (): Promise<CategoryType> => {
  const categories: any = await fetchCollectionData('categories');
  return categories;
}

export const getMovies: any = async (): Promise<Array<MovieDataType>> => {
  const movies: any = await fetchCollectionData("movies", 20);
  return movies;
}