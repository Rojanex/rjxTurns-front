import React, { useState, useEffect } from "react";
import { TextField, Box, Card, Button } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { createTheme } from "@mui/material/styles";

const ScanCC = ({ name, setName, setStep, cc, setCC }) => {
  const [isApellidoValid, setIsApellidoValid] = useState(true);
  const [isNombreValid, setIsNombreValid] = useState(true);
  const [apellido, setApellido] = useState("");
  const [s_apellido, setSApellido] = useState("");
  const [nombre, setNombre] = useState("");
  const [s_nombre, setSNombre] = useState("");

  const apellidoRef = React.createRef();
  const sApellidoRef = React.createRef();
  const nombreRef = React.createRef();
  const sNombreRef = React.createRef();
  const cedulaRef = React.createRef();

  const handleConfirmar = () => {
    if (apellido.trim() === "" || nombre.trim() === "") {
      setIsApellidoValid(apellido.trim() !== "");
      setIsNombreValid(nombre.trim() !== "");
      return;
    }
    const fullName = `${nombre} ${s_nombre} ${apellido} ${s_apellido}`;
    setName(fullName);
    setStep(3);
  };

  const handleDelete = () => {
    setApellido("");
    setSApellido("");
    setNombre("");
    setSNombre("");
    setCC("");
    setIsApellidoValid(true);
    setIsNombreValid(true);
    apellidoRef.current.focus();
  };

  useEffect(() => {
    apellidoRef.current.focus();
  }, []);

  const theme = createTheme({
    spacing: 15, // Set the spacing factor
  });

  const handleEnterKeyPress = (e, refToFocus) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refToFocus.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^[A-Za-z]+$/; // Regular expression to match only letters

    if (!regex.test(keyValue)) {
      e.preventDefault();
    }
  };

  return (
    <Card
      sx={{
        width: "fit-content",
        margin: "3rem",
        width: "450px",
        padding: "1rem",
      }}
    >
      <MDTypography
        sx={{ mt: 5, mb: 5, textAlign: "center", color: "black" }}
        variant="h3"
        fontWeight="bold"
        color="black"
      >
        Escanee su documento de identidad
      </MDTypography>
      {!isApellidoValid && (
        <p style={{ color: "red" }}>El apellido es obligatorio</p>
      )}
      <TextField
        label="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        inputRef={apellidoRef}
        onKeyDown={(e) => handleEnterKeyPress(e, sApellidoRef)}
        onKeyPress={handleKeyPress}
        sx={{ marginBottom: theme.spacing(2) }}
        InputProps={{
          style: { fontSize: "2rem" },
        }}
      />
      <TextField
        label="Segundo Apellido"
        value={s_apellido}
        onChange={(e) => setSApellido(e.target.value)}
        inputRef={sApellidoRef}
        onKeyDown={(e) => handleEnterKeyPress(e, nombreRef)}
        sx={{ marginBottom: theme.spacing(2) }}
        InputProps={{
          style: { fontSize: "2rem" },
        }}
      />
      {!isNombreValid && (
        <p style={{ color: "red" }}>El nombre es obligatorio</p>
      )}
      <TextField
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        inputRef={nombreRef}
        onKeyDown={(e) => handleEnterKeyPress(e, sNombreRef)}
        InputProps={{
          style: { fontSize: "2rem" },
        }}
        sx={{ marginBottom: theme.spacing(2) }}
      />
      <TextField
        label="Segundo Nombre"
        value={s_nombre}
        inputRef={sNombreRef}
        onKeyDown={(e) => handleEnterKeyPress(e, cedulaRef)}
        onChange={(e) => setSNombre(e.target.value)}
        InputProps={{
          style: { fontSize: "2rem" },
        }}
        sx={{ marginBottom: theme.spacing(2) }}
      />
      <TextField
        label="Numero documento"
        value={cc}
        inputRef={cedulaRef}
        onChange={(e) => setCC(e.target.value)}
        InputProps={{
          style: { fontSize: "2rem" },
        }}
      />
      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => setStep(1)}
          variant="contained"
          sx={{ mt: 5, mb: 1, mr: 3, ml: 2, fontSize: "1rem", color: "orange" }}
        >
          <MDTypography variant="" fontWeight="" sx={{ color: "black" }} />
          Atras
        </Button>
        <Button
          onClick={handleDelete}
          variant=""
          sx={{ mt: 5, mb: 1, mr:3, fontSize: "1rem", color: "black" }}
        >
          Borrar
        </Button>
        <Button
          onClick={() => handleConfirmar(3)}
          variant="contained"
          sx={{ mt: 5, mb: 1,mr: 2, fontSize: "1rem", color: "#FFFFFF" }}
        >
          <MDTypography variant="text" fontWeight="small" /> Siguiente
        </Button>
      </MDBox>
    </Card>
  );
};

export default ScanCC;
