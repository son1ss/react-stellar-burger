import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

export const burgerConstructorPropTypes = {
  top: PropTypes.shape({
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  bottom: PropTypes.shape({
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  middle: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export const navLinkPropType = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'inactive']),
  href: PropTypes.string.isRequired,
}