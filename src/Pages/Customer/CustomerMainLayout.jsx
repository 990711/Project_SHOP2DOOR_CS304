import React, { useState } from 'react';

import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import {
    
    LocalMall as FreshProductsIcon,
  EmojiFoodBeverage as DairyAndEggsIcon,
  Fastfood as MeatAndSeafoodIcon,
  Cake as BakeryIcon,
  RestaurantMenu as CannedGoodsIcon,
  AcUnit as FrozenFoodsIcon,
  RestaurantMenu as PantryStaplesIcon,
  Fastfood as SnacksIcon,
  LocalPizza as CondimentsIcon,
  LocalFlorist as SpicesAndHerbsIcon,
  LocalLaundryService as CleaningSuppliesIcon,
  Spa as PersonalCareIcon,
  ChildFriendly as BabyCareIcon,
  Home as HouseholdItemsIcon,
  Pets as PetSuppliesIcon,
  LocalHospital as HealthAndWellnessIcon,
  LocalBar as AlcoholicBeveragesIcon,
  Restaurant as SpecialDietIcon,
  AddBox as OtherIcon,
    Category as CategoryIcon,
    Dashboard,
} from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';

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
    <div style={{ display: 'flex' }}>
      {/* Left Drawer (Sidebar) */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          {[
            { text: 'Fresh Products', icon: <FreshProductsIcon />, route: '/customermainlayout/freshproducts' },
            { text: 'Dairy and Eggs', icon: <DairyAndEggsIcon />, route: '/customermainlayout/dairyandeggs' },
            { text: 'Meat and Seafood', icon: <MeatAndSeafoodIcon />, route: '/customermainlayout/meatandseafood' },
            { text: 'Bakery', icon: <BakeryIcon />, route: '/customermainlayout/bakery' },
            { text: 'Canned Goods', icon: <CannedGoodsIcon />, route: '/customermainlayout/cannedgoods' },
            { text: 'Frozen Foods', icon: <FrozenFoodsIcon />, route: '/customermainlayout/frozenfoods' },
            { text: 'Pantry Staples', icon: <PantryStaplesIcon />, route: '/customermainlayout/pantrystaples' },
            { text: 'Snacks', icon: <SnacksIcon />, route: '/customermainlayout/snacks' },
            { text: 'Condiments', icon: <CondimentsIcon />, route: '/customermainlayout/condiments' },
            { text: 'Spices and Herbs', icon: <SpicesAndHerbsIcon />, route: '/customermainlayout/spicesandherbs' },
            { text: 'Cleaning Supplies', icon: <CleaningSuppliesIcon />, route: '/customermainlayout/cleaningsupplies' },
            { text: 'Personal Care', icon: <PersonalCareIcon />, route: '/customermainlayout/personalcare' },
            { text: 'Baby Care', icon: <BabyCareIcon />, route: '/customermainlayout/babycare' },
            { text: 'Household Items', icon: <HouseholdItemsIcon />, route: '/customermainlayout/householditems' },
            { text: 'Pet Supplies', icon: <PetSuppliesIcon />, route: '/customermainlayout/petsupplies' },
            { text: 'Health and Wellness', icon: <HealthAndWellnessIcon />, route: '/customermainlayout/healthandwellness' },
            { text: 'Alcoholic Beverages', icon: <AlcoholicBeveragesIcon />, route: '/customermainlayout/alcoholicbeverages' },
            { text: 'Special Diet', icon: <SpecialDietIcon />, route: '/customermainlayout/specialdiet' },
            { text: 'Other', icon: <OtherIcon />, route: '/customermainlayout/other' },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <ListItem button onClick={() => handleItemClick(index, item.route)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      {/* Right Drawer (Sidebar) */}
      <Drawer
        variant="persistent"
        anchor="right"
        open={rightOpen}
        sx={{
          width: 20, // Adjust the width as needed
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 70, // Adjust the width as needed
            boxSizing: 'border-box',
            position: 'fixed', // Ensure it doesn't affect other elements
            top: 0, // Position it at the top
            height: '100%', // Occupy the full height
            overflowY: 'hidden', // Hide scrollbar, content won't scroll
          },
        }}
      >
        {/* Right Sidebar Content */}
        <List>
          <ListItem>
            <ListItemText primary="Right" />
          </ListItem>
        </List>
      </Drawer>

      {/* Content */}
      <div style={{ flexGrow: 1, padding: '10px 1px 1px', marginLeft: open ? -30 : 0 , marginRight: open ? 80 : 0 }}>  
        <div style={{ overflowY: 'auto', height: '100vh' }}>
          <Outlet />
        </div>
        </div>
    </div>
  );
};

export default CustomerMainLayout;
