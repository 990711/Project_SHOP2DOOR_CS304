import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

function App() {
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#003d2b", height: "98vh", display: "flex" }}>
          <Grid container>
            <Grid item md={4}>
              <Avatar
                sx={{
                  bgcolor: "#b9f7c6",
                  width: "300px",
                  height: "300px",
                  marginTop: "50%",
                  marginLeft: "25%",
                }}
              >
                <AccountCircleIcon
                  fontSize="large"
                  sx={{ width: "300px", height: "300px" }}
                />
              </Avatar>
              <Typography
                align="center"
                variant="h4"
                sx={{ color: "#b9f7c6", marginLeft: "10%" }}
              >
                user name
              </Typography>
            </Grid>
            <Grid item md={8}>
              <Box
                sx={{
                  margin: "10% 5% 10% 5%",
                  height: "36rem",
                  border: "solid",
                  borderColor: "#b9f7c6",
                  borderWidth: "4px",
                  borderRadius: "4%",
                }}
              >
                <Typography align="center" sx={{ color: "#b9f7c6" }}>
                  this is the items
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default App;
