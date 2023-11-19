import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
	const redirectToGitHub = () => {
		window.open("https://github.com/Cabal-Labs/cabal-chat");
	};
	const router = useRouter();

	return (
		<header className='bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-50'>
			<button onClick={() => router.push("/")}>
				<h1 className='text-xl font-bold'>Cabal Chat</h1>
			</button>
			<div>
				<button
					onClick={redirectToGitHub}
					className=' hover:bg-gray-700 text-white font-bold py-2 px-4 rounded '
				>
					View on GitHub
				</button>
				{/* <button
					onClick={() => alert("TODO: fund with SAFE")}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-1'
				>
					Fund
				</button> */}
			</div>
		</header>
	);
};

export default Header;
