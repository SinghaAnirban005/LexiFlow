import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MessageSquare, LogOut } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Dialog } from '../components/Dialog';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Header } from '../components/Header';
import axios from 'axios';
import { addConversation } from '../store/Slice';

export function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  type ConversationForm = {
    title: string
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConversationForm>({
  });

  const onSubmit = async (data: ConversationForm) => {
    const token = localStorage.getItem('token');
    try {
      const convo = await axios.post('http://127.0.0.1:8080/api/conversations', {
        title: data.title
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      dispatch(addConversation({
        id: convo.data.id,
        title: convo.data.title
      }))
      setIsDialogOpen(false);
      reset();
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

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

        <div className="grid gap-4">
          {/* Conversations will be listed here */}
          <div className="text-gray-400 text-center py-8">
            No conversations yet. Start by creating a new one!
          </div>
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