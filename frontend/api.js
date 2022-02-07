import axios from "axios";

export const $axios = axios.create({
  baseURL: '//' + location.hostname + ':3001',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
    'Content-Type': 'application/json'
  }
});