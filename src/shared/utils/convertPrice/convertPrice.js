import PropTypes from 'prop-types';

export const convertPrice = price =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);

convertPrice.propTypes = {
    price: PropTypes.number
};
