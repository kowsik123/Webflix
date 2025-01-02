"use client";
import React, { ReactEventHandler, useContext, useEffect, useState } from 'react';
import { MovieUploadCont } from './styled';
import { UploadAppContext, UploadAppContextType } from './page';
import { MovieDataType, UploadPropType, VideoDataType } from '@/types';
import fetchAPI from '../fetchAPI';
import InputArray from '@/components/InputArray';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';

const ageRatingList = ['U','U/A 7+','U/A 13+','U/A 16+','A'];
const contentWarningList = ['Violence', 'Sex', 'Sexual Violence', 'Sexual Violence References', 'Child Abuse', 'Nudity', 'Self-harm', 'Suicide', 'Substances', 'Language', 'Disturbing Images', 'Animal Harm', 'Tobacco Use'];

const defaultMovieData: MovieDataType = {
    id: "fLWpfhkfQDnCoBQEXOh3",
    genres: ["Drama Movies","Mystery Movies","Family Movies"],
    collectionRef: "4k4k3a96a9DbRXzebKgx",
    titleImgSrc: "https://occ-0-8407-1723.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABWKJ0UYnkwnv8ymN_3wt3uZtr8bAci3FDC7A0DIjx7fFtjjz_N_eo-_d6W0nApjCrwvEzB9gzJ_J3qeo5MhJLF8IkyxFxvLcQzBn32VuSoBLRzw6fdeO3jLyHriKZZ4cIvZnAEeiuEvtDP0ZHD_xhHq_tQKJ03ZXzfUQZJDDGlEL6cz9Hrm5_A.png?r=01e",
    writerRefList: ["wz0KkHyVAPDLYvox1LdT"],
    title: "Enola Holmes",
    tags: ["Witty","Suspenseful","Exciting"],
    posterImgSrc: "https://occ-0-6499-3663.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABQwcOwhds4qz5M6WMk53UB3fQYLxepj0fPBz5SNa3lsDGO6GNZxg-KoFcUGm7K6bWA7U3-7Ym4IgUtEnK-_F1KBiM2SiBaC2a19G.webp?r=ce4",
    videoRef: "ygmBjFGWMeid8FLiXOKc",
    directorRefList: ["e92rna7Q9IsXwgeyxEVE"],
    description: "While searching for her missing mother, intrepid teen Enola Holmes uses her sleuthing skills to outsmart big brother Sherlock and help a runaway lord.",
    moreVideoRefList: [],
    contentWarnings: ["Tobacco Use", "Violence"],
    castRefList: ["JRcLsrMneR0lPnnwWzRD","dTqYsVarAP3lyNkdlJyN"],
    ageRating: "U/A 13+"
}

const getId = (ref:any) => {
    if(typeof ref == 'string') {
        return ref;
    } else if(typeof ref == 'object' && ref.id) {
        return ref.id
    } else return undefined;
}

export const MovieUpload = ({id, defaultData, onFinish=()=>{}}: UploadPropType<MovieDataType>) => {
    const {addUpload, deleteUpload} = useContext<UploadAppContextType>(UploadAppContext);
    const [movieData, setMovieData] = useState<MovieDataType>(defaultData||defaultMovieData);
    console.log(movieData);
    useEffect( ()=>{
        if(id) fetchAPI.get( `movies/${id}`, (data)=>{
            setMovieData(data);
        });
    }, [id]);
    const createVideoUpload = () => {
            addUpload({type: 'video', id: 'video-1', props: { onFinish: (data: VideoDataType)=>{
                setMovieData( (d)=>{
                    d = structuredClone(d);
                    d.videoRef = structuredClone(data);
                    return d;
                } );
                deleteUpload('video-1');
            }, id: getId(movieData.videoRef) }});
    };
    const genre = {
        add: ()=>setMovieData(data=>{
            data = structuredClone(data);
            data.genres.push("");
            return data;
        }),
        remove: (index: number)=>setMovieData(data=>{
            data = structuredClone(data);
            data.genres.splice(index,1);
            return data;
        }),
        update: (index: number, value: string)=>setMovieData(data=>{
            data = structuredClone(data);
            data.genres[index]=value;
            return data;
        })
    }
    const tag = {
        add: ()=>setMovieData(data=>{
            data = structuredClone(data);
            data.tags.push("");
            return data;
        }),
        remove: (index: number)=>setMovieData(data=>{
            data = structuredClone(data);
            data.tags.splice(index,1);
            return data;
        }),
        update: (index: number, value: string)=>setMovieData(data=>{
            data = structuredClone(data);
            data.tags[index]=value;
            return data;
        })
    }
    const update = (key:string) => ((e: any) => {
        setMovieData( (data: any) => {
            data = structuredClone(data);
            data[key] = e.target.value;
            return data;
        } )
    });
    const updateAgeRating: any = (value: string)=>{
        setMovieData( (data) => {
            data = structuredClone(data);
            data.ageRating = value;
            return data;
        } )
    }
    const updateContentWarnings: any = (value: Array<string>) => {
        setMovieData( (data) => {
            data = structuredClone(data);
            data.contentWarnings = value;
            return data;
        } )
    };
    const onSubmit:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(movieData);
    };
    return <MovieUploadCont>
        <pre className='upload-title'>Movie Upload</pre>
        <form method='post' onSubmit={onSubmit}>
            <Input label='Title:' name='title' placeholder='Title' value={movieData.title} onChange={update('title')} required />
            <Input label='Title Image URL:' type='url' placeholder='title image url' value={movieData.titleImgSrc} onChange={update('titleImgSrc')} />
            {movieData.titleImgSrc && <img className='movie-title-img' src={movieData.titleImgSrc} />}
            <label>Description:<textarea name='description' placeholder='description' value={movieData.description} onChange={ update('description') } /></label>
            <label>Age Ratings:<Dropdown options={ageRatingList} value={movieData.ageRating} onSelect={updateAgeRating} required /></label>
            <Dropdown.Multiple placeholder='Content Warnings' options={contentWarningList} value={movieData.contentWarnings} onSelect={updateContentWarnings} required />
            <InputArray.Text placeholder="genre" required array={movieData.genres} arrayActions={genre} />
            <InputArray.Text placeholder='tags' required array={movieData.tags} arrayActions={tag} />
            <pre>
                {"["}
                <input name='director' placeholder='director' />
                {"]"}
            </pre>
            <pre>
                {"["}
                <input name='writer' placeholder='writer' />
                {"]"}
            </pre>
            <pre>
                {"["}
                <input name='cast' placeholder='cast' />
                {"]"}
            </pre>
            <pre>
                {"["}
                <input name='moreVideoRefList' placeholder='more video' />
                {"]"}
            </pre>
            <button type='button' onClick={createVideoUpload}>{getId(movieData.videoRef||"video")}</button>
            <input name='collectionRef' placeholder='collection' value={getId(movieData.collectionRef)||""} readOnly />
            {/* (Single Dropdown With Create Option)query collection using name or create one */}
            <button type='submit'>submit</button>
        </form>
    </MovieUploadCont>;
};
