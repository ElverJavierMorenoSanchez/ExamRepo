import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { putAnimal, postAnimal } from "../services/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  borderRadius: "15px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  align: "center",
  p: 4,
};

export default function AnimalModalForm(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (props.animal) {
      setName(props.animal.name);
      setAge(props.animal.age);
      setType(props.animal.type);
      setColor(props.animal.color);
    }
  }, []);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleSubmit = async (event) => {
    await event.preventDefault();

    const newAnimal = {
      name,
      age,
      type,
      color,
    };

    if (props.editable) {
      const animal = await putAnimal(props.animal.key, newAnimal);
      alert(animal.message);
      props.loadData();
    } else {
      const animal = await postAnimal(newAnimal);
      alert(animal.message);
      props.loadData();
    }

    props.handleClose();
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 align="center">{props.editable ? "Editar" : "Añadir"} Animal</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="name"
              label="Nombre"
              type="text"
              value={name}
              onChange={handleChangeName}
              sx={{
                marginTop: "15px",
              }}
            />
            <TextField
              fullWidth
              id="age"
              label="Edad"
              type="number"
              value={age}
              onChange={handleChangeAge}
              sx={{
                marginTop: "15px",
              }}
            />
            <TextField
              fullWidth
              id="type"
              label="Tipo de animal"
              type="text"
              value={type}
              onChange={handleChangeType}
              sx={{
                marginTop: "15px",
              }}
            />
            <TextField
              fullWidth
              id="color"
              label="Color"
              type="text"
              value={color}
              onChange={handleChangeColor}
              sx={{
                marginTop: "15px",
              }}
            />
            <Box
              sx={{
                margin: "20px",
                marginTop: "50px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{
                  width: "100px",
                }}
                onClick={() => handleSubmit()}
              >
                Guardar
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={props.handleClose}
                sx={{
                  width: "100px",
                }}
              >
                Salir
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
