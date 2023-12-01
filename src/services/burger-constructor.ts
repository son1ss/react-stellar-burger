import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid4 } from 'uuid';

const initialState: {
  bun: Ingredient;
  fillings: (Ingredient & { uid: string })[];
} = {
  bun: {
    _id: '',
    name: '',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0,
  },
  fillings: [],
};

export const currentBurgerSlice = createSlice({
  name: 'currentBurger',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.fillings.push({ ...action.payload, uid: uuid4() });
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.fillings = state.fillings.filter((_, index) => index !== action.payload);
    },
    clearIngredients: (state) => {
      state.fillings = [];
    },
    moveIngredient: (state, action: PayloadAction<{from: number; to: number}>) => {
      const ingredient = state.fillings.splice(action.payload.from, 1)[0];
      state.fillings.splice(action.payload.to, 0, ingredient);
    },
    setBun: (state, action: PayloadAction<Ingredient>) => {
      state.bun = action.payload;
    },
  },
});

export const currentBurgerReducer = currentBurgerSlice.reducer;
export const currentBurgerActions = currentBurgerSlice.actions;
