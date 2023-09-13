import { fetchPropertiesFromApi } from './fetchProperties';
import fetchMock from 'jest-fetch-mock';

describe('fetchPropertiesFromApi', () => {
    beforeAll(() => {
        fetchMock.enableMocks();
    });

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    afterAll(() => {
        fetchMock.disableMocks();
    });

    test('should fetch properties from the API', async () => {
        const mockApiResponse = [
            {
                id: 1,
                title: 'Cozy Apartment in the City Center',
                price: 1200,
                address: '123 Main Street, Kyiv, Ukraine',
                seller: 'John Doe',
                description:
                    'This cozy apartment is located in the heart of the city, close to ...!',
                images: [
                    'https://media.istockphoto.com/id/1322575582/photo/exterior-view-of-...',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt2QX3mmexpRD...',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ87P2uJ3BtSk_...'
                ]
            }
        ];

        fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse));

        const properties = await fetchPropertiesFromApi();

        expect(fetch).toHaveBeenCalledWith(process.env.REACT_APP_BACKEND_URI);
        expect(fetch).toHaveBeenCalledTimes(1);

        expect(properties).toEqual(mockApiResponse);
    });

    test('should throw an error if the API call fails', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });

        await expect(fetchPropertiesFromApi()).rejects.toThrow(
            'Could not download the data'
        );
    });
});
