import PlayPause from './PlayPause';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ data, song, isPlaying, activeSong, i }) => {
  // const { activeSong, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const handlePlayClick = () => {
    dispatch(setActiveSong({ data, song, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  return (
    <div
      className={
        'flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm' +
        ' animate-slideup rounded-lg cursor-pointer'
      }>
      <div
        className={`relative ${
          !song?.images?.coverart ? ' bg-white ' : ''
        } w-full shrink-0 h-56 group`}>
        <div
          className={`absolute inset-0 justify-center items-center bg-black
           animate-shortFade bg-opacity-50 group-hover:flex ${
             activeSong?.title === song.title ? 'flex bg-black bg-opacity70' : 'hidden'
           }`}>
          <PlayPause
            activeSong={activeSong}
            isPlaying={isPlaying}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img className={'h-full aspect-square'} src={song?.images?.coverart} />
      </div>
      <div className={'mt-4 flex flex-col'}>
        <p className={'text-white font-semibold text-lg truncate'}>
          <Link to={`/songs/${song?.key}`}>{song?.title}</Link>
        </p>
        <p className={'text-gray-300 mt-1 text-sm truncate'}>
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
            {song?.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
