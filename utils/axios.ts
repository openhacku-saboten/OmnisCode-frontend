import axios from 'axios';

const myAxios = axios.create({
  baseURL: (process.env.baseUrl ?? 'http://localhost:3000') + '/api/v1',
});

export default myAxios;
