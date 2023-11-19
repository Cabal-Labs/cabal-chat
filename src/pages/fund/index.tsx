
import Header from "../../components/header";
import { useRouter } from "next/navigation";

export default function Login() {
	const router = useRouter();
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
					onClick={() => router.push("/chat")}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
				>
					Fund
				</button>
			</main>
		</>
	);
}
