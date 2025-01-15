"use client";
import React, { useRef } from 'react'
import styled from 'styled-components';
import uploadAPI from '../uploadAPI';

const TopCont = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 50px;
    textarea {
        width: 500px;
        height: 300px;
    }
`;

const page = () => {
    const ref= useRef<HTMLTextAreaElement>(null);
    const inputRef= useRef<HTMLInputElement>(null);
    const clickHandler = () => {
        if( ref.current && inputRef.current ) {
            uploadAPI.post( 'movie' , {movieData: JSON.parse(ref.current.value), categoryName: inputRef.current.value}, (data)=>{
                console.log(data);
            } );
        }
    }
    const dbexe = () => {
        uploadAPI.get('dbexe', (data)=>{
            console.log(data);
        })
    }
    return (
        <TopCont>
            <input ref={inputRef} placeholder='category name' />
            <br />
            <textarea ref={ref}></textarea>
            <br />
            <button type='button' onClick={clickHandler}>upload</button>
            <br />
            <button type='button' onClick={dbexe}>exe</button>
        </TopCont>
    )
}

export default page;