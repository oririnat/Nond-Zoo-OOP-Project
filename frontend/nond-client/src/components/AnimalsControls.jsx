import React, { useState } from "react";
import SortAnimals from "./SortAnimals";
import AddAnimalModal from "./AddAnimalModal";

export default function AnimalsControls({ setMyAnimals }) {


  return (
    <>
      <SortAnimals setMyAnimals={setMyAnimals} />
      <AddAnimalModal>
        Add Animal
      </AddAnimalModal>
    </>
  );
}
