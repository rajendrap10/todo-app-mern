import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AddForm from "./AddForm"
import ToDoFilers from './ToDoFilters';
import ToDoList from './ToDoList';
import { Context } from "../Context";

const ToDoDashboard = () => {

  const navigate = useNavigate();
  const {isLoggedIn,setIsLoggedIn} = useContext(Context);

  const logout = () => {
      localStorage.removeItem("user-token");
      setIsLoggedIn(false);
  }
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div
              className="card"
              id="list1"
              style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
            >
              <div className="card-body py-4 px-4 px-md-5">
                <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                  <i className="fas fa-check-square me-1"></i>
                  <u>My Todo-s</u>
                  <span style={{ float: "right", width: "200px" }}>
                    <a
                      href={void 0} 
                      style={{ fontSize: "28px", cursor:"pointer" }}
                      onClick={logout}
                    >
                      Logout
                    </a>
                  </span>
                </p>

                <AddForm />
                <ToDoFilers />
                <ToDoList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToDoDashboard;