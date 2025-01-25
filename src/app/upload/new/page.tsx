"use client";
import React, { useRef } from 'react'
import styled from 'styled-components';

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
            fetch(`/api/upload/movie`, {method: "post", body: JSON.stringify({movieData: JSON.parse(ref.current.value), categoryName: inputRef.current.value})}).then( (res) => res.json() ).then( (data)=>{
                console.log(data);
            } );
        }
    }
    return (
        <TopCont>
            <input ref={inputRef} placeholder='category name' />
            <br />
            <textarea ref={ref}></textarea>
            <br />
            <button type='button' onClick={clickHandler}>upload</button>
        </TopCont>
    )
}

export default page;