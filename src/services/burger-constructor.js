import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid4 } from 'uuid'

const initialState = {
  bun: {},
  fillings: []
}

export const currentBurgerSlice = createSlice({
  name: 'currentBurger',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.fillings.push({...action.payload, uid: uuid4()})
    },
    removeIngredient: (state, action) => {
      state.fillings = state.fillings.filter((item, index) => index !== action.payload)
    },
    clearIngredients: (state) => {
      state = initialState
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