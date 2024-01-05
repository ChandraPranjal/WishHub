import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../authSlice";
import { useNavigate, Navigate } from "react-router-dom";

function Protected({ children }) {
  const data = useSelector((store) => store.auth.userToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (!data) {
      console.log("Hello under water");
      navigate("/login");
    } else {
      console.log("Hello under fire");

    }
  }, [data]);

  if (!data) {
    return null;
  } else {
    console.log("Hi");
    return children;
  }
}

export default Protected;
