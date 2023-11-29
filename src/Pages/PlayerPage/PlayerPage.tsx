import { useFilm } from '../../Hooks/films.ts';
import { usePathId } from '../../Hooks/usePathId.ts';
import { convertTimeToPlayerFormat } from '../../Helpers/Time.ts';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../appRoutes.ts';
import './progressBar.css';

export const PlayerPage = () => {
  const id = usePathId();
  const { data: film } = useFilm(id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playerTime, setPlayerTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play().then();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFullScreen = () => {
    const video = videoRef.current;

    if (video) {
      video.requestFullscreen().then();
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (video) {
      const currentTime = video.currentTime;
      const duration = video.duration;

      const progress = (currentTime / duration) * 100;
      setPlayerTime(Math.floor(duration - currentTime));
      setProgress(progress);
    }
  };

  const progressBarRef = useRef<HTMLProgressElement>(null);

  const handleProgressBarClick = (event: MouseEvent<HTMLProgressElement>) => {
    if (videoRef.current && progressBarRef.current) {
      const progressBar = progressBarRef.current;
      const rect = progressBar.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const progressBarWidth = progressBar.offsetWidth;

      const progress = (offsetX / progressBarWidth) * 100;
      setProgress(progress);

      const video = videoRef.current;
      if (video) {
        const duration = video.duration;
        const currentTime = (progress * duration) / 100;
        video.currentTime = currentTime;
        setPlayerTime(Math.floor(duration - currentTime));
      }
    }
  };

  return (
    <div className="player" style={{ userSelect: 'none' }}>
      <video
        src={film?.videoLink}
        className="player__video"
        poster={film?.backgroundImage}
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
      />

      <button
        type="button"
        className="player__exit"
        onClick={() => navigate(appRoutes.Main)}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={progress}
              max="100"
              ref={progressBarRef}
              onClick={handleProgressBarClick}
            />
            <div className="player__toggler" style={{ left: `${progress}%` }}>
              Toggler
            </div>
          </div>
          <div className="player__time-value">
            {convertTimeToPlayerFormat(playerTime)}
          </div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={handlePlayPause}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={handleFullScreen}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
