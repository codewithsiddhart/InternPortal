import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import {
  GraduationCap, Building2, Briefcase, Search, Upload, CheckCircle2, Circle,
  TrendingUp, Users, FileText, Award, Target, ChevronRight, X, Plus, Sparkles,
  BarChart3, ShieldCheck, Mail, Clock, ArrowLeft, Trash2, Bell, LayoutDashboard,
  BookOpen, ChevronDown, Lock, User, LogIn, Trophy, Rocket, Zap, UserPlus,
  Copy, Eye, EyeOff, Flame, Star, MapPin,
} from 'lucide-react';

/* ---------------------------------------------------------------------- */
/* Design tokens                                                          */
/* ---------------------------------------------------------------------- */

const FONT_DISPLAY = "'Fraunces', serif";
const FONT_HEAD = "'Space Grotesk', sans-serif";
const FONT_BODY = "'IBM Plex Sans', sans-serif";
const BRAND = 'Intern Portal';

/* ---------------------------------------------------------------------- */
/* Skill taxonomy                                                         */
/* ---------------------------------------------------------------------- */

const TECH_SKILLS = [
  'React', 'Node.js', 'Python', 'Java', 'SQL', 'Data Structures',
  'Machine Learning', 'Cloud Computing', 'DevOps', 'Cybersecurity',
  'UI/UX Design', 'Android Development', 'Data Analysis', 'Power BI',
  'C++', 'Embedded Systems', 'Digital Marketing', 'Blockchain',
];

const SOFT_SKILLS = [
  'Communication', 'Teamwork', 'Problem Solving', 'Leadership',
  'Time Management', 'Adaptability', 'Critical Thinking', 'Public Speaking',
];

const ALL_SKILLS = [
  ...TECH_SKILLS.map((name) => ({ name, type: 'technical' })),
  ...SOFT_SKILLS.map((name) => ({ name, type: 'soft' })),
];

function skillType(name) {
  return ALL_SKILLS.find((s) => s.name === name)?.type || 'technical';
}

const LEARNING_RESOURCES = {
  'Cloud Computing': { title: 'AWS Cloud Practitioner Essentials', platform: 'AWS Skill Builder' },
  'DevOps': { title: 'DevOps Foundations', platform: 'NPTEL' },
  'Cybersecurity': { title: 'Introduction to Cybersecurity', platform: 'Cisco Networking Academy' },
  'Machine Learning': { title: 'Machine Learning Specialization', platform: 'Coursera' },
  'Embedded Systems': { title: 'Embedded Systems Essentials', platform: 'NPTEL' },
  'Android Development': { title: 'Android Basics with Compose', platform: 'Google Developers' },
  'C++': { title: 'C++ for Programmers', platform: 'NPTEL' },
  'Digital Marketing': { title: 'Fundamentals of Digital Marketing', platform: 'Google Skillshop' },
  'Blockchain': { title: 'Blockchain Basics', platform: 'Coursera' },
  'Data Analysis': { title: 'Data Analysis with Python', platform: 'freeCodeCamp' },
  'Power BI': { title: 'Power BI for Beginners', platform: 'Microsoft Learn' },
  'UI/UX Design': { title: 'Google UX Design Certificate', platform: 'Coursera' },
  'Public Speaking': { title: 'Dynamic Public Speaking', platform: 'Coursera' },
  'Critical Thinking': { title: 'Effective Problem-Solving', platform: 'Coursera' },
  'Leadership': { title: 'Leading People and Teams', platform: 'Coursera' },
  'React': { title: 'React - The Complete Guide', platform: 'freeCodeCamp' },
  'Node.js': { title: 'Node.js, Express, MongoDB', platform: 'freeCodeCamp' },
};
function resourceFor(skill) {
  return LEARNING_RESOURCES[skill] || { title: `Beginner workshop on ${skill}`, platform: 'Training & placement cell' };
}

/* ---------------------------------------------------------------------- */
/* Mock data                                                               */
/* ---------------------------------------------------------------------- */

