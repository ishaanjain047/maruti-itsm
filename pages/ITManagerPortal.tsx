
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  BarChart2, 
  LayoutDashboard, 
  BookOpen, 
  TicketCheck, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  Flame,
  Users,
  RefreshCw,
  Star,
  Eye,
  TrendingDown,
  Hammer,
  TrendingUp as TrendingUpIcon,
  Plus,
  Search,
  ChevronDown,
  FileText,
  X,
  User,
  Wand2,
  Edit,
  ThumbsUp,
  Loader2,
  Calendar,
  LayoutList,
  LayoutGrid,
  ArrowUpRight,
  Send,
  Lock,
  Paperclip,
  Bot,
  Sparkles,
  Settings,
  Link2,
  UserCheck,
  Lightbulb,
  ArrowRight,
  XCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

// --- Data Constants ---

const VOLUME_DATA = [
  { time: '06', volume: 8, resolved: 6 },
  { time: '07', volume: 30, resolved: 22 },
  { time: '08', volume: 55, resolved: 40 },
  { time: '09', volume: 140, resolved: 82 },
  { time: '10', volume: 95, resolved: 75 },
  { time: '11', volume: 85, resolved: 75 },
  { time: '12', volume: 45, resolved: 38 },
];

const CATEGORY_CHART_DATA = [
  { name: 'Application', value: 35, color: '#6366F1' },
  { name: 'Network', value: 25, color: '#06B6D4' },
  { name: 'Hardware', value: 20, color: '#F59E0B' },
  { name: 'Email', value: 12, color: '#10B981' },
  { name: 'Infra', value: 8, color: '#EF4444' },
];

const AGENT_DATA = [
  { name: 'Amit Sharma', initial: 'AS', color: '#6366F1', resolved: 18, avg: '22 min', fcr: 85, status: 'online' },
  { name: 'Priya Mehta', initial: 'PM', color: '#7C3AED', resolved: 15, avg: '28 min', fcr: 78, status: 'online' },
  { name: 'Deepak Rao', initial: 'DR', color: '#059669', resolved: 14, avg: '19 min', fcr: 92, status: 'online' },
  { name: 'Suresh K.', initial: 'SK', color: '#EA580C', resolved: 12, avg: '35 min', fcr: 65, status: 'busy' },
  { name: 'Vikram Singh', initial: 'VS', color: '#DC2626', resolved: 10, avg: '45 min', fcr: 60, status: 'offline' },
];

const KEYWORDS = [
  { t: "SAP", c: "#6366F1", s: "20px" },
  { t: "VPN", c: "#06B6D4", s: "18px" },
  { t: "Login", c: "#F59E0B", s: "17px" },
  { t: "Password", c: "#10B981", s: "16px" },
  { t: "Crash", c: "#EF4444", s: "16px" },
  { t: "Network", c: "#6366F1", s: "15px" },
  { t: "Printer", c: "#7C3AED", s: "14px" },
  { t: "Outlook", c: "#059669", s: "14px" },
  { t: "Error 500", c: "#DC2626", s: "14px" },
  { t: "Timeout", c: "#D97706", s: "13px" },
  { t: "Mobile", c: "#2563EB", s: "13px" },
  { t: "Email", c: "#059669", s: "13px" },
  { t: "Batch Job", c: "#7C3AED", s: "12px" },
  { t: "Sync", c: "#6B7280", s: "12px" },
  { t: "Access", c: "#2563EB", s: "12px" },
  { t: "Laptop", c: "#D97706", s: "12px" },
  { t: "Wi-Fi", c: "#06B6D4", s: "12px" },
  { t: "License", c: "#EF4444", s: "12px" },
];

const KB_ARTICLES = [
  { id: 'KB-2041', title: 'VPN Configuration for Remote Workers', category: 'Network', status: 'Published', views: 892, helpful: '88%', updated: '2 days ago' },
  { id: 'KB-2089', title: 'SAP Error 500 — Auth Service Restart', category: 'Application', status: 'Published', views: 756, helpful: '91%', updated: '1 week ago' },
  { id: 'KB-1923', title: 'Outlook Mobile Sync Troubleshooting', category: 'Email', status: 'Review', views: 623, helpful: '85%', updated: '2 weeks ago' },
  { id: 'KB-2104', title: 'AD Password Reset — Self Service Guide', category: 'Security', status: 'Published', views: 1240, helpful: '94%', updated: '1 day ago' },
  { id: 'KB-1782', title: 'Printer Setup — Floor-by-Floor Guide', category: 'Hardware', status: 'Stale', views: 234, helpful: '62%', updated: '3 months ago' },
  { id: 'KB-2090', title: 'ERP Module Access Request — Finance', category: 'Application', status: 'Published', views: 445, helpful: '79%', updated: '5 days ago' },
  { id: 'KB-1954', title: 'Wi-Fi Troubleshooting — Conference Rooms', category: 'Network', status: 'Published', views: 312, helpful: '71%', updated: '3 weeks ago' },
  { id: 'KB-1845', title: 'Laptop Freezing During Video Calls', category: 'Hardware', status: 'Review', views: 567, helpful: '83%', updated: '1 month ago' },
  { id: 'KB-2089-B', title: 'SAP Batch Scheduler — Memory Leak Fix', category: 'Application', status: 'Published', views: 890, helpful: '92%', updated: '3 days ago' },
  { id: 'KB-2110', title: 'VPN Split Tunneling Configuration', category: 'Network', status: 'Draft', views: 134, helpful: '0%', updated: 'Today' },
  { id: 'KB-1924', title: 'Email Attachment Size Limit Policy', category: 'Email', status: 'Published', views: 678, helpful: '76%', updated: '2 weeks ago' },
  { id: 'KB-1801', title: 'SSL Certificate Renewal Procedure', category: 'Security', status: 'Published', views: 345, helpful: '88%', updated: '2 months ago' },
];

const REQUESTED_KB = [
  { id: 'KBR-101', title: 'SAP Module Crash — Memory Leak Fix', category: 'Application', requester: 'Amit Sharma (L1)', time: '2 hours ago', source: 'INC-4525' },
  { id: 'KBR-102', title: 'VPN Reconnect Steps for Manesar Network', category: 'Network', requester: 'Priya Mehta (L1)', time: '4 hours ago', source: 'INC-4524' },
  { id: 'KBR-103', title: 'Outlook CalDAV Sync — Mobile Fix', category: 'Email', requester: 'Deepak Rao (L2)', time: '1 day ago', source: 'INC-4401' },
];

// --- Vendor Management Data ---

const VENDOR_PORTFOLIO_DATA = [
  { 
    name: 'Tech Mahindra DB', 
    short: 'Tech',
    category: 'Database', 
    tier: 'Standard', 
    ola: 94, 
    frt: 0.6, 
    res: 2.8, 
    slaBreach: 6, 
    olaBreach: 5, 
    reopen: 3, 
    escalation: 4, 
    status: 'Excellent',
    dot: '#10B981'
  },
  { 
    name: 'HCL Hardware', 
    short: 'HCL',
    category: 'Hardware', 
    tier: 'Preferred', 
    ola: 88, 
    frt: 0.9, 
    res: 3.2, 
    slaBreach: 12, 
    olaBreach: 10, 
    reopen: 5, 
    escalation: 6, 
    status: 'On Track',
    dot: '#10B981'
  },
  { 
    name: 'Wipro Security', 
    short: 'Wipro',
    category: 'Security', 
    tier: 'Preferred', 
    ola: 82, 
    frt: 1.1, 
    res: 4.8, 
    slaBreach: 20, 
    olaBreach: 18, 
    reopen: 7, 
    escalation: 9, 
    status: 'On Track',
    dot: '#10B981'
  },
  { 
    name: 'TCS SAP Support', 
    short: 'TCS',
    category: 'SAP', 
    tier: 'Strategic', 
    ola: 74, 
    frt: 1.4, 
    res: 5.1, 
    slaBreach: 26, 
    olaBreach: 24, 
    reopen: 9, 
    escalation: 11, 
    status: 'At Risk',
    dot: '#F59E0B'
  },
  { 
    name: 'Infosys Network', 
    short: 'Infosys',
    category: 'Network', 
    tier: 'Strategic', 
    ola: 61, 
    frt: 2.1, 
    res: 8.4, 
    slaBreach: 39, 
    olaBreach: 38, 
    reopen: 18, 
    escalation: 22, 
    status: 'Critical',
    dot: '#EF4444'
  },
];

const OLA_COMPLIANCE_CHART = [
  { name: 'Infosys', value: 61, fill: '#EF4444' },
  { name: 'TCS', value: 74, fill: '#F59E0B' },
  { name: 'HCL', value: 88, fill: '#10B981' },
  { name: 'Wipro', value: 82, fill: '#10B981' },
  { name: 'Tech', value: 94, fill: '#10B981' },
];

const FRT_RES_COMP_CHART = [
  { name: 'Infosys', frt: 2.1, res: 8.4 },
  { name: 'TCS', frt: 1.4, res: 5.1 },
  { name: 'HCL', frt: 0.9, res: 3.2 },
  { name: 'Wipro', frt: 1.1, res: 4.8 },
  { name: 'Tech', frt: 0.6, res: 2.8 },
];

const BREACH_ATTRIBUTION_CHART = [
  { name: 'Infosys', value: 11, fill: '#EF4444' },
  { name: 'TCS', value: 5, fill: '#F59E0B' },
  { name: 'HCL', value: 2, fill: '#10B981' },
  { name: 'Wipro', value: 3, fill: '#10B981' },
  { name: 'Tech', value: 1, fill: '#10B981' },
];

const OLA_BREACH_RATE_CHART = [
  { name: 'Infosys Network', value: 38, fill: '#EF4444' },
  { name: 'TCS SAP Support', value: 24, fill: '#F59E0B' },
  { name: 'Wipro Security', value: 18, fill: '#F59E0B' },
  { name: 'HCL Hardware', value: 10, fill: '#10B981' },
  { name: 'Tech Mahindra DB', value: 5, fill: '#10B981' },
];

const TECH_MAHINDRA_VOLUME_TREND = [
  { name: 'W1', assigned: 14, resolved: 12 },
  { name: 'W2', assigned: 18, resolved: 15 },
  { name: 'W3', assigned: 11, resolved: 11 },
  { name: 'W4', assigned: 9, resolved: 9 },
];

const TECH_MAHINDRA_FRT_PRIO = [
  { name: 'P1', value: 0.7 },
  { name: 'P2', value: 0.5 },
  { name: 'P3', value: 0.4 },
  { name: 'P4', value: 0.3 },
];

const TECH_MAHINDRA_RES_PRIO = [
  { name: 'P1', value: 3.2 },
  { name: 'P2', value: 6.8 },
  { name: 'P3', value: 20 },
  { name: 'P4', value: 38 },
];

const TECH_MAHINDRA_BREACH_RATE = [
  { name: 'P1', value: 8, fill: '#10B981' },
  { name: 'P2', value: 12, fill: '#F59E0B' },
  { name: 'P3', value: 5, fill: '#10B981' },
  { name: 'P4', value: 3, fill: '#10B981' },
];

