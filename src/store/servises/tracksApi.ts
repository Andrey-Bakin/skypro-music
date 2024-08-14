// import { baseUrl } from '@/api/tracks'
// import { TokensType, TrackType } from '@/types/types'
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'




// export const allTracksApi = createApi({
//   reducerPath: 'allTracksApi',
//   baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
//   endpoints: (builder) => ({
//     getAllTraks: builder.query<TrackType[], void>({
//       query: (data) => ({
//         url: '/track/all/',
//         method: 'GET',
//         body: data
//       }),
//     }),
//     getAllFavoriteTracks: builder.query<TrackType[], TokensType>({
//       query: (access) => ({
//         url: '/track/favorite/all/',
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${access}`,
//         },   
//       })
      
//     })
//   }),
// })


// export const { useGetAllTraksQuery, useGetAllFavoriteTracksQuery } = allTracksApi