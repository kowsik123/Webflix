import { CategoryType, MovieDataType } from "@/types";
import { fetchCollectionData } from "./firestore";

export const getTodayMovie: any = async (): Promise<MovieDataType> => {
    const movies: any = await fetchCollectionData("movies");
    return movies[Math.floor(Math.random() * 10)];
}

export const getCategories: any = async (): Promise<CategoryType> => {
  const categories: any = await fetchCollectionData('categories');
  return categories;
}

export const getMovies: any = async (): Promise<Array<MovieDataType>> => {
  const movies: any = await fetchCollectionData("movies", 20);
  return movies;
}