export const KEYWORD_GROUPS: Record<string, string[]> = {
  'business_hours': ['hours', 'time', 'schedule', 'open', 'closed', 'operating', 'availability', 'when', 'timings', 'open hours'],
  'authentication': ['password', 'login', 'credentials', 'access', 'signin', 'authentication', 'forgot', 'reset', 'account access'],
  'payment_pricing': ['payment', 'pay', 'billing', 'charge', 'cost', 'price', 'fee', 'fees', 'tuition', 'invoice', 'subscription cost', 'how much', 'expense'],
  'shipping_delivery': ['shipping', 'delivery', 'transport', 'mail', 'send', 'dispatch', 'arrive', 'arrival', 'tracking', 'carrier', 'package'],
  'returns_refunds': ['return', 'refund', 'exchange', 'money back', 'send back', 'replace', 'warranty', 'guarantee', 'reimbursement'],
  'customer_support': ['contact', 'reach', 'call', 'email', 'phone', 'support', 'help', 'assist', 'customer service', 'hotline', 'chat'],
  'promotions_discounts': ['discount', 'sale', 'promo', 'coupon', 'offer', 'deal', 'code', 'savings', 'reduction', 'student discount'],
  'account_management': ['cancel', 'unsubscribe', 'stop', 'terminate', 'end', 'quit', 'close', 'delete account', 'remove'],
  'user_profile': ['account', 'profile', 'user', 'member', 'registration', 'signup', 'create account'],
  'technical_issues': ['problem', 'issue', 'error', 'bug', 'trouble', 'broken', 'not working', 'fail', 'malfunction', 'crash'],
  'purchasing': ['purchase', 'buy', 'order', 'checkout', 'shop', 'acquire', 'get', 'obtain', 'transaction'],
  'plans_membership': ['subscription', 'plan', 'membership', 'tier', 'package', 'service plan']
};

export function getSynonymGroup(keyword: string): string[] {
  const lowerKeyword = keyword.toLowerCase();

  for (const [groupName, keywords] of Object.entries(KEYWORD_GROUPS)) {
    if (keywords.some(k => k.toLowerCase() === lowerKeyword)) {
      return keywords;
    }
  }

  return [];
}

export function findGroupByName(groupName: string): string[] | null {
  return KEYWORD_GROUPS[groupName] || null;
}

export function getAllGroups(): Record<string, string[]> {
  return KEYWORD_GROUPS;
}