const TICKETS = [
  { id: 'INC-4525', title: 'SAP module crashing — Line 3', priority: 'P1', status: 'Open', assignee: 'Amit Sharma', sla: '12 min', category: 'Sales', urgent: true },
  { id: 'INC-4524', title: 'VPN drops — Manesar plant', priority: 'P1', status: 'Open', assignee: 'Unassigned', sla: '28 min', category: 'Service' },
  { id: 'INC-4523', title: 'Outlook sync — mobile', priority: 'P3', status: 'In Progress', assignee: 'Deepak Rao', sla: '4 hrs', category: 'MSIL' },
  { id: 'INC-4522', title: 'Printer queue stuck', priority: 'P3', status: 'In Progress', assignee: 'Vikram Singh', sla: '6 hrs', category: 'MSIL' },
  { id: 'INC-4521', title: 'SAP login failure — Gurgaon', priority: 'P1', status: 'Open', assignee: 'Unassigned', sla: '8 min', category: 'Sales', urgent: true },
  { id: 'INC-4520', title: 'Email attachments failing', priority: 'P2', status: 'In Progress', assignee: 'Priya Mehta', sla: '2 hrs', category: 'Service' },
  { id: 'INC-4519', title: 'Wi-Fi issue — Conf room', priority: 'P2', status: 'Resolved', assignee: 'Suresh K.', sla: 'Resolved', category: 'MSIL' },
  { id: 'SR-1181', title: 'New monitor — Design team', priority: 'P4', status: 'Open', assignee: 'Unassigned', sla: '24 hrs', category: 'MSIL' },
  { id: 'INC-4518', title: 'Laptop freezing in calls', priority: 'P2', status: 'Resolved', assignee: 'Amit Sharma', sla: 'Resolved', category: 'Service' },
  { id: 'SR-1180', title: 'Adobe CC license renewal', priority: 'P3', status: 'Closed', assignee: 'Deepak Rao', sla: 'Closed', category: 'Sales' },
];

// --- Sub-components ---

const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
  const styles: Record<string, string> = {
    P1: 'bg-p1-bg text-p1-text',
    P2: 'bg-p2-bg text-p2-text',
    P3: 'bg-p3-bg text-p3-text',
    P4: 'bg-p4-bg text-p4-text',
  };
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-[4px] ${styles[priority]}`}>
      {priority}
    </span>
  );
};

const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    'Open': 'bg-primary-light text-primary',
    'In Progress': 'bg-warning/10 text-warning',
    'Resolved': 'bg-success/10 text-success',
    'Closed': 'bg-bg-page text-text-secondary',
  };
  return (
    <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
};

// --- Main IT Manager Component ---

const ITManagerPortal: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Operations Command');
  const [timeFilter, setTimeFilter] = useState('Today');
  
  // KB Studio State
  const [kbView, setKbView] = useState<'list' | 'detail'>('list');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isKBDrawerOpen, setIsKBDrawerOpen] = useState(false);
  const [selectedRequestedKB, setSelectedRequestedKB] = useState<any>(null);
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiGeneratedText, setAiGeneratedText] = useState('');

  // Ticket Management State
  const [ticketView, setTicketView] = useState<'table' | 'kanban' | 'single'>('table');
  const [lastListView, setLastListView] = useState<'table' | 'kanban'>('table');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [deptFilter, setDeptFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Vendor Management State
  const [vendorView, setVendorView] = useState<'portfolio' | 'single' | 'all-breaches' | 'breach-detail'>('portfolio');
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [vendorTimeFilter, setVendorTimeFilter] = useState('Last 30 Days');

  const tabs = [
    { id: 'Operations Command', icon: <LayoutDashboard size={16} /> },
    { id: 'Knowledge Base Studio', icon: <BookOpen size={16} /> },
    { id: 'Ticket Management', icon: <TicketCheck size={16} /> },
    { id: 'Vendor Management', icon: <TrendingUp size={16} /> },
  ];

  const handleWriteWithAI = () => {
    setIsAILoading(true);
    setTimeout(() => {
      setIsAILoading(false);
      setAiGeneratedText(`SAP Module Crash — Memory Leak Fix

Overview
This article provides resolution steps for SAP PP module crashes caused by memory leaks in SAP PP v7.4 and above.

