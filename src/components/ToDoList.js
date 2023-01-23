import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { format } from 'date-fns'
import { Context } from "../Context";
import axiosConfig from "../utils/axiosConfig";

const ToDoList = () => {

    const { toDoState, setToDoState} = useContext(Context);
    const { toDoDate, setToDoDate } = useContext(Context);
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
      if(token) {
              await axiosConfig
                .get("/todolist/getToDos/" + toDoState + "/" + toDoDate, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then(function (response) {
                  if (response.data.success) {
                    setToDos(response.data.todos);
                  }
                })
                .catch(function (error) {
                  if (error.response.status == 401) {
                    toast.warn("Invalid Access !", { theme: "colored" });
                  }
                });
      }
    }

/******************************************************
 * @Fetching Delete Particular ToDo
 * @API route http://localhost:5000/deleteToDo/:Id
 * @description Deleting a particulare to do
 * @parameters null
 * @returns True or False as in response
 ******************************************************/


    const delteToDo = async (_id) => {
      if(_id) {
        await axiosConfig
          .delete("/todolist/deleteToDo/" + _id, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            if (response.data.success) {
              fetchToDoList();
              toast.warn(response.data.message, { theme: "colored" });
            }
          })
          .catch((error) => {
            console.error("There was an error!", `${error.message}`);
          });
      }
    }

/******************************************************
 * @Fetching Delete Particular ToDo
 * @API route http://localhost:5000/deleteToDo/:Id
 * @description Deleting a particulare to do
 * @parameters null
 * @returns True or False as in response
******************************************************/

    const editToDo = async (_id, title) => {
      if(_id) {
        let updateValue = prompt("Update To Do ", title);
        if(updateValue !== '') {
        let updateData  = {
          id:_id,
          title:updateValue
        }
        await axiosConfig
          .put("/todolist/editToDo", updateData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            if (response.data.success) {
              fetchToDoList();
              toast.success(response.data.message, { theme: "colored" });
            }
          })
          .catch((error) => {
            console.error("There was an error!", `${error.message}`);
          });
      }
      }
    }

/******************************************************
 * @Fetching Delete Particular ToDo
 * @API route http://localhost:5000/deleteToDo/:Id
 * @description Deleting a particulare to do
 * @parameters null
 * @returns True or False as in response
******************************************************/

    const markToDo = async (target, _id) => {
      if(_id) {
        let data  = {
          id:_id,
          isDone:target.checked
        }
        await axiosConfig
          .put("/todolist/toDoDone", data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            if (response.data.success) {
              fetchToDoList();
              toast.success(response.data.message, { theme: "colored" });
            }
          })
          .catch((error) => {
            console.error("There was an error!", `${error.message}`);
          });
      }
    }


    const isChecked = (aaa) => {  
      return 'checekd';
    }

    useEffect(() => {
      setToken(localStorage.getItem("user-token"));
      fetchToDoList();
    }, [toDoState, toDoDate, token]);

    return (
      <div>
        {toDos &&
          toDos.map((todo, index) => (
            <ul
              key={index}
              id={index}
              className="list-group list-group-horizontal rounded-0 bg-transparent"
            >
              <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                <div className="form-check">
                  <input
                    className="form-check-input me-0"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked1"
                    aria-label="..."
                    defaultChecked={!!todo.isDone}
                    onClick={(e) => markToDo(e.target, todo._id)}
                  />
                </div>
              </li>
              <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                <p className="lead fw-normal mb-0">{todo.title}</p>
              </li>
              <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                <div className="d-flex flex-row justify-content-end mb-1">
                  <a
                    href="#!"
                    className="text-info"
                    data-mdb-toggle="tooltip"
                    title="Edit todo"
                    onClick={() => editToDo(todo._id, todo.title)}
                  >
                    <i className="fas fa-pencil-alt me-3"></i>
                  </a>
                  <a
                    href="#!"
                    className="text-danger"
                    data-mdb-toggle="tooltip"
                    title="Delete todo"
                    onClick={() => delteToDo(todo._id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </a>
                </div>
                <div className="text-end text-muted">
                  <a
                    href="#!"
                    className="text-muted"
                    data-mdb-toggle="tooltip"
                    title="Created date"
                  >
                    <p className="small mb-0">
                      <i className="fas fa-info-circle me-2"></i>
                      {format(new Date(todo.createdAt), "MM/dd/yyyy")}
                    </p>
                  </a>
                </div>
              </li>
            </ul>
          ))}
      </div>
    );
}

export default ToDoList;