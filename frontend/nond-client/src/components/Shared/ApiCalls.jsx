import { sucessWithMessage, errorWithMessage } from "./swalAlerts";
import axios from "axios";

function handleAnimalDeletion(animalName, triggerAnimalsRetrieval) {
  console.log("deleting animal " + animalName);
  axios
    .delete("http://localhost:8080/animal?name=" + animalName)
    .then(() => {
      sucessWithMessage("deleted animal sucessfully!");
      triggerAnimalsRetrieval();
    })
    .catch((err) => {
      console.log("got error while deleting animal " + animalName, err);
      errorWithMessage("got error while deleting animal " + animalName);
    });
}

const postNewAnimal = (animalName, type, triggerAnimalsRetrieval) => {
  axios
    .post(`http://localhost:8080/animal`, {
      animalType: type,
      name: animalName,
    })
    .then(() => {
      sucessWithMessage("added animnal successfuly!!!");
      triggerAnimalsRetrieval();
    })
    .catch((err) => {
      console.log("error adding animal", err);
      errorWithMessage("error adding animal");
    });
};

export { handleAnimalDeletion, postNewAnimal };
