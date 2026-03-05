const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'will', 'with', 'this', 'but', 'they', 'have', 'had',
  'what', 'when', 'where', 'who', 'which', 'why', 'how', 'can', 'could',
  'would', 'should', 'do', 'does', 'did', 'am', 'been', 'being'
]);

const COMMON_MISSPELLINGS: Record<string, string> = {
  'teh': 'the',
  'recieve': 'receive',
  'occured': 'occurred',
  'seperate': 'separate',
  'definately': 'definitely',
  'untill': 'until',
  'acheive': 'achieve',
  'beleive': 'believe',
  'thier': 'their',
  'wierd': 'weird',
  'freind': 'friend',
  'becuase': 'because',
  'whats': 'what is',
  'wheres': 'where is',
  'hows': 'how is',
  'dont': 'do not',
  'doesnt': 'does not',
  'didnt': 'did not',
  'wont': 'will not',
  'cant': 'cannot',
  'isnt': 'is not',
  'arent': 'are not',
};

export interface PreprocessingResult {
  original: string;
  lowercased: string;
  tokens: string[];
  withoutPunctuation: string[];
  withoutStopwords: string[];
  normalized: string[];
  final: string;
}

export function lowercase(text: string): string {
  return text.toLowerCase();
}

export function tokenize(text: string): string[] {
  return text.split(/\s+/).filter(token => token.length > 0);
}

export function removePunctuation(tokens: string[]): string[] {
  return tokens.map(token => token.replace(/[^\w\s]/g, '')).filter(token => token.length > 0);
}

export function removeStopwords(tokens: string[]): string[] {
  return tokens.filter(token => !STOPWORDS.has(token.toLowerCase()));
}

export function normalizeSpelling(tokens: string[]): string[] {
  return tokens.map(token => {
    const lower = token.toLowerCase();
    return COMMON_MISSPELLINGS[lower] || token;
  });
}

export function preprocessText(text: string): PreprocessingResult {
  const lowercased = lowercase(text);

  const tokens = tokenize(lowercased);

  const withoutPunctuation = removePunctuation(tokens);

  const withoutStopwords = removeStopwords(withoutPunctuation);

  const normalized = normalizeSpelling(withoutStopwords);

  const final = normalized.join(' ');

  return {
    original: text,
    lowercased,
    tokens,
    withoutPunctuation,
    withoutStopwords,
    normalized,
    final
  };
}
