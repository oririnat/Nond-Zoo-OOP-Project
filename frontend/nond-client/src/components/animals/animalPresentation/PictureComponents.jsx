import { Box } from "@mui/material";

const GriffinPicture = () => {
  return (
    <Box
      component="img"
      sx={{
        height: 233,
        width: 350,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      alt="The animal picture"
      src={"/animals/griffin.jpg"}
    />
  );
};

const BlackPantherPicture = () => {
  return (
    <Box
      component="img"
      sx={{
        height: 233,
        width: 350,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      alt="The animal picture"
      src={"/animals/black_panther.jpg"}
    />
  );
};

const BrachiosaurusPicture = () => {
  return (
    <Box
      component="img"
      sx={{
        height: 233,
        width: 350,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      alt="The animal picture"
      src={"/animals/brachiosaurus.jpg"}
    />
  );
};

const ElephantBirdPicture = () => {
  return (
    <Box
      component="img"
      sx={{
        height: 233,
        width: 350,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      alt="The animal picture"
      src={"/animals/elephant_bird.jpg"}
    />
  );
};

const GlyptodonPicture = () => {
  return (
    <Box
      component="img"
      sx={{
        height: 233,
        width: 350,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      alt="The animal picture"
      src={"/animals/glyptodon.jpg"}
    />
  );
};

export {
  GriffinPicture,
  BlackPantherPicture,
  BrachiosaurusPicture,
  ElephantBirdPicture,
  GlyptodonPicture,
};
