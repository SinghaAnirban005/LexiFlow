import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import axios from 'axios';
import { MessageThread } from '../components/MessageThread';

interface Message {
  id: string;
  response: string;
  isUser: boolean;
  timestamp: string;
}

export function Conversation() {
    const token = localStorage.getItem("token")
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      response: 'Hello! How can I help you today?',
      isUser: false,
      timestamp: '2:30 PM',
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      response: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMessage]);

    const aiResponse = await axios.post('http://127.0.0.1:8080/api/prompts', {
        conversation_id: id,
        prompt_title: userMessage.response
    }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

    const res = aiResponse.data.response
    setMessages((prev) => [...prev, res])

    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center">
          <Button
            variant="ghost"
            icon={ArrowLeft}
            onClick={() => navigate('/home')}
            styles="mr-4"
          >
            Back
          </Button>
          <h1 className="text-xl font-semibold text-white">Conversation #{id}</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto">
          <MessageThread messages={messages} />
        </div>
      </div>

      <div className="border-t border-gray-700 bg-gray-800 p-4">
        <div className="container mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" variant="primary" icon={Send}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}