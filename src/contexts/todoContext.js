import { createContext, useContext, useReducer } from "react";
import todosReducer from "../reducers/todosReducer";
export const todosContext = createContext([]);
export const dispatchContext = createContext(null);

export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return (
    <todosContext.Provider value={todos}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </todosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(todosContext);
};
export const useTodosDispatch = () => {
  return useContext(dispatchContext);
};
