import { Sparkles } from 'lucide-react';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export default function SuggestedQuestions({ questions, onQuestionClick }: SuggestedQuestionsProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-cyan-600" />
        <p className="text-sm font-medium text-gray-600">Suggested Questions</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700 transition-all duration-200 shadow-sm hover:shadow"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
