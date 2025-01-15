"use client";

const fetchAPI = {
    post: (uri: string, body: object, callback:(data: any)=>void) => {
        fetch(`/api/${uri}`, {method: "post", body: JSON.stringify({ adminAccessId: localStorage.getItem('admin-access-id'), data: body})}).then( (res) => res.ok? res.json():callback(null) ).then( callback );
    },
    get: (uri: string, callback:(data: any)=>void, body?: Record<string,string>) => {
        if(body) {
            fetch(`/api/${uri}?${new URLSearchParams(body).toString()}`).then( (res) => res.ok? res.json():callback(null) ).then( callback );
        }
        else fetch(`/api/${uri}`).then( (res) => res.ok? res.json():callback(null) ).then( callback );
    }
};

export default fetchAPI;