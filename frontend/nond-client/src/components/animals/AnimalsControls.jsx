import React from "react";
import SortAnimals from "./SortAnimals";
import AddAnimalModal from "./AddAnimalModal";
import Box from "@mui/material/Box";
import SearchAnimals from "./SearchAnimals"

export default function AnimalsControls({ setMyAnimals, getAnimals }) {
  return (
    <>
      <Box display="flex">
        <SortAnimals setMyAnimals={setMyAnimals} />
        <AddAnimalModal triggerAnimalsRetrieval={getAnimals}>Add Animal</AddAnimalModal>
        <SearchAnimals setMyAnimals={setMyAnimals}/>
      </Box>
    </>
  );
}
