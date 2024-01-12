import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync } from "../auth/authSlice";
import { Navigate } from "react-router-dom";

function Signout() {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.auth.userToken);
  dispatch(signOutAsync(userId));
  return (
    <>
      <Navigate to="/login"></Navigate>
    </>
  );
}

export default Signout;
