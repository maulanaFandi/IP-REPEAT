import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FailedPay() {
  let navigate = useNavigate();

  const handleFailPay = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    handleFailPay();
  }, []);

  return (
    <>
      <h1>
        Payment failed, redirecting to your home page....
      </h1>
    </>
  );
}