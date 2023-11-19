
import Chat from "../../components/chat";
import Header from "../../components/header";

export default function Home() {
	return (
		<div className='flex flex-col bg-gray-700 min-h-screen'>
			<Header />
			<main className='flex-grow grid grid-cols-12 gap-4 p-4'>
				{/* Left column */}
				<aside className='col-span-2 bg-gray-800 p-4 rounded-lg'>
					{/* Content of the left column */}
					<p className='text-white'>Left Sidebar Content</p>
				</aside>

				{/* Middle column - main content */}
				<section className='col-span-7 bg-gray-600 p-4 rounded-lg'>
					<Chat />
				</section>

				{/* Right column */}
				<aside className='col-span-3 bg-gray-800 p-4 rounded-lg'>
					{/* Content of the right column */}
					<p className='text-white'>Right Sidebar Content</p>
				</aside>
			</main>
		</div>
	);
}
