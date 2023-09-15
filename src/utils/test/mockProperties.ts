import type { Property } from '../../redux/ducks/properties';

export const mockProperties: Property[] = [
    {
        id: 1,
        title: 'Test Property',
        price: 100,
        address: '123 Test St',
        seller: 'Test Seller',
        description: 'Test Description',
        images: ['test.jpg']
    }
];
