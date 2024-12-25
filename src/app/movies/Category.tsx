"use client";

import { DocumentReference } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import placeholder from '@/public/placeholder.gif';

export type MovieType = {
    id?: string,
    title: string,
    description: string,
    titleImgSrc: string,
    ageRating: 'U'|'U/A 7+'|'U/A 13+'|'U/A 16+'|'A',
    contentWarnings: ['Violence' | 'Sex' | 'Sexual Violence' | 'Sexual Violence References' | 'Child Abuse' | 'Nudity' | 'Self-harm' | 'Suicide' | 'Substances' | 'Language' | 'Disturbing Images' | 'Animal Harm'],
    tags: [ string ],
    genres: [ string ],
    directorRefList: [ DocumentReference ],
    castRefList: [ DocumentReference ],
    writerRefList: [ DocumentReference ],
    videoRef: DocumentReference,
    posterImgSrc: string,
    moreVideoRefList: [ DocumentReference ] | [],
    collectionRef?: DocumentReference,
};
type LoadingMovieType = {
  title: any,
  description: any,
  posterImgSrc: string,
}

const movieNotExist = (movieData: MovieType|LoadingMovieType) : boolean => movieData?.title ? false:true;

const MovieDiv = styled.div`
  background-color: #17091e;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  min-width: 250px;
  transition: min-width .5s ease;
  transition-delay: .2s;
  &:hover {
    min-width: 500px;
  }
  .img-wrapper {
    height: 375px;
    img {
      width: 250px;
      height: 375px;
    }
  }
`

const Text = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 250px;
  overflow-x: hidden;
  &.movie-title {
    font-weight: bolder;
  }
`
const loadingMovieData = {
  title: <img src={placeholder.src} width={250} height={18.5} />,
  description: <img src={placeholder.src} width={250} height={18.5} />,
  posterImgSrc: placeholder.src
};
const Movie = ({id}: {id: string}) => {
  const [movieData, setMovieData ] = useState<MovieType|LoadingMovieType>(loadingMovieData);
  useEffect( ()=>{
    if(id !='loading') fetch(`/api/movies/${id}`).then(res=>res.json()).then(data=>setMovieData(data));
  }, []);
  return movieNotExist(movieData)? <></> : (
    <MovieDiv>
      <Text className='movie-title'>{movieData.title}</Text>
      <Text>{movieData.description}</Text>
      <div className='img-wrapper'><img src={movieData.posterImgSrc} alt={movieData.title} /></div>
    </MovieDiv>
  )
};

const Row = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
`

export type CategoryType = {
  name: string,
  id?: string,
  movieRefList: [ string ] | []
}
export default function Category({id}:any) {
  const [categoryData, setCategoryData ] = useState<CategoryType|any>();
  useEffect( ()=>{
    fetch(`/api/categories/${id}`).then(res=>res.json()).then(data=>setCategoryData(data));
  }, []);
  return <>
    <h1>{categoryData?.name || <img height={37} width={500} src={placeholder.src} />}</h1>
    <Row>
        { categoryData ? categoryData.movieRefList.map((movieId: string)=><Movie key={`movie-key-${movieId}`} id={movieId} />):<>
          <Movie id='loading' />
          <Movie id='loading' />
          <Movie id='loading' />
          <Movie id='loading' />
          <Movie id='loading' />
        </>}
    </Row>
  </>;
};