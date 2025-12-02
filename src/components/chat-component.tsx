import React from "react";

interface Props {
  messages: any;
}

function ChatComponent({ messages }: Props) {
  return (
    <div className="w-full max-w-lg mx-auto bg-white p-4">
      <div className="space-y-4 text-sm">
        {messages.map((message: any) => (
          <div
            key={message.id}
            className={`flex ${message.role === "System" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`py-1 px-2 rounded-lg max-w-xs break-words ${
                message.role === "System"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-blue-500 text-white"
              }`}
            >
              {message.message.split("\n").map((line: any, index: number) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatComponent;
