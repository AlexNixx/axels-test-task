import PropTypes from 'prop-types';

export const convertToUSAPrice = price =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);

convertToUSAPrice.propTypes = {
    price: PropTypes.number
};
