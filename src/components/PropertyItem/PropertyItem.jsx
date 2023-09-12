import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
    StyledCard,
    StyledImage,
    StyledLink
} from '../../shared/styles/component/PropertyItem/PropertyItemStyles';
import { convertToUSAPrice } from '../../shared/utils/price/convertToUSAPrice';

export const PropertyItem = ({ id, images, title, price, address }) => {
    return (
        <StyledLink to={`/property/${id}`}>
            <StyledCard>
                <StyledImage
                    variant='top'
                    src={images[0]}
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
    images: PropTypes.array,
    title: PropTypes.string,
    price: PropTypes.number,
    address: PropTypes.string
};
