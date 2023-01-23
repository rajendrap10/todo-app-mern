import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const formValidation = (email, password) => {
  // if email & password both are empty
  if (email === "" && password === "") {
    toast.error("Please fill out the form !", {
      theme: "colored",
    });
    return false;
  }

  // if email is empty only
  if (email === "") {
    toast.error("Please enter email id !", {
      theme: "colored",
    });
    return false;
  }

  // email pattern validation
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || regex.test(email) === false) {
        toast.error("Please enter valid email address !", {
          theme: "colored",
        });
        return false;
    }
  // if email is empty only
  if (password === "") {
    toast.error("Please enter password !", {
      theme: "colored",
    });
    return false;
  }

  return true;
};

export const loginValidation = (email, password) => {
  // if email & password both are empty
  if (email === "" && password === "") {
    toast.error("Please fill out the form !", {
      theme: "colored",
    });
    return false;
  }

  // if email is empty only
  if (email === "") {
    toast.error("Please enter email id !", {
      theme: "colored",
    });
    return false;
  }

  // email pattern validation
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email || regex.test(email) === false) {
    toast.error("Please enter valid email address !", {
      theme: "colored",
    });
    return false;
  }
  // if email is empty only
  if (password === "") {
    toast.error("Please enter password !", {
      theme: "colored",
    });
    return false;
  }

  return true;
};
