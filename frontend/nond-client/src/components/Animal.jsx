import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

export default function Animal({animal, handleAnimalDeletion, triggerAnimalsRetrieval}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {animal.animalType}
        </Typography>
        <Typography variant="h5" component="div">
          {animal.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleAnimalDeletion(animal.name, triggerAnimalsRetrieval)}>Delete</Button>
      </CardActions>
    </Card>
  );
}
