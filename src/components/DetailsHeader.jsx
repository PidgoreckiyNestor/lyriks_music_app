import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.attributes;
  return (

    <div className={'relative w-full flex flex-col mb-5'}>
      <div
        className="w-full bg-gradient-to-l from-transparent to-black rounded-l-full sm:h-48 h-28"/>
      <div className={'absolute inset-0 flex items-center '}>
        <img
          className={'sm:w-48 sm:h-48 w-28 h-28 rounded-full object-cover shadow-xl shadow-black'}
          src={artistId
            ? artist?.artwork?.url.replace(
              '{w}', '500').replace('{h}', '500')
            : songData?.images?.coverart} alt={'art'}/>
        <div className={'ml-5'}>
          <p className={'font-bold sm:text-3xl text-xl text-white'}>
            {artistId ? artist?.name : songData?.title}
          </p>
          {!artistId && (
            <Link>
              <p className={'text-base text-gray-300 mt-2'}>
                {songData?.subtitle}
              </p>
            </Link>
          )}
        </div>
      </div>

    </div>
  );

};

export default DetailsHeader;
