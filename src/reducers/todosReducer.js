import { v4 as uuidv4 } from "uuid";

export default function todosReducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodos = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodos];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "edited": {
      const todoUpdate = currentTodos.map((t) => {
        const deleteDialogShow = action.payload.deleteDialogShow;
        if (deleteDialogShow.id === t.id) {
          return {
            ...t,
            title: deleteDialogShow.title,
            details: deleteDialogShow.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(todoUpdate));
      return todoUpdate;
    }
    case "deleted": {
      const deleteDialogShow = action.payload.deleteDialogShow;
      const todo = deleteDialogShow;
      const todoUpdate = currentTodos.filter((t) => {
        return todo.id !== t.id;
      });
      localStorage.setItem("todos", JSON.stringify(todoUpdate));
      return todoUpdate;
    }
    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }
    case "toggleCompleted": {
      const todoUpdate = currentTodos.map((t) => {
        if (action.payload.id === t.id) {
          const updatedTodo = {
            ...t,
            isCompleted: !t.isCompleted,
          };
          return updatedTodo;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(todoUpdate));
      return todoUpdate;
    }
    default: {
      throw Error("unknown action" + action.type);
    }
  }
}
