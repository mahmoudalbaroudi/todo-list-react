import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";

import * as React from "react";
import { useToast } from "../contexts/snackContext";
import { useTodosDispatch } from "../contexts/todoContext";

export default function Todo({ todo, openDeleteDialog, openEditDialog }) {
  const { showHideToast } = useToast();
  const handleClickOpen = () => {
    openDeleteDialog(todo);
  };
  const handleClickOpenEidit = () => {
    openEditDialog(todo);
  };

  const dispatch = useTodosDispatch();
  function handleCheckClick() {
    dispatch({ type: "toggleCompleted", payload: todo });
    if (todo.isCompleted) {
      showHideToast("The task is not completed");
    } else {
      showHideToast("The task is completed");
    }
  }

  return (
    <>
      {" "}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* edit click */}
              <IconButton
                onClick={handleClickOpenEidit}
                className="iconButton"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
                aria-label="delete"
              >
                <EditIcon />
              </IconButton>

              {/* edit click */}

              {/* delete click */}
              <IconButton
                onClick={() => {
                  handleClickOpen();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
              >
                <DeleteIcon />
              </IconButton>

              {/* check click */}
              <IconButton
                onClick={handleCheckClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "green" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckCircleRoundedIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="h5"
                sx={{ textAlign: "right" }}
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
              {/* <p>i dont know</p> */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
