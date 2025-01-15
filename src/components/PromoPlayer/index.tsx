"use client"

import fetchAPI from '@/app/fetchAPI'
import { MovieDataType } from '@/types'
import { faAngleDown, faAngleRight, faAnglesRight, faPlay, faRotate, faThumbTack, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactEventHandler, useEffect, useRef, useState } from 'react'
import { AgeRating, MovieButton, MovieButtonCont, MovieInfo, MovieInfoBackground, MovieTitle, TopPixel, Video, VideoButton, VideoCont, VideoOptions } from './styled'
import styled, { css, keyframes } from 'styled-components'
import CompactPromoPlayer from './CompactPromoPlayer'

const HIDE_MOVIE_INFO_AFTER = 5000;

const PromoPlayer = ({ movieData }: { movieData: MovieDataType }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const mouseEntered = useRef<boolean>(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState();
  const [hideInfo, setHideInfo] = useState(false);
  useEffect(() => {
    if(movieData.promoVideoRef) fetchAPI.get(`videos/${movieData.promoVideoRef}`, (videoData) => {
      if (videoData && videoData.src) {
        setVideoSrc(videoData.src);
      }
    })
  }, []);
  useEffect( ()=>{
    if(ref.current) {
      const observer = new IntersectionObserver(([entry])=>{
        if(videoSrc) setHideInfo(entry.isIntersecting);
      });
      observer.observe(ref.current);
      ()=>observer.disconnect();
    }
  }, [ ref, videoSrc ] );
  const videoButtonClick = () => {
    if (ended) {
      videoRef.current?.play();
    }
    else setMuted(prev => !prev)
  }
  const videoPlay: ReactEventHandler = (e) => {
    setEnded(false);
    setHideInfo(false);
    setTimeout(() => setHideInfo(true), HIDE_MOVIE_INFO_AFTER);
  }
  const videoEnd: ReactEventHandler = (e: any) => {
    e.target.load();
    e.target.pause();
    setEnded(true);
    setHideInfo(false);
  }
  const videoPause = (e: any) => {
    setHideInfo(false);
  }
  const videoOptionsMouseEntered = ()=>{ 
    if(hideInfo) { 
      mouseEntered.current=true; 
      setHideInfo(false);
    }
  }
  const videoOptionsMouseLeft = () => {
    if(mouseEntered.current) {
      mouseEntered.current=false;
      setHideInfo(true);
    }
  }
  return (
    <VideoCont>
      <TopPixel ref={ref} />
      {videoSrc && <>
        <Video ref={videoRef} autoPlay={false} muted={muted} src={videoSrc} poster={movieData.posterImgSrc} onPlay={videoPlay} onEnded={videoEnd} onPause={videoPause}></Video>
        <VideoOptions onMouseEnter={videoOptionsMouseEntered} onMouseLeave={videoOptionsMouseLeft}>
          <VideoButton onClick={videoButtonClick}>
            {ended ? <FontAwesomeIcon icon={faRotate} width={20} height={20} /> : muted ? <FontAwesomeIcon icon={faVolumeXmark} width={20} height={20} /> : <FontAwesomeIcon icon={faVolumeHigh} width={20} height={20} />}
          </VideoButton>
          <AgeRating>{movieData.ageRating || ""}</AgeRating>
        </VideoOptions>
        <MovieInfoBackground />
        <MovieInfo hidden={ended} className={hideInfo ? ' hide-movie-info' : ''}>
          {movieData.titleImgSrc ? <img src={movieData.titleImgSrc} width={200}></img> : <MovieTitle>{movieData.title || "Untitled"}</MovieTitle>}
          <p>{movieData.description}</p>
          <MovieButtonCont>
            <MovieButton><FontAwesomeIcon icon={faPlay} /><span>Play</span></MovieButton>
            <MovieButton><FontAwesomeIcon icon={faAnglesRight} /><span>More Info</span></MovieButton>
          </MovieButtonCont>
        </MovieInfo>
      </>}
    </VideoCont>
  )
}

PromoPlayer.Compact = CompactPromoPlayer;

export default PromoPlayer;