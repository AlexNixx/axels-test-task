import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
    height: 20rem;
    overflow: hidden;
`;

export const StyledImage = styled(Card.Img)`
    height: 10rem;
    width: 100%;
    object-fit: cover;
    transition: transform 0.25s;

    &:hover {
        transform: scale(1.05);
    }
`;
