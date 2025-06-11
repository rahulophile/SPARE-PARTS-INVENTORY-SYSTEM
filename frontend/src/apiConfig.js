import axios from 'axios';

// Backend ka base URL yahan define kar do
const API_URL = 'http://localhost:8000/api';

// Axios ka ek naya instance (copy) banate hain
const api = axios.create({
  baseURL: API_URL, // Ab har request is URL se shuru hogi
  headers: {
    'Content-Type': 'application/json', // Yeh default header set kar diya
  },
});

// Is naye instance ko export kar do taaki baaki files use kar sakein
export default api;