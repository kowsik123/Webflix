"use client";

import { PromoPlayer } from '@/components';
import { useMovieData, useMovieList, useSearchParam, useVideoData } from '@/components/hooks';
import { faAngleDown, faAngleUp, faAudioDescription, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Children, PropsWithChildren, useEffect, useState } from 'react'
import Person from '../Person';
import { faClosedCaptioning } from '@fortawesome/free-regular-svg-icons';
import Movie from '../Movie';
import { About, AgeRating, CloseButton, Description, ExpandButton, LinkListCont, MovieDataCont, MovieGrid, MovieModalBackground, MovieModalCont, Overview, OverviewCastGenre, OverviewInfo, OverviewRowOne, OverviewRowTwo, OverviewTags, Tag, VideoOverlay } from './styled';

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

const ModalMovies = () => {
  const movieList = useMovieList();
  return <>
    {movieList.map((movieData) => <Movie.Modal key={`movie-${movieData.id}`} movieData={movieData} />)}
  </>
}

const InnerMovieModal = ({ close, movieId }: any) => {
  const [movieOpen, setMovieOpen] = useState(false);
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
        <MovieGrid $open={movieOpen}>
          <ModalMovies />
        </MovieGrid>
        <ExpandButton><span onClick={() => setMovieOpen(prev => !prev)}><FontAwesomeIcon icon={movieOpen ? faAngleUp : faAngleDown} width={20} height={20} /></span></ExpandButton>
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