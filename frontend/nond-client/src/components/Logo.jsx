import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box>
      <Link to="/">
        <Box component="img" src="/logo_icon.png" alt="logo" />
      </Link>
    </Box>
  );
};

export default Logo;
