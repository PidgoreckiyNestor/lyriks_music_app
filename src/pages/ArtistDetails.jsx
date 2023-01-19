import { useParams } from 'react-router-dom';
import DetailsHeader from '../components/DetailsHeader';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';
import { Error, Loader } from '../components';
import RelatedSongs from '../components/RelatedSongs';
import { useSelector } from 'react-redux';

const ArtistDetails = () => {
  const { artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error
  } = useGetArtistDetailsQuery( artistId );

  console.log('[ArtistDetails]', { artistData }, { artistId });
  if (isFetchingArtistDetails) {
    return <Loader title={'Loading artist details'} />;
  }

  if (error) {
    return <Error />;
  }

  console.log(Object.values(artistData?.data[0]?.views['top-songs']?.data))
  console.log({ artistData });
  return (
    <div className={'flex flex-col '}>
      <DetailsHeader artistId={artistId} artistData={artistData.data[0]} />
      <RelatedSongs
        data={artistData?.data[0].views['top-songs']?.data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistId}
      />
    </div>
  );
};

export default ArtistDetails;
