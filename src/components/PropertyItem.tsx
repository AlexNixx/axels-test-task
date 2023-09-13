import { Card } from 'react-bootstrap';

import { convertPrice } from '../shared/utils';
import {
    StyledCard,
    StyledImage,
    StyledLink
} from '../styles/component/PropertyItemStyles';

interface PropertyItemProps {
    id: number;
    images: string[];
    title: string;
    price: number;
    address: string;
}

export const PropertyItem = ({
    id,
    images,
    title,
    price,
    address
}: PropertyItemProps) => (
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
