import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { loginValidation } from "../validations/validation";
import { Context } from "../Context";

const Login = () => {

  let navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async () => {
      let checkValidation = loginValidation(email, password);
      if(checkValidation) {
        let postData = {
          email,
          password
        }
        try {
          await axios.post('/auth/login', postData)
          .then((res) => {
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: "colored",
              });
              localStorage.setItem("user-token", res.data.token);
              setIsLoggedIn(true);
            } else if(!res.data.success) {
              toast.error(res.data.message, {
                theme: "colored",
              });
              setIsLoggedIn(false);
            }
          }).catch((err)=>{
            console.log(err);
          })
        } catch (error) {
          console.log(error);
        }
      }
  }

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
                <h3>User Login</h3>
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
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  onClick={handleLogin}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link to="/register" className="link-danger">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
