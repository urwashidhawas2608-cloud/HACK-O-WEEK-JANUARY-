import { useState, useEffect } from 'react';
import { Search, MessageCircle, Loader2 } from 'lucide-react';
import { supabase, FAQ } from '../lib/supabase';
import { findSemanticMatches, MatchResult } from '../lib/semanticMatcher';
import { FAQResult } from './FAQResult';
import { CategoryFilter } from './CategoryFilter';

export function FAQBot() {
  const [query, setQuery] = useState('');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredResults, setFilteredResults] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadFAQs();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const matches = findSemanticMatches(query, faqs);
      const filtered = selectedCategory === 'all'
        ? matches
        : matches.filter(m => m.faq.category === selectedCategory);
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  }, [query, faqs, selectedCategory]);

  async function loadFAQs() {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setFaqs(data || []);

      const uniqueCategories = [...new Set((data || []).map(faq => faq.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              FAQ Assistant
            </h1>
            <p className="text-lg text-gray-600">
              Ask me anything! I understand similar terms like fees, tuition, and payment.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your question here..."
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Found {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'}
              </p>
              {filteredResults.map((result, index) => (
                <FAQResult
                  key={result.faq.id}
                  result={result}
                  query={query}
                  rank={index + 1}
                />
              ))}
            </div>
          ) : query.trim() ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600">
                No matches found. Try different keywords or phrases.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Questions
              </h3>
              <div className="space-y-3">
                {faqs.slice(0, 5).map(faq => (
                  <button
                    key={faq.id}
                    onClick={() => setQuery(faq.question)}
                    className="w-full text-left p-4 rounded-lg border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <p className="text-gray-900 font-medium">{faq.question}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {faq.keywords.slice(0, 5).map((keyword, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
