import styled from "styled-components";

export const UploadCont = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    background-color: #242831;
    padding: 10px 20px;
    height: fit-content;
    max-height: calc(100vh - 40px);
    overflow-x: hidden;
    overflow-y: scroll;
    input, select, button {
        display: block;
        padding: 2px 10px;
        width: 100%;
        margin-bottom: 10px;
    }
    button {
        cursor: pointer;
    }
    button.inline {
        display: inline;
    }
    textarea {
        display: block;
        padding: 2px 10px;
        height: 100px;
        width: 100%;
        resize: vertical;
        margin-bottom: 10px;
    }
    pre {
        margin: 10px 0;
        font-weight: bolder;
        button {
            width: fit-content;
            margin: 5px;
        }
    }
    pre > input, pre > select {
        display: inline;
        margin: 5px;
        margin-left: 10px;
        width: 170px;
    }
    .upload-title {
        width: 100%;
        margin: 5px 0 10px 0;
        text-align: center;
        user-select: none;
    }
    .movie-title-img {
        width: 100%;
    }
`;

export const MovieUploadCont = styled(UploadCont)`
    width: 400px;
    min-width: 400px;
`
export const VideoUploadCont = styled(UploadCont)`
    width: 600px;
    min-width: 600px;
    video.upload-preview {
        width: 100%;
    }
    pre {
        .front {
            margin-left: 40px;
        }
    }
    pre.video-metadata {
        input {
            width: 100px;
        }
    }
`

export const App = styled.div`
    display: flex;
    overflow-x: auto;
    padding: 20px;
    gap: 20px;
`