import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { MessageThread } from '../components/MessageThread';
import { setUserPrompts, addUserPromptWithResponse } from '../store/Slice';
import { toast } from 'react-toastify';

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

export function Conversation() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const prompts = useSelector((state: any) => state.userPrompts);

  useEffect(() => {
    const getPrompts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://127.0.0.1:8080/api/prompts/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        dispatch(setUserPrompts(response.data.prompts));
      } catch (error) {
        toast.error("Failed to load conversation");
        console.error("Error fetching prompts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token && id) {
      getPrompts();
    }
  }, [dispatch, token, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !token || !id) return;
  
    try {
      setIsLoading(true);
      
      const tempPromptId = Date.now().toString();
      const optimisticPrompt: Prompt = {
        id: tempPromptId,
        prompt_title: input,
        created_at: new Date().toISOString(),
        responses: []
      };
      dispatch(addUserPromptWithResponse(optimisticPrompt));
  
      const response = await axios.post('http://127.0.0.1:8080/api/prompts', {
        conversation_id: id,
        prompt_title: input
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      const promptData = response.data.prompt;
      const llmResponse = response.data.response;
      
      const formattedPrompt: Prompt = {
        id: promptData.id,
        prompt_title: promptData.prompt_title,
        created_at: promptData.created_at,
        responses: [{
          id: llmResponse.id || Date.now().toString(),
          response: llmResponse.response || llmResponse,
          created_at: llmResponse.created_at || new Date().toISOString()
        }]
      };
  
      dispatch(addUserPromptWithResponse(formattedPrompt));
      setInput('');
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Error sending prompt:", error);
    } finally {
      setIsLoading(false);
    }
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
          {isLoading && prompts.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <MessageThread prompts={prompts} />
          )}
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
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              variant="primary" 
              icon={Send}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}