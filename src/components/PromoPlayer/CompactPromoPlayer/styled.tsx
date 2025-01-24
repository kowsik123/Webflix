import styled, { css, keyframes } from "styled-components";

export const CompactPromoCont: any = styled.div`
  width: 250px;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: width var(--animation-duration);
  transition-delay: 0;
  overflow: hidden;
  ${({$open}:any)=> $open && css`
    transition-delay: var(--animation-duration);
    width: 330px;
  ` }
`;

export const CompactVideo = styled.video`
  position: absolute;
  top: 0;
  width: 250px;
  height: 100%;
  z-index: 5;
`

export const videoOptionStyles = css`
  position: absolute;
  z-index: 3;
  top: 0;
  width: 40px;
  height: 100%;
  background-color: #1616169e;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const RightVideoOption = styled.div`
  ${videoOptionStyles}
  right: 0;
  border-left: unset;
  border-radius: 0 5px 5px 0;
`

export const LeftVideoOption = styled.div`
  ${videoOptionStyles}
  left: 0;
  border-right: unset;
  border-radius: 5px 0 0 5px;
`;

export const CompactVideoButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid white;
  border-radius: 30px;
  background-color: #00000077;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
`;

export const CompactVideoOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 250px;
  height: 100%;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const widthAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`

export const CompactPosterImg = styled.img`
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  height: 100%;
`

export const DurationAnimation: any = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  height: 1px;
  animation: ${widthAnimation} ${({duration}:any) => duration}s;
  background-color: white;
`