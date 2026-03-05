import { CheckCircle2, Tag } from 'lucide-react';
import { MatchResult } from '../lib/semanticMatcher';

interface FAQResultProps {
  result: MatchResult;
  query: string;
  rank: number;
}

export function FAQResult({ result, query, rank }: FAQResultProps) {
  const { faq, score, matchedKeywords } = result;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-blue-600">#{rank}</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
              {faq.category}
            </span>
            <span className="text-xs text-gray-500">
              Match score: {score}
            </span>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {faq.question}
          </h3>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>

          {matchedKeywords.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">
                  Matched keywords:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchedKeywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
