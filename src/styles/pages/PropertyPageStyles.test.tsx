import renderer from 'react-test-renderer';
import 'jest-styled-components';

import {
    StyledButton,
    StyledContainer,
    StyledImage
} from './PropertyPageStyles';

describe('Test PropertyPageStyles', () => {
    test('Check StyledContainer styles', () => {
        const tree = renderer.create(<StyledContainer />).toJSON();
        expect(tree).toHaveStyleRule('padding-top', '2rem');
        expect(tree).toHaveStyleRule('padding-bottom', '2rem');
        expect(tree).toMatchSnapshot();
    });

    test('Check StyledImage styles', () => {
        const tree = renderer.create(<StyledImage />).toJSON();
        expect(tree).toHaveStyleRule('width', '100%');
        expect(tree).toHaveStyleRule('max-height', '30rem');
        expect(tree).toHaveStyleRule('overflow', 'hidden');
        expect(tree).toMatchSnapshot();
    });

    test('Check StyledButton styles', () => {
        const tree = renderer.create(<StyledButton />).toJSON();
        expect(tree).toHaveStyleRule('width', '10rem');
        expect(tree).toHaveStyleRule('margin-bottom', '2rem');
        expect(tree).toMatchSnapshot();
    });
});
