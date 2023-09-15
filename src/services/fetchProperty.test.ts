import { fetchPropertyFromApi } from './fetchProperty';
import { mockProperties } from '../utils';

describe('Test service for fetch property', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    test('should successfully fetch the property from the API', async () => {
        const mockFetchPromise = Promise.resolve(
            new Response(JSON.stringify(mockProperties[0]))
        );
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        const property = await fetchPropertyFromApi(mockProperties[0].id);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.REACT_APP_BACKEND_URI}?id=${mockProperties[0].id}`
        );
        expect(property).toEqual(mockProperties[0]);
    });

    test('should throw an error', async () => {
        const mockFetchPromise = Promise.resolve(
            new Response(JSON.stringify({}), { status: 500 })
        );
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        await expect(
            fetchPropertyFromApi(mockProperties[0].id)
        ).rejects.toThrow('Could not download the data');
    });
});
