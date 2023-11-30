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

const validateOrder = (order) => {
  const { ingredients } = order
  if (ingredients.length < 1) return false
  if (ingredients.includes(null)) return false
  return true
}

const groupIngredients = (ingredients) => {
  const output = {}
  ingredients.forEach(ingredient => {
    output[ingredient] ? output[ingredient]++ : output[ingredient] = 1
  })
  return output
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => ({ url: '/ingredients' }),
      transformResponse: data => data.data
    }),
    createOrder: builder.mutation({
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
      query: () => ({
        url: 'orders/all'
      }),
      transformResponse: data => ({
        ...data,
        orders: data.orders.filter(validateOrder).map(order => ({
          ...order,
          ingredients: groupIngredients(order.ingredients)
        }))
      }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const ws = new WebSocket(`wss://norma.nomoreparties.space/orders/all`)
        try {
          await cacheDataLoaded

          const listener = (event) => {
            const data = JSON.parse(event.data)

            updateCachedData((draft) => {
              const patch = {
                ...data,
                orders: data.orders.filter(validateOrder).map(order => ({
                  ...order,
                  ingredients: groupIngredients(order.ingredients)
                }))
              }
              Object.assign(draft, patch)
            })
          }

          ws.addEventListener('message', listener)
        } catch {

        }
        await cacheEntryRemoved
        ws.close()
      }
    }),
    getUserOrders: builder.query({
      queryFn: (arg, { getState }, extra, baseQuery) => baseQuery({
        url: 'orders',
        params: { token: getState().user.accessToken.replace('Bearer ', '') }
      }),
      transformResponse: data => ({
        ...data,
        orders: data.orders.filter(validateOrder).map(order => ({
          ...order,
          ingredients: groupIngredients(order.ingredients)
        }))
      }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
        const ws = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${getState().user.accessToken.replace('Bearer ', '')}`)
        try {
          await cacheDataLoaded

          const listener = (event) => {
            const data = JSON.parse(event.data)

            updateCachedData((draft) => {
              const patch = {
                ...data,
                orders: data.orders.filter(validateOrder).map(order => ({
                  ...order,
                  ingredients: groupIngredients(order.ingredients)
                }))
              }
              Object.assign(draft, patch)
            })
          }

          ws.addEventListener('message', listener)
        } catch {

        }
        await cacheEntryRemoved
        ws.close()
      }
    })
  })
})

export const {
  useGetIngredientsQuery,
  useCreateOrderMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useEditUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetOrdersQuery,
  useGetUserOrdersQuery,
} = api