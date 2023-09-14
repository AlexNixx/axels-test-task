import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { convertPrice } from '../shared/utils';
import {
    StyledCard,
    StyledImage
} from '../styles/component/PropertyItemStyles';

export interface PropertyItemProps {
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
    <Link to={`/property/${id}`} data-testid='propertyLink'>
        <StyledCard data-testid='propertyCard'>
            <StyledImage
                variant='top'
                src={images[0]}
                alt={`property ${title}`}
            />
            <Card.Body>
                <Card.Title data-testid='cardTitle'>{title}</Card.Title>
                <Card.Subtitle data-testid='cardPrice'>
                    {convertPrice(price)}
                </Card.Subtitle>
                <Card.Text data-testid='cardAddress'>{address}</Card.Text>
            </Card.Body>
        </StyledCard>
    </Link>
);
