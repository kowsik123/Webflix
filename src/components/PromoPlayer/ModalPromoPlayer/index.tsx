"use client"

import { MovieDataType } from '@/types'
import { faPlay, faPlus, faRotate, faThumbsUp, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactEventHandler, useEffect, useRef, useState } from 'react'
import { AgeRating, MovieButton, MovieButtonCont, MovieInfo, MovieInfoBackground, MovieTitle, Video, VideoButton, VideoCont, VideoOptions } from '../styled'
import { useVideoData } from '@/components/hooks';
import Link from 'next/link';

const ModalPromoPlayer = ({ movieData }: { movieData: MovieDataType }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoData = useVideoData(movieData.promoVideoRef);
  useEffect( ()=>{
    if(videoRef.current) {
      const observer = new IntersectionObserver(([entry])=>{
        if(entry.isIntersecting) videoRef.current?.play();
        else videoRef.current?.pause();
      }, {threshold: 0.1});
      observer.observe(videoRef.current);
      return ()=>observer.disconnect();
    }
  }, [ videoRef ] );
  const videoButtonClick = () => {
    if (ended) {
      videoRef.current?.play();
    }
    else setMuted(prev => !prev)
  }
  const videoPlay: ReactEventHandler = (e) => {
    setEnded(false);
  }
  const videoEnd: ReactEventHandler = (e: any) => {
    e.target.load();
    e.target.pause();
    setEnded(true);
  }
  return (
    <VideoCont>
        <Video ref={videoRef} autoPlay muted={muted} src={videoData?.src} poster={movieData.posterImgSrc} onPlay={videoPlay} onEnded={videoEnd}></Video>
        <VideoOptions $compact>
          <VideoButton onClick={videoButtonClick}>
            {ended ? <FontAwesomeIcon icon={faRotate} width={20} height={20} /> : muted ? <FontAwesomeIcon icon={faVolumeXmark} width={20} height={20} /> : <FontAwesomeIcon icon={faVolumeHigh} width={20} height={20} />}
          </VideoButton>
          <AgeRating>{movieData.ageRating || ""}</AgeRating>
        </VideoOptions>
        <MovieInfoBackground />
        <MovieInfo $compact hidden={ended}>
          {movieData.titleImgSrc ? <img src={movieData.titleImgSrc} width={200}></img> : <MovieTitle>{movieData.title || "Untitled"}</MovieTitle>}
          <MovieButtonCont>
            <Link href={`/watch/${movieData.id}`}><MovieButton> <FontAwesomeIcon icon={faPlay} /><span>Play</span></MovieButton></Link>
            <MovieButton><FontAwesomeIcon icon={faPlus} /></MovieButton>
            <MovieButton><FontAwesomeIcon icon={faThumbsUp} /></MovieButton>
          </MovieButtonCont>
        </MovieInfo>
    </VideoCont>
  )
}

export default ModalPromoPlayer;