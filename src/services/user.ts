import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  email: '',
  accessToken: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    logout: (state) => {
      console.log('Logout')
      state = initialState
    }
  }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer