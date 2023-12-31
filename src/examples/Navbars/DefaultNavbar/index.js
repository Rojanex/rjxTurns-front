

import { useState, useEffect } from "react";

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";
import Clock from "../Clock";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function DefaultNavbar({ transparent, light, action, title, monitorLink, logoCompany, modulo, children }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  
  return (
    <Container>
      <MDBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={3}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        sx={({
          palette: { transparent: transparentColor, white, background },
          functions: { rgba },
        }) => ({
          backgroundColor: transparent
            ? transparentColor.main
            : rgba(darkMode ? background.sidenav : white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        {logoCompany && <>
          <MDBox display="flex" justifyContent="center">
            <img src={logoCompany} alt="logo" />
          </MDBox>
          <MDBox 
          variant="button"
          fontWeight="bold"
          color={light ? "white" : "dark"}>
            <Clock />
          </MDBox>
        </> } 

        {modulo && <>
          <MDBox
            component={Link}
            py={transparent ? 1.5 : 0.75}
            lineHeight={1}
            pl={{ xs: 0, lg: 1 }}
          >
            <MDTypography
              variant="button"
              fontWeight="bold"
              color={light ? "white" : "dark"}
            >
              Modulo {modulo}
            </MDTypography>
          </MDBox>
        </>}

        {title && <>
          <MDBox
            component={Link}
            py={transparent ? 1.5 : 0.75}
            lineHeight={1}
            pl={{ xs: 0, lg: 1 }}
          >
            <MDTypography
              variant="button"
              fontWeight="bold"
              color={light ? "white" : "dark"}
            >
              {title}
            </MDTypography>
          </MDBox>
        </>}
          
        {monitorLink && (
          <>
            <MDBox
              color="inherit"
              display={{ xs: "none", lg: "flex" }}
              m={0}
              p={0}
            >
              <DefaultNavbarLink
                icon="donut_large"
                name="Monitor"
                route="/monitor"
                light={light}
              />
            </MDBox>
          </> 
        )}
        {action &&
          (action.type === "internal" ? (
            <MDBox display={{ xs: "none", lg: "inline-block" }}>
              <MDButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
              >
                {action.label}
              </MDButton>
            </MDBox>
          ) : (
            <MDBox display={{ xs: "none", lg: "inline-block" }}>
              <MDButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                sx={{ mt: -0.3 }}
              >
                {action.label}
              </MDButton>
            </MDBox>
          ))}
      </MDBox>
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default DefaultNavbar;
