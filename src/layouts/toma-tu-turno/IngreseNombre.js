import CoverLayoutMonitor from "layouts/monitor/components/CoverLayoutMonitor";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from '@mui/material/Icon';
import { useNavigate } from 'react-router-dom';
import ConfirmComponent from "./components/confirm";
import NameStep from "./components/NameStep";
import { styled } from '@mui/material/styles';

const BlueButton = styled(Button)`
  background-color: #EE7E08;
  color: white;
`;



function IngreseNombre() {
  const [step, setStep] = useState(1);
  const [fila, setFila] = useState("");
  const [filaName, setFilaName] = useState(0);
  const [queues, setQueues] = useState([]);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(1);
  const globalIP = process.env.REACT_APP_GLOBAL_IP;


  useEffect(() => {
    axios
      .get(`http://${globalIP}/data/get_queues`)
      .then((response) => {
        const data = response.data.data;
        setQueues(data);
        console.log(typeof data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  const handleButtonClickPriority = () => {
    setPriority(0);
    setStep(3);
  };
  const handleButtonClickNormal = () => {
    setPriority(1);
    setStep(3);
  };
  const handleButtonClick = (item) => {
    setFila(item.nombre);
    setStep(4);
    setFilaName(item.front_name)
  };


  const ReviewStep = ({ name, priority, fila, filaName }) => (
    <Card
        sx={{
          width: "fit-content",
          margin: "3rem",
          width: "500px",
          padding: "1rem",
        }}
      >
        <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          <MDTypography
            sx={{ mt: 3, mb: 2, textAlign: "center", color: "black" }}
            variant="h3"
            fontWeight="bold"
            color="black"
          >
            Resumen
          </MDTypography>{" "}
          
        </MDBox>
        <hr style={{ margin: '1rem 0' }} />
        <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          <MDTypography
            sx={{ textAlign: "center", color: "black" }}
            variant="h5"
            fontWeight="bold"
            color="black"
          >
            Nombre:
          </MDTypography>{" "}
          <MDTypography
            sx={{ml:1.5, textAlign: "center", color: "black" }}
            variant=""
            fontWeight=""
            color="black"
          >
            {name}
          </MDTypography>{" "}
          
        </MDBox>
  
        <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          <MDTypography
            sx={{ textAlign: "center", color: "black" }}
            variant=""
            fontWeight="bold"
            color="black"
          >
            Tipo de Atencion: 
          </MDTypography>{" "}
          <MDTypography
            sx={{ml:1.5, textAlign: "center", color: "black" }}
            variant="text"
            fontWeight=""
            color="black"
          >
            {" "}{priority === 0 ? "Prioritaria" : "General"}
          </MDTypography>{" "}
          
        </MDBox>
  
        <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          <MDTypography
            sx={{ textAlign: "center", color: "black" }}
            variant=""
            fontWeight="bold"
            color="black"
          >
            Servicio: 
          </MDTypography>{" "}
          <MDTypography
            sx={{ml:1.5, textAlign: "center", color: "black" }}
            variant="text"
            fontWeight=""
            color="black"
          >
            {" "}{filaName}
          </MDTypography>{" "}
          
        </MDBox>
        <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant=""
          sx={{ mt: 5, mb: 1, mr: 3, fontSize: "1rem", color: "black" }}
          onClick={() => setStep(3)}
        >
          <MDTypography variant="" fontWeight="" sx={{ color: "black" }} />
          Atras
        </Button>
       <ConfirmComponent globalIP={globalIP} fila={fila} priority={priority} name={name}/>
      </MDBox>
    </Card>
  );

  const ChooseFila = ({ fila, setFila, setStep }) => (
    <Card
      sx={{
        width: "fit-content",
        margin: "3rem",
        width: "500px",
        padding: "1rem",
      }}
    >
      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <MDTypography
          sx={{ mt: 3, mb: 3, textAlign: "center", color: "black" }}
          variant="h3"
          fontWeight="bold"
          color="black"
        >
          Escoga Servicio
        </MDTypography>{" "}
        
      </MDBox>
      <hr style={{ margin: '1rem 0' }} />
      {queues.map((item) => (
        <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ mt: 5, mb: 5, fontSize: "1.7rem", color: "#FFFFFF" }}
          onClick={()  => handleButtonClick(item)}
        >
          <MDTypography variant="" fontWeight="" sx={{ color: "black" }} />
          {item.front_name}
        </Button>
      </MDBox>
      ))}
      
      <hr style={{ margin: '1rem 0' }} />
      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant=""
          sx={{ mt: 3, mb: 1, fontSize: "1rem", color: "black" }}
          onClick={() => setStep(2)}
        >
          <MDTypography variant="" fontWeight="" sx={{ color: "black" }} />
          Atras
        </Button>
      </MDBox>
    </Card>
  );


  const PriorityStep = ({ priority, setPriority, setStep }) => (
    <Card
      sx={{
        width: "fit-content",
        margin: "3rem",
        width: "500px",
        padding: "1rem",
      }}
    >
      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <MDTypography
          sx={{ mt: 3, mb: 3, textAlign: "center", color: "black" }}
          variant="h3"
          fontWeight="bold"
          color="black"
        >
          Tipo de Atencion
        </MDTypography>{" "}
        
      </MDBox>
      <hr style={{ margin: '1rem 0' }} />
      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <BlueButton
          variant=""
          sx={{ mt: 5, mb: 1, fontSize: "1.7rem", color: "black" }}
          onClick={handleButtonClickPriority}
        >
         
          <Icon>pregnant_woman</Icon>
          <Icon sx={{ marginRigth: '0.5rem' }}>accessible</Icon>
          <MDTypography variant="" fontWeight="" sx={{ color: "black", ml: 1}} />{" "}
          Atencion Prioritaria
        </BlueButton>
      </MDBox>
      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ mt: 5, mb: 5, fontSize: "1.7rem", color: "#FFFFFF" }}
          onClick={handleButtonClickNormal}
        >
          <MDTypography variant="" fontWeight="" sx={{ color: "black" }} />
          Atencion General
        </Button>
      </MDBox>
      <hr style={{ margin: '1rem 0' }} />
      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant=""
          sx={{ mt: 3, mb: 1, fontSize: "1rem", color: "black" }}
          onClick={() => setStep(1)}
        >
          <MDTypography variant="" fontWeight="" sx={{ color: "black" }} />
          Atras
        </Button>
      </MDBox>
    </Card>
  );

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
        {step === 3 && <ChooseFila setFila={setFila} fila={fila} setStep={setStep}/>}
        {step === 4 && <ReviewStep name={name} priority={priority} filaName={filaName} fila={fila}/>}
      </div>
    </CoverLayoutMonitor>
  );
}

export default IngreseNombre;
