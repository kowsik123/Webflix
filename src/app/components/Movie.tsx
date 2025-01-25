"use client";

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { PromoPlayer } from '@/components';
import { useMovieData } from '@/components/hooks';
import { MovieDataType } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const MovieCont: any = styled.div`
    width: 250px;
    aspect-ratio: 665/374;
    position: relative;
    background-color: gray;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    cursor: pointer;
    z-index: 1;
    --animation-duration: .5s;
    transition: z-index 0s;
    transition-delay: var(--animation-duration);
    &:first-of-type {
        .compact-promo-player {
            left: 0;
        }
    }
    &:last-of-type {
        .compact-promo-player {
            right: 0;
        }
    }
    ${({ $open }: any) => $open && css`
        z-index: 2;
        transition: z-index 0s;
        transition-delay: 0s;
    ` }
`;

const Movie = ({ movieRef }: { movieRef: string }) => {
    const [open, setOpen] = useState(false);
    const movieData = useMovieData(movieRef);
    return (
        <MovieCont $open={open}>
            {movieData && <PromoPlayer.Compact movieData={movieData} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} />}
        </MovieCont>
    )
}

const MovieInModal = styled.div`
    height: 290px;
    background-color: #2d2d2d;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    margin-bottom: 5px;
    flex-direction: column;
    color: #ffffffdc;
    > img {
        width: 100%;
    }
`

const MovieInModalInfo = styled.div`
    padding: 15px;
    width: 100%;
    height: 100%;
    background: #282b33;
    p {
        margin-top: 10px;
        font-size: 14px;
    }
`

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const AgeRating = styled.div`
  border: 1px solid #ffffffb3;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
`

const Tag = styled.div`
  border: 1px solid #ffffffb3;
  border-radius: 5px;
  font-size: 12px;
  line-height: 16px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AddButton = styled.div`
    width: 25px;
    height: 25px;
    border: 2px solid #edededa2;
    color: white;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0000006d;
    cursor: pointer;
    &:hover {
      border-color: #ffffff;
    }
`
export const MovieWithData = ({ movieData }: { movieData: MovieDataType }) => {
    const [open, setOpen] = useState(false);
    return (
        <MovieCont className='movie-with-data' $open={open}>
            {movieData && <PromoPlayer.Compact movieData={movieData} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} />}
        </MovieCont>
    )
};

Movie.Modal = ({ movieData }: { movieData: MovieDataType }) => {
    return <MovieInModal>
        <img src={movieData.posterImgSrc} />
        <MovieInModalInfo>
            <Row>
                <AgeRating>{movieData.ageRating}</AgeRating>
                <Tag>HD</Tag>
                <span>2024</span>
                <AddButton><FontAwesomeIcon icon={faPlus} width={20} height={20} /></AddButton>
            </Row>
            <p>{movieData.description}</p>
        </MovieInModalInfo>
    </MovieInModal>
};

export default Movie