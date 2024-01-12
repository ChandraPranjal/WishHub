import React from "react";
import UserOrder from "../features/user/components/UserOrder";
import Navbar from "../features/navbar/Navbar";
function UserOrderPage() {
  return (
    <Navbar>
      <UserOrder />
    </Navbar>
  );
}

export default UserOrderPage;
