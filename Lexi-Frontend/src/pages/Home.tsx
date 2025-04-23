// Home.tsx
import React, { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Dialog } from '../components/Dialog';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components/Header';
import axios from 'axios';
import { ConversationCard } from '../components/ConversationCard';
import { addConversation, setConversations } from '../store/Slice';

export function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const conversations = useSelector((state: any) => state.conversations);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getConvo = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/conversations', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        dispatch(setConversations(response.data));
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };

    if (token) {
      getConvo();
    }
  }, [dispatch, token]);

  type ConversationForm = {
    title: string
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConversationForm>();

  const handleOpenConversation = (id: string) => {
    navigate(`/conversation/${id}`);
  };

  const onSubmit = async (data: ConversationForm) => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/api/conversations', {
        title: data.title
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      dispatch(addConversation(response.data));
      setIsDialogOpen(false);
      reset();
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  const handleBookmark = async(convoID: string) => {
    try {
      const req = await axios.post('http://127.0.0.1:8080/api/bookmark', {
        conversation_id: convoID
      }, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'application/json'
        },
      })

      alert('Bookmarked Successfully')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Your Conversations</h1>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setIsDialogOpen(true)}
          >
            New Conversation
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {conversations.length > 0 ? (
            conversations.map((conversation: any) => (
              <ConversationCard
                key={conversation.id}
                // id={conversation.id}
                title={conversation.title}
                onDelete={() => console.log('deleted')}
                onClick={() => handleOpenConversation(conversation.id)}
                isBookmarked={false}
                onBookmark={() => handleBookmark(conversation.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-gray-400 text-center py-8">
              No conversations yet. Start by creating a new one!
            </div>
          )}
        </div>

        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title="Create New Conversation"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Conversation Title"
              name="title"
              register={register}
              required
              error={errors.title?.message}
              placeholder="Enter a title for your conversation"
            />
            <div className="flex justify-end space-x-3">
              <Button
                variant="ghost"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create
              </Button>
            </div>
          </form>
        </Dialog>
      </main>
    </div>
  );
}