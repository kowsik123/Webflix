import React from 'react'
import PagePad from '../components/PagePad';

const Search = async ({searchParams}:any) => {
    const {query} = await searchParams;
    console.log(query);
  return (
    <>
        <PagePad />
        <div>Search</div>
    </>
  )
}

export default Search