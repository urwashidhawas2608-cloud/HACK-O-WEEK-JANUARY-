import { faqs, greetings, farewells, FAQ } from '../data/faqData';

export interface MatchResult {
  response: string;
  matched: boolean;
  category?: string;
}

export function matchQuery(query: string): MatchResult {
  const normalizedQuery = query.toLowerCase().trim();

  if (greetings.some(greeting => normalizedQuery.includes(greeting))) {
    return {
      response: 'Hello! Welcome to our Institute FAQ Chatbot. I can help you with information about timings, fees, courses, admissions, and more. What would you like to know?',
      matched: true,
      category: 'Greeting'
    };
  }

  if (farewells.some(farewell => normalizedQuery.includes(farewell))) {
    return {
      response: 'Thank you for contacting us! If you have any more questions, feel free to ask. Have a great day!',
      matched: true,
      category: 'Farewell'
    };
  }

  const queryWords = normalizedQuery.split(/\s+/);
  let bestMatch: FAQ | null = null;
  let maxMatchScore = 0;

  for (const faq of faqs) {
    let matchScore = 0;

    for (const pattern of faq.patterns) {
      if (normalizedQuery.includes(pattern)) {
        matchScore += 2;
      }

      for (const word of queryWords) {
        if (pattern.includes(word) || word.includes(pattern)) {
          matchScore += 1;
        }
      }
    }

    if (matchScore > maxMatchScore) {
      maxMatchScore = matchScore;
      bestMatch = faq;
    }
  }

  if (bestMatch && maxMatchScore > 0) {
    return {
      response: bestMatch.response,
      matched: true,
      category: bestMatch.category
    };
  }

  return {
    response: "I'm not sure I understand your question. I can help you with:\n• Institute timings\n• Course fees and payment\n• Admission process\n• Available courses\n• Contact information\n• Placements\n• Certifications\n• And more!\n\nPlease try asking in a different way.",
    matched: false
  };
}

export function getSuggestedQuestions(): string[] {
  return [
    'What are your timings?',
    'What are the course fees?',
    'How can I contact you?',
    'What courses do you offer?',
    'How do I apply for admission?'
  ];
}
