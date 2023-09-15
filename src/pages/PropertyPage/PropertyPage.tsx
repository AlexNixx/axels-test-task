import { useEffect } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { fetchProperty } from '../../redux/ducks/property';
import { useAppDispatch, useAppSelector } from '../../redux';
import { convertPrice } from '../../utils';
import {
    StyledButton,
    PropertyContainer,
    StyledImage
} from '../../styles/pages';

export const PropertyPage = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const property = useAppSelector(state => state.propertyReducer.property);
    const error = useAppSelector(state => state.propertyReducer.error);
    const loading = useAppSelector(state => state.propertyReducer.loading);

    useEffect(() => {
        dispatch(fetchProperty(Number(id)));
    }, [dispatch, id]);

    if (loading) return <p data-testid='loadingText'>Loading...</p>;

    if (error) return <p data-testid='errorText'>{error}</p>;

    return (
        <PropertyContainer data-testid='propertyPage'>
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
                    <h2 data-testid='propertyTitle'>{property?.title}</h2>
                    <h5 data-testid='propertySeller'>
                        Seller: {property?.seller}
                    </h5>
                    <h6 data-testid='propertyPrice'>
                        Price: {convertPrice(property?.price)}
                    </h6>
                    <p data-testid='propertyDescription'>
                        {property?.description}
                    </p>
                </Col>
            </Row>
        </PropertyContainer>
    );
};
