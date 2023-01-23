import React, { useState, useContext, useEffect } from "react";
import axios from 'axios'
import { Context } from "../Context";
import { toast } from 'react-toastify';

const AddForm = () => {

    const { toDoState, setToDoState } = useContext(Context);
    const { toDoDate, setToDoDate } = useContext(Context);
    const [toDo, setToDo] = useState("");
    const { toDos, setToDos } = useContext(Context);
    const [token, setToken] = useState();

  /******************************************************
   * @Fetching ToDo List
   * @API route http://localhost:5000/getToDos
   * @description Fetching all to do list using Get API
   * @parameters null
   * @returns List of All ToDo List
   ******************************************************/

  const fetchToDoList = async () => {
    await axios
      .get("/getToDos/" + toDoState + "/" + toDoDate, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        if (response.data.success) {
          setToDos(response.data.todos);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        console.log(toDos);
      });
  };

  /******************************************************
   * @Submit To Form
   * @API route http://localhost:5000/createToDo
   * @description Calling ToDo Post API
   * @parameters title
   * @returns Success/Fail Response
   ******************************************************/

  const submitToDo = async () => {
    if (toDo === "") {
      toast.error("Lorem ipsum dolor", {
        theme: "colored",
      });
      return false;
    }

    let postData = {
      title: toDo,
    };
    await axios
      .post("/createToDo", postData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        if (response.data.success) {
          toast.success(response.data.message, { theme: "colored" });
          fetchToDoList();
          setToDo("");
        } else {
          toast.error(response.data.message, { theme: "colored" });
        }
      })
      .catch(function (error) {
        toast.error(error, { theme: "colored" });
      });
  };

  useEffect(() => {
    setToken(localStorage.getItem("user-token"));
  },[]);

  return (
    <div className="pb-2">
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-row align-items-center">
            <input
              type="text"
              className="form-control form-control-lg"
              id="exampleFormControlInput1"
              placeholder="Add new..."
              onChange={(e) => setToDo(e.target.value)}
              value={toDo}
            />
            {/* <a href="#!" data-mdb-toggle="tooltip" title="Set due date"><i
                        className="fas fa-calendar-alt fa-lg me-3"></i></a> */}
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitToDo}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
}

export default AddForm;