"use client";

import { PromoPlayer } from '@/components';
import { useMovieData, useSearchParam, useVideoData } from '@/components/hooks';
import { faAngleDown, faAngleUp, faAudioDescription, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Children, PropsWithChildren, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Person from './Person';
import { faClosedCaptioning } from '@fortawesome/free-regular-svg-icons';
import Movie from './Movie';
import { MovieDataType } from '@/types';

const MovieModalBackground = styled.div`
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

const MovieModalCont = styled.div`
  border-radius: 10px;
  width: 70%;
  position: relative;
  height: fit-content;
  overflow: hidden;
  user-select: none;
`

const CloseButton = styled.div`
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

const MovieDataCont = styled.div`
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

const VideoOverlay = styled.div`
  position: absolute;
  top: -50px;
  left: 0;
  height: 50px;
  width: 100%;
  background: linear-gradient(to bottom, transparent, #052136);
`

const Overview = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  display: flex;
`

const OverviewInfo = styled.div`
  width: 60%;
`

const OverviewCastGenre = styled.div`
  width: 40%;
`

const OverviewTags: any = styled.div`
  margin: 10px;
  ${({ $noMargin }: any) => $noMargin && css`margin: 12px 0px;`}
  span.title {
    opacity: 0.8;
    background: linear-gradient(126deg, #9ed6ff, #d09eff);
    background-clip: text;
    color: transparent;
  }
`

const OverviewRowOne = styled.div`
  margin: 10px 5px;
  margin-top: 20px;
  font-size: 18px;
  color: #ffffffb3;
  display: flex;
  align-items: center;
  gap: 10px;
`

const OverviewRowTwo = styled.div`
  margin: 5px;
  font-size: 14px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 5px;
`

const LinkListCont = styled.div`
  display: inline;
`

const Tag = styled.div`
  border: 1px solid #ffffffb3;
  border-radius: 5px;
  font-size: 12px;
  line-height: 16px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AgeRating = styled.div`
  border: 1px solid #ffffffb3;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
`

const Description = styled.p`
  margin-top: 40px;
  margin-right: 10px;
  font-size: 15px;
`

const About = styled.div`
  margin-top: 40px;
  h2 {
    margin-bottom: 20px;
  }
`

const LinkList = ({ children, limit, more }: { limit: number, more?: React.ReactNode } & PropsWithChildren) => {
  return <LinkListCont>
    {Children.count(children) > limit ? <>
      {Children.toArray(children).slice(0, limit)}
      {more}
    </> : children}
  </LinkListCont>
}

const getDurationString = (duration: number | undefined) => {
  if (!duration) return;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor(duration / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m`
  } else {
    return `${duration}s`
  }
}

const MovieGrid: any = styled.div`
  display: grid;
  justify-items: stretch;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 20px;
  height: 530px;
  ${({ $open }: any) => $open && css`height: fit-content;`}
  overflow-y: hidden;
`

const ExpandButton = styled.div`
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

const ModalMovies = () => {
  const [movieList, setMovieList] = useState<Array<MovieDataType>>([]);
  useEffect(() => {
    fetch('/api/movies').then((res) => res.json()).then((data) => {
      if (data) setMovieList(data);
    })
  }, []);
  return <>
    {movieList.map((movieData) => <Movie.Modal key={`movie-${movieData.id}`} movieData={movieData} />)}
  </>
}

const InnerMovieModal = ({ close, movieId }: any) => {
  const [open, setOpen] = useState(false);
  const movieData = useMovieData(movieId);
  const videoData = useVideoData(movieData?.videoRef);
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);
  return <MovieModalBackground onClick={(e) => { e.currentTarget == e.target && close() }}>
    <MovieModalCont>
      <CloseButton onClick={close}>
        <FontAwesomeIcon icon={faClose} width={20} height={20} />
      </CloseButton>
      {movieData && <PromoPlayer.Modal movieData={movieData}></PromoPlayer.Modal>}
      <MovieDataCont>
        <VideoOverlay />
        <Overview>
          <OverviewInfo>
            <OverviewRowOne>
              <span>{videoData ? new Date(videoData.releaseDate).getUTCFullYear() : "0000"}</span>
              <span>{videoData ? getDurationString(videoData.duration) : "0h 0m"}</span>
              <Tag>{videoData ? videoData.quality : "SD"}</Tag>
              <FontAwesomeIcon icon={faAudioDescription} width={24} height={24} />
              <FontAwesomeIcon icon={faClosedCaptioning} width={24} height={24} />
            </OverviewRowOne>
            <OverviewRowTwo>
              <AgeRating>{movieData?.ageRating}</AgeRating>
              <span>{movieData?.contentWarnings.join(', ').toLowerCase()}</span>
            </OverviewRowTwo>
            <Description>{movieData?.description}</Description>
          </OverviewInfo>
          <OverviewCastGenre>
            <OverviewTags>
              <span className='title'>{"Cast:  "}</span>
              <LinkList limit={3} more={<Person.None href='#about'>...more</Person.None>}>
                {movieData && movieData.castRefList.map((ref, index) => <Person key={`person-${ref}`} start={index == 0} id={ref} />)}
              </LinkList>
            </OverviewTags>
            <OverviewTags>
              <span className='title'>{"Genre:  "}</span>
              <LinkList limit={3}>
                {movieData && movieData.genres.map((genre, index) => <Person.None href={`/genres/${genre}`} key={`genre-${genre}`} start={index == 0}>{genre}</Person.None>)}
              </LinkList>
            </OverviewTags>
            <OverviewTags>
              <span className='title'>{"This movie is:  "}</span>
              <LinkList limit={3}>
                {movieData && movieData.tags.map((tag, index) => <Person.None href={`/genres/${tag}`} key={`tag-${tag}`} start={index == 0}>{tag}</Person.None>)}
              </LinkList>
            </OverviewTags>
          </OverviewCastGenre>
        </Overview>
        <h2 className='more-like-this'>More Like This</h2>
        <MovieGrid $open={open}>
          <ModalMovies />
        </MovieGrid>
        <ExpandButton><span onClick={() => setOpen(prev => !prev)}><FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} width={20} height={20} /></span></ExpandButton>
        <About id="about">
          <h2>About {movieData?.title}</h2>
          <OverviewTags $noMargin>
            <span className='title'>{"Director: "}</span>
            {movieData && movieData.directorRefList.map((ref, index) => <Person key={`director-${ref}`} start={index == 0} id={ref} />)}
          </OverviewTags>
          <OverviewTags $noMargin>
            <span className='title'>{"Cast: "}</span>
            {movieData && movieData.castRefList.map((ref, index) => <Person key={`cast-${ref}`} start={index == 0} id={ref} />)}
          </OverviewTags>
          <OverviewTags $noMargin>
            <span className='title'>{"Writer: "}</span>
            {movieData && movieData.writerRefList.map((ref, index) => <Person key={`writer-${ref}`} start={index == 0} id={ref} />)}
          </OverviewTags>
          <OverviewTags $noMargin>
            <span className='title'>{"Genre: "}</span>
            {movieData && movieData.genres.map((genre, index) => <Person.None href={'/'} key={`genre-${genre}`} start={index == 0}>{genre}</Person.None>)}
          </OverviewTags>
          <OverviewTags $noMargin>
            <span className='title'>{"This movie is: "}</span>
            {movieData && movieData.tags.map((tag, index) => <Person.None href={'/'} key={`genre-${tag}`} start={index == 0}>{tag}</Person.None>)}
          </OverviewTags>
        </About>
      </MovieDataCont>
    </MovieModalCont>
  </MovieModalBackground>
}

const MovieModal = () => {
  const { id, remove } = useSearchParam('movie');
  return id && <InnerMovieModal movieId={id} close={remove} />;
}

export default MovieModal;