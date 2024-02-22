import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ListSubheader } from "@mui/material";
// import axios from "axios";
import axios from "../helpers/axios";

export default function Register() {
  const navigate = useNavigate();
  const [addUser, setAddUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUser({
      ...addUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        url: "/register",
        // url: import.meta.env.VITE_BASE_URL_SERVER + "/register",
        // url: import.meta.env.VITE_LOCAL_SERVER + "/register",
        // url: "http://localhost:3000/register",
        method: "POST",
        data: addUser,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "OOPS!!!",
        text: error.response.data.message,
      });
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <div id="buttonDiv" className="mt-5"></div>
        </form>
      </Box>
      <div className="flex justify-center items-center mt-6">
        <ListSubheader
          target="_blank"
          className="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          ">
          <span className="ml-2">You have an account?</span>
        </ListSubheader>
        <Link to="/login">
          <Button className="text-xs ml-2 text-teal-500 font-semibold">
            Login here
          </Button>
        </Link>
      </div>
    </Container>
  );
}
