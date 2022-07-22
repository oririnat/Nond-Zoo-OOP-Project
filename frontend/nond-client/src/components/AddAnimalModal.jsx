import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AnimalSelection from "./AnimalSelection";
import { postNewAnimal } from "./Shared/ApiCalls";

export default function AddAnimalModal({ triggerAnimalsRetrieval, children }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [animalName, setAnimalName] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = () => {
    handleClose();
    postNewAnimal(animalName, type, triggerAnimalsRetrieval);
  };



  return (
    <>
      <Button onClick={handleOpen}>{children}</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add animal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new animal to your collection
          </DialogContentText>
          <TextField
            sx={{ mb: 3, mt: 3 }}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
          />
          <AnimalSelection type={type} setType={setType} sx={{ mb: 3, mt: 3 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
