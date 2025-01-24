import { PromoPlayer } from "@/components";
import Catergories from "./components/Catergories";
import { fetchCollectionData } from "@/services/firestore";
import { CategoryType, MovieDataType } from "@/types";

const getCategories: any = async (): Promise<CategoryType> => {
  const categories: any = await fetchCollectionData('categories');
  return categories;
}

const getTodayMovie: any = async (): Promise<MovieDataType> => {
  const movies: any = await fetchCollectionData("movies");
  return movies[Math.floor(Math.random() * 10)];
}

export default async function Home() {
  const movieData = await getTodayMovie();
  const categories = await getCategories();
  return (
    <>
      <PromoPlayer movieData={movieData} />
      <Catergories categories={categories} />
    </>
  );
}
