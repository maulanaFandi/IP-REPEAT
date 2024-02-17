import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
export default function Register() {
    const navigate = useNavigate()
    const [addUser, setAddUser] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setAddUser({
            ...addUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            axios.post(import.meta.env.VITE_BASE_URL_SERVER + "/register", addUser)
            navigate("/login")
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "OOPS!!!",
                text: error.response.data.message,
              });
        }
    }
    return(
        <>

        </>
    )
}