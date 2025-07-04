import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// const baseQuery = fetchBaseQuery({baseUrl : ''});
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://mern-auth-066k.onrender.com',
  credentials: 'include',
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes : ['User'],
    endpoints : () =>({}),
});
// builder