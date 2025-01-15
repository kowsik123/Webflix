"use client";

import React from 'react'
import styled from 'styled-components'

const MovieModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 900;
    background-color: #00000075;
    padding: 40px 0;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
`

const MovieModalCont = styled.div`
    border-radius: 10px;
    width: 70%;
    height: 1000px;
    background: linear-gradient(to bottom, #052136, #1E0536);
`

const MovieModal = () => {
  return (
    <MovieModalBackground>
        <MovieModalCont></MovieModalCont>
    </MovieModalBackground>
  )
}

export default MovieModal