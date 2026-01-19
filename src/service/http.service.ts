import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_URL = 'https://www.io.pixelsoftwares.com';
const API_KEY = 'pixel';


const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.apikey = API_KEY;
    
    // Log request details
    console.log('🔵 API REQUEST:', {
      url: config.url,
      method: config.method?.toUpperCase(),
      baseURL: config.baseURL,
      headers: config.headers,
      data: config.data,
      params: config.params,
      timestamp: new Date().toISOString(),
    });
    
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ API REQUEST ERROR:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    // Log successful response
    console.log('✅ API RESPONSE SUCCESS:', {
      url: response.config.url,
      method: response.config.method?.toUpperCase(),
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      timestamp: new Date().toISOString(),
    });
    return response;
  },
  (error: AxiosError) => {
    // Log error response
    console.error('❌ API RESPONSE ERROR:', {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data || error.message,
      timestamp: new Date().toISOString(),
    });
    return Promise.reject(error);
  }
);

// Get all products
export const getAllProducts = async () => {
  const response = await api.get('/task_api.php');
  return response.data;
};

// Get product by ID
export const getProductById = async (productId: string | number) => {
  const formData = new FormData();
  formData.append('product_id', productId);
  
  const response = await api.post('/task_api.php', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default api;
