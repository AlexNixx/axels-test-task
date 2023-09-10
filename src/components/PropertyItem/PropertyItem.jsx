import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { StyledCard, StyledImage } from './PropertyItemStyles';
import { convertToUSAPrice } from '../../utils/price/convertToUSAPrice';

export const PropertyItem = ({ image, title, price, address }) => {
    return (
        <StyledCard>
            <StyledImage
                variant='top'
                src={image[0]}
                alt={`property ${title}`}
            />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{convertToUSAPrice(price)}</Card.Subtitle>
                <Card.Text>{address}</Card.Text>
            </Card.Body>
        </StyledCard>
    );
};

PropertyItem.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    address: PropTypes.string
};
