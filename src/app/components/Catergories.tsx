"use client";

import styled from 'styled-components';
import Category from './Category';
import { CategoryType } from '@/types';

const CategoriesCont = styled.div`
    width: 100%;
    height: fit-content;
    background: linear-gradient(to bottom, #052136, #1E0536);
`;

const VideoOverlay = styled.div`
    height: 20px;
    top: -20px;
    position: relative;
    background: linear-gradient(to bottom, transparent, #052136);
`;

const CategoryList = styled.div`
    position: relative;
    margin-top: -100px;
    z-index: 5;
`;

export const Catergories = ({ categories }: { categories: Array<CategoryType> }) => {
    return (
        <>
            {categories && categories.map(category => <Category key={`category-${category.id}`} category={category} />)}
            {categories && categories.map(category => <Category key={`category2-${category.id}`} category={category} />)}
            {categories && categories.map(category => <Category key={`category3-${category.id}`} category={category} />)}
        </>
    )
}

const HomeCategorieList = ({ categories }: { categories: Array<CategoryType> }) => {
    return <CategoriesCont>
        <VideoOverlay />
        <CategoryList>
            <Catergories categories={categories} />
        </CategoryList>
    </CategoriesCont>
}

export default HomeCategorieList;