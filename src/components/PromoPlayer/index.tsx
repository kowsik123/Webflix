"use client"

import { MovieDataType } from '@/types'
import { faAnglesRight, faPlay, faRotate, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactEventHandler, useEffect, useRef, useState } from 'react'
import { AgeRating, MovieButton, MovieButtonCont, MovieInfo, MovieInfoBackground, MovieTitle, TopPixel, Video, VideoButton, VideoCont, VideoOptions } from './styled'
import CompactPromoPlayer from './CompactPromoPlayer'
import { useSearchParam, useVideoData } from '../hooks'
import Link from 'next/link'
import ModalPromoPlayer from './ModalPromoPlayer'

const HIDE_MOVIE_INFO_AFTER = 5000;

const PromoPlayer = ({ movieData }: { movieData: MovieDataType }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const mouseEntered = useRef<boolean>(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hideInfo, setHideInfo] = useState(false);
  const videoData = useVideoData(movieData.promoVideoRef);
  const videoSrc = videoData?.src;
  useEffect( ()=>{
    if(ref.current) {
      const observer = new IntersectionObserver(([entry])=>{
        if(videoSrc) setHideInfo(entry.isIntersecting);
      });
      observer.observe(ref.current);
      ()=>observer.disconnect();
    }
  }, [ ref, videoSrc ] );
  useEffect( ()=>{
    if(videoRef.current) {
      const observer = new IntersectionObserver(([entry])=>{
        if(entry.isIntersecting) videoRef.current?.play()
        else videoRef.current?.pause();
      }, {threshold: 0.3});
      observer.observe(videoRef.current);
      ()=>observer.disconnect();
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
  const { add, id } = useSearchParam('movie');
  useEffect(()=>{
    if(id) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [id]);
  const openMovieModal = () => {
    videoRef.current?.pause();
    movieData.id && add(movieData.id);
  }
  return (
    <VideoCont>
      <TopPixel ref={ref} />
      {videoSrc && <>
        <Video ref={videoRef} autoPlay={!id} muted={muted} src={videoSrc} poster={movieData.posterImgSrc} onPlay={videoPlay} onEnded={videoEnd} onPause={videoPause}></Video>
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
            <Link href={`/watch/${movieData.id}`}><MovieButton> <FontAwesomeIcon icon={faPlay} /><span>Play</span></MovieButton></Link>
            <MovieButton onClick={openMovieModal}><FontAwesomeIcon icon={faAnglesRight} /><span>More Info</span></MovieButton>
          </MovieButtonCont>
        </MovieInfo>
      </>}
    </VideoCont>
  )
}

PromoPlayer.Compact = CompactPromoPlayer;
PromoPlayer.Modal = ModalPromoPlayer;

export default PromoPlayer;