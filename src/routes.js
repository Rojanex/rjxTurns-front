/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Monitor from "layouts/monitor/monitor"
import VirtualButton from "layouts/virtual_button/index"
import TomaTurno from "layouts/toma-tu-turno/TomaTurno"
import IngreseNombre from "layouts/toma-tu-turno/IngreseNombre";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Monitor",
    key: "monitor",
    icon: <Icon fontSize="small">donut_large</Icon>,
    route: "/monitor",
    component: <Monitor />,
  },
  {
    type: "title",
    name: "Button1",
    key: "mod1",
    icon: <Icon fontSize="small">button</Icon>,
    route: "/control-de-filas/mod1",
    component: <VirtualButton modulo="1" />,
  },
  {
    type: "title",
    name: "Button2",
    key: "mod2",
    icon: <Icon fontSize="small">button</Icon>,
    route: "/control-de-filas/mod2",
    component: <VirtualButton modulo="2" />,
  },
  {
    type: "title",
    name: "Button3",
    key: "mod3",
    icon: <Icon fontSize="small">button</Icon>,
    route: "/control-de-filas/mod3",
    component: <VirtualButton modulo="3" />,
  },
  {
    type: "title",
    name: "Button4",
    key: "mod4",
    icon: <Icon fontSize="small">button</Icon>,
    route: "/control-de-filas/mod4",
    component: <VirtualButton modulo="4" />,
  },
  {
    type: "title",
    name: "Turno",
    key: "toma-tu-turno",
    icon: <Icon fontSize="small">button</Icon>,
    route: "/toma-tu-turno",
    component: <TomaTurno />,
  },
  {
    type: "title",
    name: "Turno",
    key: "ingrese",
    icon: <Icon fontSize="small">button</Icon>,
    route: "/ingrese",
    component: <IngreseNombre />,
  },
];

export default routes;
