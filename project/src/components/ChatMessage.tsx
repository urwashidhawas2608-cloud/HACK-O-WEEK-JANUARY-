import { Message } from '../types/chat';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fadeIn`}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      <div className={`max-w-[75%] ${isBot ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isBot
              ? 'bg-white border border-gray-200 text-gray-800'
              : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
          } shadow-sm`}
        >
          <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
          {message.category && (
            <span className="inline-block mt-2 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              {message.category}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-1 px-2">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center order-2">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
}
