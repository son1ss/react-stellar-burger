type IngredientType = "bun" | "main" | "sauce";

type Ingredient = {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

type APIOrder = {
  _id: string;
  ingredients: (string | null)[];
  status: Status;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
}

type Order = Omit<APIOrder, 'ingredients'> & {ingredients: {[key in string]: number}}

type Status = "done" | "pending" | "created";

type User = {
  email: string
  name: string
}

type APIResponse<T, ResponseName extends string = 'data'> = {
  [Key in ResponseName]: T;
} & {
  success: boolean;
}