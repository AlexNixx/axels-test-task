import { useEffect } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { fetchProperty } from '../../redux/ducks/property';
import { useAppDispatch, useAppSelector } from '../../redux';
import { convertPrice } from '../../shared/utils';
import {
    StyledButton,
    StyledContainer,
    StyledImage
} from '../../styles/pages/PropertyPageStyles';

export const PropertyPage = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const property = useAppSelector(state => state.propertyReducer.property);
    const error = useAppSelector(state => state.propertyReducer.error);
    const loading = useAppSelector(state => state.propertyReducer.loading);

    useEffect(() => {
        dispatch(fetchProperty(Number(id)));
    }, [dispatch, id]);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;

    return (
        <StyledContainer data-testid='propertyPage'>
            <Link to='/'>
                <StyledButton variant='dark'>Back</StyledButton>
            </Link>
            <Row>
                <Col xs={12} lg={7}>
                    <Carousel>
                        {property?.images.map(src => (
                            <Carousel.Item key={src}>
                                <StyledImage
                                    src={src}
                                    alt={`${property?.title}-photo`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
                <Col>
                    <h2>{property?.title}</h2>
                    <h5>Seller: {property?.seller}</h5>
                    <h6>Price: {convertPrice(property?.price)}</h6>
                    <p>{property?.description}</p>
                </Col>
            </Row>
        </StyledContainer>
    );
};
