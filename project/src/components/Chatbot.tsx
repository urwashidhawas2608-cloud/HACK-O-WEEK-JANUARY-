import { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, MessageCircle } from 'lucide-react';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';
import { Message } from '../types/chat';
import { matchQuery, getSuggestedQuestions } from '../utils/patternMatcher';

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to our Institute FAQ Assistant. I can help you with information about our timings, fees, courses, admissions, and more. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
      category: 'Welcome'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const matchResult = matchQuery(text);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: matchResult.response,
        sender: 'bot',
        timestamp: new Date(),
        category: matchResult.category
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: '1',
        text: 'Chat reset! How can I help you today?',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Institute FAQ Assistant</h1>
              <p className="text-sm text-blue-100">Ask me anything about our institute</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Reset chat"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <SuggestedQuestions
          questions={getSuggestedQuestions()}
          onQuestionClick={handleSendMessage}
        />

        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 bg-white px-6 py-4 shadow-lg">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question here..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Send className="w-5 h-5" />
            <span className="font-medium">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
