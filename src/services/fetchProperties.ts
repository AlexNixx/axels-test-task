export const fetchPropertiesFromApi = async () => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URI);
    if (!response.ok) {
        throw new Error('Could not download the data');
    }
    return await response.json();
};
