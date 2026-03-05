import { KEYWORD_GROUPS } from './synonyms';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'will', 'with', 'what', 'when', 'where', 'who', 'how', 'your', 'my', 'do', 'can', 'could', 'would'
]);

const SYNONYM_DICTIONARY: Record<string, string[]> = {};

Object.entries(KEYWORD_GROUPS).forEach(([group, keywords]) => {
  const primary = keywords[0];
  keywords.forEach(keyword => {
    SYNONYM_DICTIONARY[keyword] = [...new Set([primary, ...keywords.filter(k => k !== keyword)])];
  });
});

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0 && !STOP_WORDS.has(word));
}

export function expandWithSynonyms(tokens: string[]): string[] {
  const expandedTokens = new Set(tokens);

  tokens.forEach(token => {
    Object.entries(SYNONYM_DICTIONARY).forEach(([key, synonyms]) => {
      if (key === token || synonyms.includes(token)) {
        expandedTokens.add(key);
        synonyms.forEach(syn => expandedTokens.add(syn));
      }
    });
  });

  return Array.from(expandedTokens);
}

export function calculateTF(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  const totalTokens = tokens.length;

  tokens.forEach(token => {
    tf.set(token, (tf.get(token) || 0) + 1);
  });

  tf.forEach((count, token) => {
    tf.set(token, count / totalTokens);
  });

  return tf;
}

export function calculateIDF(documents: string[][]): Map<string, number> {
  const idf = new Map<string, number>();
  const totalDocs = documents.length;

  const docFrequency = new Map<string, number>();
  documents.forEach(doc => {
    const uniqueTokens = new Set(doc);
    uniqueTokens.forEach(token => {
      docFrequency.set(token, (docFrequency.get(token) || 0) + 1);
    });
  });

  docFrequency.forEach((freq, token) => {
    idf.set(token, Math.log(totalDocs / freq));
  });

  return idf;
}

export function calculateTFIDF(
  tf: Map<string, number>,
  idf: Map<string, number>
): Map<string, number> {
  const tfidf = new Map<string, number>();

  tf.forEach((tfValue, token) => {
    const idfValue = idf.get(token) || 0;
    tfidf.set(token, tfValue * idfValue);
  });

  return tfidf;
}

export function cosineSimilarity(
  vec1: Map<string, number>,
  vec2: Map<string, number>
): number {
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  const allTokens = new Set([...vec1.keys(), ...vec2.keys()]);

  allTokens.forEach(token => {
    const val1 = vec1.get(token) || 0;
    const val2 = vec2.get(token) || 0;

    dotProduct += val1 * val2;
    magnitude1 += val1 * val1;
    magnitude2 += val2 * val2;
  });

  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  return dotProduct / (magnitude1 * magnitude2);
}

export function findBestMatch(query: string, faqs: FAQ[]): FAQ | null {
  if (faqs.length === 0) {
    return null;
  }

  const queryTokens = tokenize(query);
  const expandedQueryTokens = expandWithSynonyms(queryTokens);

  const allDocuments = faqs.map(faq => {
    const faqTokens = tokenize(`${faq.question} ${faq.keywords.join(' ')}`);
    return expandWithSynonyms(faqTokens);
  });

  allDocuments.push(expandedQueryTokens);

  const idf = calculateIDF(allDocuments);

  const queryTF = calculateTF(expandedQueryTokens);
  const queryTFIDF = calculateTFIDF(queryTF, idf);

  let bestMatch: FAQ | null = null;
  let bestScore = 0;
  const threshold = 0.1;

  faqs.forEach((faq, index) => {
    const faqTF = calculateTF(allDocuments[index]);
    const faqTFIDF = calculateTFIDF(faqTF, idf);

    const similarity = cosineSimilarity(queryTFIDF, faqTFIDF);

    if (similarity > bestScore && similarity > threshold) {
      bestScore = similarity;
      bestMatch = faq;
    }
  });

  return bestMatch;
}
