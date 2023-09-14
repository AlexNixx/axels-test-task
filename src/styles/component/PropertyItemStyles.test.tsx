import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { StyledCard, StyledImage } from './PropertyItemStyles';

describe('Test PropertyItemStyles', () => {
    test('Check StyledCart styles', () => {
        const tree = renderer.create(<StyledCard />).toJSON();
        expect(tree).toHaveStyleRule('height', '20rem');
        expect(tree).toHaveStyleRule('overflow', 'hidden');
        expect(tree).toMatchSnapshot();
    });

    test('Check StyledImage styles', () => {
        const tree = renderer.create(<StyledImage />).toJSON();
        expect(tree).toHaveStyleRule('height', '10rem');
        expect(tree).toHaveStyleRule('object-fit', 'cover');
        expect(tree).toHaveStyleRule('transform', 'scale(1.05)', {
            modifier: ':hover'
        });
        expect(tree).toMatchSnapshot();
    });
});
