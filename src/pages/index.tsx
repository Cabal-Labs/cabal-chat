
import { useRouter } from "next/navigation";
import Header from "../components/header";
import SafeConnect from "@/components/safeConnect";
import { useContext } from "react";
import { Context } from "../providers/provider";


export default function Login() {
	const router = useRouter();
	const { userId } = useContext(Context);

	return (
		<>
			<Header />
			<main className='flex flex-col items-center justify-center min-h-screen bg-gray-700'>
				<div className='text-center'>
					<h1 className='text-6xl font-bold text-white'>
						Welcome to Cabal Chat!
					</h1>
					<p className='mt-4 text-xl text-gray-300'>
						Where Web3 is as simple as texting a friend
					</p>
					{userId}
					{/* Dummy form for illustration */}

					<SafeConnect />

					<p className='text-gray-400'>
						{"Don't have an account?"}
						<button
							onClick={() => router.push("/connect")}
							className='mt-2 text-white  py-2 px-4 rounded-lg mr-1'
						>
							<p className='text-blue-500 hover:underline'>Sign up here</p>
						</button>
					</p>
				</div>
			</main>
		</>
	);
}
