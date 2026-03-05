import { useState } from 'react';
import { ChevronDown, ChevronUp, Tag, Lightbulb } from 'lucide-react';
import { KEYWORD_GROUPS } from '../utils/synonyms';

interface ExpandedGroup {
  [key: string]: boolean;
}

export function SynonymManager() {
  const [expanded, setExpanded] = useState<ExpandedGroup>({});

  const toggleGroup = (groupName: string) => {
    setExpanded(prev => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const formatGroupName = (name: string) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const groupEntries = Object.entries(KEYWORD_GROUPS);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-teal-700 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Tag className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Synonym Groups</h1>
                <p className="text-green-100 text-sm">Semantic keyword matching for intelligent retrieval</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-900 font-medium">How it works</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Each group contains semantically related terms. Queries using any term in a group will match against all terms in that group. For example, "fees", "tuition", and "cost" are all part of the payment group, so any question about fees will match answers about payment pricing.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {groupEntries.map(([groupName, keywords]) => (
                <div key={groupName} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleGroup(groupName)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full" />
                      <span className="font-semibold text-gray-900">
                        {formatGroupName(groupName)}
                      </span>
                      <span className="text-xs bg-gray-300 text-gray-700 px-2 py-0.5 rounded-full">
                        {keywords.length} terms
                      </span>
                    </div>
                    {expanded[groupName] ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>

                  {expanded[groupName] && (
                    <div className="px-4 py-4 bg-white border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword, index) => (
                          <div
                            key={index}
                            className="px-3 py-2 bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 text-green-800 text-sm rounded-full font-medium hover:shadow-md transition-shadow"
                          >
                            {keyword}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                        <p className="font-medium text-gray-700 mb-1">Example matching:</p>
                        <p className="italic">
                          Queries like "{keywords[0]}", "{keywords[Math.floor(keywords.length / 2)]}", or "{keywords[keywords.length - 1]}" will all retrieve the same answers.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-900">
                <span className="font-semibold">Total Groups:</span> {groupEntries.length} |{' '}
                <span className="font-semibold">Total Keywords:</span> {groupEntries.reduce((sum, [, keywords]) => sum + keywords.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
