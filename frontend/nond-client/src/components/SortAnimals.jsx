import { Button } from '@mui/material';
import React, { useState } from 'react'
import axios from "axios";


export default function SortAnimals({setMyAnimals}){
    
    const [orderReversed, setOrderReversed] = useState(undefined);

    const getSortedList = () => {
      setOrderReversed(orderReversed === undefined ? false : !orderReversed);
      const path = orderReversed ? "reverse-sorted" : "sorted";
      axios.get(`/animals/` + path).then((res) => {
          setMyAnimals(res.data);
      });
    };

    return (
        <Button onClick={getSortedList}>Sort</Button>
    )
}