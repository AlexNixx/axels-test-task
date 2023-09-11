import { PropertyItem } from '../../components/PropertyItem/PropertyItem';
import { mockData } from '../../mockData/mockData';
import {
    StyledCol,
    StyledContainer,
    StyledRow
} from '../../styles/pages/HomePage/HomePageStyles';

export const HomePage = () => {
    return (
        <StyledContainer>
            <StyledRow>
                {mockData?.map(property => (
                    <StyledCol xs={12} md={6} lg={4} xxl={3} key={property.id}>
                        <PropertyItem {...property} />
                    </StyledCol>
                ))}
            </StyledRow>
        </StyledContainer>
    );
};

HomePage.propTypes = {};
