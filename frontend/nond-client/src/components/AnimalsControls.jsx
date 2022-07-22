import React from "react";
import SortAnimals from "./SortAnimals";
import AddAnimalModal from "./AddAnimalModal";
import Box from '@mui/material/Box'
export default function AnimalsControls({ setMyAnimals }) {


  return (
    <>
    <Box display="flex">
      <SortAnimals setMyAnimals={setMyAnimals} />
      <AddAnimalModal>
        Add Animal
      </AddAnimalModal>
      </Box>
    </>
  );
}
