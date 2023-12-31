import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export const ingredientComponentPropTypes = {
  ingredient: ingredientPropType.isRequired,
  amount: PropTypes.number,
  openModal: PropTypes.func.isRequired
}

export const navLinkPropType = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'inactive']),
  to: PropTypes.string.isRequired,
}

export const modalOverlayPropTypes = {
  children: PropTypes.node.isRequired,
  toggle: PropTypes.func.isRequired,
}

export const modalPropTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  toggle: PropTypes.func.isRequired,
};

export const ingredientDetailsPropTypes = {
  ingredient: ingredientPropType
}

export const protectedRoutePropType = {
  children: PropTypes.node.isRequired
}