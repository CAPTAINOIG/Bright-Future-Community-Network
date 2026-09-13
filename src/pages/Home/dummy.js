import { Users, BookOpen, Briefcase, Target, TrendingUp, Heart, Lightbulb, MapPin, Star, Handshake } from 'lucide-react';

export const stats = [
  { icon: Users, value: '2,500+', label: 'Community Members' },
  { icon: MapPin, value: '15+', label: 'Communities Reached' },
  { icon: Briefcase, value: '30+', label: 'Projects Completed' },
  { icon: Heart, value: '10,000+', label: 'Lives Impacted' },
];

export const programmes = [
  { icon: BookOpen, title: 'Education Support', description: 'Scholarships, learning materials, tutoring, and educational infrastructure support for students across communities.', color: '#1B5E20' },
  { icon: Lightbulb, title: 'Youth Development', description: 'Mentorship, leadership training, career guidance, and personal development programs for young people.', color: '#D4A017' },
  { icon: Briefcase, title: 'Skills & Entrepreneurship', description: 'Vocational training, business mentoring, startup support, and entrepreneurship workshops for community members.', color: '#1565c0' },
  { icon: Target, title: 'Leadership Development', description: 'Building future community leaders through structured mentorship, governance training, and civic engagement.', color: '#c62828' },
  { icon: Handshake, title: 'Humanitarian Support', description: 'Emergency relief, welfare support, healthcare access, and community welfare programmes.', color: '#f57c00' },
  { icon: TrendingUp, title: 'Community Empowerment', description: 'Infrastructure projects, advocacy, community organizing, and sustainable development initiatives.', color: '#6a1b9a' },
];

export const projects = [
  { id: 1, title: 'Community Library Project', status: 'Ongoing', description: 'Establishing a well-equipped community library to serve students and learners in Ogbomoso.', beneficiaries: '500+ Students', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80' },
  { id: 2, title: 'Youth Skills Workshop 2026', status: 'Completed', description: 'A three-day intensive workshop covering digital skills, tailoring, and agribusiness.', beneficiaries: '120 Youth', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80' },
  { id: 3, title: 'Clean Water Initiative', status: 'Planned', description: 'Providing access to clean, safe drinking water in underserved communities around Ogbomoso.', beneficiaries: '2,000+ Residents', image: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&auto=format&fit=crop&q=80' },
];

export const events = [
  { id: 1, title: 'BFCN Community Summit 2026', date: 'October 15, 2026', time: '10:00 AM', venue: 'Ogbomoso Civic Centre', description: 'Annual community summit bringing together leaders, members, and stakeholders.' },
  { id: 2, title: 'Youth Mentorship Workshop', date: 'November 5, 2026', time: '9:00 AM', venue: 'BFCN Resource Centre', description: 'Interactive mentorship session for young people on career development and leadership.' },
  { id: 3, title: 'End of Year Community Celebration', date: 'December 20, 2026', time: '4:00 PM', venue: 'Ogbomoso Town Hall', description: 'Annual celebration recognizing community achievements and outstanding members.' },
];

export const news = [
  { id: 1, title: 'BFCN Launches New Education Programme for Rural Communities', excerpt: 'Bright Future Community Network has announced a new education support programme targeting underserved rural communities.', date: 'September 1, 2026', category: 'Education', image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&auto=format&fit=crop&q=80' },
  { id: 2, title: 'Youth Skills Workshop Records Highest Attendance', excerpt: 'Over 120 young people participated in the 2026 Youth Skills Workshop, the highest attendance since inception.', date: 'August 20, 2026', category: 'Youth Development', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80' },
  { id: 3, title: 'BFCN Partners with Local Government on Clean Water', excerpt: 'A new partnership aims to bring clean water access to five underserved communities.', date: 'August 10, 2026', category: 'Community', image: 'https://images.unsplash.com/photo-1504805295311-57920a024837?w=800&auto=format&fit=crop&q=80' },
];

export const impactQuotes = [
  { quote: "BFCN's education programme helped me return to school. Today, I am a graduate and a teacher giving back to my community.", name: 'Adebayo Oluwaseun', role: 'Beneficiary, Education Programme' },
  { quote: "The youth skills workshop changed my life. I learned tailoring and now run my own fashion business, employing two other young people.", name: 'Fatimah Adesola', role: 'Beneficiary, Skills Programme' },
];
