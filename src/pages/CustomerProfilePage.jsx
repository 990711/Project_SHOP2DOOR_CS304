import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

function CustomerProfilePage() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ bgcolor: "#003d2b", height: "50rem", display: "flex" }}>
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
              variant="h5"
              sx={{ color: "#b9f7c6", marginLeft: "10%" }}
            >
              user name
            </Typography>
            <Typography
              color="#b9f7c6"
              align="center"
              variant="h6"
              sx={{ marginLeft: "10%" }}
            >
              see more
            </Typography>
          </Grid>
          <Grid item md={8}>
            <Box
              sx={{
                margin: "16%",
                height: "29rem",
                border: "solid",
                borderColor: "#b9f7c6",
                borderWidth: "4px",
                borderRadius: "4%",
              }}
            >
              <Grid
                container
                bgcolor={"#003d2b"}
                rowSpacing={3}
                columnSpacing={3}
                marginTop={2}
                marginBottom={3}
                marginLeft={1}
                marginRight={3}
                border={"solid"}
                borderColor={"#003d2b"}
                borderRadius={1}
                height={"95%"}
                width={"95%"}
              >
                <Grid item md="4" justifyContent={"space-evenly"}>
                  <Card sx={{ bgcolor: "#b9f7c6", width: "auto" }}>
                    <CardContent>
                      <Avatar
                        sx={{
                          bgcolor: "#003d2b",
                          width: "50px",
                          height: "50px",
                          marginLeft: "39%",
                          marginTop: "10%",
                        }}
                      >
                        <ShoppingCartIcon
                          fontSize="large"
                          sx={{ alignItems: "center" }}
                        />
                      </Avatar>
                      <Typography
                        variant="h5"
                        align="center"
                        marginTop={"5%"}
                        sx={{ color: "#003d2b" }}
                      >
                        Orders
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md="4">
                  <Card sx={{ bgcolor: "#b9f7c6", width: "auto" }}>
                    <CardContent>
                      <Avatar
                        sx={{
                          bgcolor: "#003d2b",
                          width: "50px",
                          height: "50px",
                          marginLeft: "39%",
                          marginTop: "10%",
                        }}
                      >
                        <ShoppingCartIcon
                          fontSize="large"
                          sx={{ alignItems: "center" }}
                        />
                      </Avatar>
                      <Typography
                        variant="h5"
                        align="center"
                        marginTop={"5%"}
                        sx={{ color: "#003d2b" }}
                      >
                        Orders
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md="4">
                  <Card sx={{ bgcolor: "#b9f7c6", width: "auto" }}>
                    <CardContent>
                      <Avatar
                        sx={{
                          bgcolor: "#003d2b",
                          width: "50px",
                          height: "50px",
                          marginLeft: "39%",
                          marginTop: "10%",
                        }}
                      >
                        <ShoppingCartIcon
                          fontSize="large"
                          sx={{ alignItems: "center" }}
                        />
                      </Avatar>
                      <Typography
                        variant="h5"
                        align="center"
                        marginTop={"5%"}
                        sx={{ color: "#003d2b" }}
                      >
                        Orders
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md="4">
                  <Card sx={{ bgcolor: "#b9f7c6", width: "auto" }}>
                    <CardContent>
                      <Avatar
                        sx={{
                          bgcolor: "#003d2b",
                          width: "50px",
                          height: "50px",
                          marginLeft: "39%",
                          marginTop: "10%",
                        }}
                      >
                        <ShoppingCartIcon
                          fontSize="large"
                          sx={{ alignItems: "center" }}
                        />
                      </Avatar>
                      <Typography
                        variant="h5"
                        align="center"
                        marginTop={"5%"}
                        sx={{ color: "#003d2b" }}
                      >
                        Orders
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md="4">
                  <Card sx={{ bgcolor: "#b9f7c6", width: "auto" }}>
                    <CardContent>
                      <Avatar
                        sx={{
                          bgcolor: "#003d2b",
                          width: "50px",
                          height: "50px",
                          marginLeft: "39%",
                          marginTop: "10%",
                        }}
                      >
                        <ShoppingCartIcon
                          fontSize="large"
                          sx={{ alignItems: "center" }}
                        />
                      </Avatar>
                      <Typography
                        variant="h5"
                        align="center"
                        marginTop={"5%"}
                        sx={{ color: "#003d2b" }}
                      >
                        Orders
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md="4">
                  <Card sx={{ bgcolor: "#b9f7c6", width: "auto" }}>
                    <CardContent>
                      <Avatar
                        sx={{
                          bgcolor: "#003d2b",
                          width: "50px",
                          height: "50px",
                          marginLeft: "39%",
                          marginTop: "10%",
                        }}
                      >
                        <ShoppingCartIcon
                          fontSize="large"
                          sx={{ alignItems: "center" }}
                        />
                      </Avatar>
                      <Typography
                        variant="h5"
                        align="center"
                        marginTop={"5%"}
                        sx={{ color: "#003d2b" }}
                      >
                        Orders
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CustomerProfilePage;
