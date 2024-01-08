import React from "react";
import Cart from "../features/cart/Cart";
import { useSelector } from "react-redux";
function CartPage({ currentAddress, paymentMethod }) {
  const user = useSelector((store) => store.auth.userToken);
  const orderData = { user, currentAddress, paymentMethod };
  return (
    <>
      <Cart orderData={orderData} />
    </>
  );
}

export default CartPage;
