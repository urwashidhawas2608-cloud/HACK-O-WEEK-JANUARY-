import { useEffect, useState } from 'react';
import { supabase, Intent, Query } from './lib/supabase';
import { IntentClassifier, ClassificationResult } from './lib/classifier';
import { QueryInput } from './components/QueryInput';
import { ClassificationResult as ClassificationResultComponent } from './components/ClassificationResult';
import { IntentsList } from './components/IntentsList';
import { QueryHistory } from './components/QueryHistory';
import { Bot, Sparkles } from 'lucide-react';

function App() {
  const [intents, setIntents] = useState<Intent[]>([]);
  const [queries, setQueries] = useState<Query[]>([]);
  const [currentResult, setCurrentResult] = useState<{
    result: ClassificationResult;
    query: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [classifier] = useState(() => new IntentClassifier());

  useEffect(() => {
    loadIntents();
    loadQueries();
  }, []);

  const loadIntents = async () => {
    const { data, error } = await supabase
      .from('intents')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error loading intents:', error);
      return;
    }

    if (data) {
      setIntents(data);
      classifier.setIntents(data);
    }
  };

  const loadQueries = async () => {
    const { data, error } = await supabase
      .from('queries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error loading queries:', error);
      return;
    }

    if (data) {
      setQueries(data);
    }
  };

  const handleQuerySubmit = async (query: string) => {
    setIsLoading(true);

    const result = classifier.classify(query);
    setCurrentResult({ result, query });

    const { error } = await supabase.from('queries').insert({
      query_text: query,
      classified_intent: result.intent,
      confidence: result.confidence,
    });

    if (error) {
      console.error('Error saving query:', error);
    } else {
      await loadQueries();
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-emerald-600 rounded-xl shadow-lg">
              <Bot className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              Student Query Classifier
            </h1>
          </div>
          <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
            <Sparkles size={20} className="text-emerald-600" />
            Intelligent intent classification for student queries
          </p>
        </header>

        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-emerald-100">
            <QueryInput onSubmit={handleQuerySubmit} isLoading={isLoading} />
          </div>
        </div>

        {currentResult && (
          <div className="mb-8">
            <ClassificationResultComponent
              result={currentResult.result}
              query={currentResult.query}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <IntentsList intents={intents} />
          </div>
          <div>
            <QueryHistory queries={queries} />
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-12">
          <p>Powered by keyword-based intent classification</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
