import { getCategories } from "@/services/dataModel";
import PagePad from "../components/PagePad";
import { Catergories } from "../components/Catergories";

export default async function TvShowPage() {
    const categories = await getCategories();
    return <>
        <PagePad />
        <Catergories categories={categories} />
    </>;
}