"use client";

import styled, {css} from "styled-components";

export const MovieModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  background-color: #00000075;
  padding: 40px 0;
  overflow-y: auto;
  display: flex;
  justify-content: center;
`

export const MovieModalCont = styled.div`
  border-radius: 10px;
  width: 70%;
  position: relative;
  height: fit-content;
  overflow: hidden;
  user-select: none;
`

export const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: #242424;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
`;

export const MovieDataCont = styled.div`
  background: linear-gradient(to bottom, #052136, #1E0536);
  height: fit-content;
  width: 100%;
  padding: 0 40px;
  padding-bottom: 20px;
  position: relative;
  h2.more-like-this {
    margin-top: 40px;
    margin-bottom: 20px;
  }
`

export const VideoOverlay = styled.div`
  position: absolute;
  top: -50px;
  left: 0;
  height: 50px;
  width: 100%;
  background: linear-gradient(to bottom, transparent, #052136);
`

export const Overview = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  display: flex;
`

export const OverviewInfo = styled.div`
  width: 60%;
`

export const OverviewCastGenre = styled.div`
  width: 40%;
`

export const OverviewTags: any = styled.div`
  margin: 10px;
  ${({ $noMargin }: any) => $noMargin && css`margin: 12px 0px;`}
  span.title {
    opacity: 0.8;
    background: linear-gradient(126deg, #9ed6ff, #d09eff);
    background-clip: text;
    color: transparent;
  }
`

export const OverviewRowOne = styled.div`
  margin: 10px 5px;
  margin-top: 20px;
  font-size: 18px;
  color: #ffffffb3;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const OverviewRowTwo = styled.div`
  margin: 5px;
  font-size: 14px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 5px;
`

export const LinkListCont = styled.div`
  display: inline;
`

export const Tag = styled.div`
  border: 1px solid #ffffffb3;
  border-radius: 5px;
  font-size: 12px;
  line-height: 16px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const AgeRating = styled.div`
  border: 1px solid #ffffffb3;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
`

export const Description = styled.p`
  margin-top: 40px;
  margin-right: 10px;
  font-size: 15px;
`

export const About = styled.div`
  margin-top: 40px;
  h2 {
    margin-bottom: 20px;
  }
`

export const MovieGrid: any = styled.div`
  display: grid;
  justify-items: stretch;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 20px;
  height: 530px;
  ${({ $open }: any) => $open && css`height: fit-content;`}
  overflow-y: hidden;
`

export const ExpandButton = styled.div`
  z-index: 10;
  width: 100%;
  height: 2px;
  background-color: #818181a7;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    display: block;
    width: 30px;
    height: 30px;
    border: 2px solid #edededa2;
    color: white;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0000006d;
    cursor: pointer;
    &:hover {
      border-color: #ffffff;
    }
  }
`
