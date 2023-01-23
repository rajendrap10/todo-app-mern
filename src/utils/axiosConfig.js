import axios from 'axios';
const instance = axios.create({
  baseURL: "http://localhost:5000", //"https://todo-app-mern.herokuapp.com",
});

export default instance;