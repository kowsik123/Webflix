"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";

const TimeSlider = styled.div`
    --slider-value: 0%;
    width: calc(100% - 40px);
    margin: 5px 20px;
    height: 6px;
    border-radius: 6px;
    background-color: #ffffffae;
    position: relative;
    cursor: pointer;
    user-select: none;
    -webkit-user-drag: none;
`

const MarkerCont = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    border-radius: 6px;
    width: var(--slider-value);
    max-width: 100%;
    min-width: 0%;
    background: linear-gradient(to right, #1c64ff, #1c64ff, #ce00ce);
`

const Marker = styled.div`
    --size: 15px;
    position: absolute;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-color: white;
    left: calc(100% - var(--size)/2);
    user-select: none;
    -webkit-user-drag: none;
    cursor: pointer;
`

const getSliderValue = (e: MouseEvent, ele: HTMLDivElement | null ) => {
    if(!ele) return 0;

    const { width, x } = ele.getBoundingClientRect();
    let value = ((e.pageX-x)/width) * 100;
    if(value<0) value=0;
    else if(value>100) value=100;
    return value;
}

const Slider = ({value, onChange}:any) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const setSlideValue = (v: number) => {
        trackRef.current?.style.setProperty('--slider-value', v+"%");
    }
    const mouseDown = (e:any) => {
        const handler = (he:any)=>{
            onChange?.(getSliderValue(he, trackRef.current));
        };
        window.addEventListener('mousemove', handler);
        window.addEventListener('mouseup', (e)=>{
            window.removeEventListener('mousemove', handler);
        });
    }
    useEffect( ()=>{
        setSlideValue(value);
    }, [value]);
    const clickHandler = (e: any) => {
        onChange?.(getSliderValue(e, trackRef.current));
    }
    return <TimeSlider ref={trackRef} role='slider' onClick={clickHandler} onDragStart={(e)=>e.preventDefault()}>
        <MarkerCont>
            <Marker onMouseDown={mouseDown} onDragStart={(e)=>e.preventDefault()} />
        </MarkerCont>
    </TimeSlider>
}

export default Slider;