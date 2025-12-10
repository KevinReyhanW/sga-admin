import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  messages: any;
}

function ChatComponent({ messages }: Props) {
  return (
    <div className="w-full max-w-lg mx-auto bg-white p-5">
      <div className="space-y-4 text-sm">
        {messages.map((message: any) => (
          <div
            key={message.id}
            className={`flex ${message.role === "System" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`py-2 px-3 rounded-lg max-w-xs break-words ${
                message.role === "System"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-blue-500 text-white"
              }`}
            >
              {message.role === "System" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc list-inside space-y-1 pl-1"
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-decimal list-inside space-y-1 pl-1"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="ml-1" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-2 last:mb-0" {...props} />
                    ),
                    code: ({ className, children, ...props }) => (
                      <code
                        className={
                          "rounded bg-black/10 px-1 py-0.5 font-mono text-[0.85em] " +
                          (className || "")
                        }
                        {...props}
                      >
                        {children}
                      </code>
                    ),
                  }}
                >
                  {message.message || ""}
                </ReactMarkdown>
              ) : (
                message.message
                  .split("\n")
                  .map((line: any, index: number) => <p key={index}>{line}</p>)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatComponent;
