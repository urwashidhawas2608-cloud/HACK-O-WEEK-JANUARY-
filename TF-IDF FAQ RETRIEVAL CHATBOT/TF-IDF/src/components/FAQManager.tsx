import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, Save, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FAQ } from '../utils/tfidf';

export function FAQManager() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    keywords: '',
  });

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading FAQs:', error);
      return;
    }

    if (data) {
      setFaqs(data as FAQ[]);
    }
  };

  const handleAdd = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) return;

    const keywords = formData.keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    const { error } = await supabase.from('faqs').insert({
      question: formData.question,
      answer: formData.answer,
      keywords,
    });

    if (error) {
      console.error('Error adding FAQ:', error);
      alert('Error adding FAQ. Please make sure you are signed in.');
      return;
    }

    setFormData({ question: '', answer: '', keywords: '' });
    setIsAdding(false);
    loadFAQs();
  };

  const handleUpdate = async (id: string) => {
    if (!formData.question.trim() || !formData.answer.trim()) return;

    const keywords = formData.keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    const { error } = await supabase
      .from('faqs')
      .update({
        question: formData.question,
        answer: formData.answer,
        keywords,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating FAQ:', error);
      alert('Error updating FAQ. Please make sure you are signed in.');
      return;
    }

    setFormData({ question: '', answer: '', keywords: '' });
    setEditingId(null);
    loadFAQs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    const { error } = await supabase.from('faqs').delete().eq('id', id);

    if (error) {
      console.error('Error deleting FAQ:', error);
      alert('Error deleting FAQ. Please make sure you are signed in.');
      return;
    }

    loadFAQs();
  };

  const startEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      keywords: faq.keywords.join(', '),
    });
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ question: '', answer: '', keywords: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-white" />
                <div>
                  <h1 className="text-2xl font-bold text-white">FAQ Manager</h1>
                  <p className="text-blue-100 text-sm">Manage your knowledge base</p>
                </div>
              </div>
              {!isAdding && !editingId && (
                <button
                  onClick={() => setIsAdding(true)}
                  className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors shadow-sm font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Add FAQ
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {(isAdding || editingId) && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isAdding ? 'Add New FAQ' : 'Edit FAQ'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={formData.question}
                      onChange={e =>
                        setFormData({ ...formData, question: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter the question..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Answer
                    </label>
                    <textarea
                      value={formData.answer}
                      onChange={e =>
                        setFormData({ ...formData, answer: e.target.value })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter the answer..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Keywords (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.keywords}
                      onChange={e =>
                        setFormData({ ...formData, keywords: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="keyword1, keyword2, keyword3..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        editingId ? handleUpdate(editingId) : handleAdd()
                      }
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      {editingId ? 'Update' : 'Save'}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {faqs.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No FAQs yet</p>
                <p className="text-gray-400 text-sm">Click "Add FAQ" to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {faqs.map(faq => (
                  <div
                    key={faq.id}
                    className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-3">
                          {faq.answer}
                        </p>
                        {faq.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {faq.keywords.map((keyword, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(faq)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
