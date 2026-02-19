
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Headphones, 
  Clock, 
  CheckCircle, 
  Zap, 
  Inbox, 
  AlertTriangle, 
  AlertCircle,
  ArrowLeftRight,
  Bot,
  FileText,
  Lightbulb,
  ArrowUpRight,
  Search,
  Send,
  Link2,
  Sparkles,
  Check,
  X,
  Lock,
  Wand2,
  Settings,
  ThumbsUp,
  ThumbsDown,
  Frown,
  Paperclip,
  BookOpen,
  UserCheck,
  Eye
} from 'lucide-react';

// --- Types ---

interface TicketRow {
  id: string;
  title: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  status: 'New' | 'In Progress' | 'Open' | 'Resolved';
  category: string;
  tags: string[];
  sla: string;
  slaUrgent?: boolean;
}

// --- Data ---

const DASHBOARD_TICKETS: TicketRow[] = [
  { id: 'INC-4525', title: 'SAP module crashing — Production line 3', priority: 'P1', status: 'New', category: 'Application', tags: ['SAP', 'Production'], sla: '12 min', slaUrgent: true },
  { id: 'INC-4524', title: 'VPN drops every 15 minutes — Manesar plant', priority: 'P1', status: 'New', category: 'Network', tags: ['VPN', 'Network'], sla: '28 min', slaUrgent: true },
  { id: 'INC-4523', title: 'Outlook not syncing calendar on mobile', priority: 'P3', status: 'In Progress', category: 'Email', tags: ['Outlook', 'Mobile'], sla: '4 hrs' },
  { id: 'INC-4522', title: 'Printer queue stuck — 5th floor', priority: 'P3', status: 'In Progress', category: 'Hardware', tags: ['Printer'], sla: '6 hrs' },
  { id: 'SR-1181', title: 'New monitor request — Design team', priority: 'P4', status: 'Open', category: 'Hardware', tags: ['Hardware', 'Request'], sla: '24 hrs' },
  { id: 'INC-4521', title: 'SAP login failure — Gurgaon plant users', priority: 'P1', status: 'New', category: 'Application', tags: ['SAP', 'Login'], sla: '8 min', slaUrgent: true },
  { id: 'INC-4520', title: 'Wi-Fi connectivity issue — Building C', priority: 'P2', status: 'In Progress', category: 'Network', tags: ['Wi-Fi'], sla: '1.5 hrs' },
  { id: 'INC-4519', title: 'Adobe license activation failed', priority: 'P3', status: 'Open', category: 'Software', tags: ['Adobe', 'License'], sla: '8 hrs' },
  { id: 'SR-1180', title: 'Laptop replacement — Finance dept.', priority: 'P4', status: 'Open', category: 'Hardware', tags: ['Laptop'], sla: '48 hrs' },
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
    'New': 'bg-primary-light text-primary',
    'In Progress': 'bg-warning/10 text-warning',
    'Open': 'bg-bg-page text-text-secondary',
    'Resolved': 'bg-success/10 text-success',
  };
  return (
    <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
};

// --- Main Components ---

