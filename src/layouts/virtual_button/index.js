import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import { Button, Table, TableRow, TableCell } from "@mui/material";

// Authentication layout components
import CoverLayoutButton from "./components/CoverButton";
import axios from "axios";
import io from "socket.io-client";
import { useState, useEffect } from "react";

// Images

function VirtualButton({ transparent, light, action, modulo }) {
  const modulo_api = modulo
  const [Queues, setQueues] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [removedElement, setRemovedElement] = useState([]);
  const [removedElement1, setRemovedElement1] = useState([]);
  const [removedElement2, setRemovedElement2] = useState([]);
  const [removedElement3, setRemovedElement3] = useState([]);
  const [removedElement4, setRemovedElement4] = useState([]);
  const [isNextTurnClicked, setIsNextTurnClicked] = useState(false);
  const globalIP = process.env.REACT_APP_GLOBAL_IP;

  const handleButtonClickNext = ({ queue_name }) => {
    const module_api = modulo;
    setIsNextTurnClicked(true);
    axios
      .get(
        `http://${globalIP}/queue/call_element?module=${module_api}&queue_name=${queue_name}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error removing element to API:", error);
      });
  };

  const handleButtonClickEnd = ({ id_element }) => {
    setIsNextTurnClicked(false);
    console.log()
    axios
      .get(`http://${globalIP}/queue/end_element?id_element=${id_element}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error ending element to API:", error);
      });
  };

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
      //setRemovedElement(msg.removedElement)
      console.log(msg.modulo)
      switch (msg.modulo) {
        case '1':
          setRemovedElement1(msg.removedElement);
          break;
        case "2":
          setRemovedElement2(msg.removedElement);
          break;
        case "3":
          setRemovedElement3(msg.removedElement);
          break;
        case "4":
          setRemovedElement4(msg.removedElement);
          break;
        default:
          console.error('Invalid module:', msg.modulo);
      }
      
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

    socket.on("elementAdded", function () {
      // Update your table in the UI here
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
      modulo={modulo_api}
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
          </MDTypography>
          <MDTypography
            variant="text"
            fontWeight="medium"
            color="inherit"
            mx={9}
            style={{ fontSize: "1rem" }}
          >
            Turno Actual:{" "}
            {modulo_api === "1"
              ? removedElement1[1]
              : modulo_api === "2"
              ? removedElement2[1]
              : modulo_api === "3"
              ? removedElement3[1]
              : modulo_api === "4"
              ? removedElement4[1]
              : null}
          </MDTypography>
          <Table sx={{ maxWidth: "100%", margin: "auto" }}>
            <TableCell style={{ textAlign: "center" }}>
              <MDTypography
                variant="text"
                fontWeight="medium"
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
                fontWeight="medium"
                color="inherit"
                mt={2}
                mb={1}
                mx={2}
              >
                Nombre
              </MDTypography>
            </TableCell>
          </Table>
          {apiData
            .filter((data) => data.fila_id === item.id)
            .map((row) => (
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
          <Button
            variant=""
            color="primary"
            onClick={() => handleButtonClickNext({ queue_name: item.nombre })}
            disabled={isNextTurnClicked}
            sx={{ mt: 1, mb: 1 }}
          >
            {/* <Button variant="" color="primary" sx={{ mt: 1, mb: 1}} */}
            <MDTypography
              variant="text"
              fontWeight="small"
              color="black"
            />{" "}
            Siguiente Turno
          </Button>
          <Button
            variant="contained"
            sx={{ color: "orange" }}
            onClick={() =>
              handleButtonClickEnd({
                id_element:
                    modulo_api === "1"
                    ? removedElement1[2]
                    : modulo_api === "2"
                    ? removedElement2[2]
                    : modulo_api === "3"
                    ? removedElement3[2]
                    : modulo_api === "4"
                    ? removedElement4[2]
                    : removedElement,
              })
            }
          >
            {/* <Button variant="contained" sx={{ color: "orange" }} > */}
            Finalizar Atendido
          </Button>
        </Card>
      ))}
    </CoverLayoutButton>
  );
}

export default VirtualButton;
