import { useFilm } from '../../Hooks/films.ts';
import { usePathId } from '../../Hooks/usePathId.ts';
import { convertTimeToPlayerFormat } from '../../Helpers/Time.ts';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../appRoutes.ts';

export const PlayerPage = () => {
  const id = usePathId();
  const { data: film } = useFilm(id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [playerTime, setPlayerTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
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
      video.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (video) {
      const currentTime = video.currentTime;
      const duration = video.duration;

      const progress = (currentTime / duration) * 100;
      setPlayerTime(Math.floor(duration - currentTime));
      setProgressBar(progress);
    }
  };

  return (
    <div className="player">
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
              value={progressBar}
              max="100"
            />
            <div
              className="player__toggler"
              style={{ left: `${progressBar}%` }}
            >
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
