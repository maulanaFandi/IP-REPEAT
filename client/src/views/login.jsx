import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  let navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const { data } = axios.post(
        import.meta.env.VITE_BASE_URL_SERVER + "/login",
        form
      );
      localStorage.setItem("access_token", data.access_token);
      navigate("/anime");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "OOPS!!!",
        text: error.response.data.message,
      });
    }

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
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
          theme: "outline",
          size: "large",
        });
      };
    }, []);
  };
  return (
    <>
      <div id="buttonDiv" className="mt-5"></div>
    </>
  );
}
