import { PromoPlayer } from "@/components";
import { getCategories, getTodayMovie } from "@/services/dataModel";
import HomeCategorieList from "./components/Catergories";

export default async function Home() {
  const movieData = await getTodayMovie();
  const categories = await getCategories();
  return (
    <>
      <PromoPlayer movieData={movieData} />
      <HomeCategorieList categories={categories} />
    </>
  );
}
