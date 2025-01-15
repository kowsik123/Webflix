import styled from "styled-components";

export const VideoCont = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  position: relative;
`

export const Video = styled.video`
  width: 100%;
`;

export const VideoOptions = styled.div`
  height: 30px;
  width: fit-content;
  position: absolute;
  bottom: 100px;
  right: 0;
  display: flex;
  align-items: center;
`

export const AgeRating = styled.div`
  height: 30px;
  width: 80px;
  background-color: #00000077;
  border-left: 4px solid #e5e5e5;
  display: flex;
  align-items: center;
  padding-left: 6px;
  font-size: 14px;
  color: white;
  user-select: none;
`;

export const VideoButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid white;
  border-radius: 30px;
  background-color: #00000077;
  color: white;
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MovieInfo = styled.div`
  position: absolute;
  left: 0;
  bottom: 100px;
  width: 40%;
  margin-left: 40px;
  transition: opacity 1s;
  opacity: 1;
  user-select: none;
  img {
    width: 100%;
  }
  p {
    text-shadow: 0 0 2px black;
    width: 100%;
    font-size: 16px;
  }
  &.hide-movie-info {
    opacity: 0.2;
  }
  &:hover {
    opacity: 1;
  }
`;

export const MovieTitle = styled.div`
  font-size: 18px;
`;

export const MovieButtonCont = styled.div`
`;

export const MovieButton = styled.button`
  all: unset;
  color: #ffffff;
  border-radius: 4px;
  padding: 7px 12px;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 20px;
  background: linear-gradient(126deg, #005c9f, #5e00b7);
  font-weight: 600;
  &:hover {
    opacity: 0.85;
  }
  > span {
    margin-left: 5px;
  }
`;

export const TopPixel = styled.div`
  position: absolute;
`

export const MovieInfoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  background: linear-gradient(to right, #00000075, transparent);
`;