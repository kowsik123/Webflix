"use client";

import React, { InputHTMLAttributes } from "react";

type TextInputArrayProps = {
    array: Array<string>,
    arrayActions: {
        remove: (index: number)=>void, 
        update: (index: number, value: string)=>void, 
        add: ()=>void
    }
} & InputHTMLAttributes<HTMLInputElement>;

const InputArray = {
    Text: ({ array, arrayActions: {add, remove, update}, ...props }: TextInputArrayProps) => {
        return <pre>
            {"["}<br />
            {array?.map((value: string, index: number) => <React.Fragment key={`input-${index}`}><input {...props} className="front" value={value} onChange={(e) => update(index, e.target.value)} /><button onClick={() => remove(index)} className='inline' type='button'>X</button><br /></React.Fragment>)}
            <button className="front" type='button' onClick={add}>add</button><br />
            {"]"}
        </pre>;
    }
};

export default InputArray;