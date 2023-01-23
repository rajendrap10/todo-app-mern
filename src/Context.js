import React, { useState } from "react";
  
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    
    const [toDoState, setToDoState] = useState(1);
    const [toDoDate, setToDoDate] = useState(1);
    const [toDos, setToDos] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    return (
      <Context.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          toDoState,
          setToDoState,
          toDoDate,
          setToDoDate,
          toDos,
          setToDos,
        }}
      >
        {children}
      </Context.Provider>
    );
};