
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
						First time?
					</h1>
					<p className='mt-4 text-lg text-gray-300'>
						{"Looks like you haven't used Cabal Chat before!"}
					</p>
				</div>
				{/* Add your login form or additional content here */}
				
			</main>
		</>
	);
}
