// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

//assets
import logo from "assets/images/logo-ct.png"

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";



function CoverLayoutMonitor({ children }) {
  return (
    <PageLayout>
      <DefaultNavbar
        logoCompany={logo}
        transparent
        light
      />
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
        <MDBox
          sx={{
            position: "absolute",
            top: 0,
            left: "1rem",
            right: "1rem",
            bottom: 0,
          }}
        />
        <MDBox
          mt={{ xs: -20, lg: -18 }}
          px={1}
          width="calc(100% - 2rem)"
          mx="auto"
        >
          
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
              {children}
            </Grid>
          </Grid>
        </MDBox>
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
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CoverLayoutMonitor;
