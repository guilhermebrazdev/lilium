const BASE_URL = import.meta.env.VITE_API_URL;

interface FetchOptions extends RequestInit {
  body?: any;
}

export const fetchClient = async (endpoint: string, options: FetchOptions = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config: FetchOptions = {
    method: "GET",
    headers: defaultHeaders,
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const isNoContent = response.status === 204;
    const responseData = isNoContent ? null : await response.json();

    return { data: responseData, status: response.status };
  } catch (error) {
    console.error("Error in fetch request:", error);
    throw error;
  }
};
