import { useEffect } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';

import {
    StyledButton,
    StyledContainer,
    StyledImage
} from '../../styles/pages/PropertyPage/PropertyPageStyles';

import { convertToUSAPrice } from '../../utils/price/convertToUSAPrice';
import { mockData } from '../../mockData/mockData';
import { Link, useParams } from 'react-router-dom';

export const PropertyPage = () => {
    const { id } = useParams();

    const mockItem = mockData.filter(item => item.id === Number(id))[0];

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    if (!mockItem) return <p>Property not found</p>;

    return (
        <StyledContainer>
            <Link to='/'>
                <StyledButton variant='dark'>Back</StyledButton>
            </Link>
            <Row>
                <Col xs={12} lg={7}>
                    <Carousel>
                        {mockItem?.image.map(src => (
                            <Carousel.Item key={src}>
                                <StyledImage
                                    src={src}
                                    alt={`${mockItem.title}-photo`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
                <Col>
                    <h2>{mockItem.title}</h2>
                    <h5>Seller: {mockItem.seller}</h5>
                    <h6>Price: {convertToUSAPrice(mockItem.price)}</h6>
                    <p>{mockItem.description}</p>
                </Col>
            </Row>
        </StyledContainer>
    );
};

PropertyPage.propTypes = {};
