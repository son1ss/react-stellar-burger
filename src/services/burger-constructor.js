import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  bun: {},
  fillings: []
}

export const currentBurgerSlice = createSlice({
  name: 'currentBurger',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.fillings.push(action.payload)
    },
    removeIngredient: (state, action) => {
      state.fillings = state.fillings.filter((item, index) => index !== action.payload)
    },
    moveIngredient: (state, action) => {
      const ingredient = state.fillings.splice(action.payload.from, 1)[0]
      state.fillings.splice(action.payload.to, 0, ingredient)
    },
    setBun: (state, action) => {
      state.bun = action.payload
    },
  }
})

export const currentBurgerReducer = currentBurgerSlice.reducer
export const currentBurgerActions = currentBurgerSlice.actions