import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userActions } from './user'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://norma.nomoreparties.space/api/',
  headers: {
    'Content-Type': 'application/json'
  },
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().user.accessToken
    accessToken && headers.set('authorization', accessToken)
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery({
      url: 'auth/token',
      body: { token: localStorage.getItem('refreshToken') },
      method: 'POST'
    }, api, extraOptions)
    if (refreshResult.data) {
      api.dispatch(userActions.setUser(refreshResult.data.accessToken))
      result = await baseQuery(args, api, extraOptions)
      localStorage.setItem('refreshToken', refreshResult.data.refreshToken)
      console.log('Token updated')
    } else {
      api.dispatch(userActions.logout)
      localStorage.removeItem('refreshToken')
    }
  }
  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => ({ url: '/ingredients' }),
      transformResponse: data => data.data
    }),
    createOrder: builder.query({
      query: ingredients => ({
        url: 'orders',
        body: { ingredients },
        method: 'POST'
      })
    }),
    loginUser: builder.mutation({
      query: data => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      })
    }),
    refreshUser: builder.mutation({
      query: token => ({
        url: 'auth/token',
        method: 'POST',
        body: { token },
      })
    }),
    registerUser: builder.mutation({
      query: data => ({
        url: 'auth/register',
        method: 'POST',
        body: data
      })
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: { token: localStorage.getItem('refreshToken') },
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        await queryFulfilled
        localStorage.removeItem('refreshToken')
        dispatch(userActions.logout)
      }
    }),
    getUser: builder.query({
      query: () => ({
        url: 'auth/user',
      })
    }),
    editUser: builder.mutation({
      query: (user) => ({
        url: 'auth/user',
        method: 'PATCH',
        body: { ...user }
      })
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: 'password-reset',
        method: 'POST',
        body: { email }
      })
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body: resetData
      })
    }),
    getOrders: builder.query({
      query: (accessToken) => ({
        url: 'orders/all',
        params: { token: accessToken }
      }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket(`wss://norma.nomoreparties.space/orders/all?token=${getState().user.accessToken}`)
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event) => {
            const data = JSON.parse(event.data)
            console.log(data)

            updateCachedData((draft) => {
              draft = data
            })
          }

          ws.addEventListener('message', listener)
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close()
      }
    })
  })
})

export const {
  useGetIngredientsQuery,
  useCreateOrderQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useEditUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetOrdersQuery
} = api