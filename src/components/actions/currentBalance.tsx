export type CurrentBalanceType = {
	type: "action";
	action: "current-balance";
	chain: string;
	amount: number;
	currency: string;
};

export default function CurrentBalance(message: CurrentBalanceType) {
	return (
		<div className='p-4 bg-yellow-900 rounded shadow-md flex justify-between items-center'>
			<div>
				<div className='font-bold text-lg text-white'>Bitcoin</div>
				<div className='text-gray-300 text-sm'>{message.chain}</div>
			</div>
			<div className='text-right'>
				<div className='font-bold text-orange-500 text-2xl'>
					{message.amount.toLocaleString()} {message.currency}
				</div>
				<div className='text-green-500 font-bold'>+1.2%</div>
			</div>
			{/* ToDo add images of graph once we figure out graph representation*/}
		</div>
	);
}
