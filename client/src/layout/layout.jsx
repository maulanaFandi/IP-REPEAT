import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar";

export default function LayOut() {
    return (
        <>
        <Navbar />
        <Outlet />
        </>
    )
}