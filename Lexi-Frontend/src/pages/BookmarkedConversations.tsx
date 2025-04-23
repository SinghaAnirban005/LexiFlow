import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { ConversationCard } from '../components/ConversationCard';
import { useSelector } from 'react-redux';

export function BookmarkedConversations() {
  const navigate = useNavigate();

  const bookmarks = useSelector((state: any) => state.userBookmarks)

  const handleOpenConversation = (id: string) => {
    navigate(`/conversation/${id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                icon={ArrowLeft}
                onClick={() => navigate('/home')}
              >
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold text-white">Bookmarked Conversations</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark: any) => (
              <ConversationCard
                key={bookmark.id}
                title={bookmark.Conversation.title}
                createdAt={formatDate(bookmark.Conversation.created_at)}
                messageCount={0}
                isBookmarked={true}
                onDelete={() => console.log('')}
                onBookmark={() => console.log('')}
                onClick={() => handleOpenConversation(bookmark.conversation_id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-400 mb-4">No bookmarked conversations yet.</p>
              <Button
                variant="primary"
                onClick={() => navigate('/home')}
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}