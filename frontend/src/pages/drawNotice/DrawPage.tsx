
import styles from "./DrawPage.module.css";
import CreateIcon from "@mui/icons-material/Create";
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";


import { Outlet, useNavigate } from "react-router-dom";




const actions = [
  { icon: <CreateIcon />, name: "Create" },
];

export default function Drawpage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  
  const handleCreateClick = () => {
    navigate("Textarea");
  };
 

  return (
    
    <div className={styles.Container}>
     
      <Box sx={{ height: "97%", transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleCreateClick}
            />
          ))}
        </SpeedDial>
      </Box>


      <Outlet />
    </div>
  );
}
