import Swal from "sweetalert2";

const sucessWithMessage = (message) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

const errorWithMessage = (message) => {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

export { sucessWithMessage, errorWithMessage };
