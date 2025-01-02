export type DataType = {
    id?: string,
}

export type MovieDataType = DataType & {
    title: string,
    description: string,
    titleImgSrc: string,
    ageRating: 'U'|'U/A 7+'|'U/A 13+'|'U/A 16+'|'A'|string,
    contentWarnings: Array<'Violence' | 'Tobacco Use' | 'Sex' | 'Sexual Violence' | 'Sexual Violence References' | 'Child Abuse' | 'Nudity' | 'Self-harm' | 'Suicide' | 'Substances' | 'Language' | 'Disturbing Images' | 'Animal Harm'|string>,
    tags: Array<string>,
    genres: Array<string>,
    directorRefList: Array<string>,
    castRefList: Array<string>,
    writerRefList: Array<string>,
    videoRef: string | VideoDataType,
    posterImgSrc: string,
    moreVideoRefList: Array<string>,
    collectionRef?: string,
};

export type VideoDataType = DataType & {
    title: string,
    src: string,
    audio: Array<string>,
    subtitles: Array<string>,
    division: {
        recap?: number,
        intro?: number,
        content: number,
        endCredit?: number
    },
    releaseDate: string,
    duration?: number,
    quality?: "4K"|"HD"|"SD"|string,
}

export type UploadPropType<T> = {
    id?: string,
    defaultData?: T,
    onFinish?: (data: T)=>void,
}