Resolution Steps
1. Check SAP Application Server status via transaction SM51
2. Restart SAP dispatcher service using SMGW
3. Clear user session cache via SM12
4. Verify gateway connectivity via SMGW → Logged on clients
5. If issue persists, apply SAP Note 3198456 for PP v7.4 memory leak patch`);
    }, 1500);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-success/10 text-success';
      case 'Review': return 'bg-warning/10 text-warning';
      case 'Stale': return 'bg-danger/10 text-danger';
      case 'Draft': return 'bg-bg-page text-text-muted';
      default: return 'bg-bg-page text-text-secondary';
    }
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Network': return 'bg-p3-bg text-p3-text';
      case 'Application': return 'bg-ai-light text-ai';
      case 'Hardware': return 'bg-p2-bg text-p2-text';
      case 'Email': return 'bg-success/10 text-success';
      case 'Security': return 'bg-p1-bg text-p1-text';
      default: return 'bg-bg-page text-text-secondary';
    }
  };

  if (activeTab === 'Ticket Management' && ticketView === 'single') {
    return (
      <SingleTicketView 
        ticket={selectedTicket} 
        onBack={() => setTicketView(lastListView)} 
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-page">
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-[100] bg-white flex-shrink-0">
        <nav className="h-[56px] border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-text-secondary hover:text-text-primary transition-colors">
              <ChevronLeft size={16} />
            </button>
            <div className="flex flex-col items-start">
              <span className="text-[12px] font-bold text-[#DC2626] tracking-tight uppercase">Maruti Suzuki</span>
            </div>
            <div className="h-4 w-[1px] bg-border mx-2" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] flex items-center justify-center">
                <BarChart2 size={20} className="text-[#059669]" />
              </div>
              <span className="text-[16px] font-semibold text-text-primary">IT Manager — Command Center</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[13px] font-semibold text-[#10B981]">LIVE</span>
            <span className="text-[12px] text-text-muted ml-2">Last refresh: 12 seconds ago</span>
          </div>
        </nav>

        <div className="h-[48px] border-b border-border flex items-center px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'Knowledge Base Studio') setKbView('list');
                if (tab.id === 'Ticket Management') setTicketView('table');
              }}
              className={`h-full flex items-center gap-2 px-1 mr-8 text-[14px] transition-all relative ${
                activeTab === tab.id 
                  ? 'text-primary font-medium border-b-2 border-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.icon}
              {tab.id}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        
        {/* --- Tab 1: Operations Command --- */}
        {activeTab === 'Operations Command' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-[1600px] mx-auto w-full pb-12">
            {/* Time Filter Toggle */}
            <div className="inline-flex bg-white border border-border rounded-btn overflow-hidden mb-5 shadow-sm">
              {['Today', 'Last 7 Days', 'Last 30 Days'].map(option => (
                <button
                  key={option}
                  onClick={() => setTimeFilter(option)}
                  className={`px-5 py-2 text-[13px] font-medium transition-all ${
                    timeFilter === option 
                      ? 'bg-primary text-white' 
                      : 'text-text-secondary hover:bg-bg-page'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              {[
                { label: 'OPEN TICKETS', value: 142, icon: <AlertTriangle size={16} />, color: '#EF4444', trend: '+12%', trendUp: true, bad: true },
                { label: 'RESOLVED TODAY', value: 87, icon: <CheckCircle size={16} />, color: '#10B981', trend: '+8%', trendUp: true, good: true },
                { label: 'AVG RESOLUTION', value: '24 min', icon: <Clock size={16} />, color: '#6B7280', trend: '-15%', trendUp: false, good: true },
                { label: 'SLA COMPLIANCE', value: '94.2%', icon: <Shield size={16} />, color: '#EF4444', trend: '-1.8%', trendUp: false, bad: true },
                { label: 'AI AUTO-RESOLVED', value: 23, icon: <Zap size={16} />, color: '#10B981', trend: '+35%', trendUp: true, good: true },
              ].map((kpi, i) => (
                <div key={i} className="bg-white border border-border rounded-card p-5 px-6 shadow-card">
                  <div className="flex justify-between items-center">
                    <span className="text-micro font-bold tracking-widest text-text-muted">{kpi.label}</span>
                    <div style={{ color: kpi.color }}>{kpi.icon}</div>
                  </div>
                  <div className={`font-bold text-text-primary mt-2 ${String(kpi.value).length > 5 ? 'text-[28px]' : 'text-[32px]'}`}>
                    {kpi.value}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.trendUp ? <TrendingUpIcon size={12} className={kpi.bad ? 'text-danger' : 'text-success'} /> : <TrendingDown size={12} className={kpi.good ? 'text-success' : 'text-danger'} />}
                    <span className={`text-[12px] font-semibold ${
                      (kpi.trendUp && kpi.bad) || (!kpi.trendUp && !kpi.good) ? 'text-danger' : 'text-success'
                    }`}>
                      {kpi.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="flex gap-4 mb-6">
              <div className="flex-[0_0_65%] bg-white border border-border rounded-card p-6 shadow-card">
                <h3 className="text-[15px] font-semibold text-text-primary mb-5">Ticket Volume vs Resolution</h3>
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={VOLUME_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <Tooltip 
                        cursor={{ fill: '#F9FAFB' }}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                      />
                      <Legend iconType="square" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: '#6B7280' }} />
                      <Bar name="Volume" dataKey="volume" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={24} />
                      <Bar name="Resolved" dataKey="resolved" fill="#10B981" radius={[4, 4, 0, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="flex-1 bg-white border border-border rounded-card p-6 shadow-card flex flex-col">
                <h3 className="text-[15px] font-semibold text-text-primary mb-4">By Category</h3>
                <div className="flex flex-col gap-3">
                  {CATEGORY_CHART_DATA.map(cat => (
                    <div key={cat.name} className="flex items-center gap-3">
                      <span className="text-[13px] text-text-secondary w-[90px]">{cat.name}</span>
                      <div className="flex-1 h-2 bg-bg-page rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${cat.value}%`, backgroundColor: cat.color }} />
                      </div>
                      <span className="text-[13px] font-medium text-text-primary w-10 text-right">{cat.value}%</span>
                    </div>
                  ))}
                </div>
                <div className="h-[1px] bg-border-subtle my-6" />
                <h3 className="text-[15px] font-semibold text-text-primary mb-3">Trending Keywords</h3>
                <div className="flex flex-wrap gap-x-3 gap-y-2">
                  {KEYWORDS.map(word => (
                    <span key={word.t} className="font-semibold" style={{ color: word.c, fontSize: word.s }}>{word.t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* SLA Breach and Performance */}
            <div className="flex gap-4 mb-6">
              <div className="flex-[0_0_55%] bg-[#FEF2F2] border border-[#FECACA] rounded-card p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Flame size={16} className="text-danger" />
                  <h3 className="text-[15px] font-semibold text-danger">SLA Breach Predictions (AI)</h3>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-[#FEE2E2]">
                      <th className="text-micro uppercase text-text-muted font-medium tracking-widest pb-3">TICKET</th>
                      <th className="text-micro uppercase text-text-muted font-medium tracking-widest pb-3">PRIORITY</th>
                      <th className="text-micro uppercase text-text-muted font-medium tracking-widest pb-3">TIME LEFT</th>
                      <th className="text-micro uppercase text-text-muted font-medium tracking-widest pb-3">BREACH %</th>
                      <th className="text-micro uppercase text-text-muted font-medium tracking-widest pb-3 text-right">AGENT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FEE2E2]">
                    {[
                      { t: 'INC-4525', p: 'P1', tl: '8 min', b: 92, a: 'Amit S.' },
                      { t: 'INC-4524', p: 'P1', tl: '22 min', b: 78, a: 'Priya M.' },
                      { t: 'INC-4521', p: 'P2', tl: '38 min', b: 45, a: 'Deepak R.' },
                      { t: 'INC-4519', p: 'P3', tl: '1 hr', b: 30, a: 'Suresh K.' },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="py-3 text-[13px] font-semibold text-danger cursor-pointer">{row.t}</td>
                        <td className="py-3">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-[4px] ${
                            row.p === 'P1' ? 'bg-p1-bg text-p1-text' : 
                            row.p === 'P2' ? 'bg-p2-bg text-p2-text' : 'bg-p3-bg text-p3-text'
                          }`}>
                            {row.p}
                          </span>
                        </td>
                        <td className="py-3 text-[13px] text-text-primary">{row.tl}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-[80px] h-1.5 bg-[#FEE2E2] rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${row.b}%` }} />
                            </div>
                            <span className="text-[13px] font-semibold text-text-primary">{row.b}%</span>
                          </div>
                        </td>
                        <td className="py-3 text-[13px] text-text-secondary text-right">{row.a}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex-1 bg-white border border-border rounded-card p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={16} className="text-primary" />
                  <h3 className="text-[15px] font-semibold text-text-primary">Agent Performance</h3>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-subtle">
                      <th className="text-micro uppercase text-text-muted font-medium tracking-widest pb-3">AGENT</th>
                      <th className="text-micro uppercase text-text-muted font-medium tracking-widest pb-3">RESOLVED</th>
                      <th className="text-micro uppercase text-text-muted font-medium tracking-widest pb-3">AVG</th>
                      <th className="text-micro uppercase text-text-muted font-medium tracking-widest pb-3">FCR</th>
                      <th className="text-micro uppercase text-text-muted font-medium tracking-widest pb-3 text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {AGENT_DATA.map((agent, i) => (
                      <tr key={i}>
                        <td className="py-3 flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 shadow-sm" style={{ backgroundColor: agent.color }}>
                            {agent.initial}
                          </div>
                          <span className="text-[13px] font-medium text-text-primary">{agent.name}</span>
                        </td>
                        <td className="py-3 text-[13px] text-text-primary">{agent.resolved}</td>
                        <td className="py-3 text-[13px] text-text-primary">{agent.avg}</td>
                        <td className={`py-3 text-[13px] font-bold ${
                          agent.fcr >= 80 ? 'text-success' : agent.fcr >= 65 ? 'text-warning' : 'text-danger'
                        }`}>
                          {agent.fcr}%
                        </td>
                        <td className="py-3 text-right">
                          <div className={`w-2.5 h-2.5 rounded-full inline-block ${
                            agent.status === 'online' ? 'bg-success' : agent.status === 'busy' ? 'bg-warning' : 'bg-danger'
                          }`} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-card p-6 mb-6 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw size={16} className="text-[#D97706]" />
                <h3 className="text-[15px] font-semibold text-[#D97706]">Recurring Patterns (AI)</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { t: "VPN disconnections spike", count: 45, trend: "+40%" },
                  { t: "SAP errors at plant locations", count: 28, trend: "+25%" },
                  { t: "Outlook sync issues after update", count: 15, trend: "+60%" },
                ].map((pattern, i) => (
                  <div key={i} className="bg-white border border-[#FDE68A] rounded-[10px] p-4 shadow-sm">
                    <h4 className="text-[14px] font-semibold text-text-primary">{pattern.t}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[12px] text-text-secondary">{pattern.count} tickets</span>
                      <span className="text-[12px] font-bold text-[#D97706]">{pattern.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KB Intelligence Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-border rounded-card p-6 shadow-card">
                <h3 className="text-[15px] font-semibold text-text-primary mb-4">KB Usage by Category</h3>
                <div className="space-y-3.5">
                  {[
                    { name: 'Security KB', value: 1240, color: '#6366F1' },
                    { name: 'Network KB', value: 892, color: '#06B6D4' },
                    { name: 'Application KB', value: 756, color: '#F59E0B' },
                    { name: 'Email KB', value: 623, color: '#10B981' },
                    { name: 'Hardware KB', value: 234, color: '#EF4444' },
                  ].map(cat => (
                    <div key={cat.name} className="flex items-center gap-3">
                      <span className="text-[12px] text-text-secondary w-[90px]">{cat.name}</span>
                      <div className="flex-1 h-1.5 bg-bg-page rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(cat.value / 1240) * 100}%`, backgroundColor: cat.color }} />
                      </div>
                      <span className="text-[12px] font-bold text-text-primary w-10 text-right">{cat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-border rounded-card p-6 shadow-card">
                <h3 className="text-[15px] font-semibold text-text-primary mb-4">Top KB Articles</h3>
                <div className="space-y-4">
                  {[
                    { title: 'AD Password Reset Guide', views: 1240, res: 312, rating: 4.8 },
                    { title: 'VPN Config for Remote Workers', views: 892, res: 203, rating: 4.5 },
                    { title: 'SAP Error 500 Fix', views: 756, res: 156, rating: 4.3 },
                  ].map((art, i) => (
                    <div key={i} className="flex flex-col">
                      <h4 className="text-[13px] font-semibold text-primary truncate">{art.title}</h4>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-text-muted">
                        <span className="flex items-center gap-1"><Eye size={12} /> {art.views}</span>
                        <span className="flex items-center gap-1"><CheckCircle size={12} /> {art.res} res.</span>
                        <span className="flex items-center gap-1"><Star size={12} className="text-warning fill-warning" /> {art.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-border rounded-card p-6 shadow-card">
                <h3 className="text-[15px] font-semibold text-text-primary mb-4">KB Coverage Gaps</h3>
                <div className="space-y-4">
                  {[
                    { issue: 'SAP Batch Scheduler Crashes', tickets: 34, deflection: 78 },
                    { issue: 'VPN Split Tunnel Config', tickets: 22, deflection: 65 },
                    { issue: 'Outlook Desktop Mac issues', tickets: 18, deflection: 72 },
                  ].map((gap, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <h4 className="text-[13px] font-semibold text-text-primary">{gap.issue}</h4>
                        <span className="text-[11px] text-text-muted">{gap.tickets} tickets this week</span>
                      </div>
                      <div className="text-right">
                        <div className="text-[13px] font-bold text-danger">{gap.deflection}%</div>
                        <div className="text-[10px] text-text-muted uppercase font-bold">Gap</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Tab 2: Knowledge Base Studio --- */}
        {activeTab === 'Knowledge Base Studio' && (
          <div className="flex-1 flex overflow-hidden relative">
            {kbView === 'list' ? (
              <>
                <div className="flex-1 overflow-y-auto p-6 bg-bg-page flex flex-col">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-[22px] font-bold text-text-primary">All Articles</h2>
                    <div className="flex items-center gap-3">
                      <div className="relative w-[280px]">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input className="w-full bg-white border border-border rounded-btn pl-10 pr-4 py-2 text-[14px] outline-none" placeholder="Search articles..." />
                      </div>
                      <button className="bg-primary text-white flex items-center gap-2 px-4.5 py-2.5 rounded-btn text-[14px] font-medium shadow-sm"><Plus size={16} /> Create Article</button>
                    </div>
                  </div>
                  <div className="bg-white border border-border rounded-card overflow-hidden shadow-card">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-white border-b border-border-subtle">
                          <th className="px-5 py-3 text-micro uppercase font-medium tracking-widest text-text-muted">TITLE</th>
                          <th className="px-5 py-3 text-micro uppercase font-medium tracking-widest text-text-muted w-[120px]">CATEGORY</th>
                          <th className="px-5 py-3 text-micro uppercase font-medium tracking-widest text-text-muted w-[110px]">STATUS</th>
                          <th className="px-5 py-3 text-micro uppercase font-medium tracking-widest text-text-muted w-[80px]">VIEWS</th>
                          <th className="px-5 py-3 text-micro uppercase font-medium tracking-widest text-text-muted w-[80px]">HELPFUL</th>
                          <th className="px-5 py-3 text-micro uppercase font-medium tracking-widest text-text-muted w-[120px]">UPDATED</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle">
                        {KB_ARTICLES.map(article => (
                          <tr key={article.id} onClick={() => { setSelectedArticle(article); setKbView('detail'); }} className="hover:bg-bg-page cursor-pointer transition-colors">
                            <td className="px-5 py-3.5 text-[14px] font-medium text-text-primary">{article.title}</td>
                            <td className="px-5 py-3.5"><span className={`text-[12px] px-2.5 py-0.5 rounded-full font-medium ${getCategoryStyle(article.category)}`}>{article.category}</span></td>
                            <td className="px-5 py-3.5"><span className={`text-[12px] px-2.5 py-1 rounded-badge font-medium ${getStatusStyle(article.status)}`}>{article.status}</span></td>
                            <td className="px-5 py-3.5 text-[13px] text-text-primary font-medium">{article.views}</td>
                            <td className="px-5 py-3.5 text-[13px] text-text-primary font-medium">{article.helpful}</td>
                            <td className="px-5 py-3.5 text-[13px] text-text-secondary">{article.updated}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <aside className="w-[380px] border-l border-border bg-white flex flex-col flex-shrink-0">
                  <header className="p-5 border-b border-border-subtle flex justify-between items-center">
                    <div className="flex items-center gap-2"><FileText size={16} className="text-primary" /><h3 className="text-[14px] font-semibold text-primary">Requested KB</h3></div>
                    <span className="bg-primary-light text-primary text-[12px] font-bold px-2 py-0.5 rounded-full">{REQUESTED_KB.length}</span>
                  </header>
                  <div className="flex-1 overflow-y-auto px-5">
                    {REQUESTED_KB.map(req => (
                      <div key={req.id} onClick={() => { setSelectedRequestedKB(req); setIsKBDrawerOpen(true); }} className="py-4 border-b border-border-subtle hover:bg-bg-page cursor-pointer px-5 -mx-5 group">
                        <div className="flex gap-2 items-center mb-1.5"><span className="bg-primary-light text-primary text-[11px] font-bold px-1.5 py-0.5 rounded">{req.id}</span><span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${getCategoryStyle(req.category)}`}>{req.category}</span></div>
                        <h4 className="text-[14px] font-semibold text-text-primary leading-tight group-hover:text-primary transition-colors">{req.title}</h4>
                        <p className="text-[12px] text-text-secondary mt-1.5">{req.requester} <span className="text-text-muted ml-1">· {req.time}</span></p>
                      </div>
                    ))}
                  </div>
                </aside>
                {/* Drawer Overlay for Requested KB */}
                {isKBDrawerOpen && (
                  <div className="fixed inset-0 z-[1000] flex justify-end">
                    <div className="absolute inset-0 bg-[#00000033]" onClick={() => setIsKBDrawerOpen(false)} />
                    <div className="relative w-full max-w-[860px] bg-white h-full shadow-[-8px_0_32px_rgba(0,0,0,0.12)] flex flex-col animate-in slide-in-from-right overflow-hidden">
                      <header className="px-7 py-5 border-b border-border flex flex-col">
                        <div className="flex justify-between mb-2.5">
                          <div className="flex gap-2"><span className="bg-primary-light text-primary text-[12px] font-bold px-2.5 py-1 rounded">{selectedRequestedKB?.id}</span><span className={`text-[12px] px-3 py-1 rounded-full font-medium ${getCategoryStyle(selectedRequestedKB?.category || '')}`}>{selectedRequestedKB?.category}</span></div>
                          <button onClick={() => setIsKBDrawerOpen(false)}><X size={20} className="text-text-muted" /></button>
                        </div>
                        <h2 className="text-[22px] font-bold text-text-primary">{selectedRequestedKB?.title}</h2>
                        <div className="flex items-center gap-3 text-[13px] text-text-secondary mt-2"><span>Requested by: <span className="font-medium text-text-primary">{selectedRequestedKB?.requester}</span></span><span>·</span><span>{selectedRequestedKB?.time}</span><span>·</span><span>Source: <span className="text-primary font-medium">{selectedRequestedKB?.source}</span></span></div>
                      </header>
                      <div className="flex-1 overflow-y-auto p-7">
                        <h4 className="text-micro font-bold tracking-[0.08em] text-text-muted uppercase mb-3">AGENT NOTES</h4>
                        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[12px] p-5 mb-8">
                          <div className="flex items-center gap-2 mb-3.5"><User size={16} className="text-[#D97706]" /><span className="text-[14px] font-semibold text-text-primary">{selectedRequestedKB?.requester}</span><span className="text-[12px] text-text-muted ml-1">· {selectedRequestedKB?.time}</span></div>
                          <p className="text-[14px] text-text-primary leading-relaxed">Finding from troubleshooting: The current KB doesn't cover these steps.</p>
                          <div className="mt-3.5 bg-[#1E1E2E] rounded-btn p-4 font-mono text-[13px] text-[#E2E8F0] leading-relaxed">1. Restart dispatcher<br />2. Clear session cache</div>
                        </div>
                        <div className="flex justify-between items-center mb-3"><h4 className="text-micro font-bold uppercase text-text-muted">ARTICLE CONTENT</h4><button onClick={handleWriteWithAI} className="flex items-center gap-1.5 text-primary text-[13px] font-semibold"><Wand2 size={14} /> Write with AI</button></div>
                        <div className="relative">
                          <textarea className="w-full border border-border rounded-[10px] p-4 text-[14px] min-h-[180px] focus:ring-2 focus:ring-primary-light outline-none" placeholder="AI drafted content..." value={isAILoading ? '' : aiGeneratedText} onChange={(e) => setAiGeneratedText(e.target.value)} />
                          {isAILoading && <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 rounded-[10px]"><Loader2 size={24} className="text-primary animate-spin mb-2" /><span className="text-primary font-medium">Drafting...</span></div>}
                        </div>
                      </div>
                      <footer className="px-7 py-4 border-t border-border flex justify-end gap-3"><button className="border border-border bg-white px-5 py-2.5 rounded-btn text-[14px] font-medium">Save as Draft</button><button className="bg-primary text-white px-5 py-2.5 rounded-btn text-[14px] font-medium">Publish</button></footer>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex flex-col bg-white overflow-hidden">
                <nav className="px-6 py-4 border-b border-border bg-white flex items-center flex-shrink-0"><button onClick={() => { setKbView('list'); setIsPDFOpen(false); }} className="flex items-center gap-1.5 text-primary text-[14px] font-semibold"><ChevronLeft size={16} /> Back to Knowledge Base</button></nav>
                <div className="flex-1 flex overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-8 max-w-[1000px] mx-auto w-full">
                    <div className="flex justify-between mb-4">
                      <h1 className="text-[26px] font-bold text-text-primary">{selectedArticle?.title || 'VPN Configuration for Remote Workers'}</h1>
                      <button className="flex items-center gap-2 border border-border px-4 py-2 rounded-btn text-[14px] font-medium"><Edit size={16} /> Edit</button>
                    </div>
                    <button onClick={() => setIsPDFOpen(true)} className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-btn text-[13px] font-bold mb-8"><FileText size={14} /> View Original PDF</button>
                    
                    <div className="text-[14px] text-[#111827] leading-[1.8] space-y-8">
                      <section>
                        <h2 className="text-[17px] font-bold mb-2">Overview</h2>
                        <p>This article provides comprehensive troubleshooting and resolution steps for Network-related issues frequently encountered across Maruti Suzuki IT infrastructure. It covers initial diagnostics, service restart procedures, cache clearing, and connectivity verification.</p>
                      </section>

                      <section>
                        <h2 className="text-[17px] font-bold mb-2">Problem Description</h2>
                        <p>Users may experience service disruption, application errors, or connectivity issues related to VPN configuration for remote workers. Common symptoms include timeout errors, authentication failures, and intermittent connectivity drops.</p>
                      </section>

                      <section>
                        <h2 className="text-[17px] font-bold mb-2">Prerequisites</h2>
                        <ul className="list-disc pl-5 space-y-1 text-[#374151]">
                          <li>Admin access to the relevant service/application</li>
                          <li>Network connectivity to the affected systems</li>
                          <li>Access to monitoring dashboards</li>
                        </ul>
                      </section>

                      <section>
                        <h2 className="text-[17px] font-bold mb-2">Resolution Steps</h2>
                        <ol className="list-decimal pl-5 space-y-4">
                          <li><strong>Initial Diagnostics:</strong> Check the application/service status on the centralized monitoring dashboard. Look for any alerts or anomalies in the last 24 hours.</li>
                          <li><strong>Service Restart:</strong> If the service is unresponsive, perform a graceful restart and wait 60 seconds for the service to fully initialize.</li>
                          <li><strong>Cache Clearing:</strong> Clear application cache via admin panel, reset user session cache, and flush DNS on affected workstations.</li>
                          <li><strong>Connectivity Verification:</strong> Ping the service endpoint, check firewall rules, validate SSL certificates, and test from multiple network segments.</li>
                          <li><strong>User Validation:</strong> Confirm resolution with affected users — ask them to clear browser cache, re-login, and verify the specific failing workflow.</li>
                        </ol>
                      </section>

                      <section>
                        <h2 className="text-[17px] font-bold mb-2">Troubleshooting Tips</h2>
                        <ul className="list-disc pl-5 space-y-1 text-[#374151]">
                          <li>If the issue persists after service restart, check system logs for memory or disk issues</li>
                          <li>For Cisco AnyConnect issues specifically, verify the VPN profile XML is not corrupted</li>
                          <li>Escalate to L2 if the issue affects more than 5 users simultaneously</li>
                        </ul>
                      </section>
                    </div>
                  </div>
                  <aside className="w-[280px] border-l border-border p-6 bg-white relative">
                    <h3 className="text-micro font-bold uppercase text-text-muted mb-5 tracking-wider">ARTICLE METADATA</h3>
                    <div className="flex flex-col">
                      <div className="py-3.5 border-b border-[#F3F4F6]">
                        <label className="text-micro font-bold text-text-muted uppercase mb-1.5 block">STATUS</label>
                        <span className="bg-[#D1FAE5] text-[#059669] text-[12px] font-bold px-2.5 py-1 rounded-[6px]">Published</span>
                      </div>
                      <div className="py-3.5 border-b border-[#F3F4F6]">
                        <label className="text-micro font-bold text-text-muted uppercase mb-1.5 block">CATEGORY</label>
                        <span className="text-[14px] font-medium text-[#111827]">Network</span>
                      </div>
                      <div className="py-3.5 border-b border-[#F3F4F6]">
                        <label className="text-micro font-bold text-text-muted uppercase mb-1.5 block">LAST UPDATED</label>
                        <span className="text-[14px] font-medium text-[#111827]">2 days ago</span>
                      </div>
                      <div className="py-3.5 border-b border-[#F3F4F6]">
                        <label className="text-micro font-bold text-text-muted uppercase mb-1.5 block">VIEWS</label>
                        <div className="flex items-center gap-2 text-[14px] font-medium text-[#111827]">
                          <Eye size={14} className="text-text-muted" />
                          892
                        </div>
                      </div>
                      <div className="py-3.5 border-b border-[#F3F4F6]">
                        <label className="text-micro font-bold text-text-muted uppercase mb-1.5 block">HELPFUL RATING</label>
                        <div className="flex items-center gap-2 text-[14px] font-medium text-[#10B981]">
                          <ThumbsUp size={14} />
                          88%
                        </div>
                      </div>
                      <div className="py-3.5 border-b border-[#F3F4F6]">
                        <label className="text-micro font-bold text-text-muted uppercase mb-2 block">CONTENT FRESHNESS</label>
                        <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '95%' }} />
                        </div>
                        <div className="text-right mt-1.5 text-[13px] font-semibold text-[#111827]">95%</div>
                      </div>
                      <div className="py-3.5">
                        <label className="text-micro font-bold text-text-muted uppercase mb-1.5 block">AUTHOR</label>
                        <span className="text-[14px] font-medium text-[#111827]">IT Knowledge Team</span>
                      </div>
                    </div>
                    {/* PDF Panel */}
                    <div className={`absolute inset-0 bg-white z-20 flex flex-col border-l border-border transition-transform duration-300 ${isPDFOpen ? 'translate-x-0 shadow-[-4px_0_16px_rgba(0,0,0,0.08)]' : 'translate-x-[460px]'}`} style={{ width: '460px', right: 0 }}>
                      <header className="p-4 px-5 border-b border-border flex justify-between">
                        <div><h4 className="text-[15px] font-semibold line-clamp-1">{selectedArticle?.title}</h4><span className="text-primary-light text-primary text-[11px] font-bold px-1.5 py-0.5 rounded">KB-2041</span></div>
                        <button onClick={() => setIsPDFOpen(false)}><X size={18} /></button>
                      </header>
                      <div className="flex-1 bg-bg-page p-4 overflow-y-auto"><div className="bg-white rounded p-8 shadow-card min-h-[600px] text-[13px]">PDF Paper Simulation...</div></div>
                    </div>
                  </aside>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- Tab 3: Ticket Management --- */}
        {activeTab === 'Ticket Management' && (
          <div className="flex-1 overflow-y-auto p-6 bg-bg-page flex flex-col">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-[22px] font-bold text-text-primary">Ticket Management</h2>
              <div className="flex items-center gap-2.5">
                <div className="relative w-[150px]"><Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" /><input className="w-full bg-white border border-border rounded-btn pl-10 pr-3 py-1.5 text-[13px]" defaultValue="dd/mm/yyyy" /></div>
                <div className="flex gap-1.5">
                  {['All', 'Sales', 'Service', 'MSIL'].map(dept => (
                    <button key={dept} onClick={() => setDeptFilter(dept)} className={`px-4 py-1.5 rounded-full text-[13px] border ${deptFilter === dept ? 'bg-primary-light border-primary text-primary font-medium' : 'bg-white text-text-secondary'}`}>{dept}</button>
                  ))}
                </div>
                <div className="flex border border-border rounded-btn overflow-hidden ml-2">
                  <button onClick={() => { setTicketView('table'); setLastListView('table'); }} className={`p-2 px-3 ${ticketView === 'table' ? 'bg-primary-light text-primary' : 'bg-white'}`}><LayoutList size={14} /></button>
                  <button onClick={() => { setTicketView('kanban'); setLastListView('kanban'); }} className={`p-2 px-3.5 flex items-center gap-1.5 ${ticketView === 'kanban' ? 'bg-primary-light text-primary' : 'bg-white'}`}><LayoutGrid size={14} /><span className="text-[13px] font-medium">Kanban View</span></button>
                </div>
              </div>
            </div>
            {ticketView === 'table' ? (
              <div className="bg-white border border-border rounded-card overflow-hidden shadow-card">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border-subtle">
                      <th className="px-5 py-3 text-micro uppercase font-medium tracking-widest text-text-muted">ID</th>
                      <th className="px-5 py-3 text-micro uppercase font-medium tracking-widest text-text-muted">TITLE</th>
                      <th className="px-5 py-3 text-micro uppercase font-medium tracking-widest text-text-muted">PRIORITY</th>
                      <th className="px-5 py-3 text-micro uppercase font-medium tracking-widest text-text-muted">STATUS</th>
                      <th className="px-5 py-3 text-micro uppercase font-medium tracking-widest text-text-muted">ASSIGNEE</th>
                      <th className="px-5 py-3 text-micro uppercase font-medium tracking-widest text-text-muted">SLA</th>
                      <th className="px-5 py-3 text-micro uppercase font-medium tracking-widest text-text-muted">CATEGORY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {TICKETS.map(ticket => (
                      <tr key={ticket.id} onClick={() => { setSelectedTicket(ticket); setTicketView('single'); }} className="hover:bg-bg-page cursor-pointer transition-colors">
                        <td className="px-5 py-3.5 text-[13px] font-semibold text-primary">{ticket.id}</td>
                        <td className="px-5 py-3.5 text-[14px] text-text-primary">{ticket.title}</td>
                        <td className="px-5 py-3.5"><PriorityBadge priority={ticket.priority} /></td>
                        <td className="px-5 py-3.5"><StatusChip status={ticket.status} /></td>
                        <td className={`px-5 py-3.5 text-[13px] ${ticket.assignee === 'Unassigned' ? 'text-danger font-medium' : 'text-text-primary'}`}>{ticket.assignee}</td>
                        <td className={`px-5 py-3.5 text-[13px] ${ticket.urgent ? 'text-danger font-bold' : 'text-text-primary'}`}>{ticket.sla}</td>
                        <td className="px-5 py-3.5 text-[13px] text-text-secondary">{ticket.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex gap-4 flex-1 min-h-0">
                {['Open', 'In Progress', 'Resolved', 'Closed'].map(col => {
                  const colTickets = TICKETS.filter(t => t.status === col);
                  return (
                    <div key={col} className="flex-1 bg-border-subtle/50 rounded-card p-4 flex flex-col min-h-0">
                      <div className="flex items-center mb-4"><h3 className="text-[15px] font-bold text-text-primary">{col}</h3><span className="ml-2 bg-white text-text-secondary text-[12px] font-bold px-2 py-0.5 rounded-full">{colTickets.length}</span></div>
                      <div className="flex-1 overflow-y-auto">
                        {colTickets.map(ticket => (
                          <div key={ticket.id} onClick={() => { setSelectedTicket(ticket); setTicketView('single'); }} className="bg-white border border-border rounded-[10px] p-4 mb-3 cursor-pointer shadow-card">
                            <div className="flex justify-between items-center"><span className="text-[13px] font-semibold text-primary">{ticket.id}</span><PriorityBadge priority={ticket.priority} /></div>
                            <h4 className="text-[14px] font-medium text-text-primary mt-2">{ticket.title}</h4>
                            <div className="flex justify-between items-center mt-3 pt-3 border-t border-border-subtle"><span className="text-[12px] text-text-muted">{ticket.sla}</span><span className={`text-[12px] font-bold ${ticket.assignee === 'Unassigned' ? 'text-danger' : 'text-text-secondary'}`}>{ticket.assignee}</span></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* --- Tab 4: Vendor Management --- */}
        {activeTab === 'Vendor Management' && (
          <VendorManagement 
            view={vendorView} 
            setView={setVendorView}
            selectedVendor={selectedVendor}
            setSelectedVendor={setSelectedVendor}
            timeFilter={vendorTimeFilter}
            setTimeFilter={setVendorTimeFilter}
          />
        )}
      </div>
    </div>
  );
};

// --- Vendor Management Components ---

const VendorManagement: React.FC<{
  view: 'portfolio' | 'single' | 'all-breaches' | 'breach-detail';
  setView: (v: any) => void;
  selectedVendor: any;
  setSelectedVendor: (v: any) => void;
  timeFilter: string;
  setTimeFilter: (t: string) => void;
}> = ({ view, setView, selectedVendor, setSelectedVendor, timeFilter, setTimeFilter }) => {
  
  if (view === 'portfolio') {
    return (
      <div className="flex-1 overflow-y-auto p-6 bg-bg-page pb-12">
        {/* Time Filter */}
        <div className="flex justify-start mb-5">
          <div className="inline-flex bg-white border border-border rounded-btn overflow-hidden shadow-sm">
            {['Last 7 Days', 'Last 30 Days', 'Last 60 Days'].map(option => (
              <button
                key={option}
                onClick={() => setTimeFilter(option)}
                className={`px-[18px] py-[7px] text-[13px] font-medium transition-all ${
                  timeFilter === option 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:bg-bg-page'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* AI Insight Block */}
        <div className="bg-[#EEF0FF] border border-[#C7D2FE] rounded-[12px] p-5 px-6 mb-5">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-primary" />
            <span className="text-micro font-bold tracking-[0.08em] text-primary uppercase">AI INSIGHT</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <h3 className="text-[16px] font-bold text-text-primary">Vendor Portfolio Summary</h3>
            <span className="text-[12px] text-text-muted">Last 30 days</span>
          </div>
          <p className="mt-2.5 text-[14px] text-[#374151] leading-[1.7]">
            Portfolio avg OLA compliance is <span className="font-bold text-warning">80%</span> with avg FRT of <span className="font-bold text-text-primary">1.2h</span> and avg resolution time of <span className="font-bold text-text-primary">4.9h</span>. <span className="text-danger font-semibold">Infosys Network</span> is critically underperforming — immediate review recommended. <span className="text-warning font-semibold">TCS SAP Support</span> is at risk with improving trends but P1 compliance still below threshold. <span className="text-success font-semibold">HCL Hardware, Wipro Security, Tech Mahindra DB</span> are performing well and meeting SLA commitments consistently.
          </p>
          <div className="flex flex-wrap gap-2 mt-3.5">
            {[
              { name: 'Infosys Network', color: 'bg-[#FEE2E2] text-[#DC2626]', icon: <AlertTriangle size={12} /> },
              { name: 'TCS SAP Support', color: 'bg-[#FEF3C7] text-[#D97706]', icon: <AlertTriangle size={12} /> },
              { name: 'HCL Hardware', color: 'bg-[#D1FAE5] text-[#059669]', icon: <CheckCircle size={12} /> },
              { name: 'Wipro Security', color: 'bg-[#D1FAE5] text-[#059669]', icon: <CheckCircle size={12} /> },
              { name: 'Tech Mahindra DB', color: 'bg-[#D1FAE5] text-[#059669]', icon: <CheckCircle size={12} /> },
            ].map((chip, i) => (
              <div key={i} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-[12px] font-medium ${chip.color}`}>
                {chip.icon}
                {chip.name}
              </div>
            ))}
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {[
            { label: 'VENDORS AT RISK', value: '2', icon: <AlertTriangle size={16} />, color: 'text-danger', sub: 'Critical or warning' },
            { label: 'AVG OLA COMPLIANCE', value: '80%', icon: <Shield size={16} />, color: 'text-warning', sub: 'Across all vendors' },
            { label: 'AVG FIRST RESPONSE', value: '1.2h', icon: <Clock size={16} />, color: 'text-warning', sub: 'Mean time to first response' },
            { label: 'AVG RESOLUTION TIME', value: '4.9h', icon: <Clock size={16} />, color: 'text-warning', sub: 'Mean time to resolution' },
            { label: 'TOTAL CLOSED TICKETS', value: '273', icon: <CheckCircle size={16} />, color: 'text-text-primary', sub: 'In selected period' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white border border-border rounded-[12px] p-5 px-6 shadow-card">
              <div className="flex justify-between items-center">
                <span className="text-micro font-bold tracking-[0.08em] text-text-muted uppercase">{kpi.label}</span>
                <div className={i === 4 ? 'text-success' : kpi.color}>{kpi.icon}</div>
              </div>
              <div className={`text-[28px] font-bold mt-2 ${kpi.color}`}>
                {kpi.value}
              </div>
              <div className="text-[12px] text-text-muted mt-1">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Vendor Performance Table */}
        <div className="bg-white border border-border rounded-[12px] overflow-hidden mb-6 shadow-card">
          <div className="p-4 px-5 border-b border-border-subtle flex justify-between items-center">
            <div>
              <h3 className="text-[16px] font-semibold text-text-primary">Vendor Performance Table</h3>
              <p className="text-[12px] text-text-muted mt-0.5">Click any row to open vendor deep dive · Click column headers to sort</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-[200px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input className="w-full bg-white border border-border rounded-[8px] pl-9 pr-3 py-[7px] text-[13px] outline-none" placeholder="Search vendors..." />
              </div>
              <div className="relative w-[130px]">
                <select className="w-full bg-white border border-border rounded-[8px] px-3.5 py-[7px] text-[13px] outline-none appearance-none">
                  <option>All Status</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              </div>
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">VENDOR</th>
                <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-primary">OLA COMPLIANCE ↓</th>
                <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">AVG FRT</th>
                <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">AVG RESOLUTION</th>
                <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">SLA BREACH RATE</th>
                <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">OLA BREACH RATE</th>
                <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">REOPEN RATE</th>
                <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">ESCALATION RATE</th>
                <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {VENDOR_PORTFOLIO_DATA.map((vendor, i) => (
                <tr 
                  key={i} 
                  onClick={() => { setSelectedVendor(vendor); setView('single'); }}
                  className="hover:bg-[#F9FAFB] cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: vendor.dot }} />
                      <div>
                        <div className="text-[14px] font-semibold text-text-primary">{vendor.name}</div>
                        <div className="text-[12px] text-text-muted">{vendor.category} · {vendor.tier}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-5 py-3.5 text-[14px] font-semibold ${vendor.ola >= 85 ? 'text-success' : vendor.ola >= 70 ? 'text-warning' : 'text-danger'}`}>{vendor.ola}%</td>
                  <td className={`px-5 py-3.5 text-[14px] ${vendor.frt <= 1 ? 'text-success' : vendor.frt <= 2 ? 'text-warning' : 'text-danger'}`}>{vendor.frt}h</td>
                  <td className={`px-5 py-3.5 text-[14px] ${vendor.res <= 4 ? 'text-success' : vendor.res <= 7 ? 'text-warning' : 'text-danger'}`}>{vendor.res}h</td>
                  <td className={`px-5 py-3.5 text-[14px] ${vendor.slaBreach <= 10 ? 'text-success' : vendor.slaBreach <= 25 ? 'text-warning' : 'text-danger'}`}>{vendor.slaBreach}%</td>
                  <td className={`px-5 py-3.5 text-[14px] ${vendor.olaBreach <= 10 ? 'text-success' : vendor.olaBreach <= 25 ? 'text-warning' : 'text-danger'}`}>{vendor.olaBreach}%</td>
                  <td className={`px-5 py-3.5 text-[14px] ${vendor.reopen <= 10 ? 'text-success' : vendor.reopen <= 25 ? 'text-warning' : 'text-danger'}`}>{vendor.reopen}%</td>
                  <td className={`px-5 py-3.5 text-[14px] ${vendor.escalation <= 10 ? 'text-success' : vendor.escalation <= 25 ? 'text-warning' : 'text-danger'}`}>{vendor.escalation}%</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[12px] font-medium px-2.5 py-0.5 rounded-[6px] ${
                      vendor.status === 'Excellent' ? 'bg-[#D1FAE5] text-[#059669]' :
                      vendor.status === 'On Track' ? 'bg-[#DBEAFE] text-[#2563EB]' :
                      vendor.status === 'At Risk' ? 'bg-[#FEF3C7] text-[#D97706]' :
                      'bg-[#FEE2E2] text-[#DC2626]'
                    }`}>
                      {vendor.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charts Row */}
        <div className="flex gap-4 mb-6">
          <div className="flex-[0_0_55%] bg-white border border-border rounded-[12px] p-5 px-6 shadow-card">
            <h3 className="text-[15px] font-semibold text-text-primary">OLA Compliance vs Target</h3>
            <p className="text-[12px] text-text-muted mt-0.5 mb-5">Each vendor vs their own OLA target — last 30 days</p>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={OLA_COMPLIANCE_CHART}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#F9FAFB' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40} />
                  <ReferenceLine y={80} stroke="#EF4444" strokeDasharray="4 4" label={{ position: 'right', value: '80% target', fill: '#EF4444', fontSize: 11 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex-1 bg-white border border-border rounded-[12px] p-5 px-6 shadow-card">
            <h3 className="text-[15px] font-semibold text-text-primary">Avg FRT vs Resolution Time</h3>
            <p className="text-[12px] text-text-muted mt-0.5 mb-5">Hours per vendor — lower is better</p>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={FRT_RES_COMP_CHART}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                  <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#F9FAFB' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                  />
                  <Legend iconType="square" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: '#6B7280' }} />
                  <Bar name="Avg FRT" dataKey="frt" fill="#5B4FE8" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar name="Avg Resolution" dataKey="res" fill="#E0E7FF" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2: Breaches */}
        <div className="flex gap-4">
          <div className="flex-[0_0_55%] bg-white border border-border rounded-[12px] p-5 px-6 shadow-card">
            <h3 className="text-[15px] font-semibold text-text-primary">Total SLA Breaches by Vendor</h3>
            <p className="text-[12px] text-text-muted mt-0.5 mb-5">Total SLA breaches attributed to each vendor — all time</p>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BREACH_ATTRIBUTION_CHART}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#F9FAFB' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex-1 bg-white border border-border rounded-[12px] p-5 px-6 shadow-card">
            <h3 className="text-[15px] font-semibold text-text-primary">OLA Breach Rate by Vendor</h3>
            <p className="text-[12px] text-text-muted mt-0.5 mb-4">% of assigned tickets where vendor missed their OLA — last 30 days</p>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={OLA_BREACH_RATE_CHART} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                  <XAxis type="number" domain={[0, 50]} hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} width={100} />
                  <Tooltip 
                    cursor={{ fill: '#F9FAFB' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} label={{ position: 'right', fill: '#6B7280', fontSize: 12, formatter: (v: any) => `${v}%` }} />
                  <ReferenceLine x={25} stroke="#EF4444" strokeDasharray="4 4" label={{ position: 'top', value: '25% threshold', fill: '#EF4444', fontSize: 11 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'single') {
    return (
      <div className="flex-1 flex flex-col bg-bg-page overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-border p-4 px-6 flex-shrink-0">
          <button 
            onClick={() => setView('portfolio')}
            className="flex items-center gap-1.5 text-primary text-[14px] font-medium cursor-pointer"
          >
            <ChevronLeft size={16} />
            Back to All Vendors
          </button>
          <div className="flex items-center gap-3 mt-3">
            <h2 className="text-[24px] font-bold text-text-primary">{selectedVendor?.name || 'Tech Mahindra DB'}</h2>
            <span className="bg-[#D1FAE5] text-[#059669] text-[12px] font-bold px-2.5 py-0.5 rounded-[6px]">Excellent</span>
            <span className="bg-[#F3F4F6] text-[#6B7280] text-[12px] px-2.5 py-0.5 rounded-[6px]">Standard</span>
          </div>
          <div className="flex gap-6 text-[13px] text-text-secondary mt-2">
            <span>OLA Terms: <span className="font-medium text-text-primary">P1: respond 1hr / resolve 4hr</span></span>
            <span>Valid till: <span className="font-medium text-text-primary">Jan 2027</span></span>
            <span>Account Manager: <span className="font-medium text-text-primary">Meena Krishnan</span></span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-12">
          {/* AI Assessment */}
          <div className="bg-[#EEF0FF] border border-[#C7D2FE] rounded-[12px] p-5 px-6 mb-5">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-primary" />
              <span className="text-micro font-bold tracking-[0.08em] text-primary uppercase">AI ASSESSMENT — {selectedVendor?.name?.toUpperCase() || 'TECH MAHINDRA DB'}</span>
            </div>
            <p className="mt-2.5 text-[14px] text-[#374151] leading-[1.7]">
              Tech Mahindra DB is the top performer in your portfolio. FRT at 0.6 hrs and avg resolution at 2.8 hrs are both best in class. FCR at 91% and reopen rate at 3% reflect consistently high-quality resolutions. Strong candidate for scope expansion at next contract review.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-6 gap-4 mb-6">
            {[
              { label: 'OLA COMPLIANCE', value: '94%', color: 'text-success', sub: 'vs. own OLA target' },
              { label: 'AVG FRT', value: '0.6h', color: 'text-success', sub: 'First response time' },
              { label: 'AVG RESOLUTION', value: '2.8h', color: 'text-success', sub: 'Mean resolution time' },
              { label: 'FCR RATE', value: '91%', color: 'text-success', sub: 'First contact resolution' },
              { label: 'REOPEN RATE', value: '3%', color: 'text-success', sub: 'Tickets reopened' },
              { label: 'SATISFACTION SCORE', value: '4.6/5', color: 'text-success', sub: 'Stakeholder rating' },
            ].map((kpi, i) => (
              <div key={i} className="bg-white border border-border rounded-[12px] p-4 px-5 shadow-card">
                <span className="text-micro font-bold tracking-[0.08em] text-text-muted uppercase">{kpi.label}</span>
                <div className={`text-[24px] font-bold mt-1 ${kpi.color}`}>{kpi.value}</div>
                <div className="text-[12px] text-text-muted mt-1">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-white border border-border rounded-[12px] p-5 px-6 shadow-card">
              <h3 className="text-[15px] font-semibold text-text-primary">Avg First Response Time by Priority</h3>
              <p className="text-[12px] text-text-muted mt-0.5 mb-5">Hours to first acknowledgement per priority tier</p>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TECH_MAHINDRA_FRT_PRIO}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <Tooltip 
                      cursor={{ fill: '#F9FAFB' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                    />
                    <Bar dataKey="value" fill="#5B4FE8" radius={[4, 4, 0, 0]} barSize={40} />
                    <ReferenceLine y={1} stroke="#EF4444" strokeDasharray="4 4" label={{ position: 'right', value: 'P1 OLA', fill: '#EF4444', fontSize: 11 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex-1 bg-white border border-border rounded-[12px] p-5 px-6 shadow-card">
              <h3 className="text-[15px] font-semibold text-text-primary">Avg Resolution Time by Priority</h3>
              <p className="text-[12px] text-text-muted mt-0.5 mb-5">Hours to resolution per priority tier</p>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TECH_MAHINDRA_RES_PRIO}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <Tooltip 
                      cursor={{ fill: '#F9FAFB' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                    />
                    <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* OLA Compliance Table */}
          <div className="bg-white border border-border rounded-[12px] p-5 px-6 mb-6 shadow-card">
            <h3 className="text-[15px] font-semibold text-text-primary">OLA Compliance by Priority Tier</h3>
            <p className="text-[12px] text-text-muted mt-0.5 mb-4">Avg FRT and resolution time per tier against OLA targets</p>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">PRIORITY</th>
                  <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">OLA TARGET</th>
                  <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">AVG FRT</th>
                  <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">AVG RESOLUTION</th>
                  <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">OLA COMPLIANCE</th>
                  <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {[
                  { p: 'P1', target: '4 hrs', frt: '0.7 hrs', res: '3.2 hrs', comp: '94%', color: 'text-p1-text bg-p1-bg' },
                  { p: 'P2', target: '8 hrs', frt: '0.5 hrs', res: '6.8 hrs', comp: '96%', color: 'text-p2-text bg-p2-bg' },
                  { p: 'P3', target: '24 hrs', frt: '0.4 hrs', res: '20 hrs', comp: '98%', color: 'text-text-secondary bg-bg-page' },
                  { p: 'P4', target: '48 hrs', frt: '0.3 hrs', res: '38 hrs', comp: '99%', color: 'text-text-secondary bg-bg-page' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="py-3.5"><span className={`text-[11px] font-bold px-2 py-0.5 rounded-[4px] ${row.color}`}>{row.p}</span></td>
                    <td className="py-3.5 text-[13px] text-text-secondary">{row.target}</td>
                    <td className="py-3.5 text-[13px] text-success font-medium">{row.frt}</td>
                    <td className="py-3.5 text-[13px] text-text-primary">{row.res}</td>
                    <td className="py-3.5 text-[13px] text-success font-bold">{row.comp}</td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-1.5 text-success text-[13px] font-medium">
                        <CheckCircle size={14} />
                        Within OLA
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Charts Row 2 */}
          <div className="flex gap-4 mb-6">
            <div className="flex-[0_0_55%] bg-white border border-border rounded-[12px] p-5 px-6 shadow-card">
              <h3 className="text-[15px] font-semibold text-text-primary">Ticket Volume & Resolution Trend</h3>
              <p className="text-[12px] text-text-muted mt-0.5 mb-5">Weekly tickets assigned vs resolved — last 30 days</p>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TECH_MAHINDRA_VOLUME_TREND}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                    <YAxis domain={[0, 20]} axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                    />
                    <Legend iconType="square" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: '#6B7280' }} />
                    <Line name="Assigned" type="monotone" dataKey="assigned" stroke="#5B4FE8" strokeWidth={2} dot={{ fill: '#5B4FE8', r: 4 }} />
                    <Line name="Resolved" type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex-1 bg-white border border-border rounded-[12px] p-5 px-6 shadow-card">
              <h3 className="text-[15px] font-semibold text-text-primary">SLA Analysis — Breach Rate by Priority</h3>
              <p className="text-[12px] text-text-muted mt-0.5 mb-4">% of tickets that breached SLA per priority tier</p>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TECH_MAHINDRA_BREACH_RATE} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} width={30} />
                    <Tooltip 
                      cursor={{ fill: '#F9FAFB' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} label={{ position: 'right', fill: '#6B7280', fontSize: 12, formatter: (v: any) => `${v}%` }} />
                    <ReferenceLine x={25} stroke="#EF4444" strokeDasharray="4 4" label={{ position: 'top', value: '25% threshold', fill: '#EF4444', fontSize: 11 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Breaches */}
          <div className="space-y-4">
            {/* Recent SLA Breaches */}
            <div className="bg-white border border-border rounded-[12px] p-5 px-6 shadow-card">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-[15px] font-semibold text-text-primary">Recent SLA Breaches</h3>
                  <p className="text-[12px] text-text-muted mt-0.5">Last 3 breaches · End-to-end SLA was breached</p>
                </div>
                <button 
                  onClick={() => setView('all-breaches')}
                  className="flex items-center gap-1.5 border border-[#EF4444] text-[#EF4444] text-[13px] font-medium px-4 py-2 rounded-[8px]"
                >
                  View All Breaches
                  <ArrowRight size={14} />
                </button>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">TICKET</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">PRIORITY</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">CATEGORY</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">ASSIGNED AT</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">ACKNOWLEDGED</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">RESOLVED</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">TOTAL HELD</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">EXCEEDED BY</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">EXCEEDED %</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">SLA IMPACT</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">OUTCOME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {[
                    { id: 'INC-4389', p: 'P1', cat: 'Database', assigned: '08:00', ack: '09:20', res: '22:40', held: '14h 40m', exc: '+10h 40m', excP: '+267%', impact: 'Full SLA', badge: 'bg-[#FEE2E2] text-[#DC2626]', outcome: 'Resolved' },
                    { id: 'INC-4401', p: 'P2', cat: 'Network', assigned: '10:30', ack: '11:15', res: '23:50', held: '13h 20m', exc: '+5h 20m', excP: '+67%', impact: 'Full SLA', badge: 'bg-[#FEE2E2] text-[#DC2626]', outcome: 'Escalated' },
                    { id: 'INC-4412', p: 'P2', cat: 'Database', assigned: '09:00', ack: '09:40', res: '18:20', held: '9h 20m', exc: '+1h 20m', excP: '+17%', impact: 'OLA only', badge: 'bg-[#FEF3C7] text-[#D97706]', outcome: 'Resolved' },
                  ].map((row, i) => (
                    <tr 
                      key={i}
                      onClick={() => setView('breach-detail')}
                      className="hover:bg-[#F9FAFB] cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 text-[13px] font-semibold text-primary">{row.id}</td>
                      <td className="py-3.5"><span className={`text-[11px] font-bold px-2 py-0.5 rounded-[4px] ${row.p === 'P1' ? 'bg-p1-bg text-p1-text' : 'bg-p2-bg text-p2-text'}`}>{row.p}</span></td>
                      <td className="py-3.5 text-[13px] text-[#374151]">{row.cat}</td>
                      <td className="py-3.5 text-[13px] text-text-primary">{row.assigned}</td>
                      <td className="py-3.5 text-[13px] text-text-primary">{row.ack}</td>
                      <td className="py-3.5 text-[13px] text-text-primary">{row.res}</td>
                      <td className="py-3.5 text-[13px] font-bold text-text-primary">{row.held}</td>
                      <td className="py-3.5 text-[13px] font-semibold text-danger">{row.exc}</td>
                      <td className="py-3.5 text-[13px] font-semibold text-danger">{row.excP}</td>
                      <td className="py-3.5"><span className={`${row.badge} text-[12px] px-2 py-0.5 rounded-[4px]`}>{row.impact}</span></td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-1.5 text-success text-[13px]">
                          {row.outcome}
                          <ArrowRight size={14} className="text-text-muted" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent OLA Breaches */}
            <div className="bg-white border border-border rounded-[12px] p-5 px-6 shadow-card">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-[15px] font-semibold text-text-primary">Recent OLA Breaches</h3>
                  <p className="text-[12px] text-text-muted mt-0.5">Last 3 breaches · Vendor missed internal OLA but SLA may not be impacted</p>
                </div>
                <button 
                  onClick={() => setView('all-breaches')}
                  className="flex items-center gap-1.5 border border-[#F59E0B] text-[#D97706] text-[13px] font-medium px-4 py-2 rounded-[8px]"
                >
                  View All OLA Breaches
                  <ArrowRight size={14} />
                </button>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">TICKET</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">PRIORITY</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">CATEGORY</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">ASSIGNED AT</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">ACKNOWLEDGED</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">RESOLVED</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">TOTAL HELD</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">EXCEEDED BY</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">EXCEEDED %</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">SLA IMPACT</th>
                    <th className="py-2.5 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">OUTCOME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {[
                    { id: 'INC-4412', p: 'P2', cat: 'Database', assigned: '09:00', ack: '09:40', res: '18:20', held: '9h 20m', exc: '+1h 20m', excP: '+17%', impact: 'OLA only', badge: 'bg-[#FEF3C7] text-[#D97706]', outcome: 'Resolved' },
                    { id: 'INC-4398', p: 'P3', cat: 'Database', assigned: '14:00', ack: '15:50', res: 'next day 10:00', held: '20h', exc: '+2h', excP: '+11%', impact: 'OLA only', badge: 'bg-[#FEF3C7] text-[#D97706]', outcome: 'Resolved' },
                    { id: 'INC-4355', p: 'P1', cat: 'Database', assigned: '07:30', ack: '08:45', res: '16:20', held: '8h 50m', exc: '+4h 50m', excP: '+121%', impact: 'OLA only', badge: 'bg-[#FEF3C7] text-[#D97706]', outcome: 'Escalated' },
                  ].map((row, i) => (
                    <tr 
                      key={i}
                      onClick={() => setView('breach-detail')}
                      className="hover:bg-[#F9FAFB] cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 text-[13px] font-semibold text-primary">{row.id}</td>
                      <td className="py-3.5"><span className={`text-[11px] font-bold px-2 py-0.5 rounded-[4px] ${row.p === 'P1' ? 'bg-p1-bg text-p1-text' : row.p === 'P2' ? 'bg-p2-bg text-p2-text' : 'bg-bg-page text-text-secondary'}`}>{row.p}</span></td>
                      <td className="py-3.5 text-[13px] text-[#374151]">{row.cat}</td>
                      <td className="py-3.5 text-[13px] text-text-primary">{row.assigned}</td>
                      <td className="py-3.5 text-[13px] text-text-primary">{row.ack}</td>
                      <td className="py-3.5 text-[13px] text-text-primary">{row.res}</td>
                      <td className="py-3.5 text-[13px] font-bold text-text-primary">{row.held}</td>
                      <td className="py-3.5 text-[13px] font-semibold text-[#D97706]">{row.exc}</td>
                      <td className="py-3.5 text-[13px] font-semibold text-[#D97706]">{row.excP}</td>
                      <td className="py-3.5"><span className={`${row.badge} text-[12px] px-2 py-0.5 rounded-[4px]`}>{row.impact}</span></td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-1.5 text-success text-[13px]">
                          {row.outcome}
                          <ArrowRight size={14} className="text-text-muted" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'all-breaches') {
    return (
      <div className="flex-1 flex flex-col bg-bg-page overflow-hidden">
        <div className="bg-white border-b border-border p-4 px-6 flex-shrink-0">
          <button 
            onClick={() => setView('single')}
            className="flex items-center gap-1.5 text-primary text-[14px] font-medium cursor-pointer"
          >
            <ChevronLeft size={16} />
            Back to Tech Mahindra DB
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 pb-12">
          <div className="flex items-center">
            <h2 className="text-[22px] font-bold text-text-primary">Tech Mahindra DB — All OLA Breaches</h2>
            <span className="ml-3 bg-[#FEE2E2] text-[#DC2626] text-[12px] font-bold px-2.5 py-0.5 rounded-[4px]">1 total</span>
          </div>
          <div className="bg-white border border-border rounded-[12px] overflow-hidden mt-5 shadow-card">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">TICKET</th>
                  <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">PRIORITY</th>
                  <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">CATEGORY</th>
                  <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">ASSIGNED AT</th>
                  <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">ACKNOWLEDGED</th>
                  <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">RESOLVED</th>
                  <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">TOTAL HELD</th>
                  <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">EXCEEDED BY</th>
                  <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">EXCEEDED %</th>
                  <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">SLA IMPACT</th>
                  <th className="px-5 py-3 text-micro uppercase font-medium tracking-[0.06em] text-text-muted">OUTCOME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                <tr 
                  onClick={() => setView('breach-detail')}
                  className="hover:bg-[#F9FAFB] cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3.5 text-[13px] font-semibold text-primary">INC-4412</td>
                  <td className="px-5 py-3.5"><span className="text-[11px] font-bold px-2 py-0.5 rounded-[4px] bg-p2-bg text-p2-text">P2</span></td>
                  <td className="px-5 py-3.5 text-[13px] text-[#374151]">Database</td>
                  <td className="px-5 py-3.5 text-[13px] text-text-primary">09:00</td>
                  <td className="px-5 py-3.5 text-[13px] text-text-primary">09:40</td>
                  <td className="px-5 py-3.5 text-[13px] text-text-primary">18:20</td>
                  <td className="px-5 py-3.5 text-[13px] font-bold text-text-primary">9h 20m</td>
                  <td className="px-5 py-3.5 text-[13px] font-semibold text-danger">+1h 20m</td>
                  <td className="px-5 py-3.5 text-[13px] font-semibold text-danger">+17%</td>
                  <td className="px-5 py-3.5"><span className="bg-[#FEF3C7] text-[#D97706] text-[12px] px-2 py-0.5 rounded-[4px]">OLA only</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-success text-[13px]">
                      Resolved
                      <ArrowRight size={14} className="text-text-muted" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'breach-detail') {
    return (
      <div className="flex-1 flex flex-col bg-bg-page overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-border p-4 px-6 flex-shrink-0">
          <button 
            onClick={() => setView('single')}
            className="flex items-center gap-1.5 text-primary text-[14px] font-medium cursor-pointer"
          >
            <ChevronLeft size={16} />
            Back to Tech Mahindra DB
          </button>
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2.5">
              <span className="text-[14px] font-semibold text-primary">INC-4412</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-[4px] bg-p2-bg text-p2-text">P2</span>
              <span className="bg-[#F3F4F6] text-[#374151] text-[12px] px-2.5 py-0.5 rounded-[6px]">Database</span>
              <span className="bg-[#FEE2E2] text-[#DC2626] text-[12px] px-2.5 py-0.5 rounded-[6px] flex items-center gap-1">
                <AlertTriangle size={12} />
                SLA Breached
              </span>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-micro font-bold text-text-muted uppercase">TOTAL HELD</span>
                <span className="text-[20px] font-bold text-text-primary mt-0.5">9h 20m</span>
              </div>
              <div className="flex flex-col">
                <span className="text-micro font-bold text-text-muted uppercase">EXCEEDED OLA BY</span>
                <span className="text-[20px] font-bold text-danger mt-0.5">+1h 20m</span>
              </div>
              <div className="flex flex-col">
                <span className="text-micro font-bold text-text-muted uppercase">% OVER OLA</span>
                <span className="text-[20px] font-bold text-danger mt-0.5">+17%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 pb-12">
            {/* Breach Attribution */}
            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[12px] p-5 px-6 mb-5">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-danger" />
                <h3 className="text-[15px] font-semibold text-danger">Breach Attribution — Time Held Per Party</h3>
              </div>
              <p className="mt-2.5 text-[14px] text-[#374151]">
                Breached by <span className="font-bold text-text-primary">1h 20m</span> (+17% over target). Root cause: <span className="font-bold text-text-primary">Tech Mahindra DB</span> exceeded OLA on both response and resolution.
              </p>
              <table className="w-full text-left mt-4">
                <thead>
                  <tr className="border-b border-[#FECACA]">
                    <th className="py-2 text-micro uppercase font-bold text-danger">PARTY</th>
                    <th className="py-2 text-micro uppercase font-bold text-danger">OLA</th>
                    <th className="py-2 text-micro uppercase font-bold text-danger">RESPONSE TIME</th>
                    <th className="py-2 text-micro uppercase font-bold text-danger">RESP. OLA</th>
                    <th className="py-2 text-micro uppercase font-bold text-danger">RESOLUTION TIME</th>
                    <th className="py-2 text-micro uppercase font-bold text-danger">RES. OLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FEE2E2]">
                  {[
                    { party: 'Maruti L1 (Priya)', ola: '1 hr', resp: '0h 55m', respOla: true, res: '0h 55m', resOla: true },
                    { party: 'Maruti L2 (Vikram)', ola: '2 hrs', resp: '0h 40m', respOla: true, res: '1h 25m', resOla: true },
                    { party: 'Tech Mahindra DB', ola: '4 hrs', resp: '0h 40m', respOla: false, res: '9h 20m', resOla: false, highlight: true },
                  ].map((row, i) => (
                    <tr key={i} className={row.highlight ? 'bg-[#FEF2F2]' : ''}>
                      <td className="py-3 text-[14px] text-text-primary">{row.party}</td>
                      <td className="py-3 text-[14px] text-text-primary">{row.ola}</td>
                      <td className="py-3 text-[14px] text-text-primary">{row.resp}</td>
                      <td className="py-3">
                        <div className={`flex items-center gap-1.5 text-[14px] font-medium ${row.respOla ? 'text-success' : 'text-danger'}`}>
                          {row.respOla ? <CheckCircle size={14} /> : <XCircle size={14} />}
                          {row.respOla ? 'Within OLA' : 'Breached'}
                        </div>
                      </td>
                      <td className="py-3 text-[14px] text-text-primary">{row.res}</td>
                      <td className="py-3">
                        <div className={`flex items-center gap-1.5 text-[14px] font-medium ${row.resOla ? 'text-success' : 'text-danger'}`}>
                          {row.resOla ? <CheckCircle size={14} /> : <XCircle size={14} />}
                          {row.resOla ? 'Within OLA' : 'Breached'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Impact Cards */}
            <div className="flex gap-4">
              <div className="flex-1 bg-white border border-border rounded-[12px] p-5 shadow-card">
                <span className="text-micro font-bold text-text-muted uppercase">SLA IMPACT CLASSIFICATION</span>
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-warning" />
                  <span className="text-[16px] font-semibold text-[#D97706]">OLA breach only</span>
                </div>
                <p className="mt-2 text-[13px] text-text-secondary leading-[1.6]">
                  Vendor missed internal OLA but end-to-end SLA was not breached.
                </p>
              </div>
              <div className="flex-1 bg-[#FFFBEB] border border-[#FDE68A] rounded-[12px] p-5 shadow-card">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#D97706]" />
                  <span className="text-micro font-bold text-[#D97706] uppercase tracking-wider">ASSIGNMENT DELAY — HIDDEN DEAD TIME</span>
                </div>
                <div className="text-[24px] font-bold text-[#D97706] mt-2">0h 40m</div>
                <p className="mt-1.5 text-[13px] text-text-secondary leading-[1.6]">
                  Time from assignment to first acknowledgement. OLA for response: 1 hr. This delay is the primary driver of the breach.
                </p>
              </div>
            </div>

            {/* Visual Breakdown */}
            <div className="bg-white border border-border rounded-[12px] p-5 px-6 shadow-card mt-4">
              <h3 className="text-[15px] font-semibold text-text-primary">Time Held Per Party — Visual Breakdown</h3>
              <p className="text-[12px] text-text-muted mt-0.5 mb-5">How long each party held the ticket during resolution</p>
              
              <div className="w-full h-10 rounded-[8px] overflow-hidden flex">
                <div className="bg-[#5B4FE8] h-full" style={{ width: '10%' }} />
                <div className="bg-[#7C3AED] h-full" style={{ width: '15%' }} />
                <div className="bg-[#EF4444] h-full" style={{ width: '75%' }} />
              </div>

              <div className="flex gap-6 mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-[3px] bg-[#5B4FE8]" />
                  <span className="text-[12px] text-text-secondary">Maruti L1 (Priya)</span>
                  <span className="text-[12px] font-semibold text-text-primary">55m</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-[3px] bg-[#7C3AED]" />
                  <span className="text-[12px] text-text-secondary">Maruti L2 (Vikram)</span>
                  <span className="text-[12px] font-semibold text-text-primary">1h 25m</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-[3px] bg-[#EF4444]" />
                  <span className="text-[12px] text-text-secondary">Tech Mahindra DB</span>
                  <span className="text-[12px] font-bold text-text-primary">9h 20m</span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3.5 bg-[#FEF2F2] rounded-[8px] p-3.5 px-4">
                <AlertTriangle size={14} className="text-danger" />
                <p className="text-[13px] text-[#374151]">
                  Tech Mahindra DB held the ticket for 75% of total resolution time, exceeding their 4hr OLA by 1h 20m.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-[380px] border-l border-border bg-white p-5 flex flex-col flex-shrink-0">
            <h3 className="text-[15px] font-semibold text-text-primary">Ticket Journey</h3>
            <p className="text-[12px] text-text-muted mt-0.5 mb-5">Chronological audit trail</p>
            
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="relative border-l-2 border-border ml-2.5 pl-6 space-y-5 pb-5">
                {[
                  { title: 'Ticket created via AI Agent', actor: 'End User', desc: 'User reported issue, AI classified and escalated', time: '09:10', icon: <Bot size={10} className="text-white" />, iconBg: 'bg-primary' },
                  { title: 'Assigned to Maruti L1', actor: 'System', desc: 'Auto-assigned based on category and workload', time: '09:14', iconBg: 'bg-text-muted' },
                  { title: 'L1 OLA timer started', actor: 'Maruti L1', desc: 'Priya acknowledged within SLA window', time: '09:15', iconBg: 'bg-warning' },
                  { title: 'Escalated to Maruti L2', actor: 'Maruti L1 → L2', desc: 'Standard resolution steps failed', time: '10:10', iconBg: 'bg-text-muted' },
                  { title: 'Assigned to Tech Mahindra DB', actor: 'Maruti L2 → Vendor', desc: 'Infra-level vendor required', time: '11:20', iconBg: 'bg-text-muted' },
                  { title: 'Vendor first response', actor: 'Tech Mahindra DB', desc: '0h 40m after assignment — OLA: respond within 1 hr', time: '09:40', iconBg: 'bg-danger', highlight: true },
                  { title: 'Ticket resolved', actor: 'Tech Mahindra DB', desc: 'Total held: 9h 20m — OLA: resolve within 4 hrs', time: '18:20', iconBg: 'bg-danger', highlight: true },
                ].map((item, i) => (
                  <div key={i} className={`relative ${item.highlight ? 'bg-[#FEF2F2] rounded-[6px] p-2 -mx-2' : ''}`}>
                    <div className={`absolute -left-[37px] top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <div className="flex justify-between items-start">
                      <h4 className={`text-[13px] font-semibold leading-tight ${item.highlight ? 'text-danger' : 'text-text-primary'}`}>{item.title}</h4>
                      <span className="text-[11px] text-text-muted whitespace-nowrap ml-2">{item.time}</span>
                    </div>
                    <div className="text-[11px] text-text-muted mt-0.5 uppercase font-medium">{item.actor}</div>
                    <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return null;
};

// --- Single Ticket View Internal Component ---

const SingleTicketView: React.FC<{ ticket: any, onBack: () => void }> = ({ ticket, onBack }) => {
  const [activeTab, setActiveTab] = useState('Conversation & Response');

  const tabs = ['Conversation & Response', 'Ticket Journey', 'Knowledge Base', 'Summary & Details', 'Related Tickets'];

  return (
    <div className="flex flex-col h-screen bg-bg-page overflow-hidden">
      <nav className="h-[56px] bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-50 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors"><ChevronLeft size={16} /><span className="text-[14px]">Back to Ticket Management</span></button>
          <div className="h-4 w-[1px] bg-border mx-2" />
          <div className="flex flex-col items-start"><span className="text-[12px] font-bold text-[#DC2626]">MARUTI SUZUKI</span></div>
          <div className="h-4 w-[1px] bg-border mx-2" />
          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-[#DCFCE7] flex items-center justify-center"><BarChart2 size={20} className="text-[#059669]" /></div><span className="text-[16px] font-semibold text-text-primary">IT Manager — Command Center</span></div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-56px)] overflow-hidden">
        <div className="flex-[0_0_70%] h-full overflow-y-auto bg-white flex flex-col border-r border-border">
          <header className="bg-white border-b border-border px-6 py-4 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3"><span className="text-[14px] font-semibold text-primary">{ticket?.id || 'INC-4525'}</span><PriorityBadge priority={ticket?.priority || 'P1'} /></div>
              <div className="flex items-center gap-[10px]">
                <div className="border border-[#FCA5A5] bg-[#FEF2F2] rounded-[8px] px-[14px] py-[6px] flex items-center gap-[6px]"><Clock size={14} className="text-danger" /><span className="text-[13px] font-bold text-danger">12 min</span></div>
                <button className="border border-border bg-white rounded-[8px] px-4 py-2 flex items-center gap-[6px] hover:bg-bg-page transition-colors"><ArrowUpRight size={14} /><span className="text-[14px]">Escalate</span></button>
                <button className="bg-[#10B981] rounded-[8px] px-4 py-2 flex items-center gap-[6px] hover:bg-[#059669] text-white"><UserCheck size={14} /><span className="text-[14px] font-medium">Re-assign</span></button>
                <button className="bg-[#7C3AED] rounded-[8px] px-4 py-2 flex items-center gap-[6px] hover:bg-[#6D28D9] text-white"><CheckCircle size={14} /><span className="text-[14px] font-medium">Resolve</span></button>
              </div>
            </div>
            <h1 className="text-[22px] font-bold text-text-primary mt-2">{ticket?.title}</h1>
          </header>
          <div className="flex px-6 border-b border-border-subtle bg-white h-[44px] flex-shrink-0">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`h-full inline-flex items-center px-1 mr-6 text-[14px] relative ${activeTab === tab ? 'text-primary font-medium border-b-2 border-primary' : 'text-text-secondary'}`}>{tab}</button>
            ))}
          </div>
          <div className="flex-1 bg-bg-page overflow-y-auto pb-10">
            <div className="p-8 flex flex-col gap-8 flex-1">
              <div className="flex justify-start items-start gap-3"><div className="w-8 h-8 rounded-full bg-ai flex items-center justify-center text-white"><Bot size={16} /></div><div className="flex flex-col gap-1"><span className="text-[11px] text-text-muted">AI Agent</span><div className="text-[14px] bg-white border border-border p-4 rounded-[18px]">I've analyzed the ticket context. This looks related to recent SAP dispatcher issues.</div></div></div>
            </div>
          </div>
        </div>
        <div className="flex-[0_0_30%] h-full flex flex-col overflow-hidden bg-white border-l border-border sticky top-0">
          <header className="p-4 px-5 border-b border-border flex justify-between items-center"><div className="flex items-center gap-3"><Bot size={16} className="text-primary" /><h2 className="text-[14px] font-bold uppercase">Ask AI Assistant</h2></div></header>
          <div className="flex-1 overflow-y-auto p-4"><div className="bg-bg-page border border-border rounded-[10px] p-3 text-[13px]">Hi! How can I assist you with this ticket?</div></div>
          <div className="p-4 px-5 border-t border-border bg-white flex-shrink-0"><div className="flex items-center gap-2"><input className="flex-1 bg-bg-page border border-border rounded-btn px-3.5 py-2.5 text-[13px] outline-none" placeholder="Ask anything..." /><button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-sm"><Send size={14} /></button></div></div>
        </div>
      </div>
    </div>
  );
};

export default ITManagerPortal;
