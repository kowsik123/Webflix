"use client";

import { MovieDataType, VideoDataType } from "@/types";
import { createContext, PropsWithChildren, RefObject, useContext, useEffect, useRef } from "react"

const CacheContext = createContext<RefObject<Map<string, any>>>( {current: new Map()} );

const handleError = () => {
    //TODO: Show Error Message
    console.error("API Server Error");
    throw new Error("API Server Error");
}

export const CacheProvider = ({children}: PropsWithChildren) => {
    const cache = useRef( new Map() );
    return <CacheContext.Provider value={ cache }>
        {children}
    </CacheContext.Provider>
}

const useAPIData = (key: string, callback: (data: any)=>void) => {
    const cache = useContext(CacheContext);
    useEffect( () => {
        if(!key) return;

        if( cache.current.has( key ) ) {
            const cacheValue = cache.current.get( key );
            if(cacheValue instanceof Promise) {
                cache.current.get( key ).then( callback );
            } else {
                callback( cacheValue );
            }
        } else {
            cache.current.set( key, fetch(`/api/${key}`).then( (res) => res.ok? res.json():handleError()).then( (data)=>{
                cache.current.set( key, data );
                callback(data);
                return data;
            } ) );
        }
    }, [cache, callback, key] );
}

export const useMovieData = (id: string, callback: (data: MovieDataType)=>void) => {
    useAPIData( `movies/${id}`, callback );
}

export const useVideoData = (id: string, callback: (data: VideoDataType)=>void) => {
    useAPIData( `videos/${id}`, callback );
}