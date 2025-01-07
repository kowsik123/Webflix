import { RefObject, useEffect } from "react";

const useOutsideClick = (elementRef: RefObject<HTMLElement|null>, handler?: boolean | (()=>void)) => {
    useEffect( ()=>{
        if(typeof handler != 'function') return;

        const callback = (e: any)=>{
          console.log(e.target, elementRef.current);
          if(elementRef.current && !elementRef.current.contains(e.target)) {
            handler();
          }
        };
        window.addEventListener('click', callback);
        return () => window.removeEventListener('click', callback);
    }, [handler] );
};

export default useOutsideClick;