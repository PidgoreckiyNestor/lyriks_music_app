import { useDispatch, useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/free-mode';
import PlayPause from './PlayPause';

export const TopChartCard = ({
  song,
  i,
  isPlaying,
  handlePlayClick,
  handlePauseClick,
  activeSong,
  artistId,
}) => {
  const { attributes } = song;
  console.log({ song });
  return <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4
  rounded-lg mb-2">
    <h3 className="font-bold text-base text-white mr-3">
      {i + 1}.
    </h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <Link to={`/songs/${song?.key}`}>
        <div className={'w-20 h-20 md:w-32 md:h-32'}>
          <img className=" cursor-pointer rounded-lg"
               src={artistId ? attributes?.artwork.url.replace('{w}', '125').
                 replace('{h}', '125') : song?.images?.coverart}
               alt=""/>
        </div>
      </Link>
      <div className={'flex-1 flex flex-col justify-center mx-3'}>

        {artistId ?
          <Link to={`/songs/${song?.id}`}>
            <p className={'text-xl font-bold text-white'}>
              {song?.attributes?.name}
            </p>
          </Link>
          :
          <Link to={`/songs/${song?.key}`}>
            <p
              className={'text-xl cursor-pointer hover:text-blue-400 font-bold transition-colors duration-200 text-white'}>
              {song?.title}
            </p>
          </Link>
        }

        <Link to={song.artists
          ? `/artists/${song?.artists[0]?.adamid}`
          : '/top-artists'}>
          <p
            className={'text-base cursor-pointer hover:text-blue-300 transition-colors duration-200 font-bold text-gray-300 mt-1'}>
            {artistId ? song?.attributes?.albumName : song?.subtitle}
          </p>
        </Link>

      </div>
    </div>

    {
      !artistId
        ? (
          <PlayPause
            song={song} handlePlay={handlePlayClick}
            handlePause={handlePauseClick} activeSong={activeSong}
            isPlaying={isPlaying}/>)
        :
        null
    }

  </div>;
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching } = useGetTopChartsQuery();

  const topPlays = data?.slice(0, 5);

  const divRef = useRef(null);

  useLayoutEffect(() => {
    divRef.current.scrollIntoView();
  }, [data]);

  const handlePlayClick = (incomeData) => {
    dispatch(setActiveSong({ data, ...incomeData }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetching){
    return null
  }

  return (
    <div
      ref={divRef}
      className={'transition-all pt-5 duration-1000 xl:ml-6 ml-0 xl:mb:0 mb-6 flex-1 xl:max-w-[700px] ' +
        ' flex flex-col ' + `${isFetching ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-full pr-4 flex flex-col">
        <div className={'flex flex-row justify-between items-center'}>
          <h2 className={'text-white font-bold text-2xl'}>Top Charts</h2>
          <Link to={'top-charts'}>
            <p className={'text-gray-300 text-base cursor-pointer'}>See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard handlePauseClick={handlePauseClick}
                          handlePlayClick={handlePlayClick.bind(this,
                            { song, i })}
                          activeSong={activeSong} isPlaying={isPlaying}
                          song={song} key={song.key} i={i}/>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className={'flex flex-row justify-between items-center'}>
          <h2 className={'text-white font-bold text-2xl'}>Top Charts</h2>
          <Link to={'top-artists'}>
            <p className={'text-gray-300 text-base cursor-pointer'}>See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView={'auto'}
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className={'mt-4 overflo'}
        >
          {topPlays?.map((song, index) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: '25%', height: 'auto' }}
              className={'shadow-lg rounded-full animate-sliderright'}>
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img className={'w-full select-none rounded-full object-cover'}
                     src={song?.images.background} alt={'name'}/>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
