import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import Transaction, { TransactionType } from "./actions/transaction";
import Message, { MessageType } from "./actions/message";
import Swap, { SwapType } from "./actions/swap";
import CurrentBalance, { CurrentBalanceType } from "./actions/currentBalance";

export type MessageListType =
	| MessageType
	| TransactionType
	| SwapType
	| CurrentBalanceType;

const Chat = () => {
	const [inputValue, setInputValue] = useState("");
	const [placeholderIndex, setPlaceholderIndex] = useState(0);
	const placeholders = [
		"Type your message...",
		"Send a greeting...",
		"Share your thoughts...",
	];

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setPlaceholderIndex((current) => (current + 1) % placeholders.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [placeholders.length]);

	const handleInputChange = (event: any) => {
		setInputValue(event.target.value);
	};

	const handleSubmit = () => {
		console.log("Message Sent:", inputValue);
		setInputValue(""); // Clear the input after sending
	};

	const messages: MessageListType[] = [
		{ type: "received", text: "Hello! How are you?" },
		{ type: "sent", text: "I'm good, thanks! And you?" },
		{ type: "received", text: "I'm great, thanks for asking!" },
		{ type: "sent", text: "What are you up to today?" },
		{ type: "received", text: "Just working on a project. You?" },
		{ type: "received", text: "Hello! How are you?" },
		{ type: "sent", text: "I'm good, thanks! And you?" },
		{ type: "received", text: "I'm great, thanks for asking!" },
		{ type: "sent", text: "What are you up to today?" },
		{ type: "received", text: "Just working on a project. You?" },
		{ type: "received", text: "Hello! How are you?" },
		{ type: "sent", text: "I'm good, thanks! And you?" },
		{ type: "received", text: "I'm great, thanks for asking!" },
		{ type: "sent", text: "What are you up to today?" },
		{ type: "received", text: "Just working on a project. You?" },
		{ type: "received", text: "Hello! How are you?" },
		{ type: "sent", text: "I'm good, thanks! And you?" },
		{ type: "received", text: "I'm great, thanks for asking!" },
		{ type: "sent", text: "What are you up to today?" },
		{ type: "received", text: "Just working on a project. You?" },
		{ type: "received", text: "Hello! How are you?" },
		{ type: "sent", text: "I'm good, thanks! And you?" },
		{ type: "received", text: "I'm great, thanks for asking!" },
		{ type: "sent", text: "What are you up to today?" },
		{ type: "received", text: "Just working on a project. You?" },
		{
			type: "action",
			action: "transaction",
			to: "0x...",
			currency: "USDC",
			amount: 250,
		},
		{
			type: "action",
			action: "swap",
			from: {
				currency: "USDC",
				amount: 90,
			},
			to: {
				currency: "ETH",
				amount: 0.05,
			},
		},
		{
			type: "action",
			action: "current-balance",
			chain: "Ethereum Layer 2",
			amount: 100000,
			currency: "ETH",
		},

		// Add more dummy messages as needed
	];

	return (
		<div className='max-w-lg mx-auto shadow-lg  bg-gray-800'>
			<div className='flex flex-col space-y-2 p-4'>
				{messages.map((message, index) => {
					// REGULAR MESSAGES
					if (message.type === "sent" || message.type === "received") {
						return <Message key={index} {...message} />;
					} else if (message.type === "action") {
						// TRANSACTION

						if (message.action === "transaction") {
							return <Transaction key={index} {...message} />;
						}
						// SWAP
						else if (message.action === "swap") {
							return <Swap key={index} {...message} />;
						}
						// CURRENT BALANCE "current-balance"
						else if (message.action === "current-balance") {
							return <CurrentBalance key={index} {...message} />;
						}
					}

					return (
						<div key={index}>
							<b>Message not made yet</b>
						</div>
					);
				})}
			</div>
			<div className='flex justify-center w-full p-4 items-center sticky bottom-0 z-50 bg-gray-700'>
				<input
					type='text'
					value={inputValue}
					onChange={handleInputChange}
					placeholder={placeholders[placeholderIndex]}
					className='p-2 border bg-gray-600	 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full'
				/>
				<button
					onClick={handleSubmit}
					className='px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
				>
					Send
				</button>
				<button
					onClick={scrollToTop}
					className='fixed bottom-4 right-4 bg-transparent border-0 cursor-pointer text-white'
					title='Scroll to top'
				>
					<FontAwesomeIcon icon={faArrowUp} /> Scroll to top
				</button>
			</div>
		</div>
	);
};

export default Chat;
