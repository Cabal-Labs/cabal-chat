import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import Transaction, { TransactionType } from "./actions/transaction";
import Message, { MessageType } from "./actions/message";
import Swap, { SwapType } from "./actions/swap";
import CurrentBalance, { CurrentBalanceType } from "./actions/currentBalance";

import LoadingDots from "./details/loading";

export type MessageListType =
  | MessageType
  | TransactionType
  | SwapType
  | CurrentBalanceType;

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const placeholders = [
    "Type your message...",
    "Send a greeting...",
    "Share your thoughts...",
  ];

  const [messages, setMessages] = useState([
    {
      type: "received",
      text: "Hi there! How can I help you with your web3 needs?",
    },
  ]);

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

  const postMessage = async (text: any) => {
    const request = {
      text: text,
    };

    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  };

  function isValidTransaction(inputString: any) {
    try {
      // Parse the input string into an object
      const transaction = JSON.parse(inputString);

      // Check for the existence of required fields
      return (
        "from_name" in transaction &&
        "to_name" in transaction &&
        "from_amount" in transaction
      );
    } catch (e) {
      // If parsing fails, return false
      return false;
    }
  }

  const handleSubmit = async () => {
    console.log("Message Sent:", inputValue);
    setLoading(true);
    setInputValue(""); // Clear the input after sending
    let old = messages;

    old.push({ type: "sent", text: inputValue });
    setMessages(old);

    const result = await postMessage(inputValue);

    //check if its a swap
    if (isValidTransaction(result)) {
      const transaction = JSON.parse(result);

      let newer = messages;
      let a = {
        type: "action",
        action: "swap",
        from: {
          currency: transaction.from_name,
          amount: transaction.from_amount,
        },
        to: {
          currency: transaction.to_name,
          amount: 10,
        },
      };
      newer.push(a);

      setMessages(newer);
    } else {
      let newer = messages;

      newer.push({ type: "received", text: result });
      setMessages(newer);
    }

    setLoading(false);
  };

  //const messages: MessageListType[] = [
  // { type: "received", text: "Hi there! How can I help you today?" },

  // Add more dummy messages as needed
  //];

  /*
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


  */

  return (
    <div className="max-w-lg mx-auto shadow-lg  bg-gray-800">
      <div className="flex flex-col space-y-2 p-4">
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
        {loading && (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <div
              className={`max-w-md px-4 py-2 rounded text-white self-start bg-gray-700`}
            >
              <div style={{ paddingTop: "7px", paddingBottom: "7px" }}>
                <LoadingDots />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center w-full p-4 items-center sticky bottom-0 z-50 bg-gray-700">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholders[placeholderIndex]}
          style={{ outline: "none", color: "white" }}
          className="p-2 border bg-gray-600	 rounded-l-md  transition-all w-full"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600  transition-all"
        >
          Send
        </button>
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-transparent border-0 cursor-pointer text-white"
          title="Scroll to top"
        >
          <FontAwesomeIcon icon={faArrowUp} /> Scroll to top
        </button>
      </div>
    </div>
  );
};

export default Chat;
