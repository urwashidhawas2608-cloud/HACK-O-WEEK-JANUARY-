import { Query } from '../lib/supabase';
import { Clock, TrendingUp } from 'lucide-react';

interface QueryHistoryProps {
  queries: Query[];
}

export function QueryHistory({ queries }: QueryHistoryProps) {
  const intentCounts: { [key: string]: number } = {};

  queries.forEach((query) => {
    intentCounts[query.classified_intent] = (intentCounts[query.classified_intent] || 0) + 1;
  });

  const sortedIntents = Object.entries(intentCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 border-2 border-emerald-100">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-emerald-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Recent Queries</h3>
      </div>

      {queries.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No queries yet. Try asking a question above!</p>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {queries.slice(0, 5).map((query) => (
              <div
                key={query.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-gray-700 flex-1">{query.query_text}</p>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium capitalize whitespace-nowrap">
                    {query.classified_intent}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Confidence: {(query.confidence * 100).toFixed(0)}%
                </p>
              </div>
            ))}
          </div>

          {sortedIntents.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="text-emerald-600" size={20} />
                <h4 className="font-semibold text-gray-800">Top Categories</h4>
              </div>
              <div className="space-y-2">
                {sortedIntents.map(([intent, count]) => (
                  <div key={intent} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 capitalize">{intent}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600"
                          style={{ width: `${(count / queries.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-600 w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
