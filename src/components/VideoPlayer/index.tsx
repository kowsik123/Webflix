"use client";

import { Slider } from '@/components';
import { MovieDataType } from '@/types';
import { faCommentDots, faRectangleXmark, faClosedCaptioning } from '@fortawesome/free-regular-svg-icons';
import { faAnglesLeft, faAnglesRight, faArrowLeft, faCompress, faExpand, faPause, faPlay, faSquarePlus, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const VideoPlayerCont = styled.div`
    width: 100vw;
    height: 100vh;
    background: black;
`;

const OptionCont = styled.div`
    width: 100vw;
    height: 100vh;
    background: black;
`

const VideoCont = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const VideoBackground = styled.canvas`
    --height: 100%;
    position: absolute;
    width: 100%;
    height: var(--height);
    z-index: 1;
`

const Video = styled.video`
    width: 100%;
    position: relative;
    z-index: 5;
`

const FloatingBox = styled.div`
    width: 100%;
    background: transparent;
    z-index: 2;
    height: 100%;
    backdrop-filter: blur(70px);
`

const FlexCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const optionOverlayStyles = css`
    position: fixed;
    z-index: 30;
    left: 0;
    width: 100%;
    height: fit-content;
`

const TopOptionOverlay: any = styled(FlexCont)`
    ${optionOverlayStyles}
    transition: top .5s;
    top: ${({$open}:any)=>$open?'0':'-100%'};
    padding: 0 10px;
`

const BottomOptionOverlay: any = styled.div`
    ${optionOverlayStyles}
    transition: bottom .5s;
    bottom: ${({$open}:any)=>$open?'0':'-100%'};
    padding-bottom: 10px;
`

const IconButton = styled.div`
    margin: 20px;
    margin-right: 0;
    &:last-of-type {
        margin-right: 20px;
    }
    cursor: pointer;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > svg {
        width: 35px;
        height: 35px;
        cursor: pointer;
    }
`

const MovieTitle = styled.h3`
    user-select: none;
`

const VideoPlayer = ({movieData}: {movieData: MovieDataType}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [hideBackground, setHideBackground] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [muted, setMuted] = useState(false);
    const openTimeout = useRef(-1);
    const videoData: any = movieData.videoRef;
    const videoOption = {
        removeCloseRequest: () => {
            if(openTimeout.current==-1) return;

            window.clearTimeout(openTimeout.current);
            openTimeout.current=-1;
        },
        open: () => {
            videoOption.removeCloseRequest();
            setOpen(true);
        },
        openWithCloseRequest: () => {
            videoOption.open();
            videoOption.requestClose();
        },
        requestClose: () => {
            if(video.paused()) return;
            videoOption.removeCloseRequest();
            openTimeout.current = window.setTimeout( ()=>setOpen(false), 3000 );
        },
        close: () => {
            setOpen(false);
            videoOption.removeCloseRequest();
        }
    }
    const video = {
        play: () => {
            videoRef.current?.play();
        },
        playOrPause: () => {
            if(!videoRef.current) return;

            videoRef.current.paused? video.play():video.pause();
        },
        pause: () => {
            videoRef.current?.pause();
            videoOption.open();
        },
        paused: () => videoRef.current?.paused,
        forward: () => {
            if(videoRef.current) videoRef.current.currentTime+=10;
            requestAnimationFrame(drawBackground);
        },
        backward: () => {
            if(videoRef.current) videoRef.current.currentTime-=10;
            requestAnimationFrame(drawBackground);
        },
        setTime: (percent: number) => {
            if(videoRef.current) videoRef.current.currentTime=videoRef.current.duration*(percent/100);
        }
    }
    const pointerMove = () => {
        if(video.paused()) return;

        videoOption.openWithCloseRequest();
    };
    const onSliderChange= (v:number) => {
        setSliderValue( v );
        video.setTime( v );
        videoOption.requestClose();
    }
    const onTimeUpdate: any = (e: {target: HTMLVideoElement}) => {
        setSliderValue( (e.target.currentTime/e.target.duration)*100 );
        if(video.paused()) {
            requestAnimationFrame(drawBackground);
        }
    }
    const drawBackground = () => {
        if(!videoRef.current || !canvasRef.current) return;

        const videoEle = videoRef.current;
        const canvas = canvasRef.current;
        if (!videoEle.paused && !videoEle.ended) {
            canvas.getContext('2d')?.drawImage(videoEle, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawBackground);
        }
        else {
            canvas.getContext('2d')?.drawImage(videoEle, 0, 0, canvas.width, canvas.height);
        }
    }
    const toggleBackground = ()=>{
        setHideBackground(prev=>!prev);
        requestAnimationFrame(drawBackground);
    }
    const toggleFullscreen = () => {
        if(document.fullscreenElement) {
            document.exitFullscreen();
            setFullscreen(false);
        }
        else document.body.requestFullscreen().then( ()=>{
            setFullscreen(true);
        });
    }
    const onButtonClick = (callback: Function)=>{
        return (e: any)=>{
            callback(e);
            videoOption.requestClose();
        };
    }
    useEffect(()=>{
        const handler = ()=>{
            if(!videoRef.current || !canvasRef.current) return;

            canvasRef.current.style.setProperty('--height', ((window.innerHeight - videoRef.current.clientHeight)*0.5 + videoRef.current.clientHeight )+"px");
        };
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    useEffect(()=>{
        if(videoRef.current) videoRef.current.play();
    }, [videoRef])
    return <VideoPlayerCont>
        <OptionCont>
            <TopOptionOverlay $open={open}>
                <IconButton onClick={onButtonClick(()=>router.back())} role='button'><FontAwesomeIcon icon={faArrowLeft} width={16} height={16} /></IconButton>
                <IconButton onClick={onButtonClick(()=>{})} role='button'><FontAwesomeIcon icon={faCommentDots} width={16} height={16} /></IconButton>
            </TopOptionOverlay>
            <VideoCont onPointerMove={pointerMove} onClick={onButtonClick(video.playOrPause)}>
                {!hideBackground && <FloatingBox />}
                <Video ref={videoRef} muted={muted} src={videoData.src} onTimeUpdate={onTimeUpdate} onPlay={()=>{requestAnimationFrame(drawBackground);setPlaying(true);}} onPause={()=>setPlaying(false)} onEnded={()=>setPlaying(false)} />
                {!hideBackground && <VideoBackground ref={canvasRef} />}
                {!hideBackground && <FloatingBox />}
            </VideoCont>
            <BottomOptionOverlay $open={open}>
                <Slider value={sliderValue} onChange={onSliderChange} />
                <FlexCont>
                    <FlexCont>
                        <IconButton onClick={onButtonClick(video.playOrPause)}><FontAwesomeIcon icon={playing?faPause:faPlay} width={16} height={16} /></IconButton>
                        <IconButton onClick={onButtonClick(video.backward)}><FontAwesomeIcon icon={faAnglesLeft} width={16} height={16} /></IconButton>
                        <IconButton onClick={onButtonClick(video.forward)}><FontAwesomeIcon icon={faAnglesRight} width={16} height={16} /></IconButton>
                        <IconButton onClick={onButtonClick(()=>setMuted(prev=>!prev))}><FontAwesomeIcon icon={muted?faVolumeMute:faVolumeHigh} width={16} height={16} /></IconButton>
                    </FlexCont>
                    <MovieTitle>{movieData.title}</MovieTitle>
                    <FlexCont>
                        <IconButton onClick={onButtonClick(()=>{})}><FontAwesomeIcon icon={faClosedCaptioning} width={16} height={16} /></IconButton>
                        <IconButton onClick={onButtonClick(toggleBackground)}><FontAwesomeIcon icon={hideBackground?faSquarePlus:faRectangleXmark} width={16} height={16} /></IconButton>
                        <IconButton onClick={onButtonClick(toggleFullscreen)}><FontAwesomeIcon icon={fullscreen?faCompress:faExpand} width={16} height={16} /></IconButton>
                    </FlexCont>
                </FlexCont>
            </BottomOptionOverlay>
        </OptionCont>
    </VideoPlayerCont>
};

export default VideoPlayer;