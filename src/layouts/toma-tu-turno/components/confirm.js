import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MDTypography from "components/MDTypography";
import { Button} from "@mui/material";


function ConfirmComponent({priority, fila, name, globalIP}) {
    const navigate = useNavigate();
    
    const handleButtonClickSummit = (priority, fila, name) => {
      axios
        .get(`http://${globalIP}/queue/add_element?queue_name=${fila}&name=${name}&priority=${priority}`)
        .then((response) => {
          console.log(response);
          navigate('/toma-tu-turno');
        })
        .catch((error) => {
          console.error("Error adding element to API:", error);
        });
      
    };

    return(
      <Button
      onClick={() => handleButtonClickSummit(priority, fila, name)}
      variant="contained"
      sx={{ mt: 5, mb: 1, fontSize: "1.2rem" , color: "#FFFFFF"}}
    >
      <MDTypography variant="text" fontWeight="small"  />{" "}
      Confirmar
    </Button>
    )
  }

  export default ConfirmComponent