/*
  # FAQ System with Semantic Matching

  ## Overview
  This migration creates a comprehensive FAQ system that supports semantic similarity matching
  through keyword groups. Multiple similar queries (e.g., "fees", "tuition", "payment") can
  map to the same answer.

  ## New Tables
  
  ### `faqs`
  Stores frequently asked questions and their answers
  - `id` (uuid, primary key) - Unique identifier
  - `question` (text) - The primary question text
  - `answer` (text) - The answer to the question
  - `category` (text) - Category for organizing FAQs
  - `keywords` (text[]) - Array of semantically similar keywords/phrases
  - `created_at` (timestamptz) - When the FAQ was created
  - `updated_at` (timestamptz) - When the FAQ was last updated

  ## Security
  - Enable RLS on `faqs` table
  - Allow public read access (FAQ bot should work without authentication)
  - Restrict write access to authenticated users only

  ## Notes
  - Keywords array enables semantic matching (e.g., ["fees", "tuition", "payment", "cost"])
  - Case-insensitive search will be implemented in the application layer
  - Full-text search can be added later for more advanced matching
*/

CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'general',
  keywords text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view FAQs"
  ON faqs FOR SELECT
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

CREATE INDEX IF NOT EXISTS idx_faqs_keywords ON faqs USING GIN(keywords);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);