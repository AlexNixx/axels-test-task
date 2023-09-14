import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { StyledCol, StyledContainer, StyledRow } from './HomePageStyles';

describe('Test HomePageStyles', () => {
    test('Check StyledContainer styles', () => {
        const tree = renderer.create(<StyledContainer />).toJSON();
        expect(tree).toHaveStyleRule('padding', '2rem 1rem');
        expect(tree).toHaveStyleRule('overflow', 'hidden');
        expect(tree).toMatchSnapshot();
    });

    test('Check StyledRow styles', () => {
        const tree = renderer.create(<StyledRow />).toJSON();
        expect(tree).toHaveStyleRule('row-gap', '2rem');
        expect(tree).toMatchSnapshot();
    });

    test('Check StyledCol styles', () => {
        const tree = renderer.create(<StyledCol />).toJSON();
        expect(tree).toHaveStyleRule('display', 'flex');
        expect(tree).toHaveStyleRule('justify-content', 'center');
        expect(tree).toMatchSnapshot();
    });
});
