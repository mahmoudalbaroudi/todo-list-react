import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useEffect, useMemo } from "react";

import { useToast } from "../contexts/snackContext";

import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useTodos } from "../contexts/todoContext";
import { useTodosDispatch } from "../contexts/todoContext";

// icons

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function TodoList() {
  const [open, setOpen] = useState(false);
  const [deleteDialogShow, setDeleteDialogShow] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const { showHideToast } = useToast();
  const [inputValue, setInputValue] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  function changeToggleButton(e) {
    setDisplayedTodosType(e.target.value);
  }
  const completed = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);
  const uncompleted = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let displayedChange = todos;
  if (displayedTodosType == "Completed") {
    displayedChange = completed;
  } else if (displayedTodosType == "UnCompleted") {
    displayedChange = uncompleted;
  }

  const todosList = displayedChange.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        openDeleteDialog={showDeleteDialog}
        openEditDialog={showEditDialog}
      />
    );
  });
  function handleInputValue(e) {
    setInputValue(e.target.value);
  }
  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  function handleAddButton() {
    dispatch({ type: "added", payload: { newTitle: inputValue } });

    setInputValue("");
    showHideToast("The task has been added successfully");
  }
  const handleClose = () => {
    setOpen(false);
  };
  function showDeleteDialog(todo) {
    setDeleteDialogShow(todo);
    setOpen(true);
  }
  function handleDeleteClick() {
    dispatch({ type: "deleted", payload: { deleteDialogShow } });
    setOpen(false);
    showHideToast("The task was deleted successfully");
  }

  const handleCloseEidit = () => {
    setOpenEdit(false);
  };
  function showEditDialog(todo) {
    setDeleteDialogShow(todo);
    setOpenEdit(true);
  }

  function handleEditClick(e) {
    dispatch({ type: "edited", payload: { deleteDialogShow } });

    setOpenEdit(false);
    showHideToast("The task has been modified successfully");
  }

  return (
    <>
      {/* delete  dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you wamt to delete the task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can not undo the deletion after it is complete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              handleDeleteClick();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete  dialog */}

      {/* edit  dialog */}
      <Dialog
        open={openEdit}
        onClose={handleCloseEidit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to edit the task?
        </DialogTitle>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Task title"
          value={deleteDialogShow.title}
          onChange={(e) => {
            setDeleteDialogShow({ ...deleteDialogShow, title: e.target.value });
          }}
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Task details"
          value={deleteDialogShow.details}
          onChange={(e) => {
            setDeleteDialogShow({
              ...deleteDialogShow,
              details: e.target.value,
            });
          }}
          fullWidth
          variant="standard"
        />
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEidit}>Disagree</Button>
          <Button
            onClick={() => {
              handleEditClick();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* edit  dialog */}
      <Container maxWidth="sm" style={{ marginTop: "100px" }}>
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography variant="h3">My Tasks</Typography>
            <Divider />
            <ToggleButtonGroup
              style={{ marginTop: "30px" }}
              value={displayedTodosType}
              exclusive
              onChange={changeToggleButton}
              aria-label="text alignment"
              color="primary"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="Completed">Completed</ToggleButton>
              <ToggleButton value="UnCompleted">UnCompleted</ToggleButton>
            </ToggleButtonGroup>
            {todosList}
            <Grid style={{ marginTop: "20px" }} container spacing={2}>
              <Grid
                item
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  disabled={inputValue.length === 0}
                  onClick={() => {
                    handleAddButton();
                  }}
                  variant="contained"
                  style={{
                    color: inputValue.length === 0 ? "black" : "white",
                    background: inputValue.length === 0 ? "lightgray" : "green",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  Add task
                </Button>
              </Grid>
              <Grid
                item
                xs={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Task title"
                  variant="outlined"
                  value={inputValue}
                  onChange={handleInputValue}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
