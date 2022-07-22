import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {
    sucessWithMessage,
    errorWithMessage,
  } from "../Shared/swalAlerts";

const SearchAnimals = ({ setMyAnimals }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchAnimals = () => {
    axios
      .get(`http://localhost:8080/animals/search?searchInput=` + searchQuery)
      .then((res) => {
        setMyAnimals(res.data);
        sucessWithMessage("retirieved filtered animals sucessfully!");
      })
      .catch((err) => {
        console.log("errored while retirieved filtered animals ", err);
        errorWithMessage("errored while retirieved filtered animals");
      });
  };

  return (
    <>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Enter an animal name"
        variant="outlined"
        placeholder="Search Animal..."
        size="small"
        value={searchQuery}
      />
      <IconButton type="submit" aria-label="search" onClick={searchAnimals}>
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </>
  );
};

export default SearchAnimals;
