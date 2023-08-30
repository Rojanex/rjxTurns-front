// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Grid, Table, TableRow, TableCell, Box, Button, TextField } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

// Authentication layout components
import CoverLayoutMonitor from "layouts/monitor/components/CoverLayoutMonitor";
import axios from "axios";
import io from "socket.io-client";
import Alarm from "assets/sound/evacuation-alert.mp3";
import { useState, useEffect } from "react";

// Images

function IngreseNombre({ transparent, light, action }) {
  const [filteredItems, setFilteredItems] = useState([]);
  const [highlight, setHighlight] = useState(false);
  const globalIP = process.env.REACT_APP_GLOBAL_IP;

  useEffect(() => {
    const socket = io(`http://${globalIP}`, { transports: ["polling"] });
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

      // Change row color back to white after 10 seconds
      setTimeout(() => {
        setHighlight(false);
      }, 10000);

      console.log("received message: " + msg.message);
      console.log("removed element: ", msg.removedElement);
      var audio = new Audio(Alarm);
      audio.play();
      audio.loop = true;
      // Stop the audio after 10 seconds
      setTimeout(function () {
        audio.pause();
        audio.currentTime = 0;
      }, 10000);
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
      }}
    >
      <Box xs={{ display: "flex", flexDirection: "row" }}>
      <TextField
        variant="outlined"
        size="large"
        sx={{
          mt: 1,
          mb: 1,
          backgroundColor: "#FFFFFF", // replace with your desired blue color
          color: "#FFFFFF", // text color
          "&:hover": {
            backgroundColor: "#0069d9", // darker blue on hover, replace with your desired color
          },
          padding: '40px 80px',
          fontSize: '50px'
        }}
      />
      </Box>
    </CoverLayoutMonitor>
  );
}

export default IngreseNombre;
