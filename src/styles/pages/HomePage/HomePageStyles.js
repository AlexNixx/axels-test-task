import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

export const StyledContainer = styled(Container)`
    padding: 2rem 1rem;
    overflow: hidden;
`;

export const StyledRow = styled(Row)`
    row-gap: 2rem;
`;

export const StyledCol = styled(Col)`
    display: flex;
    justify-content: center;
`;
