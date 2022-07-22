import React from "react";
import Box from "@mui/material/Box";
import Animal from "./Animal";

export default function MyAnimals({
  myAnimals,
  handleAnimalDeletion,
  triggerAnimalsRetrieval,
}) {
  return (
    <ul>
      <Box display="flex" style={{ flexWrap: "wrap", width: "100%" }}>
        {myAnimals.map((animal, idx) => {
          return (
            <Animal
              key={idx}
              animal={animal}
              handleAnimalDeletion={handleAnimalDeletion}
              triggerAnimalsRetrieval={triggerAnimalsRetrieval}
            />
          );
        })}
      </Box>
    </ul>
  );
}
