import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

function Protected({ children }) {
  const data = useSelector((store) => store.auth.userToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (!data) {
      navigate("/login");
    } else {
    }
  }, [data]);

  if (!data) {
    return null;
  } else {
    return children;
  }
}

export default Protected;
