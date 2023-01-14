import { FaPauseCircle, FaPlayCircle } from 'react-icons/all';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => {
  const iconStyles = 'text-gray-300 cursor-pointer';
  const size = 35
  return isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle onClick={handlePause} size={size} className={iconStyles} />
  ) : (
    <FaPlayCircle onClick={handlePlay} size={size} className={iconStyles} />
  );
};

export default PlayPause;
