import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggerInUserOrdersAsync } from "../userSlice";

export default function UserOrders() {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.auth.userToken);
  //   console.log("User in UserOrder is ", user);
  const orders = useSelector((store) => store.user.userOrders);

  useEffect(() => {
    dispatch(fetchLoggerInUserOrdersAsync(userId));
  }, []);

  // console.log(user);
  return (
    <div>
      {orders.map((order,index) => (
        <div key = {index} >
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                Order # {order.id}
              </h1>
              <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                Order Status : Pending-HardCoded
              </h3>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.products.map((item,index) => (
                    <li key={index} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.imageSrc}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.href}>{item.name}</a>
                            </h3>
                            <p className="ml-4">${item.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty :{item.quantity}
                            </label>
                          </div>

                          <div className="flex"></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
  
              <p className="text-2xl pt-3 pb-3 font-semibold underline">Shipping Address</p> 
              {order.orderData.currentAddress.address}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}