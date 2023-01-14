import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key',
        '7969fded00msha01d22916dec7aep18af53jsnbdab245479ed');
      // headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/world' }),
    getTrackDetails: builder.query({
      query: (arg) => {
        const { track_id } = arg;
        console.log('arg: ', arg);
        return {
          url: '/tracks/details',
          params: { track_id },
        };
      },
    }),
    getSongRelated:  builder.query({
      query: (arg) => {
        const { track_id } = arg;
        return {
          url: '/tracks/related',
          params: { track_id },
        };
      },
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetTrackDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;
