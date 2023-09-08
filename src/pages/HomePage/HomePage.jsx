import {PropertyItem} from "../../components/PropertyItem/PropertyItem";
import {mockData} from "../../mockData/mockData";
import {StyledCol, StyledContainer, StyledRow} from "./HomePageStyles";

export const HomePage = () => {
    return (
        <StyledContainer>
            <StyledRow xs={1} md={2} lg={3} xl={4}>
                {mockData.map((property) => (
                    <StyledCol key={property.id}>
                        <PropertyItem {...property} />
                    </StyledCol>
                ))}
            </StyledRow>
        </StyledContainer>
    );
};
