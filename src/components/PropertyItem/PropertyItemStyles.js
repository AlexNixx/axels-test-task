import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
    width: 18rem;
    height: 25rem;
    overflow: hidden;
    cursor: pointer;
`;

export const StyledImage = styled(Card.Img)`
    width: 100%;
    height: 15rem;
    object-fit: cover;
    transition: transform 0.25s;

    &:hover {
        transform: scale(1.05);
    }
`;
