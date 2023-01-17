import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSongRelatedQuery, useGetTrackDetailsQuery } from '../redux/services/shazamCore';
import DetailsHeader from '../components/DetailsHeader';
import RelatedSongs from '../components/RelatedSongs';
import { Error, Loader } from '../components';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();
  const { data: songData, isFetching: isFetchingSongDetails } = useGetTrackDetailsQuery({
    track_id: songid
  });

  const {
    data: relatedSongs,
    isFetching: isFetchingRelatedSongs,
    error
  } = useGetSongRelatedQuery({ track_id: songid });

  const handlePlayClick = (incomeData) => {
    dispatch(setActiveSong({ data: relatedSongs, ...incomeData }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title={'Searching song details'} />;
  }

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title={'Searching song details'} />;
  }

  if (error) {
    return <Error />;
  }

  console.log({ songData });
  return (
    <div className={'flex flex-col py-5'}>
      <DetailsHeader songData={songData} />
      <div className={'mb-10'}>
        <h2 className={'text-white text-3xl font-bold'}>Lyrics:</h2>

        <div className={'mt-5'}>
          {songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1].text.map((line, i) => (
              <p className={'text-gray-300 text-base my-1'}>{line}</p>
            ))
          ) : (
            <p className={'text-gray-300 text-base my-1'}>Sorry no lyrics found</p>
          )}
        </div>
      </div>

      <RelatedSongs
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        data={relatedSongs}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default SongDetails;
