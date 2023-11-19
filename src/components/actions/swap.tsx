import React, { useState } from "react"; // Import useState
import { ethers } from "ethers";

export type SwapType = {
  type: "action";
  action: "swap";
  from: {
    currency: string;
    amount: number;
  };
  to: {
    currency: string;
    amount: number;
  };
};

export default function Swap(message: SwapType) {
  const [transactionSuccess, setTransactionSuccess] = useState(false); // State to manage transaction status

  // Event handler for Confirm button
  const handleConfirm = () => {
    // Here, you would normally handle the transaction logic
    setTransactionSuccess(true); // Set the transaction as successful
  };

  return (
    <div className="px-4 py-2 rounded bg-gray-700 shadow">
      <b className="text-white">Are you trying to start a token swap?</b>

      <div className="flex justify-between items-center mt-4">
        <div className="flex-1">
          <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm">
            <span className="text-gray-500">You pay</span>
            <span className="font-bold text-gray-800">
              {message.from.amount} {message.from.currency}
            </span>
          </div>
        </div>

        <div className="mx-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm">
            <span className="text-gray-500">You receive</span>
            <span className="font-bold text-gray-800">
              {message.to.amount} {message.to.currency}
            </span>
          </div>
        </div>
      </div>

      {transactionSuccess && (
        <div
          className="text-center font-bold text-green-500"
          style={{ paddingTop: "12px", paddingBottom: "12px" }}
        >
          Transaction successful
        </div>
      )}

      {!transactionSuccess && (
        <div className="flex mt-4">
          <button className="flex-1 bg-red-200 text-red-800 font-bold py-2 px-4 rounded-l hover:bg-red-300 focus:outline-none focus:ring focus:ring-red-300 mr-0.5">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-blue-200 text-blue-800 font-bold py-2 px-4 rounded-r hover:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 ml-0.5"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}
