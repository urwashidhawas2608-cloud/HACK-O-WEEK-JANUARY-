import { useState } from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import { preprocessText, PreprocessingResult } from './utils/textPreprocessing';

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<PreprocessingResult | null>(null);

  const handlePreprocess = () => {
    if (inputText.trim()) {
      const processed = preprocessText(inputText);
      setResult(processed);
    }
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-10 h-10 text-orange-600" />
              <h1 className="text-4xl font-bold text-gray-800">Student Question Preprocessor</h1>
            </div>
            <p className="text-gray-600 text-lg">
              Advanced text preprocessing with lowercasing, tokenization, stopword removal, and spelling normalization
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Enter Student Question
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g., What is the differance between photosynthesis and respiration in plants?"
              className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none text-gray-800"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={handlePreprocess}
                disabled={!inputText.trim()}
                className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                Preprocess Text
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
              >
                Clear
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <ArrowRight className="w-5 h-5 text-orange-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Processing Steps</h2>
                </div>

                <div className="space-y-6">
                  <ProcessingStep
                    title="1. Original Text"
                    content={result.original}
                    color="gray"
                  />

                  <ProcessingStep
                    title="2. Lowercased"
                    content={result.lowercased}
                    color="amber"
                  />

                  <ProcessingStep
                    title="3. Tokenized"
                    content={result.tokens.join(' | ')}
                    color="orange"
                  />

                  <ProcessingStep
                    title="4. Punctuation Removed"
                    content={result.withoutPunctuation.join(' | ')}
                    color="rose"
                  />

                  <ProcessingStep
                    title="5. Stopwords Removed"
                    content={result.withoutStopwords.join(' | ')}
                    color="amber"
                  />

                  <ProcessingStep
                    title="6. Spelling Normalized"
                    content={result.normalized.join(' | ')}
                    color="orange"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Final Preprocessed Result
                </h2>
                <p className="text-xl font-mono bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  {result.final}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ProcessingStepProps {
  title: string;
  content: string;
  color: 'gray' | 'amber' | 'orange' | 'rose';
}

function ProcessingStep({ title, content, color }: ProcessingStepProps) {
  const colorClasses = {
    gray: 'bg-gray-50 border-gray-200',
    amber: 'bg-amber-50 border-amber-200',
    orange: 'bg-orange-50 border-orange-200',
    rose: 'bg-rose-50 border-rose-200',
  };

  const textColorClasses = {
    gray: 'text-gray-700',
    amber: 'text-amber-700',
    orange: 'text-orange-700',
    rose: 'text-rose-700',
  };

  return (
    <div className={`${colorClasses[color]} border-2 rounded-xl p-5`}>
      <h3 className={`font-bold text-sm mb-2 ${textColorClasses[color]}`}>
        {title}
      </h3>
      <p className="text-gray-700 font-mono text-sm break-words">
        {content || '(empty)'}
      </p>
    </div>
  );
}

export default App;
