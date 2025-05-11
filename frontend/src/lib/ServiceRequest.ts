import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// We'll define these in a separate file later if needed
const constants = {
  SERVICE_FAILURE: "failure",
};

interface ServiceRequestOptions extends AxiosRequestConfig {
  url: string; // URL is required
  data?: any; // Data is optional
  token?: string | null;
  headers?: Record<string, string>; // Add headers property explicitly
  method?: string; // Add method property explicitly
}

const ServiceRequest = async <T = any>(
  options: ServiceRequestOptions
) => {
  const moduleName = "ServiceRequest";

  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    // Set default headers
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header if token exists
    };

    // Merge headers into options
    options.headers = { ...headers, ...options.headers };

    // Set default method to GET if not provided
    options.method = options.method || "GET";

    // Make the request using axios
    return await axios.request(options);
  } catch (error: any) {
    console.error(`Error occurred in ${moduleName} =>`, error);

    // Return a consistent error response
    return {
        status: constants.SERVICE_FAILURE,
        message:
          error.response?.data?.message ||
          error.message ||
          "An unknown error occurred",
    };
  }
};

export default ServiceRequest;
