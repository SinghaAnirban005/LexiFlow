import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

interface Prompt {
  id: string;
  prompt_title: string;
  created_at: string;
  responses: {
    id: string;
    response: string;
    created_at: string;
  }[];
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface MessageThreadProps {
  prompts: Prompt[];
}

export function MessageThread({ prompts }: MessageThreadProps) {

  const messages: Message[] = prompts.flatMap((prompt) => {
    const userMessage: Message = {
      id: prompt.id,
      content: prompt.prompt_title,
      isUser: true,
      timestamp: format(new Date(prompt.created_at), 'MMM d, yyyy h:mm a'),
    };

    const responses = Array.isArray(prompt.responses) 
      ? prompt.responses 
      : prompt.responses ? [prompt.responses] : [];

    const aiMessages = responses.map((response) => ({
      id: response.id,
      content: typeof response === 'string' ? response : response.response,
      isUser: false,
      timestamp: format(
        new Date(response.created_at || new Date()), 
        'MMM d, yyyy h:mm a'
      ),
    }));

    return [userMessage, ...aiMessages];
  });
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
              components={{
                p: ({ children }) => <p className="m-0">{children}</p>,
                a: ({ children, href }) => (
                  <a 
                    href={href} 
                    className={`${
                      message.isUser 
                        ? 'text-blue-200 hover:text-blue-100' 
                        : 'text-blue-300 hover:text-blue-200'
                    }`}
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className={`${
                    message.isUser 
                      ? 'bg-blue-700' 
                      : 'bg-gray-800'
                  } rounded px-1 py-0.5`}>
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className={`${
                    message.isUser 
                      ? 'bg-blue-700' 
                      : 'bg-gray-800'
                  } rounded p-4 my-2 overflow-x-auto`}>
                    {children}
                  </pre>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-5 space-y-1">{children}</ol>
                ),
                li: ({ children }) => <li className="pl-2">{children}</li>,
              }}
            >
              {message.content}
            </ReactMarkdown>
            <div className={`text-xs mt-2 ${
              message.isUser ? 'text-blue-200' : 'text-gray-400'
            }`}>
              {message.timestamp}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}