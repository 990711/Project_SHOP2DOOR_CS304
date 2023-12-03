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
          width: "240px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "240px",
            boxSizing: "border-box",
          },
        }}
      >
        <SidePanel></SidePanel>
      </Drawer>

      {/* Content */}
      <div
        style={{
          flexGrow: 1,
          padding: "10px 1px 1px",
          marginLeft: open ? 40 : 90,
          marginRight: open ? 80 : 0,
        }}
      >
        <div style={{ height: "100vh" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerMainLayout;