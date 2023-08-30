// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import { Button, Table, TableRow, TableCell } from "@mui/material";

// Authentication layout components
import CoverLayoutButton from "./components/CoverButton";
import axios from "axios";
import io from "socket.io-client";
import Alarm from "assets/sound/evacuation-alert.mp3";
import { useState, useEffect } from "react";

// Images

function Cover({ transparent, light, action }) {
  const [Queues, setQueues] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [removedElement, setRemovedElement] = useState([]);
  const [isNextTurnClicked, setIsNextTurnClicked] = useState(false);
  const globalIP = process.env.REACT_APP_GLOBAL_IP;

  useEffect(() => {
    const socket = io(`http://${globalIP}`, { transports: ["polling"] });
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    
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

      axios
        .get(`http://${globalIP}/data/in_list_elements`)
        .then((response) => {
          const data = response.data.data;
          setApiData(data);
          console.log(typeof data);
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        });

    socket.on("element_removed", function (msg) {
      // Update your table in the UI here
      setRemovedElement(msg.removedElement)
      axios
        .get(`http://${globalIP}/data/in_list_elements`)
        .then((response) => {
          const data = response.data.data;
          setApiData(data);
          console.log(typeof data);
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        });
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);

  return (
    <CoverLayoutButton
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
      }}
    >
      {Queues.map((item) => (
        <Card key={item.id} sx={{ width: "fit-content", margin: "2rem" }}>
          <MDTypography
            variant="text"
            fontWeight="small"
            color="inherit"
            mt={2}
            mb={1}
            mx={9}
            style={{ fontSize: "2rem" }}
            align="center"
          >
            {item.front_name}
          </MDTypography><MDTypography
            variant="text"
            fontWeight="medium"
            color="inherit"
            mx={9}
            style={{ fontSize: "1rem" }}
          >
            Turno Actual: {removedElement[1]}
          </MDTypography>
          <Table sx={{ maxWidth: "100%", margin: "auto" }}>
            <TableCell style={{ textAlign: "center" }}>
              <MDTypography
                variant="text"
                fontWeight="small"
                color="inherit"
                mt={2}
                mb={1}
                mx={2}
              >
                Turno
              </MDTypography>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <MDTypography
                variant="text"
                fontWeight="small"
                color="inherit"
                mt={2}
                mb={1}
                mx={2}
              >
                Nombre
              </MDTypography>
            </TableCell>
          </Table>
          {apiData.filter(data => data.fila_id === item.id).map((row) => (
          <Table key={row.id} sx={{ maxWidth: "100%", margin: "auto" }}>
            <TableCell style={{ textAlign: "center" }}>
              <MDTypography
                variant="text"
                fontWeight="small"
                color="inherit"
                mt={2}
                mb={1}
                mx={2}
              >
                {row.turno}
              </MDTypography>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <MDTypography
                variant="text"
                fontWeight="small"
                color="inherit"
                mt={2}
                mb={1}
                mx={2}
              >
                {row.nombre}
              </MDTypography>
            </TableCell>
          </Table>
        ))}
          {/* <Button variant="" color="primary" onClick={() => setIsNextTurnClicked(true)} disabled={isNextTurnClicked} sx={{ mt: 1, mb: 1}}> */}

          <Button variant="" color="primary" sx={{ mt: 1, mb: 1}}>
            <MDTypography variant="text" fontWeight="small" color="black" />{" "}
            Siguiente Turno
          </Button>
          {/* <Button variant="contained" sx={{ color: "orange" }} onClick={() => setIsNextTurnClicked(false)}> */}

          <Button variant="contained" sx={{ color: "orange" }} >
            Finalizar Atendido
          </Button>
        </Card>
      ))}
    </CoverLayoutButton>
  );
}

export default Cover;
