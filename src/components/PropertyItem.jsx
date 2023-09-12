import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { convertPrice } from '../shared/utils';
import {
    StyledCard,
    StyledImage,
    StyledLink
} from '../styles/component/PropertyItemStyles';

export const PropertyItem = ({ id, images, title, price, address }) => (
    <StyledLink to={`/property/${id}`}>
        <StyledCard>
            <StyledImage
                variant='top'
                src={images[0]}
                alt={`property ${title}`}
            />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{convertPrice(price)}</Card.Subtitle>
                <Card.Text>{address}</Card.Text>
            </Card.Body>
        </StyledCard>
    </StyledLink>
);

PropertyItem.propTypes = {
    id: PropTypes.number,
    images: PropTypes.array,
    title: PropTypes.string,
    price: PropTypes.number,
    address: PropTypes.string
};
