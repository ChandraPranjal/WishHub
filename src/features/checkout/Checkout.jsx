import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Cart from "../../pages/CartPage";
import AddressList from "./AddressList";
import PaymentList from "./PaymentList";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createContactAsync } from "./contactSlice";

// const addresses = [
//   {
//     name: "Leslie Alexander",
//     address: "IIIT Guwahati,Assam 2111002 ",
//   },
//   {
//     name: "Michael Foster",
//     address: "Prayagraj,Allahabad 2111002 ",
//   },
// ];

export default function Checkout() {
  const [currentAddress, setCurrentAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const addresses = useSelector((store) => store.contact.data);
  const paymentOptions = [
    {
      name: "Cash",
    },
    {
      name: "Card Payment",
    },
  ];
  //console.log("addresses is ", addresses);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

  console.log("Checkout Refreshed");
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3 lg:mt-8">
          <form
            className="bg-white px-5 py-12 mt-12"
            noValidate
            onSubmit={handleSubmit((data) => {
              const obj = {};
              obj.name = `${data[`first-name`]} ${data[`last-name`]}`;
              obj.email = data.email;
              console.log("Checkout Refreshed");
              obj.address = `${data[`street-address`]} ${data[`city`]}  ${
                data[`state`]
              } ${data[`postal-code`]} ${data[`country`]}`;

              dispatch(createContactAsync(obj));
              reset();
            })}
          >
            <div className="space-y-12">
              <div className="border-b relative border-gray-900/10 pb-14">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("first-name", {
                          required: "First Name is required",
                        })}
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("last-name", {
                          required: "Last Name is required",
                        })}
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone No.
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("phone", {
                          required: "Phone no. is required",
                        })}
                        type="tel"
                        autoComplete="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        id="country"
                        {...register("country", {
                          required: "Country is required",
                        })}
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>India</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("street-address", {
                          required: "Street Address is required",
                        })}
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("city", { required: "City is required" })}
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("state", {
                          required: "State is required",
                        })}
                        id="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("postal-code", {
                          required: "Postal Code is required",
                        })}
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-0 -my-5">
                  <button
                    type="submit"
                    className="rounded-md m-2 relative right-0  h-10 w-15 p-1 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                  <button
                    // type="submit"
                    className="rounded-md bg-gray-600 h-10 w-15 p-1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={(e) => {
                      e.preventDefault();
                      reset();
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              {/* Choose Address List */}
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Address
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {` ${
                    addresses.length > 0
                      ? "Choose from Existing address"
                      : "Add Address"
                  }`}
                </p>

                <div className="mt-0 space-y-10">
                  <fieldset>
                    <div className="mt-3 space-y-6">
                      <div className="flex items-center gap-x-3">
                        {console.log("addresses.length is", addresses.length)}
                        {addresses.length > 0 ? (
                          <AddressList
                            addresses={addresses}
                            currentAddress={currentAddress}
                            setCurrentAddress={setCurrentAddress}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              {/* Payment Methods List */}
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Choose Payment Method
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose one
                </p>

                <div className="mt-0 space-y-10">
                  <fieldset>
                    <div className="mt-3 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <PaymentList
                          paymentOptions={paymentOptions}
                          paymentMethod={paymentMethod}
                          setPaymentMethod={setPaymentMethod}
                        />
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:col-span-2">
          <Cart currentAddress={currentAddress} paymentMethod={paymentMethod} />
        </div>
      </div>
    </div>
  );
}
