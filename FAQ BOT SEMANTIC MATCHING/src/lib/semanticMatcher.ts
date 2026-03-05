import { FAQ } from './supabase';

export interface MatchResult {
  faq: FAQ;
  score: number;
  matchedKeywords: string[];
}

export function findSemanticMatches(query: string, faqs: FAQ[]): MatchResult[] {
  const queryTokens = tokenize(query);
  const results: MatchResult[] = [];

  for (const faq of faqs) {
    const matchedKeywords: string[] = [];
    let score = 0;

    for (const keyword of faq.keywords) {
      const keywordTokens = tokenize(keyword);

      for (const queryToken of queryTokens) {
        for (const keywordToken of keywordTokens) {
          if (keywordToken.includes(queryToken) || queryToken.includes(keywordToken)) {
            matchedKeywords.push(keyword);
            score += 10;
            break;
          }
        }
      }
    }

    const questionTokens = tokenize(faq.question);
    for (const queryToken of queryTokens) {
      for (const questionToken of questionTokens) {
        if (questionToken.includes(queryToken) || queryToken.includes(questionToken)) {
          score += 5;
          break;
        }
      }
    }

    if (score > 0) {
      results.push({
        faq,
        score,
        matchedKeywords: [...new Set(matchedKeywords)]
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2);
}

export function highlightMatches(text: string, query: string): string {
  const tokens = tokenize(query);
  let highlighted = text;

  tokens.forEach(token => {
    const regex = new RegExp(`(${token})`, 'gi');
    highlighted = highlighted.replace(regex, '<mark>$1</mark>');
  });

  return highlighted;
}
