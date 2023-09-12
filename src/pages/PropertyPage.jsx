import { useEffect } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { fetchProperty } from '../redux/ducks/property';
import { convertPrice } from '../shared/utils';
import {
    StyledButton,
    StyledContainer,
    StyledImage
} from '../styles/pages/PropertyPageStyles';

export const PropertyPage = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const property = useSelector(state => state.propertyReducer.property);
    const error = useSelector(state => state.propertyReducer.error);
    const loading = useSelector(state => state.propertyReducer.loading);

    useEffect(() => {
        dispatch(fetchProperty(id));
    }, [dispatch, id]);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;

    return (
        <StyledContainer>
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

PropertyPage.propTypes = {};
