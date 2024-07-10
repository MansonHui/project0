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
import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";
import Navbar from "../navbar/Navbar";
import styles from "./Header.module.css";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 let currentLocation = useLocation()
 console.log("currentLocation",currentLocation)

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
                classes={{
                  paper: styles.drawerPaper,
                }}
              >
                <List>
                  <Navbar />
                </List>
              </Drawer>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

          {currentLocation.pathname}

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
                  <MenuItem onClick={handleClose}>
                    <CreateIcon />
                    My Account
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <SettingsIcon />
                    Setting
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
