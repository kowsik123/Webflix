import { MovieDataType } from "@/types";
import { faAngleDown, faPlay, faRotate, faThumbTack, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { CompactPosterImg, CompactPromoCont, CompactVideo, CompactVideoButton, CompactVideoOverlay, LeftVideoOption, RightVideoOption } from "./styled";
import { useSearchParam, useVideoData } from "@/components/hooks";
import Link from "next/link";

const CompactPromoPlayer = ({movieData, onOpen=()=>{}, onClose=()=>{}}:{movieData: MovieDataType}|any)=>{
    const [open, setOpen] = useState(false);
    const [ended, setEnded] = useState(false);
    const [pinned, setPinned] = useState(false);
    const [muted, setMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const playTimeout = useRef(-1);
    const videoData = useVideoData( movieData.promoVideoRef );
    const video = {
        play: ()=>{
          if(pinned) return;
          setOpen(true);
          onOpen();
          playTimeout.current = window.setTimeout( ()=> {
            playTimeout.current = -1;
            videoRef.current?.play()
          }, 500 );
        },
        stop: ()=>{
          if(pinned) return;
          setOpen(false);
          onClose();
          if(playTimeout.current!=-1) {
            window.clearTimeout(playTimeout.current);
            playTimeout.current=-1;
          }
          videoRef.current?.load();
          videoRef.current?.pause();
        },
        ended: (e: any) => {
          e.target.load();
          e.target.pause();
          setEnded(true);
        }
    }
    const muteButtonClick = () => {
      if (ended) {
        videoRef.current?.play();
      }
      else setMuted(prev => !prev);
    }
    const { add } = useSearchParam('movie');
    return <CompactPromoCont className='compact-promo-player' $open={pinned || open} onMouseEnter={video.play} onMouseLeave={video.stop}>
      <LeftVideoOption>
        <CompactVideoButton onClick={()=>setPinned(prev=>!prev)}>
          <FontAwesomeIcon icon={faThumbTack} width={20} height={20} />
        </CompactVideoButton>
        <Link href={`/watch/${movieData.id}`}><CompactVideoButton>
          <FontAwesomeIcon icon={faPlay} width={20} height={20} />
        </CompactVideoButton></Link>
      </LeftVideoOption>
      <CompactVideoOverlay>
        <CompactPosterImg src={movieData?.posterImgSrc} width={250} />
        {open && <CompactVideo playsInline muted={muted} width={250} ref={videoRef} poster={movieData?.posterImgSrc} src={videoData?.src} onEnded={video.ended} />}
      </CompactVideoOverlay>
      <RightVideoOption>
        <CompactVideoButton onClick={muteButtonClick}>
              {ended ? <FontAwesomeIcon icon={faRotate} width={20} height={20} /> : muted ? <FontAwesomeIcon icon={faVolumeXmark} width={20} height={20} /> : <FontAwesomeIcon icon={faVolumeHigh} width={20} height={20} />}
        </CompactVideoButton>
        <CompactVideoButton onClick={()=>add(movieData.id)}>
              <FontAwesomeIcon icon={faAngleDown} width={20} height={20} />
        </CompactVideoButton>
      </RightVideoOption>
    </CompactPromoCont>
  }

  export default CompactPromoPlayer;