const L1AgentWorkspace: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isTicketView = !!id;

  if (isTicketView) {
    return <TicketView ticketId={id || ''} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-page">
      {/* Top Nav */}
      <nav className="h-[56px] bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-text-secondary hover:text-text-primary">
            <ChevronLeft size={16} />
          </button>
          <div className="flex flex-col items-start">
            <span className="text-[12px] font-bold text-[#DC2626]">MARUTI SUZUKI</span>
          </div>
          <div className="h-4 w-[1px] bg-border mx-2"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-ai-light flex items-center justify-center">
              <Headphones size={20} className="text-ai" />
            </div>
            <span className="text-[16px] font-semibold text-text-primary">L1 Agent — My Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-text-secondary" />
            <span className="text-[13px] text-text-secondary">Avg Resolution: 24 min</span>
          </div>
          <div className="h-4 w-[1px] bg-border"></div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-success" />
            <span className="text-[13px] text-text-secondary">12 resolved today</span>
          </div>
          <div className="h-4 w-[1px] bg-border"></div>
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-warning" />
            <span className="text-[13px] text-text-secondary">4 auto-resolved</span>
          </div>
        </div>
      </nav>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-5 gap-4 px-6 mt-6">
        {[
          { label: 'ASSIGNED TO ME', icon: <Inbox size={16} />, color: '#5B4FE8', value: 12 },
          { label: 'P1 / CRITICAL', icon: <AlertTriangle size={16} />, color: '#EF4444', value: 3 },
          { label: 'IN PROGRESS', icon: <Clock size={16} />, color: '#F59E0B', value: 5 },
          { label: 'RESOLVED TODAY', icon: <CheckCircle size={16} />, color: '#10B981', value: 12 },
          { label: 'SLA AT RISK', icon: <AlertTriangle size={16} />, color: '#EF4444', value: 2 },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white border border-border rounded-card p-5 shadow-card">
            <div className="flex justify-between items-center">
              <span className="text-micro font-semibold tracking-[0.08em] text-text-muted">{kpi.label}</span>
              <div style={{ color: kpi.color }}>{kpi.icon}</div>
            </div>
            <div className="text-[32px] font-bold text-text-primary mt-2">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Tickets Table */}
      <div className="mx-6 mt-6 bg-white border border-border rounded-card shadow-card overflow-hidden">
        <div className="p-4 px-5 flex justify-between items-center border-b border-border-subtle">
          <h2 className="text-[16px] font-semibold text-text-primary">My Tickets</h2>
          <span className="bg-primary-light text-primary text-[13px] font-medium px-3 py-1 rounded-full">
            12 tickets
          </span>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-border-subtle">
              <th className="text-micro uppercase text-text-muted font-medium tracking-[0.06em] py-3 px-5 w-[100px]">ID</th>
              <th className="text-micro uppercase text-text-muted font-medium tracking-[0.06em] py-3 px-5">TITLE</th>
              <th className="text-micro uppercase text-text-muted font-medium tracking-[0.06em] py-3 px-5 w-[80px]">PRIORITY</th>
              <th className="text-micro uppercase text-text-muted font-medium tracking-[0.06em] py-3 px-5 w-[120px]">STATUS</th>
              <th className="text-micro uppercase text-text-muted font-medium tracking-[0.06em] py-3 px-5 w-[110px]">CATEGORY</th>
              <th className="text-micro uppercase text-text-muted font-medium tracking-[0.06em] py-3 px-5 w-[160px]">TAGS</th>
              <th className="text-micro uppercase text-text-muted font-medium tracking-[0.06em] py-3 px-5 w-[90px]">SLA</th>
              <th className="text-micro uppercase text-text-muted font-medium tracking-[0.06em] py-3 px-5 w-[60px]">OLA</th>
            </tr>
          </thead>
          <tbody>
            {DASHBOARD_TICKETS.map(row => (
              <tr 
                key={row.id} 
                onClick={() => navigate(`/persona/l1-agent/ticket/${row.id.toLowerCase()}`)}
                className="border-b border-border-subtle hover:bg-bg-page cursor-pointer transition-colors"
              >
                <td className="py-3.5 px-5 text-[13px] font-semibold text-primary">{row.id}</td>
                <td className="py-3.5 px-5 text-[13px] text-text-primary font-medium">{row.title}</td>
                <td className="py-3.5 px-5">
                  <PriorityBadge priority={row.priority} />
                </td>
                <td className="py-3.5 px-5">
                  <StatusChip status={row.status} />
                </td>
                <td className="py-3.5 px-5 text-[13px] text-text-secondary">{row.category}</td>
                <td className="py-3.5 px-5">
                  <div className="flex flex-wrap gap-1">
                    {row.tags.map(tag => (
                      <span key={tag} className="bg-bg-page text-text-primary text-[11px] px-2 py-0.5 rounded-[4px] border border-border-subtle">{tag}</span>
                    ))}
                  </div>
                </td>
                <td className={`py-3.5 px-5 text-[13px] ${row.slaUrgent ? 'text-danger font-semibold' : 'text-text-secondary'}`}>
                  {row.sla}
                </td>
                <td className="py-3.5 px-5 text-[13px] text-text-muted">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TicketView: React.FC<{ ticketId: string }> = ({ ticketId }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Conversation & Response');
  const [isPdfVisible, setIsPdfVisible] = useState(false);

  const tabs = [
    'Conversation & Response',
    'Ticket Journey',
    'Knowledge Base',
    'Summary & Related'
  ];

  const [kbFeedback, setKbFeedback] = useState<Record<string, 'up' | 'down' | null>>({
    'KB-2089': null,
    'KB-2110': null,
    'KB-1924': null
  });

  const [selectedKbArticle, setSelectedKbArticle] = useState<any>(null);

  const kbArticles = [
    { id: 'KB-2089', title: 'SAP Module Crash — Memory Leak Fix', match: 94, category: 'Application' },
    { id: 'KB-2110', title: 'VPN Auto-Reconnect Configuration', match: 89, category: 'Network' },
    { id: 'KB-1924', title: 'Outlook Mobile Sync Reset Steps', match: 87, category: 'Email' }
  ];

  return (
    <div className="flex flex-col h-screen bg-bg-page overflow-hidden">
      {/* Top Nav */}
      <nav className="h-[56px] bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-50 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/persona/l1-agent')} className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
            <ChevronLeft size={16} />
            <span className="text-[14px]">Back to Dashboard</span>
          </button>
          <div className="h-4 w-[1px] bg-border mx-2"></div>
          <div className="flex flex-col items-start">
            <span className="text-[12px] font-bold text-[#DC2626]">MARUTI SUZUKI</span>
          </div>
          <div className="h-4 w-[1px] bg-border mx-2"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-ai-light flex items-center justify-center">
              <Headphones size={20} className="text-ai" />
            </div>
            <span className="text-[16px] font-semibold text-text-primary">L1 Agent Workspace</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-text-secondary" />
            <span className="text-[13px] text-text-secondary">Avg Resolution: 24 min</span>
          </div>
          <div className="h-4 w-[1px] bg-border"></div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-success" />
            <span className="text-[13px] text-text-secondary">12 resolved today</span>
          </div>
        </div>
      </nav>

      {/* Main Container Fix: 70/30 sibling panels below nav */}
      <div className="flex h-[calc(100vh-56px)] overflow-hidden">
        
        {/* Left Panel: 70% Scrollable Area */}
        <div className="flex-[0_0_70%] h-full overflow-y-auto bg-white flex flex-col border-r border-border">
          
          {/* Ticket Header (now inside left panel) */}
          <header className="bg-white border-b border-border px-6 py-4 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-[14px] font-semibold text-primary">INC-4525</span>
                <PriorityBadge priority="P1" />
                <span className="bg-ai-light text-ai text-[12px] font-medium px-2.5 py-0.5 rounded-full">Application</span>
              </div>
              <div className="flex items-center gap-[10px]">
                {/* Element 1 — SLA CHIP */}
                <div className="border border-[#FCA5A5] bg-[#FEF2F2] rounded-[8px] px-[14px] py-[6px] flex items-center gap-[5px] flex-shrink-0">
                  <Clock size={14} className="text-danger" />
                  <span className="text-[11px] font-bold text-danger uppercase tracking-wider">SLA</span>
                  <span className="text-[13px] font-bold text-danger">12 min</span>
                </div>

                {/* Element 1b — OLA CHIP */}
                <div className="border border-[#FDE68A] bg-[#FFFBEB] rounded-[8px] px-[14px] py-[6px] flex items-center gap-[5px] flex-shrink-0">
                  <Clock size={14} className="text-[#D97706]" />
                  <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider">OLA</span>
                  <span className="text-[13px] font-bold text-[#D97706]">6 min</span>
                </div>
                
                {/* Element 2 — ESCALATE BUTTON */}
                <button className="border border-border bg-white rounded-[8px] px-4 py-2 flex items-center gap-[6px] hover:bg-bg-page transition-colors">
                  <ArrowUpRight size={14} className="text-[#374151]" />
                  <span className="text-[14px] text-[#374151]">Escalate</span>
                </button>

                {/* Element 3 — RE-ASSIGN BUTTON */}
                <button className="bg-[#10B981] rounded-[8px] px-4 py-2 flex items-center gap-[6px] hover:bg-[#059669] transition-colors">
                  <UserCheck size={14} className="text-white" />
                  <span className="text-[14px] font-medium text-white">Re-assign</span>
                </button>

                {/* Element 4 — RESOLVE BUTTON */}
                <button className="bg-[#7C3AED] rounded-[8px] px-4 py-2 flex items-center gap-[6px] hover:bg-[#6D28D9] transition-colors">
                  <CheckCircle size={14} className="text-white" />
                  <span className="text-[14px] font-medium text-white">Resolve</span>
                </button>
              </div>
            </div>
            <h1 className="text-[22px] font-bold text-text-primary mt-2">SAP module crashing — Production line 3</h1>
            
            <div className="flex items-center gap-8 mt-3 pt-3 border-t border-border-subtle">
              {[
                { label: 'PRIORITY', value: 'P1' },
                { label: 'STATUS', value: 'In Progress' },
                { label: 'CATEGORY', value: 'Application' },
                { label: 'TYPE', value: 'Incident' },
                { label: 'IMPACT', value: 'High' },
                { label: 'URGENCY', value: 'Critical', urgent: true },
                { label: 'OPENED BY', value: 'Rajesh Kumar' },
                { label: 'ASSIGNED TO', value: 'Amit Sharma' },
              ].map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">{item.label}</span>
                    <span className={`text-[13px] font-semibold mt-0.5 ${item.urgent ? 'text-danger' : 'text-text-primary'}`}>{item.value}</span>
                  </div>
                  {idx < 7 && <div className="h-6 w-[1px] bg-border-subtle" />}
                </React.Fragment>
              ))}
            </div>
          </header>

          {/* Tabs Nav */}
          <div className="flex px-6 border-b border-border-subtle bg-white h-[44px] flex-shrink-0">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`h-full inline-flex items-center px-1 mr-6 text-[14px] transition-all relative ${
                  activeTab === tab 
                    ? 'text-primary font-medium border-b-2 border-primary' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Area (Inside scrollable left panel) */}
          <div className="flex-1 bg-bg-page relative min-h-0 overflow-y-auto pb-10">
            {activeTab === 'Conversation & Response' && (
              <div className="flex flex-col h-full">
                <div className="p-8 flex flex-col gap-8 flex-1">
                  {/* Message Thread */}
                  <div className="flex justify-end">
                    <div className="flex items-start gap-2 max-w-[68%]">
                      <div className="flex flex-col items-end gap-1">
                        <div className="bg-primary text-white p-4 rounded-t-[18px] rounded-bl-[18px] rounded-br-[4px] text-[14px]">
                          Hi, SAP module is crashing on production line 3. We can't open the batch scheduler at all.
                        </div>
                        <span className="text-[11px] text-text-muted">Rajesh Kumar · 09:10</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-text-muted flex items-center justify-center text-white text-[11px] font-bold">RK</div>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="flex items-start gap-3 max-w-[68%]">
                      <div className="w-7 h-7 rounded-full bg-ai flex items-center justify-center text-white">
                        <Bot size={14} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] text-text-muted">AI Agent · 09:10</span>
                        <div className="text-[14px] text-text-primary leading-relaxed">
                          I'm sorry to hear that. Can you tell me which module is affected and how long this has been happening?
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="flex items-start gap-2 max-w-[68%]">
                      <div className="flex flex-col items-end gap-1">
                        <div className="bg-primary text-white p-4 rounded-t-[18px] rounded-bl-[18px] rounded-br-[4px] text-[14px]">
                          It's the production planning module. It crashes every time I try to open the batch scheduler. Started about 20 minutes ago.
                        </div>
                        <span className="text-[11px] text-text-muted">Rajesh Kumar · 09:11</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-text-muted flex items-center justify-center text-white text-[11px] font-bold">RK</div>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="flex items-start gap-3 max-w-[68%]">
                      <div className="w-7 h-7 rounded-full bg-ai flex items-center justify-center text-white">
                        <Bot size={14} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] text-text-muted">AI Agent · 09:12</span>
                        <div className="text-[14px] text-text-primary leading-relaxed">
                          Thank you. I've checked our KB — this may be related to a memory leak in SAP PP v7.4. Let me escalate this to an L1 agent with all the context.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-border-subtle" />
                    <span className="text-[12px] text-text-muted">Ticket INC-4525 created · Assigned to L1 Support · 09:14</span>
                    <div className="h-[1px] flex-1 bg-border-subtle" />
                  </div>

                  <div className="flex justify-start">
                    <div className="flex items-start gap-3 max-w-[68%]">
                      <div className="w-7 h-7 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-[11px] font-bold">AS</div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] text-text-secondary font-medium">Amit Sharma · 09:18</span>
                        <div className="text-[14px] text-text-primary leading-relaxed">
                          Hi Rajesh, I'm Amit from the SAP Support team. Please try restarting the SAP application server using transaction SMGW to check active connections.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="flex items-start gap-2 max-w-[68%]">
                      <div className="flex flex-col items-end gap-1">
                        <div className="bg-primary text-white p-4 rounded-t-[18px] rounded-bl-[18px] rounded-br-[4px] text-[14px]">
                          Tried that, the server restarts but the module still crashes immediately on launch.
                        </div>
                        <span className="text-[11px] text-text-muted">Rajesh Kumar · 09:22</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-text-muted flex items-center justify-center text-white text-[11px] font-bold">RK</div>
                    </div>
                  </div>
                </div>

                {/* Response Area */}
                <div className="bg-white border-t border-border p-6 mt-auto">
                  <div className="flex gap-2">
                    <button className="bg-white border border-primary text-primary text-[13px] font-medium px-3.5 py-1.5 rounded-[6px]">Reply to User</button>
                    <button className="bg-white border border-border text-text-secondary text-[13px] px-3.5 py-1.5 rounded-[6px] flex items-center gap-2">
                      <Lock size={12} /> Internal Note
                    </button>
                  </div>
                  <textarea 
                    className="w-full border border-border rounded-[10px] p-3 mt-2.5 text-[14px] text-text-primary placeholder:text-text-muted min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary-light transition-all resize-none"
                    placeholder="Type your response..."
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
                        <Paperclip size={16} /> <span className="text-[13px]">Attach</span>
                      </button>
                      <button className="flex items-center gap-1.5 border border-primary text-primary px-3 py-1.5 rounded-[6px] text-[13px] hover:bg-primary-light transition-colors">
                        <Wand2 size={12} /> Help me Write
                      </button>
                    </div>
                    <button className="bg-primary text-white px-5 py-2 rounded-[8px] text-[14px] font-medium flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-sm">
                      <Send size={14} /> Send
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Ticket Journey' && (
              <div className="p-8">
                <div className="flex gap-4 mb-7">
                  <div className="flex-1 bg-danger/5 border border-[#FECACA] rounded-[12px] p-5">
                    <div className="flex items-center gap-3">
                      <AlertTriangle size={16} className="text-danger" />
                      <h3 className="text-[15px] font-semibold text-danger">Breach Attribution</h3>
                    </div>
                    <p className="text-[14px] text-text-primary leading-relaxed mt-3">
                      SLA was breached by <span className="font-bold">4h 20m</span>. Root cause: <span className="font-bold">Infosys Network</span> exceeded their vendor OLA on both response time (+1h 10m) and resolution time (+2h 10m).
                    </p>
                    <div className="mt-4 flex flex-col gap-2">
                      {[
                        { name: 'Maruti L1 (Priya)', ola: '1 hr', actual: '55 min', success: true },
                        { name: 'Maruti L2 (Vikram)', ola: '2 hrs', actual: '1 hr 25 min', success: true },
                        { name: 'Infosys Network', ola: '4 hrs', actual: '6 hrs 10 min', success: false },
                      ].map((ola, i) => (
                        <div key={i} className="bg-white border border-[#FECACA] rounded-btn p-2.5 px-3.5 flex justify-between items-center">
                          <span className="text-[14px] text-text-primary">{ola.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-[12px] text-text-muted">OLA: {ola.ola}</span>
                            <span className={`text-[13px] font-bold ${ola.success ? 'text-success' : 'text-danger'}`}>{ola.actual}</span>
                            {ola.success ? <Check size={14} className="text-success" /> : <X size={14} className="text-danger" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 bg-white border border-border rounded-[12px] p-5">
                    <div className="flex items-center gap-3">
                      <Link2 size={16} className="text-primary" />
                      <h3 className="text-[15px] font-semibold text-text-primary">Assignment Chain</h3>
                    </div>
                    <div className="mt-3 flex flex-col">
                      {[
                        { time: '09:15', from: 'AI Agent', fromColor: '#7C3AED', to: 'Priya Mehta (L1)', reason: 'Auto-assigned' },
                        { time: '10:10', from: 'Priya Mehta (L1)', fromColor: '#5B4FE8', to: 'Vikram Singh (L2)', reason: 'Standard steps failed' },
                        { time: '11:20', from: 'Vikram Singh (L2)', fromColor: '#F59E0B', to: 'Infosys Network', reason: 'Infra-vendor req.' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 py-2.5 border-b border-border-subtle last:border-0">
                          <span className="text-[12px] text-text-muted w-10">{item.time}</span>
                          <span className="text-[13px] font-bold" style={{ color: item.fromColor }}>{item.from}</span>
                          <ArrowUpRight size={14} className="text-text-muted" />
                          <span className="text-[13px] font-bold text-text-primary">{item.to}</span>
                          <span className="text-[12px] text-text-secondary bg-bg-page px-2 py-0.5 rounded ml-auto">({item.reason})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative pl-8 border-l-2 border-border ml-4">
                  {[
                    { title: 'Ticket created via AI Agent', actor: 'End User', desc: 'Rajesh Kumar reported SAP batch scheduler crash on Production Line 3', time: '09:10', icon: <Bot size={12} />, active: true },
                    { title: 'Auto-classified & prioritised', actor: 'AI Agent', desc: 'Category: Application · Priority: P1 · Root cause: Memory Leak', time: '09:12', icon: <Sparkles size={12} />, active: true },
                    { title: 'Auto-assigned to L1 — Amit Sharma', actor: 'System', desc: 'Based on workload balance and SAP category expertise', time: '09:14', icon: <Settings size={12} />, active: false },
                    { title: 'L1 OLA timer started', actor: 'L1 OLA', desc: 'L1 must respond within 30 min · resolve within 1 hr', time: '09:15', icon: <Clock size={12} />, active: false, amber: true, chip: 'OLA TIMER' },
                    { title: 'First response sent', actor: 'Amit Sharma (L1)', desc: 'Sent SAP application server restart steps via SMGW transaction', time: '09:18', icon: <CheckCircle size={12} />, active: true, success: true },
                    { title: 'Investigating memory logs', actor: 'Amit Sharma (L1)', desc: 'Standard fix unsuccessful — evaluating escalation', time: '09:24', icon: <Search size={12} />, active: true, success: true },
                  ].map((event, i) => (
                    <div key={i} className={`mb-8 relative ${event.amber ? 'bg-warning/5 rounded-card p-3 -ml-3' : ''}`}>
                      <div className={`absolute -left-[45px] top-0 w-7 h-7 rounded-full flex items-center justify-center text-white z-10 shadow-sm ${
                        event.success ? 'bg-success' : event.amber ? 'bg-warning' : event.active ? 'bg-primary' : 'bg-text-muted'
                      }`}>
                        {event.icon}
                      </div>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <h4 className="text-[14px] font-bold text-text-primary">{event.title}</h4>
                          {event.chip && <span className="bg-warning text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{event.chip}</span>}
                        </div>
                        <span className="text-[12px] text-text-muted">{event.time}</span>
                      </div>
                      <span className="text-[12px] text-text-muted font-medium">{event.actor}</span>
                      <p className="text-[13px] text-text-secondary mt-1">{event.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'Knowledge Base' && (
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen size={16} className="text-primary" />
                  <span className="text-micro font-bold tracking-widest text-text-muted uppercase">KB SUGGESTIONS</span>
                </div>
                
                <div className="flex flex-col gap-3">
                  {kbArticles.map((article) => (
                    <div 
                      key={article.id} 
                      className="bg-white border border-border rounded-[10px] p-4 px-5 hover:border-primary hover:shadow-[0_2px_8px_rgba(91,79,232,0.08)] transition-all group"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="text-[15px] font-medium text-text-primary">{article.title}</h4>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setKbFeedback(prev => ({ ...prev, [article.id]: prev[article.id] === 'up' ? null : 'up' }))}
                            className={`p-1 transition-colors ${kbFeedback[article.id] === 'up' ? 'text-success' : 'text-text-muted hover:text-text-primary'}`}
                          >
                            <ThumbsUp size={14} fill={kbFeedback[article.id] === 'up' ? 'currentColor' : 'none'} />
                          </button>
                          <button 
                            onClick={() => setKbFeedback(prev => ({ ...prev, [article.id]: prev[article.id] === 'down' ? null : 'down' }))}
                            className={`p-1 transition-colors ${kbFeedback[article.id] === 'down' ? 'text-danger' : 'text-text-muted hover:text-text-primary'}`}
                          >
                            <ThumbsDown size={14} fill={kbFeedback[article.id] === 'down' ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-1.5">
                        <span className={`text-[12px] font-semibold px-2 py-0.5 rounded-[4px] ${
                          article.match >= 90 ? 'bg-[#D1FAE5] text-[#059669]' : 
                          article.match >= 80 ? 'bg-[#FEF3C7] text-[#D97706]' : 
                          'bg-[#EEF0FF] text-[#5B4FE8]'
                        }`}>
                          {article.match}% match
                        </span>
                      </div>

                      <div className="mt-3">
                        <button 
                          onClick={() => {
                            setSelectedKbArticle(article);
                            setIsPdfVisible(true);
                          }}
                          className="flex items-center gap-2 border border-primary text-primary text-[13px] font-medium px-3.5 py-1.5 rounded-[6px] hover:bg-primary-light transition-colors"
                        >
                          <FileText size={12} />
                          View Document
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Summary & Related' && (
              <div className="p-8 px-10 overflow-y-auto h-full">
                {/* PART A — AI GENERATED SUMMARY */}
                <div className="bg-[#EEF0FF] border border-[#C7D2FE] rounded-[12px] p-5 px-6 mb-5">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-primary" />
                    <span className="text-micro font-bold tracking-[0.08em] text-primary uppercase">AI-GENERATED SUMMARY</span>
                  </div>
                  <p className="mt-2.5 text-[14px] text-[#374151] leading-[1.7]">
                    User reported SAP production planning module crashing on Line 3 at Gurgaon plant. Batch scheduler fails to open every time it's launched. AI Agent identified possible memory leak in SAP PP v7.4. L1 has attempted standard restart — issue persists. Production line currently halted, business impact is critical.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div className="bg-white border border-border rounded-[12px] p-4 px-5 shadow-card">
                    <span className="text-micro font-bold text-text-muted uppercase tracking-wider">USER SENTIMENT</span>
                    <div className="flex items-center gap-2 mt-2.5">
                      <Frown size={20} className="text-danger" />
                      <span className="text-[16px] font-semibold text-danger">Frustrated</span>
                    </div>
                    <p className="mt-1.5 text-[12px] text-text-secondary leading-relaxed">
                      Detected from 3 escalating messages. Urgency language: "the line is halted", "please hurry".
                    </p>
                  </div>

                  <div className="bg-white border border-border rounded-[12px] p-4 px-5 shadow-card">
                    <span className="text-micro font-bold text-text-muted uppercase tracking-wider">BUSINESS IMPACT</span>
                    <div className="flex items-center gap-2 mt-2.5">
                      <AlertTriangle size={20} className="text-danger" />
                      <span className="text-[16px] font-semibold text-danger">Critical</span>
                    </div>
                    <p className="mt-1.5 text-[12px] text-text-secondary leading-relaxed">
                      Production line halted. Estimated impact: 200+ workers, Line 3 output at 0% for 38 min.
                    </p>
                  </div>

                  <div className="bg-white border border-border rounded-[12px] p-4 px-5 shadow-card">
                    <span className="text-micro font-bold text-text-muted uppercase tracking-wider">AI CLASSIFICATION</span>
                    <div className="flex flex-col mt-2">
                      <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
                        <span className="text-[11px] text-text-muted uppercase">Category</span>
                        <span className="text-[14px] font-medium text-text-primary">Application</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
                        <span className="text-[11px] text-text-muted uppercase">Type</span>
                        <span className="text-[14px] font-medium text-text-primary">Incident</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
                        <span className="text-[11px] text-text-muted uppercase">Root Cause</span>
                        <span className="text-[14px] font-bold text-danger">Memory Leak</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-[11px] text-text-muted uppercase">CSAT Score</span>
                        <span className="text-[14px] font-bold text-warning">4.2 / 5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-border my-2 mb-6" />

                {/* PART B — RELATED TICKETS */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-white border border-border rounded-[12px] p-5 shadow-card">
                    <span className="text-micro font-bold text-text-muted uppercase tracking-wider">TICKET PROPERTIES</span>
                    <div className="flex flex-col mt-4">
                      {[
                        { label: 'Priority', value: 'P1' },
                        { label: 'Status', value: 'In Progress' },
                        { label: 'Category', value: 'Application' },
                        { label: 'Type', value: 'Incident' },
                        { label: 'Impact', value: 'High' },
                        { label: 'Urgency', value: 'Critical', urgent: true },
                      ].map((prop, i) => (
                        <div key={i} className="flex justify-between py-2 border-b border-[#F3F4F6] last:border-0">
                          <span className="text-[11px] text-text-muted uppercase">{prop.label}</span>
                          <span className={`text-[14px] font-medium ${prop.urgent ? 'text-danger' : 'text-text-primary'}`}>{prop.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-border rounded-[12px] p-5 shadow-card">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={14} className="text-primary" />
                      <span className="text-micro font-bold text-text-muted uppercase tracking-wider">KB SUGGESTIONS</span>
                    </div>
                    <div className="flex flex-col">
                      {kbArticles.map((article, i) => (
                        <div key={i} className="py-2.5 border-b border-[#F3F4F6] last:border-0">
                          <div className="flex justify-between items-start">
                            <span className="text-[14px] font-medium text-text-primary truncate pr-4">{article.title}</span>
                            <div className="flex items-center gap-2">
                              <ThumbsUp size={14} className="text-text-muted" />
                              <ThumbsDown size={14} className="text-text-muted" />
                            </div>
                          </div>
                          <div className="mt-1">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              article.match >= 90 ? 'bg-[#D1FAE5] text-[#059669]' : 
                              article.match >= 80 ? 'bg-[#FEF3C7] text-[#D97706]' : 
                              'bg-[#EEF0FF] text-[#5B4FE8]'
                            }`}>
                              {article.match}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-border rounded-[12px] p-5 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Link2 size={16} className="text-warning" />
                    <h3 className="text-[16px] font-semibold text-text-primary">Related Tickets</h3>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { id: 'INC-4498', title: 'SAP crash — similar plant issue', status: 'In Progress', statusColor: 'bg-[#FEF3C7] text-[#D97706]' },
                      { id: 'INC-4401', title: 'SAP module timeout — Gurgaon plant', status: 'Resolved', statusColor: 'bg-[#D1FAE5] text-[#059669]' },
                    ].map((ticket, i) => (
                      <div key={i} className="border border-border rounded-[10px] p-3.5 px-4.5 flex justify-between items-center hover:bg-[#F9FAFB] cursor-pointer transition-all">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-warning">{ticket.id}</span>
                          <span className="text-[14px] text-text-primary mt-0.5">{ticket.title}</span>
                        </div>
                        <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full ${ticket.statusColor}`}>{ticket.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: 30% Fixed Width, Full Height sibling of Left Panel */}
        <div className="flex-[0_0_30%] h-full flex flex-col overflow-hidden bg-white border-l border-border sticky top-0">
          <header className="p-4 px-5 border-b border-border flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-3">
              <Bot size={16} className="text-primary" />
              <h2 className="text-[14px] font-bold text-text-primary uppercase tracking-tight">Ask AI Assistant</h2>
            </div>
            <div className="flex items-center gap-2 bg-success/10 text-success text-[10px] font-bold px-2 py-1 rounded-[4px] border border-success/20">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              LIVE
            </div>
          </header>

          <div className="p-4 px-5 border-b border-border bg-bg-page flex-shrink-0">
            <span className="text-micro font-bold text-text-muted uppercase tracking-widest block mb-3">QUICK ACTIONS</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: <FileText size={12} />, label: 'Summarise ticket' },
                { icon: <Lightbulb size={12} />, label: 'Suggest resolution' },
                { icon: <ArrowUpRight size={12} />, label: 'Draft escalation' },
                { icon: <Search size={12} />, label: 'Find similar tickets' },
              ].map((action, i) => (
                <button key={i} className="flex items-center gap-2 border border-border bg-white p-2 px-3 rounded-[8px] text-[12px] text-text-primary font-medium hover:bg-primary-light hover:border-primary transition-all shadow-sm">
                  {action.icon} {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            <div className="bg-bg-page border border-border rounded-[10px] p-3 text-[13px] text-text-primary leading-relaxed shadow-sm">
              Hi! I'm your AI assistant. Ask me anything about this ticket, resolution steps, or KB articles.
            </div>
          </div>

          <div className="p-4 px-5 border-t border-border bg-white flex-shrink-0">
            <div className="flex items-center gap-2">
              <input 
                className="flex-1 bg-bg-page border border-border rounded-btn px-3.5 py-2.5 text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
                placeholder="Ask anything..."
              />
              <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-sm hover:bg-primary-dark transition-all">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
        
        {/* PDF Viewer Overlay */}
        <div 
          className={`fixed top-[56px] right-0 bottom-0 bg-white border-l border-border shadow-[-4px_0_16px_rgba(0,0,0,0.08)] z-[100] transition-transform duration-300 ease-in-out w-[460px] flex flex-col ${
            isPdfVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <header className="p-5 border-b border-border flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h2 className="text-[16px] font-bold text-text-primary leading-tight">{selectedKbArticle?.title || 'SAP Module Crash — Memory Leak Fix'}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-primary-light text-primary text-[11px] font-bold px-2 py-0.5 rounded">{selectedKbArticle?.id || 'KB-2089'}</span>
                <span className="bg-border-subtle text-text-secondary text-[11px] px-2 py-0.5 rounded font-medium">{selectedKbArticle?.category || 'Application'}</span>
                <span className="bg-[#D1FAE5] text-[#059669] text-[10px] font-bold px-2 py-0.5 rounded">Published</span>
              </div>
            </div>
            <button onClick={() => setIsPdfVisible(false)} className="text-text-muted hover:text-text-primary transition-colors p-1">
              <X size={20} />
            </button>
          </header>
          
          <div className="flex-1 overflow-y-auto p-6 px-8 text-[14px] text-text-primary leading-[1.8]">
            <section className="mb-8">
              <h3 className="font-bold text-[17px] mb-2 text-[#111827]">Overview</h3>
              <p>This article provides comprehensive troubleshooting and resolution steps for Network-related issues frequently encountered across Maruti Suzuki IT infrastructure. It covers initial diagnostics, service restart procedures, cache clearing, and connectivity verification.</p>
            </section>

            <section className="mb-8">
              <h3 className="font-bold text-[17px] mb-2 text-[#111827]">Problem Description</h3>
              <p>Users may experience service disruption, application errors, or connectivity issues related to VPN configuration for remote workers. Common symptoms include timeout errors, authentication failures, and intermittent connectivity drops.</p>
            </section>

            <section className="mb-8">
              <h3 className="font-bold text-[17px] mb-2 text-[#111827]">Prerequisites</h3>
              <ul className="list-disc pl-5 space-y-1 text-[#374151]">
                <li>Admin access to the relevant service/application</li>
                <li>Network connectivity to the affected systems</li>
                <li>Access to monitoring dashboards</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="font-bold text-[17px] mb-2 text-[#111827]">Resolution Steps</h3>
              <ol className="list-decimal pl-5 space-y-4">
                <li><strong>Initial Diagnostics:</strong> Check the application/service status on the centralized monitoring dashboard. Look for any alerts or anomalies in the last 24 hours.</li>
                <li><strong>Service Restart:</strong> If the service is unresponsive, perform a graceful restart and wait 60 seconds for the service to fully initialize.</li>
                <li><strong>Cache Clearing:</strong> Clear application cache via admin panel, reset user session cache, and flush DNS on affected workstations.</li>
                <li><strong>Connectivity Verification:</strong> Ping the service endpoint, check firewall rules, validate SSL certificates, and test from multiple network segments.</li>
                <li><strong>User Validation:</strong> Confirm resolution with affected users — ask them to clear browser cache, re-login, and verify the specific failing workflow.</li>
              </ol>
            </section>
          </div>

          <footer className="p-5 border-t border-border bg-bg-page flex flex-col gap-3">
            <div className="flex justify-between text-[12px] text-text-muted">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><Eye size={12} /> 892 views</span>
                <span className="flex items-center gap-1"><ThumbsUp size={12} className="text-success" /> 88% helpful</span>
              </div>
              <span>Updated 2 days ago</span>
            </div>
            <div className="text-[12px] text-text-muted">
              Author: <span className="font-medium text-text-primary">IT Knowledge Team</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default L1AgentWorkspace;
