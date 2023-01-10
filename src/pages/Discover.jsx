import { genres } from '../assets/constants';
import { useState } from 'react';
import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
// eslint-disable-next-line import/named

const Discover = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const [genre, setGenre] = useState('Pop');
  console.log('error', error);

  const genreHandler = (e) => {
    setGenre(e.target.value);
  };

  console.log({ data });
  // console.log(shazamCoreApi);

  if (isFetching) {
    return <Loader title={'Loading songs...'} />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      {/*title with select option option*/}
      <div className="flex flex-col justify-between items-center sm:flex-row mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white ">Discover</h2>
        <select
          onChange={genreHandler}
          value={genre}
          className={
            'bg-black text-gray-300 p-3 text-sm rounded-lg outline-none ' + 'sm:mt-0 mt-5'
          }>
          {genres.map((genre) => {
            return (
              <option key={genre.value} value={genre.value}>
                {genre.title}
              </option>
            );
          })}
        </select>
      </div>

      {/*content*/}
      <div className="flex flex-wrap  sm: justify-center gap-8">
        {data?.map((song, i) => {
          return <SongCard key={song} song={song} i={i} />;
        })}
      </div>
    </div>
  );
};

export default Discover;
