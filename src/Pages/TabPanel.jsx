// Import the necessary modules
import { Box, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductListing from '../Pages/ShopOwner/ShopOwner_ProductManagement/ProductListing';


// Define the TabPanel component
function TabPanel(props) {
  const { children, value, index, path, ...other } = props;
  const navigate = useNavigate();

  const handleChange = () => {
    navigate(path); // Navigate to the specified path when the tab is clicked
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      onClick={handleChange}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Define the propTypes for the TabPanel component
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired, // Add a new prop for the path
};

// Define the a11yProps function
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

// Define the VerticalTabs component
export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {/* Add the `path` prop for each Tab */}
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        {/* Specify the route paths for each Tab */}
        <TabPanel value={value} index={0} path="/productlising">
          Customer Register
        </TabPanel>
        <TabPanel value={value} index={1} >
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} >
          Item Three
        </TabPanel>
      </Tabs>
    </Box>
  );
}
