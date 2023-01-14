import { useParams } from 'react-router-dom';

const ArtistDetails = () => {
  const {id} = useParams()
  return (
    <div>{id}</div>
  );
};

export default ArtistDetails;
