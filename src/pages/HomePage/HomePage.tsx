import { useEffect } from 'react';

import { PropertyItem } from '../../components/PropertyItem';

import { fetchProperties } from '../../redux/ducks/properties';
import { useAppDispatch, useAppSelector } from '../../redux';
import {
    StyledCol,
    StyledContainer,
    StyledRow
} from '../../styles/pages/HomePageStyles';

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const properties = useAppSelector(
        state => state.propertiesReducer.properties
    );
    const error = useAppSelector(state => state.propertiesReducer.error);
    const loading = useAppSelector(state => state.propertiesReducer.loading);

    useEffect(() => {
        dispatch(fetchProperties());
    }, [dispatch]);

    if (loading) return <p data-testid='loadingText'>Loading...</p>;

    if (error) return <p data-testid='errorText'>{error}</p>;

    return (
        <StyledContainer data-testid='homePage'>
            <StyledRow>
                {properties?.map(property => (
                    <StyledCol xs={12} md={6} lg={4} xxl={3} key={property.id}>
                        <PropertyItem {...property} />
                    </StyledCol>
                ))}
            </StyledRow>
        </StyledContainer>
    );
};
