import CoverLayoutMonitor from "layouts/monitor/components/CoverLayoutMonitor";
import axios from "axios";
import { useState } from "react";
import { TextField, Checkbox, Button, Box, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const NameStep = ({ name, setName, setStep }) => (
  
  <Card sx={{ width: "fit-content", margin: "3rem", width: "450px", padding: "1rem" }}>
    <MDTypography  sx={{ mt: 5, mb: 5,  textAlign: "center", color: "black" }} variant="h3" fontWeight="bold" color="black">
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
    <Button
      onClick={() => setStep(2)}
      variant="contained" 
      sx={{ mt: 5, mb: 1, fontSize: "1.2rem"}}
    >
      <MDTypography variant="text" fontWeight="small" color="orange" /> Siguiente
    </Button>
  </Card>
);

const PriorityStep = ({ priority, setPriority, setStep }) => (
  
  <Card sx={{ width: "fit-content", margin: "3rem", width: "450px", padding: "1rem" }}>
    <MDTypography  sx={{ mt: 5, mb: 1,  textAlign: "center", color: "black" }} variant="h3" fontWeight="bold" color="black">Tipo de Atencion
    </MDTypography>
    <MDBox sx={{ display: "flex", justifyContent: "center" }}>
    <Button
    variant="contained" 
    sx={{ mt: 3, mb: 1, mr: 3, fontSize: "1.2rem", color:"black"} }
    onClick={() => setPriority(0)}>
      <MDTypography variant="" fontWeight="" sx={{color:"black"}} />Atencion Prioritaria</Button>
    </MDBox>
    <MDBox sx={{ display: "flex", justifyContent: "center" }}>
    <Button
    variant="contained" 
    sx={{ mt: 5, mb: 1, mr: 3, fontSize: "1.2rem", color:"black"} }
    onChange={() => setPriority(1)}>
      <MDTypography variant="" fontWeight="" sx={{color:"black"}} />Atencion General</Button>
    </MDBox>
    <MDBox sx={{ display: "flex", justifyContent: "center" }}>
    <Button
    variant="" 
    sx={{ mt: 5, mb: 1, mr: 3, fontSize: "1.2rem", color:"black"} }
    onClick={() => setStep(1)}>
      <MDTypography variant="" fontWeight="" sx={{color:"black"}} />Atras</Button>
    <Button 
    variant="contained" 
    sx={{ mt: 5, mb: 1, fontSize: "1.2rem", color:"orange"} }
    onClick={() => setStep(3)}>
      <MDTypography variant="text" fontWeight="small" color="orange" />
      Siguiente</Button>
    </MDBox>
  </Card>

);

const ReviewStep = ({ name, priority }) => (
  <div>
    <p>Nombre: {name}</p>
    <p>Prioridad: {priority ? "Si" : "No"}</p>
    <Button>Confirmar</Button>
  </div>
);

function IngreseNombre() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(1);

  return (
    <CoverLayoutMonitor>
      <div>
        {step === 1 && (
          <NameStep name={name} setName={setName} setStep={setStep} />
        )}
        {step === 2 && (
          <PriorityStep
            priority={priority}
            setPriority={setPriority}
            setStep={setStep}
          />
        )}
        {step === 3 && <ReviewStep name={name} priority={priority} />}
      </div>
    </CoverLayoutMonitor>
  );
}

export default IngreseNombre;
