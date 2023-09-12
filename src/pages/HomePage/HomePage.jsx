import { PropertyItem } from '../../components/PropertyItem/PropertyItem';
import {
    StyledCol,
    StyledContainer,
    StyledRow
} from '../../shared/styles/pages/HomePage/HomePageStyles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../../store/propertiesReducer';

export const HomePage = () => {
    const dispatch = useDispatch();
    const properties = useSelector(state => state.propertiesReducer.properties);
    const error = useSelector(state => state.propertiesReducer.error);
    const loading = useSelector(state => state.propertiesReducer.loading);

    useEffect(() => {
        dispatch(fetchProperties());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;

    return (
        <StyledContainer>
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

HomePage.propTypes = {};
