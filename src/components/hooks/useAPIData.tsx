"use client";

import { MovieDataType, PersonDataType, VideoDataType } from "@/types";
import { createContext, PropsWithChildren, RefObject, useContext, useEffect, useRef, useState } from "react"

const CacheContext = createContext<RefObject<Map<string, any>>>({ current: new Map() });

const handleError = () => {
    console.error("API Server Error");
    throw new Error("API Server Error");
}

export const CacheProvider = ({ children }: PropsWithChildren) => {
    const cache = useRef(new Map());
    return <CacheContext.Provider value={cache}>
        {children}
    </CacheContext.Provider>
}

const useAPIData = (key: string | undefined) => {
    const cache = useContext(CacheContext);
    if (!cache) {
        console.error('Context Not Provided');
        return;
    }
    const [apiData, setAPIData] = useState();
    useEffect(() => {
        if (!key) return;

        if (cache.current.has(key)) {
            const cacheValue = cache.current.get(key);
            if (cacheValue instanceof Promise) {
                cache.current.get(key).then((data: any) => {
                    setAPIData(data);
                });
            } else {
                setAPIData(cacheValue);
            }
        } else {
            cache.current.set(key, fetch(`/api/${key}`).then((res) => res.ok ? res.json() : handleError()).then((data) => {
                cache.current.set(key, data);
                setAPIData(data);
                return data;
            }));
        }
    }, [cache, key]);
    return apiData;
}

export const useMovieData = (id: string | undefined): MovieDataType | undefined => {
    return useAPIData(id ? `movies/${id}` : undefined);
}

export const useVideoData = (id: string | undefined): VideoDataType | undefined => {
    return useAPIData(id ? `videos/${id}` : undefined);
}

export const usePersonData = (id: string | undefined): PersonDataType | undefined => {
    return useAPIData(id ? `persons/${id}` : undefined);
}

export const useMovieList = () => {
    const [movieList, setMovieList] = useState<Array<MovieDataType>>([]);
    useEffect(() => {
        fetch('/api/movies').then((res) => res.json()).then((data) => {
            setMovieList(data);
        })
    }, []);
    return movieList;
}