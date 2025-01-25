"use client";

import { CategoryType } from '@/types'
import React from 'react'
import Movie from './Movie';
import styled from 'styled-components';

type CategoryPropType = {
    category: CategoryType,
}

const CategoryName = styled.h2`
    margin-bottom: 10px;
    padding-left: 20px;
    user-select: none;
`;

const MovieList = styled.div`
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: visible;
    width: 100%;
    padding-left: 20px;
    &::-webkit-scrollbar{
        display: none;
    }
`;

const Category = ({ category }: CategoryPropType) => {
    return category.movieRefList.length <= 1 ? null : (
        <div>
            <CategoryName>{category.name}</CategoryName>
            <MovieList>
                {category.movieRefList.map((movieRef: any) => <Movie key={`movie-${movieRef}`} movieRef={movieRef} />)}
            </MovieList>
            <br />
        </div>
    );
}

export default Category