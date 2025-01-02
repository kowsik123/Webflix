import React, { useEffect, useState } from 'react';
import { VideoUploadCont } from './styled';
import uploadAPI from './uploadAPI';
import fetchAPI from '../fetchAPI';
import { UploadPropType, VideoDataType } from '@/types';

export const getQuality = (width: number, height: number) => {
    if (width >= 3840 || height >= 2160) {
        return "4K";
    } else if (width >= 1920 || height >= 1080) {
        return "HD";
    } else {
        return "SD";
    }
}
export const getMinuteString = (duration: number| undefined)=>{
    return ((duration||0)/60).toFixed(0)+"m";
}
export const getDurationInSeconds = (value: string)=>{
    const values = value.split(':');
    const seconds = parseInt(values[2]) + parseInt(values[1])*60 + parseInt(values[0])*60*60;
    return seconds;
}
const getDurationString = (value: number) => {
    const hours = Math.floor(value / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((value % 3600) / 60).toString().padStart(2, "0");
    const seconds = (value % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
};

const defaultVideoData = { 
    audio: [""], 
    subtitles: [""], 
    division: { content: 0 }, 
    releaseDate: new Date().toJSON(), 
    title: "", 
    src: ""
}

export const VideoUpload = ( {onFinish=(()=>{}), defaultData, id}: UploadPropType<VideoDataType> ) => {
    const [videoData, setVideoData] = useState<VideoDataType>(defaultData || defaultVideoData);
    useEffect( () =>{
        if(id) fetchAPI.get(`videos/${id}`,(data)=>{
            setVideoData(data);
        });
    }, [id] );
    const videoUrlChange = (e: any) => {
        setVideoData(data => ({ ...data, src: e.target.value }));
    };
    const onSubmit = (e: any) => {
        e.preventDefault();
        const uploadData: any = structuredClone(videoData);
        uploadAPI.post('video', uploadData, onFinish);
    };
    const onTitleChange = (e: any) => {
        setVideoData(data => ({ ...data, title: e.target.value }));
    };
    const audio = {
        add: () => {
            setVideoData(data => {
                return { ...data, audio: [...data.audio, ""] };
            });
        },
        update: (index: number, aud: string) => {
            setVideoData(data => {
                const audio = [...data.audio];
                audio[index] = aud;
                return { ...data, audio };
            });
        },
        delete: (index: number) => {
            setVideoData(data => {
                return { ...data, audio: data.audio.filter((_, i) => i !== index) };
            });
        }
    };
    const subtitle = {
        add: () => {
            setVideoData(data => {
                return { ...data, subtitles: [...data.subtitles, ""] };
            });
        },
        update: (index: number, sub: string) => {
            setVideoData(data => {
                const subtitles = [...data.subtitles];
                subtitles[index] = sub;
                return { ...data, subtitles };
            });
        },
        delete: (index: number) => {
            setVideoData(data => {
                return { ...data, subtitles: data.subtitles.filter((_, i) => i !== index) };
            });
        }
    };
    const division = {
        add: (key: 'recap' | 'endCredit' | 'intro') => {
            setVideoData(data => {
                const newData = { ...data };
                newData.division[key] = 0;
                return newData;
            });
        },
        delete: (key: 'recap' | 'endCredit' | 'intro') => {
            setVideoData(data => {
                const newData = { ...data };
                newData.division[key] = undefined;
                return newData;
            });
        },
        update: (key: 'recap' | 'endCredit' | 'intro' | 'content', value: string) => {
            setVideoData(data => {
                const newData = { ...data };
                newData.division[key] = getDurationInSeconds(value);
                return newData;
            });
        }
    };
    const updateReleaseDate = (e: any) => {
        setVideoData(data => {
            return { ...data, releaseDate: e.target.valueAsDate.toJSON() };
        });
    };
    const videoLoaded = (e: any) => {
        setVideoData(data => {
            return { ...data, duration: parseInt(e.target.duration.toFixed(0)), quality: getQuality(e.target.videoWidth, e.target.videoHeight) };
        });
    };
    const error = (e: any) => {
        setVideoData(data => ({ ...data, quality: undefined, duration: undefined }));
    };
    const isValidVideo = !!(videoData.quality && videoData.duration );
    const isValidForm = isValidVideo;
    return <VideoUploadCont>
        <pre className='upload-title'>Video Upload</pre>
        <form onSubmit={onSubmit} method='post'>
            <input value={videoData.src} name='src' placeholder='video url' type='url' onChange={videoUrlChange} />
            {videoData.src && <video className='upload-preview' onError={error} controls src={videoData.src} onLoadedMetadata={videoLoaded}></video>}
            {isValidVideo && <>
                <input value={getMinuteString(videoData.duration)} readOnly />
                <input value={videoData.quality || ""} readOnly />
                <input name='title' placeholder='title' value={videoData.title} onChange={onTitleChange} />
                <input name='releaseDate' type='date' value={videoData.releaseDate.split('T')[0]} onChange={updateReleaseDate} />
                <pre className='division'>
                    {"{"}<br />
                    <input className='front' value="Recap" readOnly />:
                    {videoData.division.recap ? <><input onChange={(e) => division.update('recap', e.target.value)} value={getDurationString(videoData.division.recap)} type="text" pattern="^([0-5][0-9]):([0-5][0-9]):([0-5][0-9])$" /><button onClick={() => division.delete('recap')} className='inline' type='button'>X</button></> : <button onClick={() => division.add('recap')} type='button' className='inline'>add</button>}<br />
                    <input className='front' value="Intro" readOnly />:
                    {videoData.division.intro ? <><input onChange={(e) => division.update('intro', e.target.value)} value={getDurationString(videoData.division.intro)} type="text" pattern="^([0-5][0-9]):([0-5][0-9]):([0-5][0-9])$" /><button onClick={() => division.delete('intro')} className='inline' type='button'>X</button></> : <button onClick={() => division.add('intro')} type='button' className='inline'>add</button>}<br />
                    <input className='front' value="Main Content" readOnly />:
                    <input type="text" onChange={(e) => division.update('content', e.target.value)} value={getDurationString(videoData.division.content)} pattern="^([0-5][0-9]):([0-5][0-9]):([0-5][0-9])$" /><br />
                    <input className='front' value="End Credit" readOnly />:
                    {videoData.division.endCredit ? <><input onChange={(e) => division.update('endCredit', e.target.value)} value={getDurationString(videoData.division.endCredit)} type="text" pattern="^([0-5][0-9]):([0-5][0-9]):([0-5][0-9])$" /><button onClick={() => division.delete('endCredit')} className='inline' type='button'>X</button></> : <button onClick={() => division.add('endCredit')} type='button' className='inline'>add</button>}<br />
                    {"}"}
                </pre>
                <pre>
                    {"["}<br />
                    {videoData.audio?.map((aud, index) => <React.Fragment key={`audio-data-${index}`}><input className='front' name='audio' placeholder='audio' required value={aud} onChange={(e) => audio.update(index, e.target.value)} /><button onClick={() => audio.delete(index)} className='inline' type='button'>X</button><br /></React.Fragment>)}
                    <button className='front' type='button' onClick={audio.add}>add</button><br />
                    {"]"}
                </pre>
                <pre>
                    {"["}<br />
                    {videoData.subtitles?.map((sub, index) => <React.Fragment key={`subtitle-data-${index}`}><input className='front' name='subtitle' placeholder='subtitle' required value={sub} onChange={(e) => subtitle.update(index, e.target.value)} /><button onClick={() => subtitle.delete(index)} className='inline' type='button'>X</button><br /></React.Fragment>)}
                    <button className='front' type='button' onClick={subtitle.add}>add</button><br />
                    {"]"}
                </pre>
            </>}
            {isValidForm && <button type='submit'>submit</button>}
        </form>
    </VideoUploadCont>;
};
