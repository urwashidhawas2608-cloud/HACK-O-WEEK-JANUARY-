import { CheckCircle, AlertCircle } from 'lucide-react';
import { ClassificationResult as ClassificationResultType } from '../lib/classifier';

interface ClassificationResultProps {
  result: ClassificationResultType;
  query: string;
}

const intentColors: { [key: string]: string } = {
  admissions: 'bg-purple-100 border-purple-300 text-purple-800',
  exams: 'bg-rose-100 border-rose-300 text-rose-800',
  timetable: 'bg-amber-100 border-amber-300 text-amber-800',
  hostel: 'bg-cyan-100 border-cyan-300 text-cyan-800',
  scholarships: 'bg-green-100 border-green-300 text-green-800',
  fees: 'bg-orange-100 border-orange-300 text-orange-800',
  library: 'bg-teal-100 border-teal-300 text-teal-800',
  general: 'bg-gray-100 border-gray-300 text-gray-800',
};

const intentDescriptions: { [key: string]: string } = {
  admissions: 'Questions about admission process, applications, and eligibility',
  exams: 'Questions about examinations, tests, and results',
  timetable: 'Questions about class schedules and timings',
  hostel: 'Questions about hostel facilities and accommodation',
  scholarships: 'Questions about scholarships and financial aid',
  fees: 'Questions about fee structure and payments',
  library: 'Questions about library services and resources',
  general: 'General queries that need manual routing',
};

export function ClassificationResult({ result, query }: ClassificationResultProps) {
  const colorClass = intentColors[result.intent] || intentColors.general;
  const description = intentDescriptions[result.intent] || intentDescriptions.general;

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 border-2 border-emerald-100">
      <div className="flex items-start gap-4">
        {result.confidence > 0.5 ? (
          <CheckCircle className="text-emerald-600 flex-shrink-0" size={24} />
        ) : (
          <AlertCircle className="text-amber-600 flex-shrink-0" size={24} />
        )}
        <div className="flex-1">
          <div className="mb-2">
            <p className="text-gray-600 text-sm mb-1">Your query:</p>
            <p className="text-gray-900 font-medium">"{query}"</p>
          </div>

          <div className="mt-4">
            <p className="text-gray-600 text-sm mb-2">Classified as:</p>
            <div className={`inline-block px-4 py-2 rounded-lg border-2 ${colorClass} font-semibold text-lg capitalize`}>
              {result.intent}
            </div>
          </div>

          <p className="text-gray-600 text-sm mt-3">{description}</p>

          <div className="mt-4 flex items-center gap-4">
            <div>
              <p className="text-gray-600 text-xs">Confidence</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all"
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {(result.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {result.matchedKeywords.length > 0 && (
              <div>
                <p className="text-gray-600 text-xs">Matched Keywords</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {result.matchedKeywords.slice(0, 5).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
