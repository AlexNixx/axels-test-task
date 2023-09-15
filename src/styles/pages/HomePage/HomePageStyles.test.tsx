import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { StyledCol, HomeContainer, StyledRow } from './HomePageStyles';

describe('Test HomePageStyles', () => {
    test('should contain the styles HomeContainer', () => {
        const tree = renderer.create(<HomeContainer />).toJSON();
        expect(tree).toHaveStyleRule('padding', '2rem 1rem');
        expect(tree).toHaveStyleRule('overflow', 'hidden');
        expect(tree).toMatchSnapshot();
    });

    test('should contain the styles StyledRow', () => {
        const tree = renderer.create(<StyledRow />).toJSON();
        expect(tree).toHaveStyleRule('row-gap', '2rem');
        expect(tree).toMatchSnapshot();
    });

    test('should contain the styles StyledCol', () => {
        const tree = renderer.create(<StyledCol />).toJSON();
        expect(tree).toHaveStyleRule('display', 'flex');
        expect(tree).toHaveStyleRule('justify-content', 'center');
        expect(tree).toMatchSnapshot();
    });
});
