"use client"
import React, { createContext, useEffect, useRef, useState } from 'react';
import { App } from './styled';
import { login } from './login';
import { MovieUpload } from './MovieUpload';
import { VideoUpload } from './VideoUpload';
import { UploadPropType } from '@/types';

export type UploadType = {
    type: 'video'|'movie'|'category',
    props?: UploadPropType<any>,
    id: string,
}

export type UploadAppContextType = {
    addUpload: (upload: UploadType)=>void,
    deleteUpload: (uploadId: UploadType['id'])=>void,
};

export const UploadAppContext = createContext<UploadAppContextType>({addUpload: console.log,deleteUpload: console.log});

const Uploads = () => {
    const [uploads, setUploads] = useState<Array<UploadType>>([{type: 'movie', id: 'movie-1', props: {id: "fLWpfhkfQDnCoBQEXOh3"} }]);
    const addUpload = (upload: UploadType)=>{
        setUploads( arr => [...arr, upload] );
    };
    const deleteUpload = (uploadId: UploadType['id']) => {
        setUploads( (arr) => arr.filter( (upload)=>upload.id!=uploadId ) );
    }
    return <UploadAppContext.Provider value={{addUpload, deleteUpload}}>
        <App>
            {uploads.map( (upload)=> {
                if(upload.type=='movie') return <MovieUpload key={`movie-upload-${upload.id}`} {...upload.props} />;
                else if(upload.type=='video') return <VideoUpload onFinish={(data)=>{}} key={`video-upload-${upload.id}`} {...upload.props} />;
                else return <></>;
            })}
        </App>
    </UploadAppContext.Provider>;
}

const UploadPage = () => {
    const [accessId, setAccessId] = useState<string | null>();
    useEffect( ()=>{
        login( (adminAccessId)=>setAccessId(adminAccessId) );
    } ,[]);
    return accessId?<Uploads />:<div>Access Denied</div>;
}

export default UploadPage;