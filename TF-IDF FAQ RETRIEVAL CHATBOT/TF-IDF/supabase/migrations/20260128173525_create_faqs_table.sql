/*
  # Create FAQs table for retrieval-based chatbot

  1. New Tables
    - `faqs`
      - `id` (uuid, primary key) - Unique identifier for each FAQ
      - `question` (text) - The FAQ question
      - `answer` (text) - The FAQ answer
      - `keywords` (text array) - Optional keywords/tags for better matching
      - `created_at` (timestamptz) - When the FAQ was created
      - `updated_at` (timestamptz) - When the FAQ was last updated
  
  2. Security
    - Enable RLS on `faqs` table
    - Add policy for anyone to read FAQs (public chatbot)
    - Add policy for authenticated users to manage FAQs
*/

CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  keywords text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read FAQs"
  ON faqs FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert FAQs"
  ON faqs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update FAQs"
  ON faqs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete FAQs"
  ON faqs FOR DELETE
  TO authenticated
  USING (true);

-- Insert some sample FAQs
INSERT INTO faqs (question, answer, keywords) VALUES
  ('What are your business hours?', 'We are open Monday to Friday, 9 AM to 5 PM EST. We are closed on weekends and major holidays.', ARRAY['hours', 'time', 'schedule', 'open', 'closed']),
  ('How do I reset my password?', 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address and we will send you instructions to create a new password.', ARRAY['password', 'reset', 'forgot', 'login', 'account']),
  ('What payment methods do you accept?', 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.', ARRAY['payment', 'credit card', 'paypal', 'pay', 'billing']),
  ('How long does shipping take?', 'Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. International shipping varies by location but typically takes 10-15 business days.', ARRAY['shipping', 'delivery', 'transport', 'mail', 'send']),
  ('What is your return policy?', 'We offer a 30-day money-back guarantee. If you are not satisfied with your purchase, you can return it within 30 days for a full refund. The item must be in its original condition.', ARRAY['return', 'refund', 'money back', 'guarantee', 'exchange']),
  ('How do I contact customer support?', 'You can reach our customer support team by email at support@example.com, by phone at 1-800-123-4567, or through the live chat on our website during business hours.', ARRAY['contact', 'support', 'help', 'phone', 'email', 'chat']),
  ('Do you offer discounts for students?', 'Yes! We offer a 15% discount for students with a valid student ID. Please contact our support team with proof of enrollment to receive your discount code.', ARRAY['discount', 'student', 'sale', 'promo', 'code']),
  ('Can I cancel my subscription?', 'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.', ARRAY['cancel', 'subscription', 'unsubscribe', 'stop', 'terminate'])
ON CONFLICT DO NOTHING;