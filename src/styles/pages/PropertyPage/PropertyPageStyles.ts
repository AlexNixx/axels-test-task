import { Button, Container, Image } from 'react-bootstrap';
import styled from 'styled-components';

export const PropertyContainer = styled(Container)`
    padding-top: 2rem;
    padding-bottom: 2rem;
`;

export const StyledImage = styled(Image)`
    width: 100%;
    max-height: 30rem;
    overflow: hidden;
`;

export const StyledButton = styled(Button)`
    width: 10rem;
    margin-bottom: 2rem;
`;
