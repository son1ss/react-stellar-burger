import PropTypes from "prop-types";

const ingredientPropType = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export const ingredientComponentPropType = {
  ingredient: PropTypes.shape(ingredientPropType).isRequired,
  amount: PropTypes.number.isRequired,
}

export const burgerConstructorPropTypes = {
  top: PropTypes.shape(ingredientPropType).isRequired,
  bottom: PropTypes.shape(ingredientPropType).isRequired,
  middle: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      ...ingredientPropType
    })
  ).isRequired,
};

export const burgerIngredients = {
  ingredients: PropTypes.arrayOf(ingredientComponentPropType)
}

export const navLinkPropType = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'inactive']),
  href: PropTypes.string.isRequired,
}