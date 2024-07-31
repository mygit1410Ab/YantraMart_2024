import axios from 'axios';
import BASEURL from './baseurl';

const APIClient = axios.create({
  baseURL: BASEURL.URL,
  validateStatus: () => true,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
  },
  timeout: 10000,
});

const setAuthToken = (token: string) => {
  APIClient.defaults.headers.common['x-auth-token'] = `${token}`;
};

// const dispatch = useDispatch();

export {APIClient, setAuthToken};
