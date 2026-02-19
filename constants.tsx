
import React from 'react';
import { User, Headphones, ShieldCheck, BarChart2 } from 'lucide-react';
import { Persona } from './types';

export const PERSONAS: Persona[] = [
  {
    id: 'end-user',
    label: 'MOST USERS',
    accent: '#5B4FE8',
    count: '25,000+ users',
    icon: <User size={20} />,
    name: 'End User',
    subtitle: 'Employee Self-Service',
    description: 'AI-powered conversational support — chat with our intelligent assistant to troubleshoot issues, create tickets, and track resolutions.',
    route: '/persona/end-user',
  },
  {
    id: 'l1-agent',
    label: 'HIGH VOLUME',
    accent: '#7C3AED',
    count: '150+ users',
    icon: <Headphones size={20} />,
    name: 'L1 Support Agent',
    subtitle: 'First-Line Triage',
    description: 'AI-powered ticket queue, smart classification, KB suggestions, and auto-resolution workflows.',
    route: '/persona/l1-agent',
  },
  {
    id: 'l2-agent',
    label: 'EXPERT TIER',
    accent: '#EA580C',
    count: '50+ users',
    icon: <ShieldCheck size={20} />,
    name: 'L2/L3 Specialist',
    subtitle: 'Deep Troubleshooting',
    description: 'Escalation workspace with full context, root-cause analysis, collaboration tools, and change management.',
    route: '/persona/l2-agent',
  },
  {
    id: 'it-manager',
    label: 'DECISION MAKER',
    accent: '#059669',
    count: '20+ users',
    icon: <BarChart2 size={20} />,
    name: 'IT Manager',
    subtitle: 'Command Center & Knowledge Hub',
    description: 'Predictive SLA, team performance, recurring patterns, strategic insights, and full knowledge base management studio.',
    route: '/persona/it-manager',
  },
];
