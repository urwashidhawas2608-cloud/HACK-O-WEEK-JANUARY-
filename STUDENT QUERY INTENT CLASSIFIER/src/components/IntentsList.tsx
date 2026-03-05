import { Intent } from '../lib/supabase';
import { BookOpen, GraduationCap, Calendar, Home, DollarSign, Banknote, Library } from 'lucide-react';

interface IntentsListProps {
  intents: Intent[];
}

const intentIcons: { [key: string]: React.ReactNode } = {
  admissions: <GraduationCap size={20} />,
  exams: <BookOpen size={20} />,
  timetable: <Calendar size={20} />,
  hostel: <Home size={20} />,
  scholarships: <DollarSign size={20} />,
  fees: <Banknote size={20} />,
  library: <Library size={20} />,
};

const intentColors: { [key: string]: string } = {
  admissions: 'bg-purple-50 border-purple-200 text-purple-700',
  exams: 'bg-rose-50 border-rose-200 text-rose-700',
  timetable: 'bg-amber-50 border-amber-200 text-amber-700',
  hostel: 'bg-cyan-50 border-cyan-200 text-cyan-700',
  scholarships: 'bg-green-50 border-green-200 text-green-700',
  fees: 'bg-orange-50 border-orange-200 text-orange-700',
  library: 'bg-teal-50 border-teal-200 text-teal-700',
};

export function IntentsList({ intents }: IntentsListProps) {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 border-2 border-emerald-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Available Query Categories</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {intents.map((intent) => {
          const colorClass = intentColors[intent.name] || 'bg-gray-50 border-gray-200 text-gray-700';
          const icon = intentIcons[intent.name];

          return (
            <div
              key={intent.id}
              className={`p-4 rounded-lg border-2 ${colorClass} transition-transform hover:scale-105`}
            >
              <div className="flex items-center gap-2 mb-2">
                {icon}
                <h4 className="font-semibold capitalize">{intent.name}</h4>
              </div>
              <p className="text-xs opacity-75">{intent.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
