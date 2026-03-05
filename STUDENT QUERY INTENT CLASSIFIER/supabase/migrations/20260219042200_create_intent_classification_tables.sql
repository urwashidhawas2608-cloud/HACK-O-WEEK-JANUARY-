/*
  # Student Query Intent Classification System

  1. New Tables
    - `intents`
      - `id` (uuid, primary key)
      - `name` (text, unique) - Intent name (e.g., 'admissions', 'exams')
      - `description` (text) - Description of the intent
      - `keywords` (text[]) - Array of keywords associated with this intent
      - `created_at` (timestamptz)
    
    - `queries`
      - `id` (uuid, primary key)
      - `query_text` (text) - The student's query
      - `classified_intent` (text) - The classified intent name
      - `confidence` (numeric) - Confidence score (0-1)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on both tables
    - Allow public read access for intents
    - Allow public insert and read for queries (for demo purposes)
  
  3. Initial Data
    - Seed 7 intents with their keywords
*/

-- Create intents table
CREATE TABLE IF NOT EXISTS intents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text NOT NULL,
  keywords text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create queries table
CREATE TABLE IF NOT EXISTS queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query_text text NOT NULL,
  classified_intent text NOT NULL,
  confidence numeric NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE queries ENABLE ROW LEVEL SECURITY;

-- Policies for intents table
CREATE POLICY "Anyone can read intents"
  ON intents FOR SELECT
  USING (true);

-- Policies for queries table
CREATE POLICY "Anyone can insert queries"
  ON queries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read queries"
  ON queries FOR SELECT
  USING (true);

-- Seed intent data
INSERT INTO intents (name, description, keywords) VALUES
  ('admissions', 'Queries about admissions process, applications, eligibility', ARRAY['admission', 'apply', 'application', 'eligibility', 'entrance', 'registration', 'enroll', 'join', 'seat', 'cutoff', 'merit']),
  ('exams', 'Queries about examinations, tests, results, grading', ARRAY['exam', 'test', 'result', 'grade', 'marks', 'score', 'assessment', 'quiz', 'midterm', 'final', 'semester']),
  ('timetable', 'Queries about class schedules, timings, calendar', ARRAY['timetable', 'schedule', 'timing', 'class', 'lecture', 'period', 'calendar', 'when', 'time', 'slot']),
  ('hostel', 'Queries about hostel facilities, accommodation, rooms', ARRAY['hostel', 'accommodation', 'room', 'dormitory', 'mess', 'warden', 'stay', 'residence', 'boarding']),
  ('scholarships', 'Queries about scholarships, financial aid, funding', ARRAY['scholarship', 'financial', 'aid', 'funding', 'stipend', 'grant', 'fee waiver', 'loan', 'assistance']),
  ('fees', 'Queries about fees structure, payment, dues', ARRAY['fee', 'fees', 'payment', 'cost', 'charge', 'tuition', 'pay', 'due', 'installment', 'amount']),
  ('library', 'Queries about library services, books, resources', ARRAY['library', 'book', 'resource', 'borrow', 'reference', 'journal', 'reading', 'study material', 'e-book'])
ON CONFLICT (name) DO NOTHING;
