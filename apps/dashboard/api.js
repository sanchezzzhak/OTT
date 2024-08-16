import axios from "axios";

export const $axios = axios.create({
  baseURL: '//' + location.host,
  withCredentials: false,
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
});