import { TopChartCard } from './TopPlay';

const RelatedSongs = ({
    handlePlayClick, handlePauseClick, data, isPlaying, activeSong, artistId,
  },
) => (
  <div className={'flex flex-col'}>
    <h1 className={'font-bold text-3xl text-white'}>Related Songs:</h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.map((relatedSong, i) => (
        <TopChartCard
          key={`${artistId}-${relatedSong?.key}-${i}`}
          i={i}
          song={relatedSong}
          activeSong={activeSong}
          isPlaying={isPlaying}
          artistId={artistId}
          // handlePauseClick={handlePauseClick}
          // handlePlayClick={handlePlayClick.bind(this,
          //   { song: relatedSong, i })}
        />

      ))}
    </div>
  </div>
);

export default RelatedSongs;
