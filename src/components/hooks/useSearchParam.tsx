"use client";

import { useRouter, useSearchParams } from "next/navigation"

const useSearchParam = (param: string) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const add = (value: string) => {
        const query = new URLSearchParams(searchParams);
        query.set(param, value);
        router.push( `?${query.toString()}` );
    };
    const remove = () => {
        const query = new URLSearchParams(searchParams);
        query.delete(param);
        router.push( `?${query.toString()}` );
    }
    return { id: searchParams.get(param), add, remove };
}

export default useSearchParam;