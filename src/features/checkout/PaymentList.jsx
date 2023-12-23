const paymentOptions = [
    {
        name: 'Cash',
    },
    {
        name: 'Card Payment'
    },

]

export default function PaymentList() {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {paymentOptions.map((payment) => (
                <li key={payment.email} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{payment.name}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
