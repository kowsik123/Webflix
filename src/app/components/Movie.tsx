"use client";

import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { PromoPlayer } from '@/components';
import { MovieDataType } from '@/types';
import { useMovieData } from '@/components/hooks';

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
    ${ ({$open}:any)=>$open && css`
        z-index: 2;
        transition: z-index 0s;
        transition-delay: 0s;
    ` }
`;

const Movie = ({ movieRef }: { movieRef: string }) => {
    const [movieData, setMovieData] = useState<MovieDataType>();
    const [open, setOpen] = useState(false);
    useMovieData( movieRef, useCallback((data)=>{
        if(data.id) {
            setMovieData(data);
        }
    }, [movieRef]));
    return (
        <MovieCont $open={open}>
            {movieData && <PromoPlayer.Compact movieData={movieData} onClose={()=>setOpen(false)} onOpen={()=>setOpen(true)} />}
        </MovieCont>
    )
}

export default Movie