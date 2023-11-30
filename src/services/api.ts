import { FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userActions } from "./user";
import { RootState } from ".";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

type OrdersDetails = {
  total: number;
  totalToday: number;
};

type APIOrdersResult = APIResponse<Order[], "orders"> & OrdersDetails;

type APIOrdersTransformed = APIResponse<APIOrder[], "orders"> & OrdersDetails;

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = LoginRequest & { name: string };

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type AuthResponse = {
  success: boolean;
  user: User;
} & Tokens;

type UserResponse = APIResponse<User, "user">;

const baseQuery = fetchBaseQuery({
  baseUrl: "https://norma.nomoreparties.space/api/",
  headers: {
    "Content-Type": "application/json",
  },
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).user.accessToken;
    accessToken && headers.set("authorization", accessToken);
    return headers;
  },
});

const hasTokens = (data: unknown): data is Tokens => {
  return (
    (data as Tokens)?.accessToken !== undefined &&
    (data as Tokens)?.refreshToken !== undefined &&
    typeof (data as Tokens).accessToken === "string" &&
    typeof (data as Tokens).refreshToken === "string"
  );
};

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const { data } = await baseQuery(
      {
        url: "auth/token",
        body: { token: localStorage.getItem("refreshToken") },
        method: "POST",
      },
      api,
      extraOptions
    );
    if (hasTokens(data)) {
      api.dispatch(userActions.setUser(data.accessToken));
      result = await baseQuery(args, api, extraOptions);
      localStorage.setItem("refreshToken", data.refreshToken);
      console.log("Token updated");
    } else {
      api.dispatch(userActions.logout);
      localStorage.removeItem("refreshToken");
    }
  }
  return result;
};

type ValidOrder = Omit<APIOrder, "ingredients"> & {
  ingredients: [string, ...string[]];
};

const validateOrder = (order: APIOrder): order is ValidOrder => {
  const { ingredients } = order;
  if (ingredients.length < 1) return false;
  if (ingredients.includes(null)) return false;
  return true;
};

const groupIngredients = (ingredients: string[]) => {
  const output: { [key: string]: number } = {};
  ingredients.forEach((ingredient) => {
    output[ingredient] ? output[ingredient]++ : (output[ingredient] = 1);
  });
  return output;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getIngredients: builder.query<Ingredient[], void>({
      query: () => ({ url: "/ingredients" }),
      transformResponse: (data: APIResponse<Ingredient[]>) => data.data,
    }),
    createOrder: builder.mutation<APIResponse<APIOrder, "order">, string[]>({
      query: (ingredients) => ({
        url: "orders",
        body: { ingredients },
        method: "POST",
      }),
    }),
    loginUser: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    refreshUser: builder.mutation<void, string>({
      query: (token) => ({
        url: "auth/token",
        method: "POST",
        body: { token },
      }),
    }),
    registerUser: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        body: { token: localStorage.getItem("refreshToken") },
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        await queryFulfilled;
        localStorage.removeItem("refreshToken");
        dispatch(userActions.logout);
      },
    }),
    getUser: builder.query<UserResponse, void>({
      query: () => ({
        url: "auth/user",
      }),
    }),
    editUser: builder.mutation<UserResponse, User & { password: string }>({
      query: (user) => ({
        url: "auth/user",
        method: "PATCH",
        body: { ...user },
      }),
    }),
    forgotPassword: builder.mutation<APIResponse<void>, string>({
      query: (email) => ({
        url: "password-reset",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<APIResponse<{}>, { password: string; token: string }>({
      query: (resetData) => ({
        url: "password-reset/reset",
        method: "POST",
        body: resetData,
      }),
    }),
    getOrders: builder.query<APIOrdersResult, void>({
      query: () => ({
        url: "orders/all",
      }),
      transformResponse: (data: APIOrdersTransformed) => ({
        ...data,
        orders: data.orders.filter(validateOrder).map((order) => ({
          ...order,
          ingredients: groupIngredients(order.ingredients),
        })),
      }),
      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const ws = new WebSocket(`wss://norma.nomoreparties.space/orders/all`);
        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent<string>) => {
            const data: APIOrdersTransformed = JSON.parse(event.data);

            updateCachedData((draft) => {
              const patch = {
                ...data,
                orders: data.orders.filter(validateOrder).map((order) => ({
                  ...order,
                  ingredients: groupIngredients(order.ingredients),
                })),
              };
              Object.assign(draft, patch);
            });
          };

          ws.addEventListener("message", listener);
        } catch {}
        await cacheEntryRemoved;
        ws.close();
      },
    }),
    getUserOrders: builder.query<APIOrdersResult, void>({
      queryFn: async (_arg, { getState }, _extra, baseQueryCall): Promise<QueryReturnValue<APIOrdersResult, FetchBaseQueryError>> => {
          const { data, error } = await baseQueryCall({
            url: "orders",
            params: { token: (getState() as RootState).user.accessToken.replace("Bearer ", "") },
          });

          if (error) return { error };

          return {data: {
            ...(data as APIOrdersTransformed),
            orders: (data as APIOrdersTransformed).orders.filter(validateOrder).map((order) => ({
              ...order,
              ingredients: groupIngredients(order.ingredients),
            })),
          }};
      },
      // transformResponse: (data: APIOrdersTransformed) => ({
      //   ...data,
      //   orders: data.orders.filter(validateOrder).map((order) => ({
      //     ...order,
      //     ingredients: groupIngredients(order.ingredients),
      //   })),
      // }),
      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
        const ws = new WebSocket(
          `wss://norma.nomoreparties.space/orders?token=${(getState() as RootState).user.accessToken.replace(
            "Bearer ",
            ""
          )}`
        );
        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent<string>) => {
            const data: APIOrdersTransformed = JSON.parse(event.data);

            updateCachedData((draft) => {
              const patch = {
                ...data,
                orders: data.orders.filter(validateOrder).map((order) => ({
                  ...order,
                  ingredients: groupIngredients(order.ingredients),
                })),
              };
              Object.assign(draft, patch);
            });
          };

          ws.addEventListener("message", listener);
        } catch {}
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

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
} = api;
