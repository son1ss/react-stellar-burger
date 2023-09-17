import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://norma.nomoreparties.space/api'}),
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => ({url: '/ingredients'}),
      transformResponse: data => data.data
    }),
    createOrder: builder.query({
      query: ingredients => ({
        url: '/orders',
        body: JSON.stringify({ ingredients }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
    })
  })
})

export const { useGetIngredientsQuery, useCreateOrderQuery } = api