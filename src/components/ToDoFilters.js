import React, { useContext }  from 'react'
import { Context } from "../Context";

const ToDoFilters = () => {

    const { toDoState, setToDoState } = useContext(Context);
    const { toDoDate, setToDoDate } = useContext(Context);

    return(
            <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
              <p className="small mb-0 me-2 text-muted">Filter</p>
              <select className="select" onChange={(e) => setToDoState(e.target.value)} defaultValue={toDoState}>
                <option value="1">All</option>
                <option value="2">Completed</option>
                <option value="3">Active</option>
              </select>
              <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
              <select className="select" onChange={(e) => setToDoDate(e.target.value)} defaultValue={toDoDate}>
                <option value="-1">Newer</option>
                <option value="1">Older</option>
              </select>
              <a href="#!" style={{color:"#23af89"}} data-mdb-toggle="tooltip" title="Ascending"><i
                  className="fas fa-sort-amount-down-alt ms-2"></i></a>
            </div>
        )
}

export default ToDoFilters;