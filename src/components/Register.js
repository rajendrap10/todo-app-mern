import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { formValidation } from "../validations/validation";
import axiosConfig from "../utils/axiosConfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*
    @@ Function : checkUser [Checking Uniqe User]
    @@ API : Calling User Check API - /checkUser
    @@ Desc - User email id should be unique in db.
    */

  const checkExistingUser = async (email) => {
    const result = await axiosConfig.post("/auth/checkUser", { email })
      .then((res) => {
        console.log(res);
        if(res.data.success){
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        return false;
      });

      return result;
  };

  /*
    @@ Function : Handling Register Form
    @@ API : Calling Registration Api = /register
    @@ Desc : This is for registering a user for accesing todo app
    */

  const handleRegister = async () => {
    // checking validation of submitted form
    let checkValidation = formValidation(email, password);

    if (checkValidation) {
      // checking if user is already registered or not
      const isUserExist = await checkExistingUser(email);
      if (isUserExist) {
        let userPostData = {
          email,
          password,
        };

        await axiosConfig
          .post("/auth/register", userPostData)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              setEmail("");
              setPassword("");
              toast.success("Registration has been done.", {
                theme: "colored",
              });
            } else {
              toast.error(res.data.message, {
                theme: "colored",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div style={{ marginTop: "50px", marginBottom: "50px" }}>
                <h3>User Registration</h3>
              </div>
              {/* Email input */}
              <div className="form-outline mb-4">
                <label>Enter a valid email address</label>
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ border: "2px solid black", borderRadius: "5px" }}
                  value={email}
                />
              </div>

              {/* Password input */}
              <div className="form-outline mb-3">
                <label>Enter password</label>
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ border: "2px solid black", borderRadius: "5px" }}
                  value={password}
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  onClick={handleRegister}
                >
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Back To Login{" "}
                  <Link to="/" className="link-danger">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;