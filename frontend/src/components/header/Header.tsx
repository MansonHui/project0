import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from "@mui/icons-material/Settings";
import Navbar from "../navbar/Navbar";
import styles from "./Header.module.css";
import EmailIcon from "@mui/icons-material/Email";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import EditIcon from "@mui/icons-material/Edit";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function MenuHeaderBar() {
  let [isHide, setIsHide] = React.useState(true);
  const toggleNavbar = () => {
    setIsHide((prevState) => !prevState);
  };

  const [navBarOpacity, setNavBarOpacity] = React.useState(0);
  const handleMenuClick = () => {
    setIsHide(!isHide);
    setNavBarOpacity(isHide ? 1 : 0);
  };

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [loginToken, setLoginToken] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let location = useLocation();
  console.log("currentLocation", location);

  let pageName;
  switch (location.pathname) {
    //MainPage
    case "/HomePage":
      pageName = (
        <>
          <HomeSharpIcon />
          Home
        </>
      );
      break;
    case "/Message":
      pageName = (
        <>
          <EmailIcon />
          Instant Messaging
        </>
      );
      break;
    case "/EditNotice":
      pageName = (
        <>
          <EditIcon />
          Edit Notice
        </>
      );
      break;
    case "/AI":
      pageName = (
        <>
          <FaceRetouchingNaturalIcon />
          AI Attendances
        </>
      );
      break;
    case "/Register":
      pageName = (
        <>
          <HowToRegIcon />
          Register
        </>
      );
      break;
    case "/TeacherNotice":
      pageName = (
        <>
          <MarkEmailReadIcon />
          TeacherNotice
        </>
      );
      break;
    case "/TeacherStudentAttendance":
      pageName = (
        <>
          <DoneAllIcon />
          Attendance
        </>
      );
      break;
    case "/ParentTopUpBalance":
      pageName = (
        <>
          <MonetizationOnIcon />
          TopUp Balance
        </>
      );
      break;

    // Sub Page
    case "/Message/Notices":
      pageName = (
        <>
          <EmailIcon />
          Instant Messaging
        </>
      );
      break;
    case "/Message/NoticeDetail":
      pageName = (
        <>
          <EmailIcon />
          Instant Messaging
        </>
      );
      break;
    case "/Message/Attendance":
      pageName = (
        <>
          <EmailIcon />
          Instant Messaging
        </>
      );
      break;
    case "/TeacherNoticeDetail":
      pageName = (
        <>
          <MarkEmailReadIcon />
          TeacherNotice
        </>
      );
      break;

    default:
      pageName = location.pathname;
  }

  const removeToken = () => {
    // Implement your token removal logic here
    // For example, you could remove the token from local storage or a cookie
    localStorage.removeItem("loginToken");
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className={styles.header}>
            <IconButton
              id={styles.navbarButton}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleNavbar}
            >
              <Drawer
                anchor="left"
                open={!isHide}
                onClose={toggleNavbar}
                id={styles.drawerPaper}
                // classes={{
                //   paper: styles.drawerPaper,
                // }}
              >
                <List id={styles.list}>
                  <Navbar />
                </List>
              </Drawer>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {pageName}
            </Typography>
            {auth && (
              <div id={styles.userACButton}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  disableScrollLock={true}
                >
                  
                  <MenuItem onClick={removeToken}>
                    <LogoutIcon />
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
