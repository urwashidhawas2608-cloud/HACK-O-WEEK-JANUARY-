import { useState } from 'react';
import { MessageSquare, Settings, Tag } from 'lucide-react';
import { Chatbot } from './components/Chatbot';
import { FAQManager } from './components/FAQManager';
import { SynonymManager } from './components/SynonymManager';

type View = 'chat' | 'manage' | 'synonyms';

function App() {
  const [view, setView] = useState<View>('chat');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setView('chat')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-lg transition-all ${
            view === 'chat'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Chat
        </button>
        <button
          onClick={() => setView('manage')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-lg transition-all ${
            view === 'manage'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Settings className="w-4 h-4" />
          Manage FAQs
        </button>
        <button
          onClick={() => setView('synonyms')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-lg transition-all ${
            view === 'synonyms'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Tag className="w-4 h-4" />
          Keywords
        </button>
      </div>

      {view === 'chat' && <Chatbot />}
      {view === 'manage' && <FAQManager />}
      {view === 'synonyms' && <SynonymManager />}
    </div>
  );
}

export default App;
