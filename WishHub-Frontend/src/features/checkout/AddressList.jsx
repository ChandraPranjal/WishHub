import { useState } from "react"


export default function AddressList({addresses,setCurrentAddress}) {

    return (
        <ul role="list" className="divide-y divide-gray-100">
            {addresses.map((address,index) => (
                <li key={index} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <input
                            id="address"
                            name="address"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={()=>{setCurrentAddress(address)}}
                        />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.address}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
