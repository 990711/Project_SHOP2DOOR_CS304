import React, { useState } from "react";

import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Outlet, useNavigate } from "react-router-dom";
import SidePanel from "./SidePanel";
import "../../styles/Customer.css";

const CustomerMainLayout = () => {
  const [open, setOpen] = useState(true);
  const [openItems, setOpenItems] = useState([]);

  const [rightOpen, setRightOpen] = useState(true); // Add state for the right sidebar

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRightDrawerOpen = () => {
    setRightOpen(true);
  };

  const handleRightDrawerClose = () => {
    setRightOpen(false);
  };

  const handleItemClick = (index, route) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
    if (route) {
      navigate(route);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Left Drawer (Sidebar) */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: "15%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "15%",
            boxSizing: "border-box",
          },
        }}
      >
        <SidePanel></SidePanel>
      </Drawer>
      {/* Right Drawer (Sidebar) */}
      <Drawer
        variant="persistent"
        anchor="right"
        open={rightOpen}
        sx={{
          width: 90, // Adjust the width as needed
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 90, // Adjust the width as needed
            boxSizing: "border-box",
            position: "fixed", // Ensure it doesn't affect other elements
            marginTop: 2,
            top: 0, // Position it at the top
            height: "10%",
            overflowY: "hidden", // Hide scrollbar, content won't scroll
            overflowX: "hidden", // Hide scrollbar, content won't scroll
            border: "none", // Ensure no border
          },
        }}
      >
        {/* Right Sidebar Content */}
        <List>
          <ListItem>
            <ListItemIcon>
              <ShoppingCartIcon className="rightPanelIcons"/>
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>

      {/* Content */}
      <div
        style={{
          flexGrow: 1,
          padding: "10px 1px 1px",
          marginLeft: open ? -30 : 0,
          marginRight: open ? 80 : 0,
        }}
      >
        <div style={{ overflowY: "auto", height: "100vh" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerMainLayout;