const INITIAL_STUDENTS = [
  { id: 'stu-1', name: 'Aditi Sharma', email: 'aditi.sharma@nitjaipur.ac.in', college: 'NIT Jaipur', branch: 'Computer Science', year: '3rd year', verified: true, resumeFile: 'Aditi_Sharma_Resume.pdf',
    skills: [{ name: 'React', type: 'technical' }, { name: 'Node.js', type: 'technical' }, { name: 'SQL', type: 'technical' }, { name: 'Data Structures', type: 'technical' }, { name: 'Communication', type: 'soft' }, { name: 'Teamwork', type: 'soft' }],
    certifications: [{ name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services' }],
    projects: [{ title: 'Campus Event Manager', desc: 'MERN-stack app used by 400+ students to register for college fests.' }] },
  { id: 'stu-2', name: 'Rohan Mehta', email: 'rohan.mehta@mitpune.edu.in', college: 'MIT Pune', branch: 'Electronics', year: '4th year', verified: true, resumeFile: 'Rohan_Mehta_CV.pdf',
    skills: [{ name: 'Embedded Systems', type: 'technical' }, { name: 'C++', type: 'technical' }, { name: 'Python', type: 'technical' }, { name: 'Problem Solving', type: 'soft' }, { name: 'Time Management', type: 'soft' }],
    certifications: [],
    projects: [{ title: 'Smart Irrigation Controller', desc: 'Arduino-based soil sensor system that cut water use by 30% in a pilot farm.' }] },
  { id: 'stu-3', name: 'Sneha Patil', email: 'sneha.patil@vjti.ac.in', college: 'VJTI Mumbai', branch: 'Information Technology', year: '3rd year', verified: true, resumeFile: 'Sneha_Patil_Resume.pdf',
    skills: [{ name: 'Python', type: 'technical' }, { name: 'Machine Learning', type: 'technical' }, { name: 'Data Analysis', type: 'technical' }, { name: 'SQL', type: 'technical' }, { name: 'Critical Thinking', type: 'soft' }],
    certifications: [{ name: 'Applied Data Science', issuer: 'Coursera' }],
    projects: [{ title: 'Crop Yield Predictor', desc: 'ML model forecasting yield from weather and soil data, 82% accuracy.' }] },
  { id: 'stu-4', name: 'Karan Verma', email: 'karan.verma@bitspilani.ac.in', college: 'BITS Pilani', branch: 'Computer Science', year: '2nd year', verified: false, resumeFile: 'Karan_Verma_Resume.pdf',
    skills: [{ name: 'Java', type: 'technical' }, { name: 'Data Structures', type: 'technical' }, { name: 'DevOps', type: 'technical' }, { name: 'Adaptability', type: 'soft' }],
    certifications: [],
    projects: [] },
  { id: 'stu-5', name: 'Priya Nair', email: 'priya.nair@nitt.edu', college: 'NIT Trichy', branch: 'Computer Science', year: '4th year', verified: true, resumeFile: 'Priya_Nair_CV.pdf',
    skills: [{ name: 'React', type: 'technical' }, { name: 'UI/UX Design', type: 'technical' }, { name: 'Digital Marketing', type: 'technical' }, { name: 'Communication', type: 'soft' }, { name: 'Leadership', type: 'soft' }],
    certifications: [{ name: 'Google UX Design Certificate', issuer: 'Google' }],
    projects: [{ title: 'Accessible Campus Map', desc: 'Redesigned the college wayfinding app for screen-reader accessibility.' }] },
  { id: 'stu-6', name: 'Arjun Singh', email: 'arjun.singh@amity.edu', college: 'Amity University Noida', branch: 'Mechanical Engineering', year: '3rd year', verified: false, resumeFile: null,
    skills: [{ name: 'Python', type: 'technical' }, { name: 'Data Analysis', type: 'technical' }, { name: 'Power BI', type: 'technical' }, { name: 'Teamwork', type: 'soft' }],
    certifications: [],
    projects: [] },
  { id: 'stu-7', name: 'Fatima Khan', email: 'fatima.khan@jmi.ac.in', college: 'Jamia Millia Islamia', branch: 'Computer Science', year: '3rd year', verified: true, resumeFile: 'Fatima_Khan_Resume.pdf',
    skills: [{ name: 'Cybersecurity', type: 'technical' }, { name: 'Python', type: 'technical' }, { name: 'Cloud Computing', type: 'technical' }, { name: 'Critical Thinking', type: 'soft' }, { name: 'Communication', type: 'soft' }],
    certifications: [{ name: 'CompTIA Security+', issuer: 'CompTIA' }],
    projects: [{ title: 'Campus Wi-Fi Penetration Test', desc: 'Authorized security audit of the hostel network, reported 6 vulnerabilities.' }] },
  { id: 'stu-8', name: 'Devansh Rao', email: 'devansh.rao@iiit.ac.in', college: 'IIIT Hyderabad', branch: 'Computer Science', year: '4th year', verified: true, resumeFile: 'Devansh_Rao_CV.pdf',
    skills: [{ name: 'Machine Learning', type: 'technical' }, { name: 'Python', type: 'technical' }, { name: 'SQL', type: 'technical' }, { name: 'Data Structures', type: 'technical' }, { name: 'Public Speaking', type: 'soft' }],
    certifications: [{ name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI' }],
    projects: [{ title: 'Regional Language Chatbot', desc: 'Transformer-based support bot for a 3-language customer helpline.' }] },
  { id: 'stu-9', name: 'Meera Iyer', email: 'meera.iyer@annauniv.edu', college: 'Anna University', branch: 'Information Technology', year: '2nd year', verified: false, resumeFile: 'Meera_Iyer_Resume.pdf',
    skills: [{ name: 'Android Development', type: 'technical' }, { name: 'Java', type: 'technical' }, { name: 'UI/UX Design', type: 'technical' }, { name: 'Teamwork', type: 'soft' }],
    certifications: [],
    projects: [{ title: 'Hostel Mess Feedback App', desc: 'Android app for daily meal ratings, adopted by two hostel blocks.' }] },
  { id: 'stu-10', name: 'Yash Gupta', email: 'yash.gupta@dtu.ac.in', college: 'Delhi Technological University', branch: 'Computer Science', year: '3rd year', verified: true, resumeFile: 'Yash_Gupta_Resume.pdf',
    skills: [{ name: 'Blockchain', type: 'technical' }, { name: 'Node.js', type: 'technical' }, { name: 'SQL', type: 'technical' }, { name: 'Problem Solving', type: 'soft' }, { name: 'Adaptability', type: 'soft' }],
    certifications: [],
    projects: [{ title: 'Certificate Verification Chain', desc: 'Prototype using a permissioned ledger to verify degree certificates.' }] },
];

const INITIAL_JOBS = [
  { id: 'job-1', company: 'NimbusTech Solutions', title: 'Frontend Engineering Intern', type: 'Internship', location: 'Bengaluru (Remote)', pay: '₹18,000/month', description: 'Build and ship UI features for our student-facing web app alongside a small product team.', postedDate: '2026-08-01',
    requiredSkills: [{ skill: 'React', weight: 2 }, { skill: 'Node.js', weight: 1 }, { skill: 'UI/UX Design', weight: 1 }, { skill: 'Communication', weight: 1 }] },
  { id: 'job-2', company: 'Verve Analytics', title: 'Data Analyst Intern', type: 'Internship', location: 'Pune', pay: '₹12,000/month', description: 'Work with the analytics team to clean, model, and visualize client datasets.', postedDate: '2026-07-20',
    requiredSkills: [{ skill: 'Python', weight: 2 }, { skill: 'Data Analysis', weight: 2 }, { skill: 'SQL', weight: 1 }, { skill: 'Power BI', weight: 1 }, { skill: 'Critical Thinking', weight: 1 }] },
  { id: 'job-3', company: 'BluePeak Systems', title: 'Machine Learning Engineer', type: 'Job', location: 'Hyderabad', pay: '₹9,00,000/year', description: 'Own model development for our recommendation pipeline, from experiment to production.', postedDate: '2026-07-10',
    requiredSkills: [{ skill: 'Machine Learning', weight: 2 }, { skill: 'Python', weight: 2 }, { skill: 'SQL', weight: 1 }, { skill: 'Data Structures', weight: 1 }, { skill: 'Public Speaking', weight: 1 }] },
  { id: 'job-4', company: 'Cirrus Robotics', title: 'Embedded Systems Intern', type: 'Internship', location: 'Chennai', pay: '₹10,000/month', description: 'Prototype firmware for our warehouse robotics line under the hardware team.', postedDate: '2026-08-05',
    requiredSkills: [{ skill: 'Embedded Systems', weight: 2 }, { skill: 'C++', weight: 2 }, { skill: 'Problem Solving', weight: 1 }] },
  { id: 'job-5', company: 'Lumen Financial', title: 'Cybersecurity Analyst', type: 'Job', location: 'Mumbai (Hybrid)', pay: '₹7,50,000/year', description: 'Monitor, investigate, and respond to security events across our banking infrastructure.', postedDate: '2026-07-25',
    requiredSkills: [{ skill: 'Cybersecurity', weight: 2 }, { skill: 'Cloud Computing', weight: 1 }, { skill: 'Python', weight: 1 }, { skill: 'Critical Thinking', weight: 1 }, { skill: 'Communication', weight: 1 }] },
  { id: 'job-6', company: 'Pixel Forge Studios', title: 'UI/UX Design Intern', type: 'Internship', location: 'Remote', pay: '₹8,000/month', description: 'Design flows and interfaces for indie game studios we partner with.', postedDate: '2026-08-12',
    requiredSkills: [{ skill: 'UI/UX Design', weight: 2 }, { skill: 'Communication', weight: 1 }, { skill: 'Digital Marketing', weight: 1 }, { skill: 'Teamwork', weight: 1 }] },
  { id: 'job-7', company: 'GreenGrid Energy', title: 'Cloud & DevOps Intern', type: 'Internship', location: 'Gurugram', pay: '₹14,000/month', description: 'Help automate deployment pipelines for our energy-monitoring platform.', postedDate: '2026-07-28',
    requiredSkills: [{ skill: 'Cloud Computing', weight: 2 }, { skill: 'DevOps', weight: 2 }, { skill: 'Java', weight: 1 }, { skill: 'Adaptability', weight: 1 }] },
  { id: 'job-8', company: 'Northstar Logistics', title: 'Android Developer', type: 'Job', location: 'Bengaluru', pay: '₹6,50,000/year', description: 'Build features for our fleet-tracking driver app used across 4 cities.', postedDate: '2026-07-15',
    requiredSkills: [{ skill: 'Android Development', weight: 2 }, { skill: 'Java', weight: 2 }, { skill: 'UI/UX Design', weight: 1 }, { skill: 'Teamwork', weight: 1 }] },
];

const INITIAL_APPLICATIONS = [
  { id: 'app-1', studentId: 'stu-1', jobId: 'job-1', status: 'Shortlisted', appliedDate: '2026-08-10', matchAtApply: 80 },
  { id: 'app-2', studentId: 'stu-1', jobId: 'job-6', status: 'Applied', appliedDate: '2026-08-20', matchAtApply: 40 },
  { id: 'app-3', studentId: 'stu-3', jobId: 'job-2', status: 'Interview', appliedDate: '2026-08-05', matchAtApply: 86 },
  { id: 'app-4', studentId: 'stu-8', jobId: 'job-3', status: 'Selected', appliedDate: '2026-07-28', matchAtApply: 100 },
  { id: 'app-5', studentId: 'stu-7', jobId: 'job-5', status: 'Applied', appliedDate: '2026-08-18', matchAtApply: 100 },
  { id: 'app-6', studentId: 'stu-4', jobId: 'job-7', status: 'Rejected', appliedDate: '2026-07-30', matchAtApply: 67 },
  { id: 'app-7', studentId: 'stu-9', jobId: 'job-8', status: 'Shortlisted', appliedDate: '2026-08-12', matchAtApply: 100 },
  { id: 'app-8', studentId: 'stu-10', jobId: 'job-1', status: 'Applied', appliedDate: '2026-08-22', matchAtApply: 20 },
];

const PLACEMENT_TREND = [
  { month: 'Mar', placed: 2 }, { month: 'Apr', placed: 4 }, { month: 'May', placed: 5 },
  { month: 'Jun', placed: 7 }, { month: 'Jul', placed: 9 }, { month: 'Aug', placed: 12 },
];

const COMPANIES = [
  'NimbusTech Solutions', 'Verve Analytics', 'BluePeak Systems', 'Cirrus Robotics',
  'Lumen Financial', 'Pixel Forge Studios', 'GreenGrid Energy', 'Northstar Logistics',
];

const STATUS_STEPS = ['Applied', 'Shortlisted', 'Interview', 'Selected'];
const STAGE_OPTIONS = ['Not applied', 'Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];
const STATUS_COLORS = { Applied: '#A8A29E', Shortlisted: '#6366F1', Interview: '#4338CA', Selected: '#059669', Rejected: '#F43F5E' };

/* ---------------------------------------------------------------------- */
/* Auth + credential generation                                          */
/* ---------------------------------------------------------------------- */

const COLLEGE_CODES = {
  'NIT Jaipur': 'NITJ', 'MIT Pune': 'MITP', 'VJTI Mumbai': 'VJTI',
  'BITS Pilani': 'BITS', 'NIT Trichy': 'NITT', 'Amity University Noida': 'AMITY',
  'Jamia Millia Islamia': 'JMI', 'IIIT Hyderabad': 'IIITH',
  'Anna University': 'ANNA', 'Delhi Technological University': 'DTU',
};
function collegeCode(college) {
  return COLLEGE_CODES[college] || college.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 5);
}
function collegeUsername(college) { return `${collegeCode(college).toLowerCase()}admin`; }
function collegePassword(college) { return `${collegeCode(college).toLowerCase()}123`; }
function companyUsername(company) { return company.toLowerCase().replace(/[^a-z0-9]+/g, ''); }
function companyPassword(company) { return `${company.replace(/[^A-Za-z0-9]/g, '').slice(0, 4).toLowerCase()}123`; }
function randomPassword() {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let out = '';
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function buildInitialCollegeAccounts(students) {
  return [...new Set(students.map((s) => s.college))].map((college) => ({
    username: collegeUsername(college), password: collegePassword(college), college,
  }));
}
function buildInitialCompanyAccounts(companies) {
  return companies.map((company) => ({ username: companyUsername(company), password: companyPassword(company), company }));
}
function buildInitialStudentAccounts(students) {
  const perCollegeCount = {};
  return students.map((s) => {
    const code = collegeCode(s.college);
    perCollegeCount[code] = (perCollegeCount[code] || 0) + 1;
    return { loginId: `${code}-${String(perCollegeCount[code]).padStart(3, '0')}`, password: 'pass123', studentId: s.id, college: s.college };
  });
}

/* ---------------------------------------------------------------------- */
/* Points, badges & leaderboard engine                                    */
/* ---------------------------------------------------------------------- */

const BADGE_TIERS = [
  { name: 'Platinum', min: 150, color: 'text-indigo-700 bg-indigo-50 border-indigo-200', bar: 'bg-indigo-600' },
  { name: 'Gold', min: 100, color: 'text-amber-700 bg-amber-50 border-amber-200', bar: 'bg-amber-500' },
  { name: 'Silver', min: 60, color: 'text-stone-600 bg-stone-100 border-stone-300', bar: 'bg-stone-400' },
  { name: 'Bronze', min: 0, color: 'text-orange-700 bg-orange-50 border-orange-200', bar: 'bg-orange-400' },
];
function computePoints(student) {
  const techPts = student.skills.filter((s) => s.type === 'technical').length * 10;
  const softPts = student.skills.filter((s) => s.type === 'soft').length * 5;
  const certPts = student.certifications.length * 15;
  const projPts = student.projects.length * 20;
  const resumePts = student.resumeFile ? 10 : 0;
  const verifiedPts = student.verified ? 25 : 0;
  return techPts + softPts + certPts + projPts + resumePts + verifiedPts;
}
function computeBadge(points) { return BADGE_TIERS.find((t) => points >= t.min) || BADGE_TIERS[BADGE_TIERS.length - 1]; }
function nextBadgeInfo(points) {
  const idx = BADGE_TIERS.findIndex((t) => points >= t.min);
  if (idx <= 0) return null;
  const next = BADGE_TIERS[idx - 1];
  return { ...next, pointsToGo: next.min - points };
}
function rankStudents(students) {
  return [...students]
    .map((s) => ({ student: s, points: computePoints(s) }))
    .sort((a, b) => b.points - a.points || a.student.name.localeCompare(b.student.name))
    .map((row, i) => ({ ...row, rank: i + 1, badge: computeBadge(row.points) }));
}

/* ---------------------------------------------------------------------- */
/* Matching + analytics engine                                            */
/* ---------------------------------------------------------------------- */

function calcMatch(studentSkillNames, job) {
  const total = job.requiredSkills.reduce((sum, r) => sum + r.weight, 0);
  const matched = job.requiredSkills.filter((r) => studentSkillNames.includes(r.skill));
  const missing = job.requiredSkills.filter((r) => !studentSkillNames.includes(r.skill));
  const matchedWeight = matched.reduce((sum, r) => sum + r.weight, 0);
  const score = total > 0 ? Math.round((matchedWeight / total) * 100) : 0;
  return { score, matched, missing };
}

function computeSkillGap(students, jobs) {
  const demandMap = {};
  let totalWeight = 0;
  jobs.forEach((job) => job.requiredSkills.forEach((r) => {
    demandMap[r.skill] = (demandMap[r.skill] || 0) + r.weight;
    totalWeight += r.weight;
  }));
  const supplyMap = {};
  students.forEach((s) => s.skills.forEach((sk) => {
    supplyMap[sk.name] = (supplyMap[sk.name] || 0) + 1;
  }));
  const rows = Object.keys(demandMap).map((skill) => {
    const demandPct = totalWeight > 0 ? Math.round((demandMap[skill] / totalWeight) * 100) : 0;
    const supplyPct = students.length > 0 ? Math.round(((supplyMap[skill] || 0) / students.length) * 100) : 0;
    return { skill, demand: demandPct, supply: supplyPct, gap: demandPct - supplyPct };
  });
  rows.sort((a, b) => b.gap - a.gap);
  return rows;
}

function computeProfileCompleteness(student) {
  const checks = [
    student.skills.length >= 4,
    !!student.resumeFile,
    student.certifications.length >= 1,
    student.projects.length >= 1,
    student.verified,
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

function statusBreakdown(apps) {
  const order = ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];
  return order
    .map((status) => ({ name: status, value: apps.filter((a) => a.status === status).length, color: STATUS_COLORS[status] }))
    .filter((d) => d.value > 0);
}

/* ---------------------------------------------------------------------- */
/* Reusable UI pieces                                                     */
/* ---------------------------------------------------------------------- */

function SkillChip({ name, type = 'technical', filled = false, size = 'sm', onRemove, state }) {
  // `state` overrides the normal technical/soft coloring to flag a required
  // skill against what the student actually has: 'have' (green, they have it)
  // or 'missing' (red, they don't — used on the apply page skill match-up).
  const techFilled = 'bg-indigo-700 text-white border-indigo-700';
  const techOutline = 'bg-white text-indigo-700 border-indigo-200';
  const softFilled = 'bg-amber-500 text-white border-amber-500';
  const softOutline = 'bg-white text-amber-700 border-amber-200';
  const haveCls = 'bg-emerald-600 text-white border-emerald-600';
  const missingCls = 'bg-rose-50 text-rose-600 border-rose-300';
  let cls;
  if (state === 'have') cls = haveCls;
  else if (state === 'missing') cls = missingCls;
  else cls = type === 'technical' ? (filled ? techFilled : techOutline) : (filled ? softFilled : softOutline);
  const padding = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${padding} ${cls}`}>
      {state === 'have' && <CheckCircle2 size={size === 'sm' ? 11 : 13} />}
      {state === 'missing' && <X size={size === 'sm' ? 11 : 13} />}
      {name}
      {onRemove && (
        <button onClick={onRemove} className="ml-0.5 opacity-70 hover:opacity-100">
          <X size={12} />
        </button>
      )}
    </span>
  );
}

function MatchMeter({ score, showLabel = true }) {
  const bar = score >= 75 ? 'bg-emerald-600' : score >= 50 ? 'bg-amber-500' : 'bg-rose-400';
  const label = score >= 75 ? 'text-emerald-700' : score >= 50 ? 'text-amber-700' : 'text-rose-600';
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2 rounded-full bg-stone-200 overflow-hidden">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${score}%` }} />
      </div>
      {showLabel && <span className={`text-sm font-semibold w-10 text-right ${label}`}>{score}%</span>}
    </div>
  );
}

function StatusStepper({ status }) {
  if (status === 'Rejected') {
    return (
      <div className="flex items-center gap-1.5 text-rose-600 text-sm font-medium">
        <X size={14} /> Not selected this round
      </div>
    );
  }
  const idx = STATUS_STEPS.indexOf(status);
  return (
    <div className="flex items-center">
      {STATUS_STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center gap-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${i <= idx ? 'bg-indigo-700 text-white' : 'bg-stone-200 text-stone-400'}`}>
              {i < idx ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span className={`text-xs ${i <= idx ? 'text-stone-700' : 'text-stone-400'}`}>{step}</span>
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div className={`h-0.5 w-8 sm:w-12 mx-1 ${i < idx ? 'bg-indigo-700' : 'bg-stone-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function StatCard({ label, value, sub, icon: Icon, accent = 'indigo', rail = false }) {
  const text = { indigo: 'text-indigo-700', teal: 'text-teal-700', amber: 'text-amber-600', emerald: 'text-emerald-600' }[accent];
  const railColor = { indigo: 'border-l-indigo-600', teal: 'border-l-teal-600', amber: 'border-l-amber-600', emerald: 'border-l-emerald-600' }[accent];
  return (
    <div className={`bg-white border border-stone-200 rounded-2xl p-5 ${rail ? `border-l-4 ${railColor}` : ''}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-500">{label}</p>
        <Icon size={16} className={text} />
      </div>
      <p className="text-2xl font-semibold text-stone-900 mt-2" style={{ fontFamily: FONT_HEAD }}>{value}</p>
      {sub && <p className="text-xs text-stone-400 mt-1">{sub}</p>}
    </div>
  );
}

function Avatar({ name, accent = 'indigo', small = false }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();
  const bg = { indigo: 'bg-indigo-100 text-indigo-700', teal: 'bg-teal-100 text-teal-700', amber: 'bg-amber-100 text-amber-700' }[accent];
  const size = small ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-xs';
  return <div className={`${size} rounded-full flex items-center justify-center font-semibold shrink-0 ${bg}`}>{initials}</div>;
}

function EmptyState({ icon: Icon, title, message }) {
  return (
    <div className="text-center py-10">
      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3">
        <Icon size={20} className="text-stone-400" />
      </div>
      <p className="text-sm font-medium text-stone-700">{title}</p>
      {message && <p className="text-sm text-stone-400 mt-1">{message}</p>}
    </div>
  );
}

function BackButton({ onClick, label = 'Back' }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
      <ArrowLeft size={15} /> {label}
    </button>
  );
}

function BadgePill({ badge, size = 'sm' }) {
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-semibold ${padding} ${badge.color}`}>
      <Award size={size === 'sm' ? 11 : 13} /> {badge.name}
    </span>
  );
}

function RankMedal({ rank }) {
  const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;
  if (medal) return <span className="text-lg leading-none">{medal}</span>;
  return <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 text-xs font-semibold flex items-center justify-center">{rank}</span>;
}

function CredentialCard({ label, loginId, password, sub }) {
  return (
    <div className="bg-stone-900 text-white rounded-xl p-4">
      <p className="text-xs text-stone-400">{label}</p>
      {sub && <p className="text-sm text-stone-300 mb-2">{sub}</p>}
      <div className="mt-2 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] text-stone-500 uppercase tracking-wide">Login ID</p>
          <p className="font-mono text-sm font-semibold">{loginId}</p>
        </div>
        <div>
          <p className="text-[11px] text-stone-500 uppercase tracking-wide">Password</p>
          <p className="font-mono text-sm font-semibold">{password}</p>
        </div>
      </div>
    </div>
  );
}

function ToastEl({ message }) {
  return (
    <div className="fixed top-5 right-5 z-50 bg-stone-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm">
      <CheckCircle2 size={16} className="text-emerald-400" />
      {message}
    </div>
  );
}

function NotificationBell({ notifications, accent }) {
  const [open, setOpen] = useState(false);
  const dot = { indigo: 'bg-indigo-600', teal: 'bg-teal-600', amber: 'bg-amber-600' }[accent];
  return (
    <div className="relative">
      {open && <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />}
      <button onClick={() => setOpen((o) => !o)} className="relative w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-50">
        <Bell size={16} className="text-stone-600" />
        {notifications.length > 0 && <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${dot}`} />}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-stone-200 rounded-xl shadow-lg z-40 overflow-hidden">
          <div className="px-4 py-3 border-b border-stone-100">
            <p className="text-sm font-semibold text-stone-900">Notifications</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 && <p className="text-sm text-stone-400 px-4 py-6 text-center">Nothing new right now.</p>}
            {notifications.map((n, i) => (
              <div key={i} className="px-4 py-3 border-b border-stone-50 last:border-0">
                <p className="text-sm text-stone-800">{n.text}</p>
                {n.date && <p className="text-xs text-stone-400 mt-0.5">{n.date}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusPie({ data, size = 200 }) {
  if (data.length === 0) return <EmptyState icon={BarChart3} title="No applications yet" />;
  return (
    <ResponsiveContainer width="100%" height={size}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
          {data.map((d, i) => <Cell key={i} fill={d.color} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

function CandidateRadar({ job, student }) {
  const studentSkillNames = student.skills.map((s) => s.name);
  const data = job.requiredSkills.map((r) => ({
    skill: r.skill,
    required: r.weight,
    candidate: studentSkillNames.includes(r.skill) ? r.weight : 0,
  }));
  return (
    <ResponsiveContainer width="100%" height={230}>
      <RadarChart data={data} outerRadius={75}>
        <PolarGrid stroke="#E7E5E4" />
        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} />
        <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 2]} />
        <Radar name="Role requires" dataKey="required" stroke="#78716C" fill="#78716C" fillOpacity={0.15} />
        <Radar name={student.name.split(' ')[0]} dataKey="candidate" stroke="#D97706" fill="#D97706" fillOpacity={0.35} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}

function DashboardShell({ title, subtitle, accent, icon: Icon, tabs, activeTab, setActiveTab, onExit, notifications = [], avatarName, children }) {
  const accentBg = { indigo: 'bg-indigo-700', teal: 'bg-teal-700', amber: 'bg-amber-600' }[accent];
  const accentText = { indigo: 'text-indigo-700', teal: 'text-teal-700', amber: 'text-amber-600' }[accent];
  const accentLight = { indigo: 'bg-indigo-50', teal: 'bg-teal-50', amber: 'bg-amber-50' }[accent];
  return (
    <div className="min-h-screen flex" style={{ fontFamily: FONT_BODY }}>
      <aside className="w-60 shrink-0 bg-stone-900 text-stone-300 flex flex-col">
        <div className="px-5 py-5 flex items-center gap-2 border-b border-stone-800">
          <div className={`w-8 h-8 rounded-md ${accentBg} flex items-center justify-center text-white font-bold text-xs`}>IP</div>
          <span className="font-semibold text-white" style={{ fontFamily: FONT_HEAD }}>{BRAND}</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {tabs.map((t) => {
            const TabIcon = t.icon;
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? `${accentBg} text-white` : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'}`}
              >
                <TabIcon size={16} />
                {t.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-stone-800">
          <button onClick={onExit} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-stone-400 hover:bg-stone-800 hover:text-stone-200">
            <ArrowLeft size={16} /> Log out / switch role
          </button>
        </div>
      </aside>
      <main className="flex-1 bg-stone-50 min-h-screen">
        <div className={`${accentLight} border-b border-stone-200 px-8 py-4`}>
          <BackButton onClick={onExit} label="Back to home" />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${accentText}`}>
                <Icon size={20} />
              </div>
              <div>
                <h1 className="font-semibold text-lg text-stone-900" style={{ fontFamily: FONT_HEAD }}>{title}</h1>
                <p className="text-sm text-stone-500">{subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <NotificationBell notifications={notifications} accent={accent} />
              <Avatar name={avatarName || title} accent={accent} />
            </div>
          </div>
        </div>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Landing page                                                           */
/* ---------------------------------------------------------------------- */

function LoginScreen({ roleLabel, icon: Icon, accent, idLabel, onBack, onSubmit, error, hint }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const accentBg = { indigo: 'bg-indigo-700 hover:bg-indigo-800', teal: 'bg-teal-700 hover:bg-teal-800', amber: 'bg-amber-600 hover:bg-amber-700' }[accent];
  const accentText = { indigo: 'text-indigo-700', teal: 'text-teal-700', amber: 'text-amber-600' }[accent];
  const accentLight = { indigo: 'bg-indigo-50', teal: 'bg-teal-50', amber: 'bg-amber-50' }[accent];

  function submit(e) {
    e.preventDefault();
    onSubmit(id.trim(), password.trim());
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <BackButton onClick={onBack} label="Back to role selection" />
        <div className="mt-6 bg-white border border-stone-200 rounded-2xl p-8">
          <div className={`w-12 h-12 rounded-xl ${accentLight} ${accentText} flex items-center justify-center mb-4`}>
            <Icon size={22} />
          </div>
          <h2 className="text-xl font-semibold text-stone-900" style={{ fontFamily: FONT_HEAD }}>{roleLabel} login</h2>
          <p className="text-sm text-stone-500 mt-1 mb-6">Enter the credentials issued to you to continue.</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-stone-700">{idLabel}</label>
              <div className="relative mt-1">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input value={id} onChange={(e) => setId(e.target.value)} className="w-full border border-stone-300 rounded-lg pl-9 pr-3 py-2.5 text-sm" placeholder={idLabel} autoFocus autoCapitalize="none" autoCorrect="off" spellCheck="false" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700">Password</label>
              <div className="relative mt-1">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-stone-300 rounded-lg pl-9 pr-9 py-2.5 text-sm" placeholder="Password" autoCapitalize="none" autoCorrect="off" spellCheck="false" />
                <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" className={`w-full px-4 py-2.5 rounded-lg text-white text-sm font-semibold flex items-center justify-center gap-2 ${accentBg}`}>
              <LogIn size={15} /> Log in
            </button>
          </form>
        </div>
        {hint && (
          <div className="mt-4 bg-stone-100 border border-stone-200 rounded-xl p-4 text-xs text-stone-600 space-y-1.5">
            <p className="font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5"><Sparkles size={12} /> Demo credentials (for judges/testers)</p>
            {hint}
          </div>
        )}
      </div>
    </div>
  );
}

function Landing({ onSelect, students, jobs }) {
  const demoStudent = students[0];
  const demoJob = jobs[0];
  const { score, matched } = calcMatch(demoStudent.skills.map((s) => s.name), demoJob);

  const roles = [
    { key: 'student', icon: GraduationCap, title: 'Student', desc: 'Build your profile, showcase verified skills, and apply to internships and jobs matched to you.' },
    { key: 'college', icon: Building2, title: 'College', desc: 'See what industry is hiring for, track placements, and verify student profiles before they go public.' },
    { key: 'industry', icon: Briefcase, title: 'Industry', desc: 'Post openings and get a ranked shortlist of candidates scored against your exact requirements.' },
  ];

  const stats = [
    { label: 'Hiring partners', value: new Set(jobs.map((j) => j.company)).size },
    { label: 'Open roles', value: jobs.length },
    { label: 'Partner colleges', value: new Set(students.map((s) => s.college)).size },
    { label: 'Students onboarded', value: students.length },
  ];

  return (
    <div>
      <header className="max-w-6xl mx-auto px-6 pt-8 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-indigo-700 flex items-center justify-center text-white font-bold text-xs">IP</div>
          <span className="font-semibold text-lg text-stone-900" style={{ fontFamily: FONT_HEAD }}>{BRAND}</span>
        </div>
        <span className="text-xs text-stone-500 border border-stone-300 rounded-full px-3 py-1">SIH 2026, Problem SIH26044</span>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-4">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1"><Lock size={11} /> Role-based login</span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1"><Trophy size={11} /> Points & leaderboards</span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1"><Rocket size={11} /> Skill-gap roadmap</span>
        </div>
      </div>


      <section className="max-w-6xl mx-auto px-6 pt-10 pb-12 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 style={{ fontFamily: FONT_DISPLAY }} className="text-4xl sm:text-5xl leading-tight font-semibold text-stone-900">
            Where campus skills meet industry demand.
          </h1>
          <p className="mt-5 text-stone-600 text-lg leading-relaxed max-w-md">
            One portal where students prove what they can do, colleges see what's missing, and companies hire on skill fit instead of a resume PDF.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => onSelect(r.key)}
                className="text-sm font-medium px-4 py-2.5 rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors"
              >
                Enter as {r.title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <p className="text-xs font-medium text-stone-400 mb-4">Live from the matching engine</p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-xs text-stone-500 mb-2">{demoStudent.name}'s skills</p>
              <div className="flex flex-wrap gap-1.5">
                {demoStudent.skills.map((s) => (
                  <SkillChip key={s.name} name={s.name} type={s.type} filled={demoJob.requiredSkills.some((r) => r.skill === s.name)} />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center shrink-0">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-700 flex items-center justify-center font-bold text-indigo-700" style={{ fontFamily: FONT_HEAD }}>
                {score}%
              </div>
              <span className="text-xs text-stone-400 mt-1">match</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-stone-500 mb-2">{demoJob.title} needs</p>
              <div className="flex flex-wrap gap-1.5">
                {demoJob.requiredSkills.map((r) => (
                  <SkillChip key={r.skill} name={r.skill} type={skillType(r.skill)} filled={matched.some((m) => m.skill === r.skill)} />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-stone-400 border-t border-stone-100 pt-3">
            Computed live by the same rule-based algorithm every posting uses. Must-have skills count double toward the score.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="bg-stone-900 rounded-2xl px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-semibold text-white" style={{ fontFamily: FONT_HEAD }}>{s.value}</p>
              <p className="text-sm text-stone-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20 grid sm:grid-cols-3 gap-5">
        {roles.map((r) => {
          const Icon = r.icon;
          return (
            <button
              key={r.key}
              onClick={() => onSelect(r.key)}
              className="text-left bg-white border border-stone-200 rounded-2xl p-6 hover:border-indigo-300 transition-colors group"
            >
              <Icon size={22} className="text-indigo-700" />
              <h3 style={{ fontFamily: FONT_HEAD }} className="mt-4 font-semibold text-stone-900">{r.title} dashboard</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">{r.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-700">
                Open <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          );
        })}
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Student dashboard                                                      */
/* ---------------------------------------------------------------------- */

function StudentDashboard({ student, updateStudent, jobs, applications, setApplications, allStudents, roadmap, startLearning, completeRoadmapItem, onExit, showToast }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [newSkillName, setNewSkillName] = useState(TECH_SKILLS[0]);
  const [certName, setCertName] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [gapOpenJobId, setGapOpenJobId] = useState(null);

  const studentSkillNames = student.skills.map((s) => s.name);
  const myRoadmap = roadmap.filter((r) => r.studentId === student.id);
  const points = computePoints(student);
  const badge = computeBadge(points);
  const nextBadge = nextBadgeInfo(points);

  function addSkill() {
    if (student.skills.some((s) => s.name === newSkillName)) { showToast('Skill already on your profile'); return; }
    updateStudent({ ...student, skills: [...student.skills, { name: newSkillName, type: skillType(newSkillName) }] });
    showToast(`Added ${newSkillName} to your profile`);
  }
  function removeSkill(name) {
    updateStudent({ ...student, skills: student.skills.filter((s) => s.name !== name) });
  }
  function uploadResume(e) {
    const file = e.target.files && e.target.files[0];
    if (file) { updateStudent({ ...student, resumeFile: file.name }); showToast('Resume uploaded'); }
  }
  function addCert() {
    if (!certName.trim()) return;
    updateStudent({ ...student, certifications: [...student.certifications, { name: certName, issuer: certIssuer || 'Self-reported' }] });
    setCertName(''); setCertIssuer('');
    showToast('Certification added');
  }
  function removeCert(i) {
    updateStudent({ ...student, certifications: student.certifications.filter((_, idx) => idx !== i) });
  }
  function addProject() {
    if (!projTitle.trim()) return;
    updateStudent({ ...student, projects: [...student.projects, { title: projTitle, desc: projDesc }] });
    setProjTitle(''); setProjDesc('');
    showToast('Project added');
  }
  function removeProject(i) {
    updateStudent({ ...student, projects: student.projects.filter((_, idx) => idx !== i) });
  }
  function applyToJob(job) {
    if (applications.some((a) => a.studentId === student.id && a.jobId === job.id)) { showToast('You already applied to this role'); return; }
    const { score } = calcMatch(studentSkillNames, job);
    setApplications((prev) => [...prev, { id: `app-${Date.now()}`, studentId: student.id, jobId: job.id, status: 'Applied', appliedDate: new Date().toISOString().slice(0, 10), matchAtApply: score }]);
    showToast(`Applied to ${job.title} at ${job.company}`);
  }

  const jobsScored = jobs.map((j) => ({ ...j, ...calcMatch(studentSkillNames, j) }));

  const filteredJobs = jobsScored
    .filter((j) => {
      const matchesType = typeFilter === 'All' || j.type === typeFilter;
      const matchesSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    })
    .sort((a, b) => b.score - a.score);

  const myApplications = applications
    .filter((a) => a.studentId === student.id)
    .map((a) => ({ ...a, job: jobs.find((j) => j.id === a.jobId) }))
    .sort((a, b) => b.appliedDate.localeCompare(a.appliedDate));

  const appliedJobIds = new Set(myApplications.map((a) => a.jobId));
  const recommended = jobsScored.filter((j) => !appliedJobIds.has(j.id)).sort((a, b) => b.score - a.score).slice(0, 3);

  const completeness = computeProfileCompleteness(student);
  const checklist = [
    { label: 'Add at least 4 skills', done: student.skills.length >= 4 },
    { label: 'Upload your resume', done: !!student.resumeFile },
    { label: 'Add a certification', done: student.certifications.length >= 1 },
    { label: 'Add a project', done: student.projects.length >= 1 },
    { label: 'Get verified by your college', done: student.verified },
  ];

  const inProgress = myApplications.filter((a) => a.status === 'Shortlisted' || a.status === 'Interview').length;
  const offers = myApplications.filter((a) => a.status === 'Selected').length;

  const notifications = myApplications
    .filter((a) => a.status !== 'Applied')
    .map((a) => ({ text: `${a.job.company}: ${a.job.title} is now ${a.status}`, date: a.appliedDate }))
    .slice(0, 6);

  return (
    <DashboardShell
      title={`Hi, ${student.name.split(' ')[0]}`}
      subtitle="Student dashboard"
      accent="indigo"
      icon={GraduationCap}
      avatarName={student.name}
      notifications={notifications}
      tabs={[
        { key: 'overview', label: 'Overview', icon: LayoutDashboard },
        { key: 'profile', label: 'My profile', icon: Users },
        { key: 'browse', label: 'Browse openings', icon: Search },
        { key: 'applications', label: 'My applications', icon: FileText },
        { key: 'gap', label: 'Skill-gap roadmap', icon: Rocket },
        { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
      ]}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onExit={onExit}
    >
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-stone-900 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <Trophy size={26} className="text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-stone-400">Your skill points</p>
                <p className="text-3xl font-semibold text-white" style={{ fontFamily: FONT_HEAD }}>{points} <span className="text-base font-normal text-stone-400">pts</span></p>
              </div>
              <BadgePill badge={badge} size="lg" />
            </div>
            <div className="sm:text-right">
              {nextBadge ? (
                <>
                  <p className="text-xs text-stone-400 mb-1.5">{nextBadge.pointsToGo} pts to {nextBadge.name}</p>
                  <div className="w-48 h-2 rounded-full bg-white/10 overflow-hidden ml-auto">
                    <div className={`h-full ${nextBadge.bar}`} style={{ width: `${Math.max(6, 100 - (nextBadge.pointsToGo / (nextBadge.min || 1)) * 100)}%` }} />
                  </div>
                </>
              ) : (
                <p className="text-xs text-emerald-400 font-medium">Top tier reached 🎉</p>
              )}
              <button onClick={() => setActiveTab('leaderboard')} className="mt-2 text-xs font-medium text-indigo-300 hover:text-indigo-200">See leaderboard →</button>
            </div>
          </div>
          <div className="grid sm:grid-cols-4 gap-4">
            <StatCard label="Applications sent" value={myApplications.length} icon={FileText} accent="indigo" rail />
            <StatCard label="In progress" value={inProgress} icon={Clock} accent="amber" rail />
            <StatCard label="Offers" value={offers} icon={Award} accent="emerald" rail />
            <StatCard label="Profile strength" value={`${completeness}%`} icon={ShieldCheck} accent="indigo" rail />
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <h3 className="font-semibold text-stone-900 mb-4" style={{ fontFamily: FONT_HEAD }}>Where your applications stand</h3>
              <StatusPie data={statusBreakdown(myApplications)} />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <h3 className="font-semibold text-stone-900 mb-1" style={{ fontFamily: FONT_HEAD }}>Complete your profile</h3>
              <p className="text-sm text-stone-500 mb-4">A complete, verified profile ranks higher with recruiters.</p>
              <div className="space-y-2.5">
                {checklist.map((c) => (
                  <div key={c.label} className="flex items-center gap-2 text-sm">
                    {c.done ? <CheckCircle2 size={16} className="text-emerald-600 shrink-0" /> : <Circle size={16} className="text-stone-300 shrink-0" />}
                    <span className={c.done ? 'text-stone-400 line-through' : 'text-stone-700'}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-indigo-700" />
              <h3 className="font-semibold text-stone-900" style={{ fontFamily: FONT_HEAD }}>Recommended for you</h3>
            </div>
            <div className="space-y-3">
              {recommended.map((job) => {
                const applied = applications.some((a) => a.studentId === student.id && a.jobId === job.id);
                return (
                  <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-stone-100 rounded-xl p-4">
                    <div className="flex-1">
                      <p className="font-medium text-stone-900">{job.title}</p>
                      <p className="text-sm text-stone-500">{job.company} · {job.location}</p>
                      <div className="mt-2 max-w-xs"><MatchMeter score={job.score} /></div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.requiredSkills.map((r) => (
                          <SkillChip key={r.skill} name={r.skill} type={skillType(r.skill)} state={studentSkillNames.includes(r.skill) ? 'have' : 'missing'} />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => applyToJob(job)}
                      disabled={applied}
                      className={`px-4 py-2 rounded-lg text-sm font-medium shrink-0 ${applied ? 'bg-stone-100 text-stone-400' : 'bg-indigo-700 text-white hover:bg-indigo-800'}`}
                    >
                      {applied ? 'Applied' : 'Apply now'}
                    </button>
                  </div>
                );
              })}
              {recommended.length === 0 && <EmptyState icon={Sparkles} title="You've applied to everything that fits" message="Check back for new postings." />}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-stone-900" style={{ fontFamily: FONT_HEAD }}>{student.name}</h2>
                  <p className="text-sm text-stone-500 mt-0.5">{student.branch} · {student.year} · {student.college}</p>
                  <p className="text-sm text-stone-500">{student.email}</p>
                </div>
                {student.verified ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 shrink-0">
                    <ShieldCheck size={13} /> Verified by college
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 shrink-0">
                    <Clock size={13} /> Verification pending
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <h3 className="font-semibold text-stone-900 mb-1" style={{ fontFamily: FONT_HEAD }}>Skills</h3>
              <p className="text-sm text-stone-500 mb-4">Tag both technical and soft skills. This is exactly what companies match against.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {student.skills.map((s) => (
                  <SkillChip key={s.name} name={s.name} type={s.type} filled onRemove={() => removeSkill(s.name)} />
                ))}
                {student.skills.length === 0 && <p className="text-sm text-stone-400">No skills added yet.</p>}
              </div>
              <div className="flex gap-2">
                <select value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)} className="flex-1 border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white">
                  <optgroup label="Technical">
                    {TECH_SKILLS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </optgroup>
                  <optgroup label="Soft skills">
                    {SOFT_SKILLS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </optgroup>
                </select>
                <button onClick={addSkill} className="px-4 py-2 rounded-lg bg-indigo-700 text-white text-sm font-medium hover:bg-indigo-800 flex items-center gap-1">
                  <Plus size={15} /> Add
                </button>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <h3 className="font-semibold text-stone-900 mb-4" style={{ fontFamily: FONT_HEAD }}>Projects</h3>
              <div className="space-y-3 mb-4">
                {student.projects.map((p, i) => (
                  <div key={i} className="border border-stone-200 rounded-lg p-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-stone-900">{p.title}</p>
                      <p className="text-sm text-stone-500 mt-0.5">{p.desc}</p>
                    </div>
                    <button onClick={() => removeProject(i)} className="text-stone-400 hover:text-rose-500 shrink-0">
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
                {student.projects.length === 0 && <p className="text-sm text-stone-400">No projects added yet.</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                <input value={projTitle} onChange={(e) => setProjTitle(e.target.value)} placeholder="Project title" className="border border-stone-300 rounded-lg px-3 py-2 text-sm" />
                <input value={projDesc} onChange={(e) => setProjDesc(e.target.value)} placeholder="One line description" className="border border-stone-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <button onClick={addProject} className="mt-2 px-4 py-2 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 flex items-center gap-1">
                <Plus size={15} /> Add project
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <h3 className="font-semibold text-stone-900 mb-3" style={{ fontFamily: FONT_HEAD }}>Resume</h3>
              {student.resumeFile ? (
                <div className="flex items-center gap-2 text-sm text-stone-700 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 mb-3">
                  <FileText size={15} className="text-indigo-700" /> {student.resumeFile}
                </div>
              ) : (
                <p className="text-sm text-stone-400 mb-3">No resume uploaded yet.</p>
              )}
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 text-sm font-medium text-stone-700 hover:bg-stone-50 cursor-pointer">
                <Upload size={15} /> Upload resume
                <input type="file" onChange={uploadResume} className="hidden" />
              </label>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <h3 className="font-semibold text-stone-900 mb-3" style={{ fontFamily: FONT_HEAD }}>Certifications</h3>
              <div className="space-y-2 mb-3">
                {student.certifications.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-sm border border-stone-200 rounded-lg px-3 py-2">
                    <span className="flex items-center gap-2">
                      <Award size={14} className="text-amber-600" />
                      {c.name} <span className="text-stone-400">— {c.issuer}</span>
                    </span>
                    <button onClick={() => removeCert(i)} className="text-stone-400 hover:text-rose-500">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {student.certifications.length === 0 && <p className="text-sm text-stone-400">None added yet.</p>}
              </div>
              <input value={certName} onChange={(e) => setCertName(e.target.value)} placeholder="Certification name" className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mb-2" />
              <input value={certIssuer} onChange={(e) => setCertIssuer(e.target.value)} placeholder="Issued by" className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mb-2" />
              <button onClick={addCert} className="w-full px-4 py-2 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-800">Add certification</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'browse' && (
        <div>
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-60">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by role or company" className="w-full border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-sm" />
            </div>
            <div className="flex gap-1 bg-stone-100 rounded-lg p-1">
              {['All', 'Internship', 'Job'].map((t) => (
                <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 py-1.5 rounded-md text-sm font-medium ${typeFilter === t ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredJobs.map((job) => {
              const applied = applications.some((a) => a.studentId === student.id && a.jobId === job.id);
              return (
                <div key={job.id} className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-indigo-300 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-stone-900">{job.title}</p>
                      <p className="text-sm text-stone-500">{job.company} · {job.location}</p>
                    </div>
                    <span className="text-xs font-medium text-stone-500 bg-stone-100 rounded-full px-2.5 py-1 shrink-0">{job.type}</span>
                  </div>
                  <p className="text-sm text-stone-600 mt-2">{job.pay}</p>
                  <div className="mt-3">
                    <MatchMeter score={job.score} />
                  </div>
                  <div className="mt-3">
                    <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wide mb-1.5">Skills {job.company} needs</p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.requiredSkills.map((r) => {
                        const has = studentSkillNames.includes(r.skill);
                        return (
                          <SkillChip
                            key={r.skill}
                            name={r.skill + (r.weight === 2 ? ' *' : '')}
                            type={skillType(r.skill)}
                            state={has ? 'have' : 'missing'}
                          />
                        );
                      })}
                    </div>
                    {job.missing.length > 0 && (
                      <p className="text-[11px] text-rose-600 mt-1.5">
                        Red = you don't have this yet ({job.missing.length} of {job.requiredSkills.length}). * = must-have, counts double.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => applyToJob(job)}
                    disabled={applied}
                    className={`mt-4 w-full px-4 py-2 rounded-lg text-sm font-medium ${applied ? 'bg-stone-100 text-stone-400' : 'bg-indigo-700 text-white hover:bg-indigo-800'}`}
                  >
                    {applied ? 'Applied' : 'Apply now'}
                  </button>
                  {job.missing.length > 0 && (
                    <div className="mt-2">
                      <button
                        onClick={() => setGapOpenJobId(gapOpenJobId === job.id ? null : job.id)}
                        className="w-full text-xs font-medium text-amber-700 hover:text-amber-900 flex items-center justify-center gap-1 py-1.5"
                      >
                        <Target size={12} /> {job.missing.length} skill{job.missing.length > 1 ? 's' : ''} short of 100% match {gapOpenJobId === job.id ? '▲' : '▼'}
                      </button>
                      {gapOpenJobId === job.id && (
                        <div className="mt-2 border-t border-stone-100 pt-3 space-y-2">
                          {job.missing.map((m) => {
                            const res = resourceFor(m.skill);
                            const inRoadmap = myRoadmap.find((r) => r.skill === m.skill && r.jobId === job.id);
                            return (
                              <div key={m.skill} className="flex items-center justify-between gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-stone-800 flex items-center gap-1">{m.skill} {m.weight === 2 && <span className="text-[10px] text-rose-600 font-medium">must-have</span>}</p>
                                  <p className="text-[11px] text-stone-500 truncate">{res.title} · {res.platform}</p>
                                </div>
                                {inRoadmap ? (
                                  inRoadmap.status === 'done'
                                    ? <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 shrink-0"><CheckCircle2 size={12} /> Learned</span>
                                    : <span className="text-[11px] font-medium text-indigo-700 shrink-0">In progress</span>
                                ) : (
                                  <button onClick={() => startLearning(student.id, job, m.skill)} className="text-[11px] font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg px-2.5 py-1.5 shrink-0">
                                    Start learning
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="space-y-4">
          {myApplications.map((a) => (
            <div key={a.id} className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-stone-900">{a.job.title}</p>
                <p className="text-sm text-stone-500">{a.job.company} · Applied {a.appliedDate} · {a.matchAtApply}% match</p>
              </div>
              <StatusStepper status={a.status} />
            </div>
          ))}
          {myApplications.length === 0 && <EmptyState icon={FileText} title="No applications yet" message="Browse openings to get started." />}
        </div>
      )}

      {activeTab === 'gap' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <Rocket size={17} className="text-indigo-700" />
              <h3 className="font-semibold text-stone-900" style={{ fontFamily: FONT_HEAD }}>Your skill-gap roadmap</h3>
            </div>
            <p className="text-sm text-stone-500">
              Open a role in "Browse openings" and hit "skills short of 100% match" to start a learning path for anything you're missing. Mark it complete once you've learned it — it's added straight to your profile and every match score recalculates instantly.
            </p>
          </div>
          <div className="space-y-3">
            {myRoadmap.map((item) => (
              <div key={item.id} className={`bg-white border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${item.status === 'done' ? 'border-emerald-200' : 'border-stone-200'}`}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.status === 'done' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-50 text-indigo-700'}`}>
                    {item.status === 'done' ? <CheckCircle2 size={18} /> : <BookOpen size={18} />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-stone-900">{item.skill}</p>
                    <p className="text-sm text-stone-500 truncate">Targeting {item.jobTitle} · {item.resource.title} ({item.resource.platform})</p>
                  </div>
                </div>
                {item.status === 'done' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5 shrink-0">
                    <Zap size={12} /> Skill unlocked
                  </span>
                ) : (
                  <button onClick={() => completeRoadmapItem(item.id)} className="px-4 py-2 rounded-lg bg-indigo-700 text-white text-sm font-medium hover:bg-indigo-800 shrink-0">
                    Mark as completed
                  </button>
                )}
              </div>
            ))}
            {myRoadmap.length === 0 && <EmptyState icon={Rocket} title="No learning paths started yet" message="Browse openings and close a skill gap to see it here." />}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <StudentLeaderboardView student={student} allStudents={allStudents} />
      )}
    </DashboardShell>
  );
}

function StudentLeaderboardView({ student, allStudents }) {
  const collegeRanked = rankStudents(allStudents.filter((s) => s.college === student.college));
  const globalRanked = rankStudents(allStudents);
  const myCollegeRow = collegeRanked.find((r) => r.student.id === student.id);
  const myGlobalRow = globalRanked.find((r) => r.student.id === student.id);
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <StatCard label="Rank in your college" value={myCollegeRow ? `#${myCollegeRow.rank} / ${collegeRanked.length}` : '—'} icon={Trophy} accent="indigo" rail />
        <StatCard label="Rank across all colleges" value={myGlobalRow ? `#${myGlobalRow.rank} / ${globalRanked.length}` : '—'} icon={Star} accent="amber" rail />
      </div>
      <div className="bg-white border border-stone-200 rounded-2xl p-6">
        <h3 className="font-semibold text-stone-900 mb-1" style={{ fontFamily: FONT_HEAD }}>{student.college} leaderboard</h3>
        <p className="text-sm text-stone-500 mb-4">Ranked by skill points — skills, verified certifications, projects, resume and college verification all count.</p>
        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          {collegeRanked.slice(0, 3).map((row) => (
            <div key={row.student.id} className={`rounded-xl p-4 text-center border ${row.student.id === student.id ? 'border-indigo-400 bg-indigo-50' : 'border-stone-200 bg-stone-50'}`}>
              <RankMedal rank={row.rank} />
              <Avatar name={row.student.name} accent="indigo" />
              <p className="text-sm font-semibold text-stone-900 mt-2">{row.student.name}</p>
              <p className="text-xs text-stone-500">{row.points} pts</p>
              <div className="mt-1.5 flex justify-center"><BadgePill badge={row.badge} /></div>
            </div>
          ))}
        </div>
        <div className="divide-y divide-stone-100">
          {collegeRanked.slice(3, 15).map((row) => (
            <div key={row.student.id} className={`flex items-center justify-between gap-3 py-2.5 ${row.student.id === student.id ? 'bg-indigo-50 -mx-2 px-2 rounded-lg' : ''}`}>
              <div className="flex items-center gap-3 min-w-0">
                <RankMedal rank={row.rank} />
                <Avatar name={row.student.name} accent="indigo" small />
                <span className="text-sm font-medium text-stone-800 truncate">{row.student.name}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <BadgePill badge={row.badge} />
                <span className="text-sm font-semibold text-stone-700 w-14 text-right">{row.points} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* College dashboard                                                      */
/* ---------------------------------------------------------------------- */

function CollegeDashboard({ college, students, setStudents, jobs, applications, createStudentAccount, onExit, showToast }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [branchFilter, setBranchFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBranch, setNewBranch] = useState('Computer Science');
  const [newYear, setNewYear] = useState('2nd Year');
  const [lastCreated, setLastCreated] = useState(null);

  function toggleVerify(id) {
    const target = students.find((s) => s.id === id);
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, verified: !s.verified } : s)));
    showToast(target && target.verified ? 'Verification removed' : 'Profile verified');
  }
  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  }

  const branches = ['All', ...new Set(students.map((s) => s.branch))];
  const filteredStudents = students.filter((s) => {
    const matchesBranch = branchFilter === 'All' || s.branch === branchFilter;
    const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
    return matchesBranch && matchesSearch;
  });

  const sortedStudents = useMemo(() => {
    const arr = [...filteredStudents];
    arr.sort((a, b) => {
      let av, bv;
      if (sortKey === 'name') { av = a.name; bv = b.name; }
      else if (sortKey === 'branch') { av = a.branch; bv = b.branch; }
      else if (sortKey === 'skills') { av = a.skills.length; bv = b.skills.length; }
      else { av = a.verified ? 1 : 0; bv = b.verified ? 1 : 0; }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filteredStudents, sortKey, sortDir]);

  const gapRows = useMemo(() => computeSkillGap(students, jobs), [students, jobs]);

  const totalStudents = students.length;
  const verifiedCount = students.filter((s) => s.verified).length;
  const totalApplications = applications.length;
  const placedCount = applications.filter((a) => a.status === 'Selected').length;
  const placementRate = totalStudents ? Math.round((placedCount / totalStudents) * 100) : 0;

  const branchPlacement = useMemo(() => {
    const map = {};
    students.forEach((s) => {
      map[s.branch] = map[s.branch] || { branch: s.branch, total: 0, placed: 0 };
      map[s.branch].total += 1;
    });
    applications.filter((a) => a.status === 'Selected').forEach((a) => {
      const st = students.find((s) => s.id === a.studentId);
      if (st && map[st.branch]) map[st.branch].placed += 1;
    });
    return Object.values(map);
  }, [students, applications]);

  const verifiedPie = [
    { name: 'Verified', value: verifiedCount, color: '#059669' },
    { name: 'Pending', value: totalStudents - verifiedCount, color: '#D97706' },
  ].filter((d) => d.value > 0);

  const recentActivity = useMemo(() => {
    const items = applications
      .filter((a) => a.status !== 'Applied')
      .map((a) => {
        const st = students.find((s) => s.id === a.studentId);
        const job = jobs.find((j) => j.id === a.jobId);
        if (!st || !job) return null;
        return { text: `${st.name} was marked "${a.status}" for ${job.title} at ${job.company}`, date: a.appliedDate, status: a.status };
      })
      .filter(Boolean)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5);
    return items;
  }, [applications, students, jobs]);

  const notifications = recentActivity.map((a) => ({ text: a.text, date: a.date }));
  if (totalStudents - verifiedCount > 0) {
    notifications.unshift({ text: `${totalStudents - verifiedCount} student profile(s) awaiting verification`, date: '' });
  }

  const SortHeader = ({ label, sortField }) => (
    <button onClick={() => toggleSort(sortField)} className="flex items-center gap-1 font-medium hover:text-stone-900">
      {label}
      <ChevronDown size={13} className={`transition-transform ${sortKey === sortField ? 'text-stone-700' : 'text-stone-300'} ${sortKey === sortField && sortDir === 'desc' ? 'rotate-180' : ''}`} />
    </button>
  );

  const ranked = useMemo(() => rankStudents(students), [students]);

  function submitCreateStudent(e) {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) { showToast('Add a name and email first'); return; }
    const account = createStudentAccount(college, { name: newName.trim(), email: newEmail.trim(), branch: newBranch, year: newYear });
    setLastCreated(account);
    setNewName(''); setNewEmail('');
    showToast(`Account created for ${newName.trim()}`);
  }

  return (
    <DashboardShell
      title={college}
      subtitle="College dashboard"
      accent="teal"
      icon={Building2}
      avatarName={college}
      notifications={notifications}
      tabs={[
        { key: 'overview', label: 'Overview', icon: LayoutDashboard },
        { key: 'database', label: 'Student database', icon: Users },
        { key: 'create', label: 'Create student ID', icon: UserPlus },
        { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
        { key: 'skillgap', label: 'Skill-gap report', icon: Target },
        { key: 'placement', label: 'Placement stats', icon: BarChart3 },
      ]}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onExit={onExit}
    >
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-4 gap-4">
            <StatCard label="Total students" value={totalStudents} icon={Users} accent="teal" rail />
            <StatCard label="Verified profiles" value={`${verifiedCount}/${totalStudents}`} icon={ShieldCheck} accent="emerald" rail />
            <StatCard label="Placement rate" value={`${placementRate}%`} icon={TrendingUp} accent="amber" rail />
            <StatCard label="Open industry roles" value={jobs.length} icon={Briefcase} accent="teal" rail />
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <h3 className="font-semibold text-stone-900 mb-4" style={{ fontFamily: FONT_HEAD }}>Profile verification</h3>
              <StatusPie data={verifiedPie} />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-stone-900" style={{ fontFamily: FONT_HEAD }}>Biggest skill gaps</h3>
                <button onClick={() => setActiveTab('skillgap')} className="text-xs font-medium text-teal-700 hover:text-teal-900">Full report</button>
              </div>
              <p className="text-sm text-stone-500 mb-4">Where industry demand is outrunning what students currently list.</p>
              <div className="space-y-3">
                {gapRows.slice(0, 3).map((row) => (
                  <div key={row.skill} className="flex items-center justify-between text-sm border-b border-stone-100 pb-2 last:border-0">
                    <span className="font-medium text-stone-800">{row.skill}</span>
                    <span className="text-amber-700 font-medium">{row.gap} pt gap</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <h3 className="font-semibold text-stone-900 mb-4" style={{ fontFamily: FONT_HEAD }}>Recent activity</h3>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  {a.status === 'Selected' ? <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" /> : a.status === 'Rejected' ? <X size={16} className="text-rose-500 mt-0.5 shrink-0" /> : <Clock size={16} className="text-indigo-600 mt-0.5 shrink-0" />}
                  <div>
                    <p className="text-stone-700">{a.text}</p>
                    <p className="text-xs text-stone-400">{a.date}</p>
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && <EmptyState icon={Clock} title="No activity yet" />}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'database' && (
        <div>
          <div className="flex flex-wrap gap-3 mb-5">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students" className="border border-stone-300 rounded-lg px-3 py-2 text-sm flex-1 min-w-60" />
            <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} className="border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white">
              {branches.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left text-stone-500">
                  <th className="px-5 py-3"><SortHeader label="Student" sortField="name" /></th>
                  <th className="px-5 py-3"><SortHeader label="Branch / year" sortField="branch" /></th>
                  <th className="px-5 py-3"><SortHeader label="Skills" sortField="skills" /></th>
                  <th className="px-5 py-3 font-medium">Resume</th>
                  <th className="px-5 py-3"><SortHeader label="Status" sortField="verified" /></th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.map((s) => (
                  <tr key={s.id} className="border-b border-stone-100 last:border-0">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={s.name} accent="teal" small />
                        <div>
                          <p className="font-medium text-stone-900">{s.name}</p>
                          <p className="text-stone-400">{s.college}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-stone-600 whitespace-nowrap">{s.branch} · {s.year}</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {s.skills.slice(0, 3).map((sk) => <SkillChip key={sk.name} name={sk.name} type={sk.type} size="sm" />)}
                        {s.skills.length > 3 && <span className="text-stone-400 text-xs self-center">+{s.skills.length - 3} more</span>}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      {s.resumeFile ? <CheckCircle2 size={16} className="text-emerald-600" /> : <Circle size={16} className="text-stone-300" />}
                    </td>
                    <td className="px-5 py-3">
                      {s.verified ? (
                        <span className="text-emerald-700 text-xs font-medium bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">Verified</span>
                      ) : (
                        <span className="text-amber-700 text-xs font-medium bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">Pending</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => toggleVerify(s.id)} className="text-xs font-medium text-teal-700 hover:text-teal-900 whitespace-nowrap">
                        {s.verified ? 'Unverify' : 'Verify'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'create' && (
        <div className="grid lg:grid-cols-2 gap-6 max-w-4xl">
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <UserPlus size={17} className="text-teal-700" />
              <h3 className="font-semibold text-stone-900" style={{ fontFamily: FONT_HEAD }}>Create a student login</h3>
            </div>
            <p className="text-sm text-stone-500 mb-4">Onboard a student and we'll generate their login ID and a one-time password to hand over.</p>
            <form onSubmit={submitCreateStudent} className="space-y-3">
              <div>
                <label className="text-sm font-medium text-stone-700">Full name</label>
                <input value={newName} onChange={(e) => setNewName(e.target.value)} className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" placeholder="e.g. Rhea Kapoor" />
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700">Email</label>
                <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" placeholder="rhea@college.edu" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-stone-700">Branch</label>
                  <select value={newBranch} onChange={(e) => setNewBranch(e.target.value)} className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white">
                    {['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Electrical', 'Civil'].map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-stone-700">Year</label>
                  <select value={newYear} onChange={(e) => setNewYear(e.target.value)} className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white">
                    {['1st Year', '2nd Year', '3rd Year', 'Final Year'].map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full px-4 py-2.5 rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 flex items-center justify-center gap-2">
                <UserPlus size={15} /> Create student & generate login
              </button>
            </form>
          </div>
          <div>
            {lastCreated ? (
              <div className="space-y-3">
                <CredentialCard label="New student account" sub="Share these with the student securely — they'll use this to log in." loginId={lastCreated.loginId} password={lastCreated.password} />
                <p className="text-xs text-stone-400">The student can now sign in from the landing page using "Enter as Student" with the ID and password above. Their profile starts unverified — verify it from the Student database tab once they've filled it in.</p>
              </div>
            ) : (
              <EmptyState icon={UserPlus} title="No account created yet" message="Fill the form to generate a student's first login." />
            )}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <Trophy size={17} className="text-teal-700" />
              <h3 className="font-semibold text-stone-900" style={{ fontFamily: FONT_HEAD }}>{college} student leaderboard</h3>
            </div>
            <p className="text-sm text-stone-500 mb-5">Ranked by skill points — technical & soft skills, certifications, projects, resume, and verification. Recruiters use this to spot your best-fit talent.</p>
            <div className="grid sm:grid-cols-3 gap-3 mb-5">
              {ranked.slice(0, 3).map((row) => (
                <div key={row.student.id} className="rounded-xl p-4 text-center border border-stone-200 bg-stone-50">
                  <RankMedal rank={row.rank} />
                  <Avatar name={row.student.name} accent="teal" />
                  <p className="text-sm font-semibold text-stone-900 mt-2">{row.student.name}</p>
                  <p className="text-xs text-stone-500">{row.student.branch}</p>
                  <p className="text-xs text-stone-500">{row.points} pts</p>
                  <div className="mt-1.5 flex justify-center"><BadgePill badge={row.badge} /></div>
                </div>
              ))}
            </div>
            <div className="divide-y divide-stone-100">
              {ranked.slice(3).map((row) => (
                <div key={row.student.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <RankMedal rank={row.rank} />
                    <Avatar name={row.student.name} accent="teal" small />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-stone-800 truncate">{row.student.name}</p>
                      <p className="text-xs text-stone-400">{row.student.branch} · {row.student.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {row.student.verified && <ShieldCheck size={14} className="text-emerald-600" />}
                    <BadgePill badge={row.badge} />
                    <span className="text-sm font-semibold text-stone-700 w-14 text-right">{row.points} pts</span>
                  </div>
                </div>
              ))}
              {ranked.length === 0 && <EmptyState icon={Trophy} title="No students yet" />}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'skillgap' && (
        <div>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <StatCard label="Skills tracked" value={gapRows.length} icon={Target} accent="teal" />
            <StatCard label="Biggest gap" value={gapRows[0] ? gapRows[0].skill : '—'} sub={gapRows[0] ? `${gapRows[0].gap} point gap` : ''} icon={TrendingUp} accent="amber" />
            <StatCard label="Students profiled" value={totalStudents} icon={Users} accent="indigo" />
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-stone-900 mb-1" style={{ fontFamily: FONT_HEAD }}>Industry demand vs student supply</h3>
            <p className="text-sm text-stone-500 mb-4">Demand is each skill's share of requirements across posted openings. Supply is the percentage of students who list that skill.</p>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={gapRows.slice(0, 8)} margin={{ left: 0, right: 10, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                <XAxis dataKey="skill" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} unit="%" />
                <Tooltip />
                <Legend />
                <Bar dataKey="demand" name="Industry demand" fill="#0F766E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="supply" name="Student supply" fill="#D97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen size={16} className="text-teal-700" />
              <h3 className="font-semibold text-stone-900" style={{ fontFamily: FONT_HEAD }}>Recommended training for the biggest gaps</h3>
            </div>
            <p className="text-sm text-stone-500 mb-4">Suggested add-on modules the training cell could run this semester.</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {gapRows.slice(0, 3).map((row) => {
                const res = resourceFor(row.skill);
                return (
                  <div key={row.skill} className="border border-stone-200 rounded-xl p-4">
                    <p className="font-semibold text-stone-900">{row.skill}</p>
                    <p className="text-sm text-stone-500 mt-1">{row.demand}% of demand, only {row.supply}% of students have it</p>
                    <div className="mt-3 pt-3 border-t border-stone-100">
                      <p className="text-sm text-stone-700">{res.title}</p>
                      <p className="text-xs text-stone-400">{res.platform}</p>
                    </div>
                    <button onClick={() => showToast(`Students notified about ${row.skill} training`)} className="mt-3 w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-medium hover:bg-stone-50">
                      Notify eligible students
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'placement' && (
        <div>
          <div className="grid sm:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total students" value={totalStudents} icon={Users} accent="indigo" />
            <StatCard label="Verified profiles" value={`${verifiedCount}/${totalStudents}`} icon={ShieldCheck} accent="emerald" />
            <StatCard label="Applications sent" value={totalApplications} icon={FileText} accent="teal" />
            <StatCard label="Placement rate" value={`${placementRate}%`} icon={TrendingUp} accent="amber" />
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <h3 className="font-semibold text-stone-900 mb-4" style={{ fontFamily: FONT_HEAD }}>Placements by branch</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={branchPlacement}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                  <XAxis dataKey="branch" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="total" name="Total students" fill="#E7E5E4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="placed" name="Placed" fill="#0F766E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <h3 className="font-semibold text-stone-900 mb-4" style={{ fontFamily: FONT_HEAD }}>Placement trend (mock, last 6 months)</h3>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={PLACEMENT_TREND}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="placed" stroke="#D97706" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

/* ---------------------------------------------------------------------- */
/* Industry dashboard                                                     */
/* ---------------------------------------------------------------------- */

function IndustryDashboard({ company, jobs, setJobs, students, applications, setApplications, onExit, showToast }) {
  const activeCompany = company;
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedJobId, setSelectedJobId] = useState(jobs.find((j) => j.company === company)?.id || null);
  const [expanded, setExpanded] = useState({});

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Internship');
  const [location, setLocation] = useState('');
  const [pay, setPay] = useState('');
  const [description, setDescription] = useState('');
  const [reqSkill, setReqSkill] = useState(TECH_SKILLS[0]);
  const [reqWeight, setReqWeight] = useState(2);
  const [requiredSkills, setRequiredSkills] = useState([]);

  function addRequiredSkill() {
    if (requiredSkills.some((r) => r.skill === reqSkill)) { showToast('Already added'); return; }
    setRequiredSkills((prev) => [...prev, { skill: reqSkill, weight: reqWeight }]);
  }
  function removeRequiredSkill(skill) {
    setRequiredSkills((prev) => prev.filter((r) => r.skill !== skill));
  }
  function postJob() {
    if (!title.trim() || requiredSkills.length === 0) { showToast('Add a title and at least one required skill'); return; }
    const newJob = {
      id: `job-${Date.now()}`, company: activeCompany, title, type,
      location: location || 'Remote', pay: pay || 'Not disclosed',
      description: description || 'No description provided.', requiredSkills,
      postedDate: new Date().toISOString().slice(0, 10),
    };
    setJobs((prev) => [newJob, ...prev]);
    setTitle(''); setLocation(''); setPay(''); setDescription(''); setRequiredSkills([]);
    showToast('Opening posted');
    setSelectedJobId(newJob.id);
    setActiveTab('manage');
  }

  const myJobs = jobs.filter((j) => j.company === activeCompany);
  const myJobIds = new Set(myJobs.map((j) => j.id));
  function applicantCount(jobId) { return applications.filter((a) => a.jobId === jobId).length; }

  const selectedJob = jobs.find((j) => j.id === selectedJobId);
  const ranked = selectedJob
    ? students.map((s) => ({ student: s, ...calcMatch(s.skills.map((sk) => sk.name), selectedJob) })).sort((a, b) => b.score - a.score)
    : [];

  function setStatus(student, status) {
    const existing = applications.find((a) => a.studentId === student.id && a.jobId === selectedJob.id);
    if (status === 'Not applied') {
      if (existing) setApplications((prev) => prev.filter((a) => a.id !== existing.id));
      showToast(`${student.name} removed from the pipeline`);
      return;
    }
    if (existing) {
      setApplications((prev) => prev.map((a) => (a.id === existing.id ? { ...a, status } : a)));
    } else {
      const { score } = calcMatch(student.skills.map((sk) => sk.name), selectedJob);
      setApplications((prev) => [...prev, { id: `app-${Date.now()}`, studentId: student.id, jobId: selectedJob.id, status, appliedDate: new Date().toISOString().slice(0, 10), matchAtApply: score }]);
    }
    showToast(`${student.name} moved to ${status}`);
  }

  const companyApplications = applications.filter((a) => myJobIds.has(a.jobId));
  const inPipeline = companyApplications.filter((a) => a.status === 'Shortlisted' || a.status === 'Interview').length;
  const avgMatch = companyApplications.length
    ? Math.round(companyApplications.reduce((sum, a) => sum + a.matchAtApply, 0) / companyApplications.length)
    : null;

  const topCandidates = useMemo(() => {
    const best = {};
    myJobs.forEach((job) => {
      students.forEach((s) => {
        const { score } = calcMatch(s.skills.map((sk) => sk.name), job);
        if (!best[s.id] || score > best[s.id].score) {
          best[s.id] = { student: s, score, job };
        }
      });
    });
    return Object.values(best).sort((a, b) => b.score - a.score).slice(0, 5);
  }, [myJobs, students]);

  const notifications = applications
    .filter((a) => myJobIds.has(a.jobId))
    .map((a) => {
      const st = students.find((s) => s.id === a.studentId);
      const job = jobs.find((j) => j.id === a.jobId);
      if (!st || !job) return null;
      return { text: `${st.name} applied to ${job.title}`, date: a.appliedDate };
    })
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  function toggleExpand(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function smartShortlist() {
    if (!selectedJob) return;
    const candidates = ranked.filter((r) => r.score >= 60).slice(0, 3);
    if (candidates.length === 0) { showToast('No candidates score 60%+ yet for this role'); return; }
    candidates.forEach((c) => setStatus(c.student, 'Shortlisted'));
    showToast(`Top ${candidates.length} best-fit candidates auto-shortlisted`);
  }

  const collegeIndex = useMemo(() => {
    const byCollege = {};
    students.forEach((s) => {
      byCollege[s.college] = byCollege[s.college] || { college: s.college, students: [] };
      byCollege[s.college].students.push(s);
    });
    return Object.values(byCollege).map((c) => {
      const avgPoints = Math.round(c.students.reduce((sum, s) => sum + computePoints(s), 0) / c.students.length);
      const collegeApps = applications.filter((a) => myJobIds.has(a.jobId) && c.students.some((s) => s.id === a.studentId));
      const placed = collegeApps.filter((a) => a.status === 'Selected').length;
      const avgBestMatch = Math.round(
        c.students.reduce((sum, s) => sum + Math.max(0, ...myJobs.map((j) => calcMatch(s.skills.map((sk) => sk.name), j).score), 0), 0) / c.students.length
      );
      return { college: c.college, count: c.students.length, avgPoints, placed, avgBestMatch };
    }).sort((a, b) => b.avgPoints - a.avgPoints);
  }, [students, applications, myJobIds, myJobs]);

  return (
    <DashboardShell
      title={activeCompany}
      subtitle="Industry dashboard"
      accent="amber"
      icon={Briefcase}
      avatarName={activeCompany}
      notifications={notifications}
      tabs={[
        { key: 'overview', label: 'Overview', icon: LayoutDashboard },
        { key: 'post', label: 'Post an opening', icon: Plus },
        { key: 'manage', label: 'My postings', icon: Briefcase },
        { key: 'matches', label: 'Matched candidates', icon: Sparkles },
        { key: 'leaderboard', label: 'Talent leaderboard', icon: Trophy },
      ]}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onExit={onExit}
    >

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-4 gap-4">
            <StatCard label="Open roles" value={myJobs.length} icon={Briefcase} accent="amber" rail />
            <StatCard label="Total applicants" value={companyApplications.length} icon={Users} accent="amber" rail />
            <StatCard label="In pipeline" value={inPipeline} icon={Clock} accent="amber" rail />
            <StatCard label="Average fit score" value={avgMatch !== null ? `${avgMatch}%` : '—'} icon={Target} accent="amber" rail />
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <h3 className="font-semibold text-stone-900 mb-4" style={{ fontFamily: FONT_HEAD }}>Applicant pipeline</h3>
              <StatusPie data={statusBreakdown(companyApplications)} />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <h3 className="font-semibold text-stone-900 mb-1" style={{ fontFamily: FONT_HEAD }}>Top candidates across your open roles</h3>
              <p className="text-sm text-stone-500 mb-4">Best-fit student for each posting, ranked by match score.</p>
              <div className="space-y-3">
                {topCandidates.map(({ student, score, job }) => (
                  <div key={student.id} className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Avatar name={student.name} accent="amber" small />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-stone-900 truncate">{student.name}</p>
                        <p className="text-xs text-stone-400 truncate">{job.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-semibold text-amber-700">{score}%</span>
                      <button onClick={() => { setSelectedJobId(job.id); setActiveTab('matches'); }} className="text-xs font-medium text-stone-500 hover:text-stone-800">View</button>
                    </div>
                  </div>
                ))}
                {topCandidates.length === 0 && <EmptyState icon={Sparkles} title="Post a role to see matches" />}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'post' && (
        <div className="max-w-2xl">
          <p className="text-sm text-stone-500 mb-3">Posting as <span className="font-medium text-stone-700">{activeCompany}</span>.</p>
          <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-stone-700">Role title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Frontend Engineering Intern" className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white">
                  <option>Internship</option>
                  <option>Job</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700">Location</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Bengaluru (Hybrid)" className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700">Stipend / salary</label>
                <input value={pay} onChange={(e) => setPay(e.target.value)} placeholder="e.g. ₹15,000/month" className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="What will they work on?" className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700">Required skills</label>
              <p className="text-xs text-stone-400 mb-2">Mark each as must-have or good-to-have. Must-haves count double in the match score.</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {requiredSkills.map((r) => (
                  <span key={r.skill} className="inline-flex items-center gap-1 text-xs font-medium border rounded-full px-2.5 py-1 border-stone-300 text-stone-700">
                    {r.skill} <span className="text-stone-400">· {r.weight === 2 ? 'must-have' : 'good-to-have'}</span>
                    <button onClick={() => removeRequiredSkill(r.skill)} className="ml-0.5 text-stone-400 hover:text-rose-500"><X size={12} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <select value={reqSkill} onChange={(e) => setReqSkill(e.target.value)} className="flex-1 border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white">
                  <optgroup label="Technical">{TECH_SKILLS.map((s) => <option key={s} value={s}>{s}</option>)}</optgroup>
                  <optgroup label="Soft skills">{SOFT_SKILLS.map((s) => <option key={s} value={s}>{s}</option>)}</optgroup>
                </select>
                <select value={reqWeight} onChange={(e) => setReqWeight(Number(e.target.value))} className="border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white">
                  <option value={2}>Must-have</option>
                  <option value={1}>Good-to-have</option>
                </select>
                <button onClick={addRequiredSkill} className="px-4 py-2 rounded-lg border border-stone-300 text-sm font-medium hover:bg-stone-50">Add</button>
              </div>
            </div>
            <button onClick={postJob} className="w-full px-4 py-2.5 rounded-lg bg-amber-600 text-white text-sm font-medium hover:bg-amber-700">Post opening</button>
          </div>
        </div>
      )}

      {activeTab === 'manage' && (
        <div className="space-y-4">
          {myJobs.map((job) => (
            <div key={job.id} className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-stone-900">{job.title}</p>
                <p className="text-sm text-stone-500">{job.location} · {job.type} · Posted {job.postedDate}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {job.requiredSkills.map((r) => <SkillChip key={r.skill} name={r.skill} type={skillType(r.skill)} size="sm" />)}
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="text-xl font-semibold text-stone-900" style={{ fontFamily: FONT_HEAD }}>{applicantCount(job.id)}</p>
                  <p className="text-xs text-stone-400">applicants</p>
                </div>
                <button
                  onClick={() => { setSelectedJobId(job.id); setActiveTab('matches'); }}
                  className="px-4 py-2 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-800"
                >
                  View matches
                </button>
              </div>
            </div>
          ))}
          {myJobs.length === 0 && <EmptyState icon={Briefcase} title="No openings posted yet" message={`Post your first role as ${activeCompany}.`} />}
        </div>
      )}

      {activeTab === 'matches' && (
        <div>
          {myJobs.length === 0 ? (
            <EmptyState icon={Sparkles} title="No openings to match against" message={`Post a role as ${activeCompany} first.`} />
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <label className="text-sm font-medium text-stone-700">Ranking candidates for</label>
                <select value={selectedJobId || ''} onChange={(e) => setSelectedJobId(e.target.value)} className="border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white">
                  {myJobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
                </select>
                <button onClick={smartShortlist} className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg px-3.5 py-2">
                  <Sparkles size={14} /> Smart shortlist top 3
                </button>
              </div>
              <div className="space-y-3">
                {ranked.map(({ student, score, matched, missing }) => {
                  const currentStatus = applications.find((a) => a.studentId === student.id && a.jobId === selectedJob.id)?.status || 'Not applied';
                  const isExpanded = !!expanded[student.id];
                  const pts = computePoints(student);
                  const badge = computeBadge(pts);
                  return (
                    <div key={student.id} className="bg-white border border-stone-200 rounded-2xl p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <Avatar name={student.name} accent="amber" small />
                            <p className="font-semibold text-stone-900">{student.name}</p>
                            {student.verified && <ShieldCheck size={14} className="text-emerald-600" />}
                            <BadgePill badge={badge} />
                            <span className="text-xs text-stone-400">{pts} pts</span>
                          </div>
                          <p className="text-sm text-stone-500 mt-1">{student.branch} · {student.year} · {student.college}</p>
                          <div className="mt-3 max-w-sm">
                            <MatchMeter score={score} />
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {matched.map((m) => <SkillChip key={m.skill} name={m.skill} type={skillType(m.skill)} filled size="sm" />)}
                            {missing.map((m) => <SkillChip key={m.skill} name={m.skill} type={skillType(m.skill)} size="sm" />)}
                          </div>
                          <button onClick={() => toggleExpand(student.id)} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-stone-800">
                            {isExpanded ? 'Hide comparison' : 'Compare fit'}
                            <ChevronDown size={13} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                          {isExpanded && (
                            <div className="mt-3 border-t border-stone-100 pt-3">
                              <CandidateRadar job={selectedJob} student={student} />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 w-full sm:w-44">
                          <button onClick={() => setStatus(student, 'Selected')} className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 flex items-center gap-1.5 justify-center">
                            <CheckCircle2 size={14} /> Hire
                          </button>
                          <select value={currentStatus} onChange={(e) => setStatus(student, e.target.value)} className="border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white">
                            {STAGE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <button onClick={() => showToast(`Message sent to ${student.name}`)} className="px-4 py-2 rounded-lg border border-stone-300 text-sm font-medium hover:bg-stone-50 flex items-center gap-1 justify-center">
                            <Mail size={14} /> Message
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <Trophy size={17} className="text-amber-600" />
              <h3 className="font-semibold text-stone-900" style={{ fontFamily: FONT_HEAD }}>Top talent on the platform</h3>
            </div>
            <p className="text-sm text-stone-500 mb-5">Every student, ranked by skill points, so you know who to reach out to regardless of who's applied yet.</p>
            <div className="divide-y divide-stone-100">
              {rankStudents(students).slice(0, 10).map((row) => (
                <div key={row.student.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <RankMedal rank={row.rank} />
                    <Avatar name={row.student.name} accent="amber" small />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-stone-800 truncate">{row.student.name}</p>
                      <p className="text-xs text-stone-400 truncate">{row.student.branch} · {row.student.college}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {row.student.verified && <ShieldCheck size={14} className="text-emerald-600" />}
                    <BadgePill badge={row.badge} />
                    <span className="text-sm font-semibold text-stone-700 w-14 text-right">{row.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={17} className="text-amber-600" />
              <h3 className="font-semibold text-stone-900" style={{ fontFamily: FONT_HEAD }}>College performance index</h3>
            </div>
            <p className="text-sm text-stone-500 mb-5">Which colleges are producing your best-fit hires — useful for planning campus drives.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-stone-400 border-b border-stone-100">
                    <th className="pb-2 font-medium">College</th>
                    <th className="pb-2 font-medium">Students</th>
                    <th className="pb-2 font-medium">Avg. skill points</th>
                    <th className="pb-2 font-medium">Avg. fit for your roles</th>
                    <th className="pb-2 font-medium">Hired by you</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {collegeIndex.map((c, i) => (
                    <tr key={c.college}>
                      <td className="py-2.5 font-medium text-stone-800 flex items-center gap-2"><RankMedal rank={i + 1} /> {c.college}</td>
                      <td className="py-2.5 text-stone-600">{c.count}</td>
                      <td className="py-2.5 text-stone-600">{c.avgPoints} pts</td>
                      <td className="py-2.5"><div className="max-w-[120px]"><MatchMeter score={c.avgBestMatch} showLabel={false} /></div></td>
                      <td className="py-2.5 text-stone-600">{c.placed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

/* ---------------------------------------------------------------------- */
/* App                                                                    */
/* ---------------------------------------------------------------------- */

export default function App() {
  const [page, setPage] = useState('landing');
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [studentAccounts, setStudentAccounts] = useState(() => buildInitialStudentAccounts(INITIAL_STUDENTS));
  const [collegeAccounts] = useState(() => buildInitialCollegeAccounts(INITIAL_STUDENTS));
  const [companyAccounts] = useState(() => buildInitialCompanyAccounts(COMPANIES));
  const [roadmap, setRoadmap] = useState([]);
  const [loggedInStudentId, setLoggedInStudentId] = useState(null);
  const [loggedInCollege, setLoggedInCollege] = useState(null);
  const [loggedInCompany, setLoggedInCompany] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [toast, setToast] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function goTo(page) { setLoginError(null); setPage(page); }

  const currentStudent = students.find((s) => s.id === loggedInStudentId);
  function updateStudent(updated) {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  }

  function loginStudent(loginId, password) {
    const account = studentAccounts.find((a) => a.loginId.toLowerCase() === loginId.toLowerCase() && a.password.toLowerCase() === password.toLowerCase());
    if (!account) { setLoginError('That login ID and password combination was not found.'); return; }
    setLoggedInStudentId(account.studentId);
    setLoginError(null);
    setPage('student');
    showToast(`Welcome back, ${students.find((s) => s.id === account.studentId)?.name || 'student'}!`);
  }
  function loginCollege(username, password) {
    const account = collegeAccounts.find((a) => a.username.toLowerCase() === username.toLowerCase() && a.password.toLowerCase() === password.toLowerCase());
    if (!account) { setLoginError('That username and password combination was not found.'); return; }
    setLoggedInCollege(account.college);
    setLoginError(null);
    setPage('college');
    showToast(`Signed in as ${account.college}`);
  }
  function loginCompany(username, password) {
    const account = companyAccounts.find((a) => a.username.toLowerCase() === username.toLowerCase() && a.password.toLowerCase() === password.toLowerCase());
    if (!account) { setLoginError('That username and password combination was not found.'); return; }
    setLoggedInCompany(account.company);
    setLoginError(null);
    setPage('industry');
    showToast(`Signed in as ${account.company}`);
  }
  function logout() {
    setLoggedInStudentId(null); setLoggedInCollege(null); setLoggedInCompany(null);
    goTo('landing');
  }

  function createStudentAccount(college, { name, email, branch, year }) {
    const id = `stu-${Date.now()}`;
    const newStudent = { id, name, email, college, branch, year, skills: [], resumeFile: null, certifications: [], projects: [], verified: false };
    setStudents((prev) => [...prev, newStudent]);
    const code = collegeCode(college);
    const countForCollege = studentAccounts.filter((a) => a.college === college).length + 1;
    const account = { loginId: `${code}-${String(countForCollege).padStart(3, '0')}`, password: randomPassword(), studentId: id, college };
    setStudentAccounts((prev) => [...prev, account]);
    return account;
  }

  function startLearning(studentId, job, skill) {
    setRoadmap((prev) => {
      if (prev.some((r) => r.studentId === studentId && r.jobId === job.id && r.skill === skill)) return prev;
      return [...prev, { id: `road-${Date.now()}-${skill}`, studentId, jobId: job.id, jobTitle: job.title, skill, resource: resourceFor(skill), status: 'in-progress' }];
    });
    showToast(`Learning path started for ${skill}`);
  }
  function completeRoadmapItem(itemId) {
    const item = roadmap.find((r) => r.id === itemId);
    if (!item) return;
    setRoadmap((prev) => prev.map((r) => (r.id === itemId ? { ...r, status: 'done' } : r)));
    const student = students.find((s) => s.id === item.studentId);
    if (student && !student.skills.some((s) => s.name === item.skill)) {
      updateStudent({ ...student, skills: [...student.skills, { name: item.skill, type: skillType(item.skill) }] });
    }
    showToast(`🎉 Skill unlocked: ${item.skill} — your match scores just went up!`);
  }

  const studentHint = (
    <>
      {studentAccounts.slice(0, 3).map((a) => {
        const st = students.find((s) => s.id === a.studentId);
        return <p key={a.loginId} className="font-mono">{a.loginId} / {a.password} <span className="font-sans text-stone-400">— {st?.name}</span></p>;
      })}
    </>
  );
  const collegeHint = (
    <>
      {collegeAccounts.slice(0, 4).map((a) => (
        <p key={a.username} className="font-mono">{a.username} / {a.password} <span className="font-sans text-stone-400">— {a.college}</span></p>
      ))}
      <p className="text-stone-400 mt-1">(same pattern for every onboarded college)</p>
    </>
  );
  const companyHint = (
    <>
      {companyAccounts.slice(0, 4).map((a) => (
        <p key={a.username} className="font-mono">{a.username} / {a.password} <span className="font-sans text-stone-400">— {a.company}</span></p>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900" style={{ fontFamily: FONT_BODY }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');`}</style>
      {toast && <ToastEl message={toast} />}

      {page === 'landing' && <Landing onSelect={(role) => goTo(`${role}-login`)} students={students} jobs={jobs} />}

      {page === 'student-login' && (
        <LoginScreen roleLabel="Student" icon={GraduationCap} accent="indigo" idLabel="Login ID (from your college)" onBack={() => goTo('landing')} onSubmit={loginStudent} error={loginError} hint={studentHint} />
      )}
      {page === 'college-login' && (
        <LoginScreen roleLabel="College" icon={Building2} accent="teal" idLabel="Username" onBack={() => goTo('landing')} onSubmit={loginCollege} error={loginError} hint={collegeHint} />
      )}
      {page === 'industry-login' && (
        <LoginScreen roleLabel="Industry" icon={Briefcase} accent="amber" idLabel="Recruiter username" onBack={() => goTo('landing')} onSubmit={loginCompany} error={loginError} hint={companyHint} />
      )}

      {page === 'student' && currentStudent && (
        <StudentDashboard
          student={currentStudent}
          updateStudent={updateStudent}
          jobs={jobs}
          applications={applications}
          setApplications={setApplications}
          allStudents={students}
          roadmap={roadmap}
          startLearning={startLearning}
          completeRoadmapItem={completeRoadmapItem}
          onExit={logout}
          showToast={showToast}
        />
      )}

      {page === 'college' && loggedInCollege && (
        <CollegeDashboard
          college={loggedInCollege}
          students={students.filter((s) => s.college === loggedInCollege)}
          setStudents={setStudents}
          createStudentAccount={createStudentAccount}
          jobs={jobs}
          applications={applications}
          onExit={logout}
          showToast={showToast}
        />
      )}

      {page === 'industry' && loggedInCompany && (
        <IndustryDashboard
          company={loggedInCompany}
          jobs={jobs}
          setJobs={setJobs}
          students={students}
          applications={applications}
          setApplications={setApplications}
          onExit={logout}
          showToast={showToast}
        />
      )}
    </div>
  );
}
