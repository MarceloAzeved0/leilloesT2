import axios from 'axios';

const baseUrl = 'http://localhost:3001/loans';

export function getList() {
  return axios(baseUrl)
    .then(resp => {
      return resp.data;
    });
}