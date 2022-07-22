import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import AnimalContent from "./AnimalContent";


export default function Animal({animal, handleAnimalDeletion, triggerAnimalsRetrieval}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <AnimalContent animal={animal} />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleAnimalDeletion(animal.name, triggerAnimalsRetrieval)}>Delete</Button>
      </CardActions>
    </Card>
  );
}
