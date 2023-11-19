export type TransactionType = {
	type: "action";
	action: "transaction";
	to: string;
	currency: string;
	amount: number;
};

export default function Transaction(message: TransactionType) {
	return (
		<div className='px-4 py-2 rounded bg-gray-700 shadow'>
			{" "}
			{/* Light background with subtle shadow */}
			<b className='text-white'>
				{" "}
				{/* Dark text for contrast */}Are you trying to start a transaction?
			</b>
			{/* Data container */}
			<div className='flex justify-between items-center mt-4'>
				{/* From data */}
				<div className='flex-1'>
					<div className='flex justify-between items-center bg-white p-2 rounded-lg shadow-sm'>
						{" "}
						{/* Light cards for input */}
						<span className='text-gray-500'>You pay</span>
						<span className='font-bold text-gray-800'>
							{message.amount} {message.currency}
						</span>
					</div>
				</div>

				{/* Arrow */}
				<div className='mx-4'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6 text-gray-400'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M13 7l5 5m0 0l-5 5m5-5H6'
						/>
					</svg>
				</div>

				{/* To data */}
				<div className='flex-1'>
					<div className='flex justify-between items-center bg-white p-2 rounded-lg shadow-sm'>
						{/* Light cards for output */}
						<span className='text-gray-500'>To</span>
						<span className='font-bold text-gray-800'>{message.to}</span>
					</div>
				</div>
			</div>
			{/* Buttons container */}
			<div className='flex mt-4'>
				<button className='flex-1 bg-red-200 text-red-800 font-bold py-2 px-4 rounded-l hover:bg-red-300 focus:outline-none focus:ring focus:ring-red-300 mr-0.5'>
					{/* Lighter red for Cancel */}
					Cancel
				</button>
				<button className='flex-1 bg-blue-200 text-blue-800 font-bold py-2 px-4 rounded-r hover:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 ml-0.5'>
					{/* Lighter blue for Confirm */}
					Confirm
				</button>
			</div>
		</div>
	);
}
