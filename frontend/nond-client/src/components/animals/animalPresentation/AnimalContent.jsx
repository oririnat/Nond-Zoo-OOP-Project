import React from "react";
import { Typography } from "@mui/material";
import {
  GriffinPicture,
  BlackPantherPicture,
  BrachiosaurusPicture,
  ElephantBirdPicture,
  GlyptodonPicture,
} from "./PictureComponents";

const AnimalContent = ({ animal }) => {
  const Animals = {
    BlackPanther: <BlackPantherPicture />,
    Brachiosaurus: <BrachiosaurusPicture />,
    ElephantBird: <ElephantBirdPicture />,
    Glyptodon: <GlyptodonPicture />,
    Griffin: <GriffinPicture />,
  };

  return (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {animal.animalType}
      </Typography>
      {Animals[animal.animalType] || <GriffinPicture />}
      <Typography variant="h5" component="div">
        {animal.name}
      </Typography>
    </>
  );
};

export default AnimalContent;
