import * as React from "react";
// import Axios from "axios"
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import AppBar from "@mui/material/AppBar";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <Link to={"/"}>Animemina</Link>
        </Typography>
        <Box alignContent={"flex-end"}>
          <Button
            sx={{
              color: "white",
              flexWrap: "flex",
              justifyContent: "flex-end",
            }}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}>
            <ListSubheader component="div" inset>
              Logout
            </ListSubheader>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

<AppBar
  position="fixed"
  color="default"
  elevation={0}
  sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
  <Toolbar sx={{ flexWrap: "wrap" }}>
    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
      <Link to={"/"}>Animemina</Link>
    </Typography>
    <ListItemButton
      sx={{ flexWrap: "flex", justifyContent: "flex-end" }}
      onClick={() => {
        localStorage.clear();
        navigate("/login");
      }}>
      <ListSubheader component="div" inset>
        Logout
      </ListSubheader>
    </ListItemButton>
  </Toolbar>
</AppBar>;
