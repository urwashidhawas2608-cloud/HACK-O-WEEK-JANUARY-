export interface FAQ {
  id: number;
  patterns: string[];
  response: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: 1,
    patterns: ['timings', 'hours', 'open', 'close', 'schedule', 'timing'],
    response: 'Our institute is open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 9:00 AM to 2:00 PM. We are closed on Sundays and public holidays.',
    category: 'Timings'
  },
  {
    id: 2,
    patterns: ['fees', 'cost', 'price', 'tuition', 'payment', 'charge'],
    response: 'Our course fees vary by program:\n• Basic Course: $500\n• Advanced Course: $800\n• Professional Course: $1,200\nWe offer flexible payment plans and early bird discounts of 10%.',
    category: 'Fees'
  },
  {
    id: 3,
    patterns: ['contact', 'phone', 'email', 'reach', 'call'],
    response: 'You can reach us at:\n📞 Phone: +1 (555) 123-4567\n📧 Email: info@institute.edu\n📍 Address: 123 Education Street, Learning City, ST 12345',
    category: 'Contact'
  },
  {
    id: 4,
    patterns: ['admission', 'enroll', 'registration', 'join', 'apply'],
    response: 'Admissions are open year-round! You can apply online through our website or visit our office. Required documents: ID proof, educational certificates, and 2 passport photos. Processing time is 3-5 business days.',
    category: 'Admission'
  },
  {
    id: 5,
    patterns: ['courses', 'programs', 'subjects', 'curriculum', 'study'],
    response: 'We offer courses in:\n• Web Development\n• Data Science\n• Digital Marketing\n• Graphic Design\n• Business Management\nEach course includes hands-on projects and industry certifications.',
    category: 'Courses'
  },
  {
    id: 6,
    patterns: ['duration', 'length', 'long', 'time', 'period'],
    response: 'Course durations:\n• Basic Course: 3 months\n• Advanced Course: 6 months\n• Professional Course: 12 months\nAll courses include flexible weekend batches for working professionals.',
    category: 'Duration'
  },
  {
    id: 7,
    patterns: ['location', 'address', 'where', 'find', 'directions'],
    response: 'We are located at 123 Education Street, Learning City, ST 12345. Near Central Mall, easily accessible by bus (routes 15, 23) and metro (Education Station). Free parking available for students.',
    category: 'Location'
  },
  {
    id: 8,
    patterns: ['faculty', 'teachers', 'instructors', 'staff', 'trainers'],
    response: 'Our faculty includes 25+ industry experts with 10+ years of experience. All instructors hold advanced degrees and professional certifications. Student-to-teacher ratio is 15:1 for personalized attention.',
    category: 'Faculty'
  },
  {
    id: 9,
    patterns: ['certificate', 'certification', 'diploma', 'degree'],
    response: 'Upon successful completion, you will receive:\n• Institute Certificate\n• Industry-recognized certifications\n• Digital badge for LinkedIn\n• Lifetime access to course materials\nAll certificates are verifiable online.',
    category: 'Certification'
  },
  {
    id: 10,
    patterns: ['placement', 'job', 'career', 'employment', 'hire'],
    response: 'We have a dedicated placement cell with 85% placement rate. Services include:\n• Resume building\n• Interview preparation\n• Job fairs\n• Company tie-ups with 100+ organizations\nAverage salary package: $45,000 - $60,000.',
    category: 'Placement'
  },
  {
    id: 11,
    patterns: ['online', 'remote', 'virtual', 'distance'],
    response: 'Yes! We offer both online and offline modes. Online classes feature:\n• Live interactive sessions\n• Recorded lectures\n• Virtual labs\n• 24/7 learning portal access\nSame quality instruction as in-person classes.',
    category: 'Online Learning'
  },
  {
    id: 12,
    patterns: ['eligibility', 'requirements', 'qualification', 'criteria'],
    response: 'Basic eligibility:\n• Minimum age: 16 years\n• Education: High school diploma or equivalent\n• For advanced courses: Bachelor\'s degree preferred\nNo prior experience required for basic courses.',
    category: 'Eligibility'
  },
  {
    id: 13,
    patterns: ['scholarship', 'financial aid', 'discount', 'concession'],
    response: 'Scholarships available:\n• Merit-based: Up to 30% off\n• Early bird: 10% off\n• Referral: 15% off for both\n• Group enrollment: 20% off for 3+ students\nFinancial aid for eligible candidates.',
    category: 'Scholarships'
  },
  {
    id: 14,
    patterns: ['batch', 'class', 'session', 'start', 'beginning'],
    response: 'New batches start every month on the 1st and 15th. Morning batch: 9 AM - 12 PM, Afternoon batch: 2 PM - 5 PM, Evening batch: 6 PM - 9 PM. Weekend batches also available.',
    category: 'Batches'
  },
  {
    id: 15,
    patterns: ['demo', 'trial', 'free class', 'sample', 'preview'],
    response: 'Free demo class available! Book your slot online or call us. No commitment required. You can also access our free introductory video lectures on the website to get a feel for our teaching style.',
    category: 'Demo'
  }
];

export const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
export const farewells = ['bye', 'goodbye', 'see you', 'thanks', 'thank you'];
