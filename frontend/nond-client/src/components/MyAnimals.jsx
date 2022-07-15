import React from "react";
import Animal from "./Animal";

export default function MyAnimals({ myAnimals }) {
  return (
    <ul>
      {myAnimals.map((animal) => {
        return <Animal animal={animal} />;
      })}
    </ul>
  );
}
