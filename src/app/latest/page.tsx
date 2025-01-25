import { getCategories } from "@/services/dataModel";
import { Catergories } from "../components/Catergories";
import PagePad from "../components/PagePad";

export default async function LatestPage() {
    const categories = await getCategories();
    return <>
        <PagePad />
        <Catergories categories={categories} />
    </>;
}