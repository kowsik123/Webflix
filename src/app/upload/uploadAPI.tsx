const uploadAPI = {
    post: (uri: string, body: object, callback:(data: any)=>void) => {
        fetch(`api/upload/${uri}`, {method: "post", body: JSON.stringify({ adminAccessId: localStorage.getItem('admin-access-id'), data: body})}).then( (res) => res.ok? res.json():callback({}) ).then( callback );
    },
    get: (uri: string, callback:(data: any)=>void|Function ) => {
        fetch(`api/upload/${uri}`).then( (res) => res.ok? res.json():callback({}) ).then( callback );
    }
};

export default uploadAPI;