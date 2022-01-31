import axios from "axios";

export const $axios = axios.create({
  baseURL: '//' + navigator.host + ':3001',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
    'Content-Type': 'application/json'
  }
});