import { useState } from "react";
import { useSelector } from "react-redux";



export default function PaymentList({paymentOptions,paymentMethod, setPaymentMethod}) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {paymentOptions.map((payment,index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <input
              id="payment-method"
              name="payment-method"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              onChange={(e) => {
                setPaymentMethod(payment.name)
              }}
              checked={paymentMethod === payment.name}
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {payment.name}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
