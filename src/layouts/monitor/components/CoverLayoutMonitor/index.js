// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

//assets
import logo from "assets/images/logo-ct.png";

// @mui material components
import Grid from "@mui/material/Grid";
import { Card, Table, TableRow, TableCell } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

import axios from "axios";
import io from "socket.io-client";
import { useState, useEffect } from "react";

function CoverLayoutMonitor({ children }) {
  return (
    <PageLayout>
      <DefaultNavbar logoCompany={logo} transparent light />
      <MDBox
        width="calc(100% - 2rem)"
        minHeight="100vh"
        borderRadius="xl"
        mx="auto"
        my={0}
        p={0}
        sx={{
          backgroundColor: "#2F4B94",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "calc(100vh - 90px)", paddingTop: "180px" }} // Adjust '64px' to the actual height of your navbar
        >
          {children}
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

// Setting default props for the CoverLayout
CoverLayoutMonitor.defaultProps = {
  coverHeight: "25vh",
};

// Typechecking props for the CoverLayout
CoverLayoutMonitor.propTypes = {
  coverHeight: PropTypes.string,
  //image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CoverLayoutMonitor;
