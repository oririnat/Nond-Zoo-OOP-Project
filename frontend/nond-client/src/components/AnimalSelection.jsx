import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AnimalSelection({type, setType}) {

  const handleChange = (event) => setType(event.target.value);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type}
        label="Animal Type"
        onChange={handleChange}
      >
        <MenuItem value={"BlackPanther"}>BlackPanther</MenuItem>
        <MenuItem value={"Brachiosaurus"}>Brachiosaurus</MenuItem>
        <MenuItem value={"ElephantBird"}>ElephantBird</MenuItem>
        <MenuItem value={"Glyptodon"}>Glyptodon</MenuItem>
        <MenuItem value={"Griffin"}>Griffin</MenuItem>
      </Select>
    </FormControl>
  );
}
