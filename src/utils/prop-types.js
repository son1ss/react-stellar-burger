import PropTypes from "prop-types";

export const ingredientPropType = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

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

export const burgerIngredients = {}

export const navLinkPropType = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'inactive']),
  href: PropTypes.string.isRequired,
}