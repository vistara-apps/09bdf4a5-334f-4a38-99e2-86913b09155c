'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Avatar } from '../components/Avatar';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { mockTasks, getCurrentUser } from '@/lib/mock-data';

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  senderName: string;
}

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = getCurrentUser();

  // Mock conversations based on accepted tasks
  const conversations = mockTasks
    .filter(task => task.runnerId && (task.posterId === currentUser.userId || task.runnerId === currentUser.userId))
    .map(task => {
      const otherUser = task.posterId === currentUser.userId ? task.runner : task.poster;
      return {
        taskId: task.taskId,
        taskTitle: task.title,
        otherUser,
        lastMessage: 'Great! I can help with this task.',
        lastMessageTime: new Date(),
        unreadCount: Math.floor(Math.random() * 3),
      };
    });

  // Mock messages for selected chat
  const mockMessages: ChatMessage[] = [
    {
      id: '1',
      senderId: 'other',
      content: 'Hi! I saw your task posting. I can help with the grocery pickup.',
      timestamp: new Date(Date.now() - 3600000),
      senderName: 'Alice Johnson',
    },
    {
      id: '2',
      senderId: currentUser.userId,
      content: 'That would be great! When would you be available?',
      timestamp: new Date(Date.now() - 3000000),
      senderName: currentUser.displayName,
    },
    {
      id: '3',
      senderId: 'other',
      content: 'I can do it this afternoon around 3 PM. Does that work for you?',
      timestamp: new Date(Date.now() - 1800000),
      senderName: 'Alice Johnson',
    },
    {
      id: '4',
      senderId: currentUser.userId,
      content: 'Perfect! I\'ll send you the shopping list.',
      timestamp: new Date(Date.now() - 900000),
      senderName: currentUser.displayName,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (selectedChat) {
    const conversation = conversations.find(c => c.taskId === selectedChat);
    
    return (
      <AppShell>
        <div className="max-w-xl mx-auto h-screen flex flex-col">
          {/* Chat Header */}
          <div className="bg-surface border-b border-border p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedChat(null)}
                className="p-2 hover:bg-bg rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="text-fg" size={20} />
              </button>
              <Avatar 
                src={conversation?.otherUser?.profilePictureUrl} 
                name={conversation?.otherUser?.displayName || 'User'} 
                size="sm" 
              />
              <div className="flex-1">
                <h2 className="font-semibold text-fg">
                  {conversation?.otherUser?.displayName}
                </h2>
                <p className="text-sm text-text-secondary truncate">
                  {conversation?.taskTitle}
                </p>
              </div>
              <button className="p-2 hover:bg-bg rounded-lg transition-colors duration-200">
                <MoreVertical className="text-text-secondary" size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === currentUser.userId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === currentUser.userId
                      ? 'bg-accent text-white'
                      : 'bg-surface text-fg border border-border'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === currentUser.userId 
                      ? 'text-white/70' 
                      : 'text-text-secondary'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-surface border-t border-border p-4">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 input-field"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  newMessage.trim()
                    ? 'bg-accent text-white hover:opacity-90'
                    : 'bg-surface text-text-secondary cursor-not-allowed'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-fg">Messages</h1>
          <p className="text-text-secondary">Chat with task posters and runners</p>
        </div>

        {/* Conversations List */}
        <div className="space-y-3">
          {conversations.length === 0 ? (
            <div className="text-center py-12">
              <div className="glass-card p-8 rounded-lg">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-semibold text-fg mb-2">No conversations yet</h3>
                <p className="text-text-secondary">
                  Start by posting a task or accepting one to begin chatting with neighbors
                </p>
              </div>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.taskId}
                onClick={() => setSelectedChat(conversation.taskId)}
                className="glass-card p-4 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-accent/30"
              >
                <div className="flex items-center space-x-4">
                  <Avatar 
                    src={conversation.otherUser?.profilePictureUrl} 
                    name={conversation.otherUser?.displayName || 'User'} 
                    size="md" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-fg truncate">
                        {conversation.otherUser?.displayName}
                      </h3>
                      <span className="text-xs text-text-secondary">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary truncate mb-1">
                      {conversation.taskTitle}
                    </p>
                    <p className="text-sm text-text-secondary truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="bg-accent text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
