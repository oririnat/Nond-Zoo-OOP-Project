import { Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import {
  sucessWithMessage,
  errorWithMessage,
} from "../components/Shared/swalAlerts";

export default function SortAnimals({ setMyAnimals }) {
  const [orderReversed, setOrderReversed] = useState(undefined);

  const getSortedList = () => {
    setOrderReversed((prevOrderReversed) =>
      prevOrderReversed === undefined ? false : !prevOrderReversed
    );
    const path = orderReversed ? "reverse-sorted" : "sorted";

    axios
      .get(`http://localhost:8080/animals/` + path)
      .then((res) => {
        setMyAnimals(res.data);
        sucessWithMessage("retirieved sorted animals sucessfully!");
      })
      .catch((err) => {
        console.log("errored while retirieved sorted animals ", err);
        errorWithMessage("errored while retirieved sorted animals");
      });
  };

  return <Button onClick={getSortedList}>Sort</Button>;
}
