import axios from 'axios';

const url = process.env.APP_URL ? process.env.APP_URL.replace(/^\/|\/$/g, '') : 'http://127.0.0.1';
const port = process.env.APP_PORT || '3000';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? `${url}/api` : `${url}:${port}/api`;

export default axios;
