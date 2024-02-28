import "./App.css";
import TodoList from "./components/TodoList";

import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { ToastProvider } from "./contexts/snackContext";
import { TodosProvider } from "./contexts/todoContext";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[800],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "black",
            }}
          >
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
