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

const TopChartCard = ({ song }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    {song.title}
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();

  const topPlays = data?.slice(0, 10);

  const divRef = useRef(null);

  useLayoutEffect(() => {
    divRef.current.scrollIntoView();
  }, [data]);

  const handlePlayClick = () => {
    dispatch(setActiveSong({ data, song, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className={'xl:ml-6 ml-0 xl:mb:0 mb-6 flex-1 xl:max-w[500px] max-w-full' + ' flex flex-col'}>
      <div className="w-full flex flex-col">
        <div className={'flex flex-row justify-between items-center'}>
          <h2 className={'text-white font-bold text-2xl'}>Top Charts</h2>
          <Link to={'top-charts'}>
            <p className={'text-gray-300 text-base cursor-pointer'}>See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard song={song} key={song.key} i={i} />
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
          className={'mt-4'}
        >
          {topPlays?.map((song, index) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: '25%', height: 'auto' }}
              className={'shadow-lg rounded-full animate-sliderright'}>
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img className={'w-full select-none rounded-full object-cover'} src={song?.images.background} alt={'name'}/>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
