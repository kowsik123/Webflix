"use client";

import { useSearchParams } from "next/navigation"

const useSearchParam: any = (param: string) => {
    const searchParams = useSearchParams();
    const add = (value: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set(param, value);
        window.history.pushState({}, "", url);
    };
    const remove = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete(param);
        window.history.pushState({}, "", url);
    }
    return { id: searchParams.get(param), add, remove };
}

export default useSearchParam;