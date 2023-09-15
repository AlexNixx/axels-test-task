import renderer from 'react-test-renderer';
import 'jest-styled-components';

import {
    StyledButton,
    PropertyContainer,
    StyledImage
} from './PropertyPageStyles';

describe('Test PropertyPageStyles', () => {
    test('should contain the styles PropertyContainer', () => {
        const tree = renderer.create(<PropertyContainer />).toJSON();
        expect(tree).toHaveStyleRule('padding-top', '2rem');
        expect(tree).toHaveStyleRule('padding-bottom', '2rem');
        expect(tree).toMatchSnapshot();
    });

    test('should contain the styles StyledImage', () => {
        const tree = renderer.create(<StyledImage />).toJSON();
        expect(tree).toHaveStyleRule('width', '100%');
        expect(tree).toHaveStyleRule('max-height', '30rem');
        expect(tree).toHaveStyleRule('overflow', 'hidden');
        expect(tree).toMatchSnapshot();
    });

    test('should contain the styles StyledButton', () => {
        const tree = renderer.create(<StyledButton />).toJSON();
        expect(tree).toHaveStyleRule('width', '10rem');
        expect(tree).toHaveStyleRule('margin-bottom', '2rem');
        expect(tree).toMatchSnapshot();
    });
});
