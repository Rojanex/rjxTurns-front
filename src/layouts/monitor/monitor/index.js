// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Grid, Table, TableRow, TableCell, Box } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

// Authentication layout components
import CoverLayoutMonitor from "layouts/monitor/components/CoverLayoutMonitor";
import axios from "axios";
import io from "socket.io-client";
import Alarm from "assets/sound/evacuation-alert.mp3";
import { useState, useEffect } from "react";

// Images

function Cover({ transparent, light, action }) {
  const [filteredItems, setFilteredItems] = useState([]);
  const [highlight, setHighlight] = useState(false);
  const globalIP = process.env.REACT_APP_GLOBAL_IP;

  useEffect(() => {
    const socket = io(`http://${globalIP}`, { transports: ["polling"] });
    const handleElementRemoved = (msg) => {

      var audio = new Audio(Alarm);
      
      var playPromise = audio.play();
 
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          audio.loop = true;
          setTimeout(function () {
            audio.pause();
            audio.currentTime = 0;
          }, 15000);
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
        });
      }
    };
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    axios
      .get(`http://${globalIP}/data/attend_elements`)
      .then((response) => {
        const data = response.data.data;
        setFilteredItems(data);
        console.log(typeof data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });

    socket.on("element_removed", function (msg) {
      // Update your table in the UI here
      setHighlight(true);
      handleElementRemoved()

      // Change row color back to white after 10 seconds
      setTimeout(() => {
        setHighlight(false);
      }, 10000);

      console.log("received message: " + msg.message);
      console.log("removed element: ", msg.removedElement);
      
      axios
        .get(`http://${globalIP}/data/attend_elements`)
        .then((response) => {
          const data = response.data.data;
          setFilteredItems(data);
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
    <CoverLayoutMonitor
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
      }}
    >
      <Box xs={{ display: "flex", flexDirection: "row" }}>
      <Card sx={{ width: "fit-content", flex: 1}}>
        
          <Table sx={{ maxWidth: "100%", margin: "auto" }}>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>
                <MDTypography
                  variant="text"
                  fontWeight="small"
                  color="inherit"
                  mt={2}
                  mb={1}
                  mx={1}
                  style={{ fontSize: "4rem" }}
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
                  mx={1}
                  style={{ fontSize: "4rem" }}
                >
                  Modulo
                </MDTypography>
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <MDTypography
                  variant="text"
                  fontWeight="small"
                  color="inherit"
                  mt={2}
                  mb={1}
                  mx={9}
                  style={{ fontSize: "4rem" }}
                >
                  Nombre
                </MDTypography>
              </TableCell>
            </TableRow>
            {filteredItems.map((item, index) => (
              <TableRow
                key={item.id}
                style={{
                  backgroundColor:
                    highlight && index === 0 ? "#19A4E4" : "white",
                }}
              >
                <TableCell style={{ textAlign: "center" }}>
                  <MDTypography
                    variant="h3"
                    fontWeight="small"
                    color="inherit"
                    mt={2}
                    mb={1}
                    mx={5}
                    style={{ fontSize: "5rem" }}
                  >
                    {" "}
                    {item.turno}{" "}
                  </MDTypography>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <MDTypography
                    variant="h3"
                    fontWeight="medium"
                    color="inherit"
                    mt={2}
                    mb={1}
                    mx={5}
                    style={{ fontSize: "5rem" }}
                  >
                    {" "}
                    {item.modulo}{" "}
                  </MDTypography>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <MDTypography
                    variant="h3"
                    fontWeight="medium"
                    color="inherit"
                    mt={2}
                    mb={1}
                    mx={9}
                    style={{ fontSize: "5rem" }}
                  >
                    {" "}
                    {item.nombre}{" "}
                  </MDTypography>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        
      </Card>
      </Box>
      <CardMedia
        component="video"
        sx={{ width: 400, flex: 1, height: "75vh", objectFit: "cover" }}
        src="/demo_video.mp4"
        title="Video"
        // controls
        autoPlay
        muted
        loop
      ></CardMedia>
    </CoverLayoutMonitor>
  );
}

export default Cover;
