"use client";

import { PromoPlayer } from "@/components";
import Catergories from "./components/Catergories";
import { useEffect, useState } from "react";
import fetchAPI from "./fetchAPI";
import { MovieDataType } from "@/types";

export default function Home() {
  const [movieData, setMovieData] = useState<MovieDataType>();
  useEffect(()=>{
    fetchAPI.get(`movies/today`, (data)=>{
      if(data) setMovieData( data );
    })
  }, []);
  return (
    <>
      {movieData && <PromoPlayer movieData={movieData} />}
      <Catergories />
    </>
  );
}
