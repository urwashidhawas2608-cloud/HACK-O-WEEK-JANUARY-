import { Intent } from './supabase';

export interface ClassificationResult {
  intent: string;
  confidence: number;
  matchedKeywords: string[];
}

export class IntentClassifier {
  private intents: Intent[] = [];

  setIntents(intents: Intent[]) {
    this.intents = intents;
  }

  classify(query: string): ClassificationResult {
    const normalizedQuery = query.toLowerCase().trim();
    const words = normalizedQuery.split(/\s+/);

    const scores: { [key: string]: { score: number; matches: string[] } } = {};

    for (const intent of this.intents) {
      scores[intent.name] = { score: 0, matches: [] };

      for (const keyword of intent.keywords) {
        const normalizedKeyword = keyword.toLowerCase();

        if (normalizedQuery.includes(normalizedKeyword)) {
          scores[intent.name].score += 1;
          scores[intent.name].matches.push(keyword);
        }

        for (const word of words) {
          if (word === normalizedKeyword) {
            scores[intent.name].score += 0.5;
          }
        }
      }
    }

    let bestIntent = 'general';
    let bestScore = 0;
    let bestMatches: string[] = [];

    for (const [intentName, data] of Object.entries(scores)) {
      if (data.score > bestScore) {
        bestScore = data.score;
        bestIntent = intentName;
        bestMatches = data.matches;
      }
    }

    const confidence = bestScore > 0 ? Math.min(bestScore / 3, 1) : 0.1;

    return {
      intent: bestIntent,
      confidence: parseFloat(confidence.toFixed(2)),
      matchedKeywords: bestMatches,
    };
  }
}
