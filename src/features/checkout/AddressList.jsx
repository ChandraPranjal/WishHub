const address = [
    {
        name: 'Leslie Alexander',
        address: 'IIIT Guwahati,Assam 2111002 ',

    },
    {
        name: 'Michael Foster',
        address: 'Prayagraj,Allahabad 2111002 ',

    },

]

export default function AddressList() {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {address.map((address) => (
                <li key={address.email} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
