import React, { useState } from "react";
import { TextField, Box, Card, Button } from "@mui/material";
import MDTypography from "components/MDTypography";
import Link from "@mui/material/Link";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";

const NameStep = ({ name, setName, setStep }) => {
  const navigate = useNavigate();
  const [isNameValid, setIsNameValid] = useState(true);

  const handleButtonClick = () => {
    if (name.trim() === "") {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
      setStep(2);
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
        Ingrese su nombre
      </MDTypography>
      <TextField
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          style: { fontSize: "2rem" },
        }}
      />
      {!isNameValid && <p style={{ color: "red" }}>El nombre es obligatorio</p>}
      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
      <Button
          onClick={() => navigate('/toma-tu-turno')}
          variant=""
          sx={{ mt: 5, mb: 1, mr: 3, fontSize: "1rem", color: "black" }}
        >
          <MDTypography  variant="" fontWeight="" sx={{ color: "black" }} />
          Atras
        </Button>
        <Button
          onClick={handleButtonClick}
          variant="contained"
          sx={{ mt: 5, mb: 1, fontSize: "1.2rem", color: "#FFFFFF" }}
        >
          <MDTypography variant="text" fontWeight="small" /> Siguiente
        </Button>
        
      </MDBox>
    </Card>
  );
};

export default NameStep;
