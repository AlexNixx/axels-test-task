import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { StyledCard, StyledImage, StyledLink } from './PropertyItemStyles';
import { convertToUSAPrice } from '../../utils/price/convertToUSAPrice';

export const PropertyItem = ({ id, image, title, price, address }) => {
    return (
        <StyledLink to={`/property/${id}`}>
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
        </StyledLink>
    );
};

PropertyItem.propTypes = {
    id: PropTypes.number,
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    address: PropTypes.string
};
