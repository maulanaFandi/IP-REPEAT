import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../helpers/axios";

export default function SuccessPay() {
  let navigate = useNavigate();

  const handleUpgradeAcc = async () => {
    try {
        await Axios({
        url: "/payment",
        method: "patch",
        data: {},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    handleUpgradeAcc();
  }, []);
  return (
    <>
      <h1>Payment Success, redirecting to your home page.....</h1>
    </>
  );
}
