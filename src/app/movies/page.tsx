import { getCategories } from "@/services/dataModel";
import PagePad from "../components/PagePad";
import { Catergories } from "../components/Catergories";

export default async function MoviePage() {
    const categories = await getCategories();
    return <>
        <PagePad />
        <Catergories categories={categories} />
    </>;
}