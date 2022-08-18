import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AnimalModalForm from "./AnimalModalForm";
import Button from "@mui/material/Button";
import { deleteAnimal, getAnimals } from "../services/axios";

function AnimalCrud() {
  const [animals, setAnimals] = useState([]);
  const [animal, setAnimal] = useState({});
  const [editable, setEditable] = useState(false);
  const [open, setOpen] = useState(false);

  const loadData = async () => {
    const _animals = await getAnimals();
    setAnimals(_animals);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEditable = (edit) => setEditable(edit);
  const handleClose = () => setOpen(false);
  const handleOpen = (params) => {
    setAnimal(params);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "¿Está seguro que desea eliminar el elemento?"
    );
    if (confirm) {
      const itemDelete = await deleteAnimal(id);
      alert(itemDelete.message);
      loadData();
    }
  };

  const columns = [
    { field: "key", headerName: "ID", width: 250 },
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "age", headerName: "Edad", width: 200 },
    { field: "type", headerName: "Tipo de animal", width: 150 },
    { field: "color", headerName: "Color", width: 150 },
    {
      field: "options",
      headerName: "Opciones",
      width: 150,
      renderCell: (params) => (
        <>
          <div
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              handleEditable(true);
              handleOpen(params.row);
            }}
          >
            <IconButton
              aria-label="delete"
              sx={{
                color: "primary.main",
                "&:hover": {
                  color: "#111",
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </div>

          <div
            onClick={() => {
              handleDelete(params.row.key);
              return;
            }}
          >
            <IconButton
              aria-label="delete"
              sx={{
                color: "primary.main",
                "&:hover": {
                  color: "#111",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div id="header"></div>
      {open ? (
        <AnimalModalForm
          handleClose={handleClose}
          animal={animal}
          editable={editable}
          loadData={loadData}
        />
      ) : (
        <></>
      )}
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          background: "#fff",
          marginTop: "50px",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            handleEditable(false);
            handleOpen({});
          }}
          sx={{
            marginBottom: "50px",
          }}
        >
          Añadir Animal
        </Button>

        <Box
          sx={{
            width: "65%",
            height: "600px",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            paddingLeft: "20px",
            paddingRight: "20px",
            background: "#fff",
            borderRadius: "15px",
            boxShadow: "1px 1px 20px #333",
          }}
        >
          <h1>Animales</h1>

          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={animals.map((item) => ({
                key: item._id,
                id: item._id,
                name: item.name,
                age: item.age,
                type: item.type,
                color: item.color,
              }))}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </Box>
      </Box>
    </>
  );
}

export default AnimalCrud;
