// The base URL of your backend API.
// By using a relative path, the browser will request from the same host and port.
const API_BASE_URL = '/api/movies';

/**
 * Fetches movies from the API.
 * @param {string} query - Optional query string to append to the URL (e.g., '?genre=Action').
 * @returns {Promise<Object[]>} - A promise that resolves to an array of movie objects.
 */
export async function getMovies(query = '') {
    // Correctly construct the full URL
    const url = `${API_BASE_URL}${query}`;

    try {
        const response = await fetch(url); // GET is the default method, headers not needed for a simple GET

        // Check if the response was not successful (status code outside 200-299 range)
        if (!response.ok) {
            // Try to parse the error response body
            const errorData = await response.json().catch(() => null); // Handle cases where body is not valid JSON
            const errorMessage = errorData?.error || `HTTP error! Status: ${response.status}`;
            throw new Error(errorMessage);
        }

        // If successful, parse the JSON response
        const result = await response.json();

        // The backend wraps the data in a 'data' property
        return result.data;

    } catch (error) {
        console.error('API Error in getMovies:', error);

        // Improve error message for failed network requests
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            throw new Error('Could not connect to the API server. Is it running?');
        }

        // Re-throw other errors to be handled by the caller
        throw error;
    }
}
