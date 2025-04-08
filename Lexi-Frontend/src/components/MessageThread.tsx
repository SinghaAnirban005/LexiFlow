import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  response: string;
  isUser: boolean;
  timestamp: string;
}

interface MessageThreadProps {
  messages: Message[];
}

export function MessageThread({ messages }: MessageThreadProps) {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-4 ${
              message.isUser
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-100'
            }`}
          >
            <ReactMarkdown
            //   className="prose prose-invert max-w-none"
              components={{
                p: ({ children }) => <p className="m-0">{children}</p>,
                a: ({ children, href }) => (
                  <a href={href} className="text-blue-300 hover:text-blue-200">
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-800 rounded px-1 py-0.5">{children}</code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-800 rounded p-4 my-2 overflow-x-auto">
                    {children}
                  </pre>
                ),
              }}
            >
              {message.response}
            </ReactMarkdown>
            <div className="text-xs opacity-70 mt-2">{message.timestamp}</div>
          </div>
        </div>
      ))}
    </div>
  );
}