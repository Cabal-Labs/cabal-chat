
import Header from "../../components/header";
import { useRouter } from "next/navigation";
import { ethers } from 'ethers';
import { useContext } from "react";
import { Context } from "@/providers/provider";

export default function Login() {


	const router = useRouter();
	const {
		web3AuthModalPack,
		safeAuthSignInResponse,
		safeAddress
	} = useContext(Context);



	const fundSafe = async () => {
		const _provider = new ethers.providers.Web3Provider(web3AuthModalPack?.getProvider());
		const signer = _provider.getSigner();

		const safeAmount = ethers.utils.parseUnits('0.5', 'ether').toHexString()
		const transactionParameters = {
			to: safeAddress,
			value: safeAmount
		}

		const tx = await signer.sendTransaction(transactionParameters);
		console.log('Fundraising.')
		console.log(`Deposit Transaction: https://goerli.basescan.org/tx/${tx.hash}`)

		router.push("/chat")
		
	}
	return (
		<>
			<Header />
			<main className='flex flex-col items-center justify-center min-h-screen bg-gray-700'>
				{/* <Header /> */}
				<div className='text-center'>
					<h1 className='text-4xl font-bold text-white md:text-6xl'>
						Fund Account
					</h1>
					<p className='mt-4 text-lg text-gray-300'>
						{"Your account is still empty!"}
					</p>
				</div>
				{/* Add your login form or additional content here */}
				<button
					onClick={() => {fundSafe();}}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
				>
					Fund
				</button>
			</main>
		</>
	);
}
