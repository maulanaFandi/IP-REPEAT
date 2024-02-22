// import axios from "axios";
import axios from "../helpers/axios";
import { useEffect, useState } from "react";
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

export default function Login() {
  let navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await axios.post("/login", {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("access_token", data.data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "OOPS!!!",
        text: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    async function handleCredentialResponse(response) {
      const { data } = await axios.post("/google-login", {
        google_token: response.credential,
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    }
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: "881421523009-8qqcua7j37f77qes05tf8aq3ijuuscer.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        theme: "outline",
        size: "large",
      });
    };
  }, []);

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
          Sign in
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
            type="email"
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
            Sign In
          </Button>
          <Typography display={"flex"} justifyContent={"center"} alignContent={"center"}>
            OR
          </Typography>
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
          <span className="ml-2">You don't have an account?</span>
        </ListSubheader>
        <Link to="/register">
          <Button className="text-xs ml-2 text-teal-500 font-semibold">
            Register here
          </Button>
        </Link>
      </div>
    </Container>
  );
}
