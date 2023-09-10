import { useEffect } from 'react';
import { Carousel, Stack } from 'react-bootstrap';

import {
    StyledButton,
    StyledContainer,
    StyledImage
} from './PropertyPageStyles';

import { convertToUSAPrice } from '../../utils/price/convertToUSAPrice';
import { mockData } from '../../mockData/mockData';

export const PropertyPage = () => {
    const id = 1;

    const mockItem = mockData.filter(item => item.id === Number(id))[0];

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    if (!mockItem) return <p>Property not found</p>;

    return (
        <StyledContainer>
            <Stack gap={2}>
                <StyledButton variant='dark'>Back</StyledButton>

                <Carousel>
                    {mockItem?.image.map(src => 
                        <Carousel.Item key={src}>
                            <StyledImage
                                src={src}
                                alt={`${mockItem.title}-photo`}
                            />
                        </Carousel.Item>
                    )}
                </Carousel>

                <h2>{mockItem.title}</h2>
                <h5>Seller: {mockItem.seller}</h5>
                <h6>Price: {convertToUSAPrice(mockItem.price)}</h6>
                <p>{mockItem.description}</p>
            </Stack>
        </StyledContainer>
    );
};
