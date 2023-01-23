import axios from 'axios';
const instance = axios.create({
  baseURL: "https://todo-app-mern.herokuapp.com",
});

export default instance;