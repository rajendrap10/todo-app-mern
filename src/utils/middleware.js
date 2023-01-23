import React from "react";
import axios from "axios";
// Response interceptor for API calls
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log(error);
    if (error.response?.status === 401 || error?.error === "login_required") {
        localStorage.removeItem("user-token");
        window.location.href = "/";
    }
    return Promise.reject(error);
  }
);