export type MessageType = {
	type: "sent" | "received";
	text: string;
};

export default function Message(message: MessageType) {
	return (
		<div
			className={`max-w-md px-4 py-2 rounded text-white ${
				message.type === "sent"
					? "self-end bg-blue-700"
					: "self-start bg-gray-700"
			}`}
		>
			{message.text}
		</div>
	);
}
