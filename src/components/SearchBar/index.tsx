"use client"

import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBarCont = styled.div`
    height: 30px;
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 30px;
    border: 1px solid white;
    border-color: transparent;
    input {
        all: unset;
        font-size: 13px;
        padding-left: 5px;
        width: 170px;
    }
    label {
        clip: rect(1px, 1px, 1px, 1px) !important;
        height: 1px !important;
        overflow: hidden !important;
        position: absolute !important;
        white-space: nowrap !important;
        width: 1px !important;
    }
    &.open {
        width: 200px;
        transition: width .5s;
        border-color: white;
    }
`;

const SearchIcon = styled.div`
    height: 100%;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
        width: 15px;
        height: 15px;
    }
`;

type SearchBarPropType = {
    onSearch: React.ChangeEventHandler<HTMLInputElement>,
    id?: string,
    placeholder?: string,
}

const SearchBar = ({onSearch, placeholder, id='nav-search-bar'}:SearchBarPropType ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open ,setOpen] = useState(false);
    const iconClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
        setOpen(true);
        setTimeout(()=>inputRef.current?.focus(), 500);
    }
  return (
    <SearchBarCont className={open?'open':''}>
        <SearchIcon onClick={iconClickHandler}><FontAwesomeIcon icon={faSearch} width={15} height={15} /></SearchIcon>
        <label htmlFor={id}>Search</label>
        <input id={id} ref={inputRef} placeholder={placeholder} onBlur={()=>{ setOpen(false) }} onChange={onSearch} />
    </SearchBarCont>
  )
}

export default SearchBar