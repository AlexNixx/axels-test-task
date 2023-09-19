import { fetchPropertiesFromApi } from './fetchProperties';
import { mockProperties } from '../utils';

describe('Test service for fetch properties', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    test('should successfully fetch the properties from the API', async () => {
        const mockFetchPromise = Promise.resolve(
            new Response(JSON.stringify(mockProperties))
        );
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        const properties = await fetchPropertiesFromApi();

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            process.env.REACT_APP_BACKEND_URI
        );
        expect(properties).toEqual(mockProperties);
    });

    test('should throw an error', async () => {
        const mockFetchPromise = Promise.resolve(
            new Response(JSON.stringify({}), { status: 500 })
        );
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        await expect(fetchPropertiesFromApi()).rejects.toThrow(
            'Could not download the data'
        );
    });
});
