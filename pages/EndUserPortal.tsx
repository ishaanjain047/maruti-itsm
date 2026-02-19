
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Bot, 
  Plus, 
  User, 
  Bell, 
  ChevronRight, 
  Paperclip, 
  Send, 
  BookOpen, 
  Check, 
  CheckCircle, 
  XCircle, 
  TicketCheck, 
  Upload,
  Search,
  MessageSquare
} from 'lucide-react';

// --- Types ---

type CanvasState = 'none' | 'checklist' | 'form' | 'success_resolved' | 'success_ticket' | 'kb_list' | 'pdf';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system' | 'agent';
  text: string;
  sender?: string;
  kbRef?: { id: string; title: string };
  resolutionCard?: boolean;
}

interface Ticket {
  id: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  title: string;
  time: string;
  unread?: number;
}

// --- Constants ---

const INITIAL_TICKETS: Ticket[] = [
  { id: 'INC-4532', priority: 'P1', title: 'SAP login failure at Gurgaon plant', time: '10 min ago', unread: 2 },
  { id: 'INC-4490', priority: 'P2', title: 'VPN disconnects frequently', time: '2 days ago', unread: 1 },
  { id: 'INC-4401', priority: 'P3', title: 'Outlook calendar not syncing', time: '5 days ago' },
];

const KB_ARTICLES = [
  { id: 'KB-2041', title: 'VPN Configuration for Remote Workers', category: 'Network', match: 92 },
  { id: 'KB-1887', title: 'Cisco AnyConnect Troubleshooting Guide', category: 'Network', match: 78 },
  { id: 'KB-2103', title: 'DNS and Network Adapter Reset Steps', category: 'Network', match: 65 },
];

const STARTER_CHIPS = [
  "VPN not connecting from home",
  "SAP error 500 on login",
  "Reset my AD password",
  "Outlook not syncing on mobile",
  "New laptop request",
  "Printer not working"
];

// --- Sub-components ---

const PriorityDot: React.FC<{ priority: string }> = ({ priority }) => {
  const colors: Record<string, string> = { P1: '#EF4444', P2: '#F59E0B', P3: '#3B82F6', P4: '#6B7280' };
  return <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[priority] }} />;
};

const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-2 mb-6">
    <div className="w-8 h-8 rounded-full bg-ai flex items-center justify-center text-white flex-shrink-0">
      <Bot size={16} />
    </div>
    <div className="flex gap-1 items-center bg-border-subtle px-3 py-2 rounded-full">
      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
    </div>
  </div>
);

// --- Main Portal Component ---

const EndUserPortal: React.FC = () => {
  const navigate = useNavigate();
  const threadEndRef = useRef<HTMLDivElement>(null);

  // Layout State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [canvasState, setCanvasState] = useState<CanvasState>('none');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);

  // Data State
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [checklistSteps, setChecklistSteps] = useState([false, false, false, false, false, false]);

  // Form State
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'Network → VPN',
    priority: 'P1 — Critical'
  });

  // Effects
  useEffect(() => {
    if (threadEndRef.current) {
      threadEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Actions
  const resetPortal = () => {
    setMessages([]);
    setCanvasState('none');
    setActiveTicketId(null);
    setInputValue('');
    setIsTyping(false);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI Logic Simulation
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: "I found a solution for your issue! I've prepared a step-by-step checklist from our knowledge base. Please follow the steps on the right panel and mark each as done.",
        kbRef: { id: 'KB-2041', title: 'VPN Configuration for Remote Workers' }
      };
      setMessages(prev => [...prev, aiMsg]);
      setCanvasState('checklist');
    }, 1500);
  };

  const selectTicket = (ticket: Ticket) => {
    setActiveTicketId(ticket.id);
    setCanvasState('kb_list');
    
    // Simulate loading specific ticket history
    if (ticket.id === 'INC-4401') {
      setMessages([
        { id: '1', type: 'user', text: "Outlook calendar not syncing on mobile" },
        { id: '2', type: 'ai', text: "I found a fix for Outlook calendar sync issues. Please follow the troubleshooting checklist I've prepared.", kbRef: { id: 'KB-1923', title: 'Outlook Mobile Sync Guide' } },
        { id: '3', type: 'system', text: "AI applied resolution steps from KB-1923" },
        { id: '4', type: 'user', text: "The steps worked, the calendar is syncing now." },
        { id: '5', type: 'ai', text: "Great news! I'll mark this as resolved." },
        { id: '6', type: 'system', text: "Ticket resolved by AI — INC-4401 closed" },
        { id: '7', type: 'ai', text: "Resolution summary", resolutionCard: true }
      ]);
    } else if (ticket.id === 'INC-4532') {
      setMessages([
        { id: '1', type: 'user', text: "SAP login failure at Gurgaon plant. Getting error 500 on login screen." },
        { id: '2', type: 'ai', text: "I found relevant KB articles for SAP Error 500. Please try these steps.", kbRef: { id: 'KB-2089', title: 'SAP Error 500 Auth Fix' } },
        { id: '3', type: 'system', text: "AI applied resolution from KB-2089" },
        { id: '4', type: 'user', text: "Still not working. The error persists." },
        { id: '5', type: 'ai', text: "I understand. This issue may require manual intervention. I've created a ticket and assigned it to our L1 support team." },
        { id: '6', type: 'system', text: "Ticket INC-4532 created — P1 Critical, assigned to Priya M." },
        { id: '7', type: 'agent', text: "Hi Rajesh, I've picked up your ticket. I can see the SAP authentication service is having issues at the Gurgaon cluster. I'm working on it now and will update you shortly.", sender: "Priya M. — L1 Support Agent" },
        { id: '8', type: 'system', text: "10 min ago" },
        { id: '9', type: 'agent', text: "Update: I've restarted the auth service. Can you try logging in again?", sender: "Priya M. — L1 Support Agent" }
      ]);
    } else {
      setMessages([]);
    }
  };

  const handleIssueUnresolved = () => {
    const userMsg: Message = { id: Date.now().toString(), type: 'user', text: "I tried the steps but the issue is still not resolved." };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: "I understand. Let me create a support ticket and assign it to our L1 team. I've pre-filled the details from our conversation — please review and submit."
      };
      setMessages(prev => [...prev, aiMsg]);
      setFormData({
        subject: "VPN not connecting from home",
        description: "VPN not connecting from home. Tried basic troubleshooting steps without success.",
        category: "Network → VPN",
        priority: "P1 — Critical"
      });
      setCanvasState('form');
    }, 1200);
  };

  const handleSubmitTicket = () => {
    setCanvasState('success_ticket');
    const systemMsg: Message = { id: Date.now().toString(), type: 'system', text: `Ticket INC-4532 created — Open, In Queue, P1 Critical` };
    setMessages(prev => [...prev, systemMsg]);

    setTimeout(() => {
      // Refresh sidebar and go home
      const newTicket: Ticket = {
        id: 'INC-4532',
        priority: 'P1',
        title: formData.subject,
        time: 'Just now'
      };
      setTickets(prev => [newTicket, ...prev.filter(t => t.id !== 'INC-4532')]);
      resetPortal();
    }, 3000);
  };

  // --- Render Helpers ---

  return (
    <div className="flex flex-col h-screen bg-bg-page overflow-hidden">
      
      {/* Top Navigation */}
      <nav className="h-[56px] bg-white border-b border-border flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="hover:bg-border-subtle p-1 rounded-full transition-colors">
            <ChevronLeft size={16} className="text-text-secondary" />
          </button>
          <div className="flex flex-col items-start">
            <span className="text-[12px] font-bold text-[#DC2626]">MARUTI SUZUKI</span>
          </div>
          <div className="h-4 w-[1px] bg-border"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
              <Bot size={20} className="text-primary" />
            </div>
            <span className="text-[16px] font-semibold text-text-primary">IT Support Assistant</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={resetPortal}
            className="flex items-center gap-2 bg-primary text-white font-medium text-[14px] px-[18px] py-[10px] rounded-btn hover:bg-primary-dark transition-colors"
          >
            <Plus size={14} />
            New Issue
          </button>
          <div className="h-6 w-[1px] bg-border"></div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-text-secondary flex items-center justify-center text-white text-[13px] font-semibold">
              RK
            </div>
            <span className="text-[14px] font-medium text-text-primary">Rajesh Kumar</span>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Sidebar */}
        <aside 
          className={`bg-white border-r border-border flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-[240px]' : 'w-0'}`}
          style={{ overflow: 'hidden' }}
        >
          <div className="p-4 flex justify-between items-center border-b border-border-subtle min-w-[240px]">
            <span className="text-micro font-semibold tracking-[0.08em] text-text-muted">MY OPEN TICKETS</span>
            <button onClick={() => setIsSidebarOpen(false)} className="text-text-muted hover:text-text-primary">
              <ChevronLeft size={14} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto min-w-[240px]">
            {tickets.map(ticket => (
              <div 
                key={ticket.id}
                onClick={() => selectTicket(ticket)}
                className={`p-4 border-b border-border-subtle cursor-pointer hover:bg-bg-page transition-colors ${activeTicketId === ticket.id ? 'bg-primary-light border-l-[3px] border-primary' : ''}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <PriorityDot priority={ticket.priority} />
                    <span className="text-ticket-id font-semibold text-primary">{ticket.id}</span>
                  </div>
                  {ticket.unread && (
                    <div className="flex items-center gap-1 bg-primary-light text-primary text-[11px] font-medium px-2 py-0.5 rounded-full">
                      <Bell size={10} />
                      {ticket.unread} unread
                    </div>
                  )}
                </div>
                <h4 className="text-[13px] text-text-primary font-medium line-clamp-2 leading-tight">
                  {ticket.title}
                </h4>
                <p className="text-[12px] text-text-muted mt-1">{ticket.time}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Sidebar Expansion Strip */}
        {!isSidebarOpen && (
          <div 
            className="w-[20px] bg-white border-r border-border cursor-pointer flex items-center justify-center hover:bg-border-subtle transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <ChevronRight size={14} className="text-text-muted" />
          </div>
        )}

        {/* Center Panel (Chat Area) */}
        <div className="flex-1 flex flex-col bg-bg-page relative transition-all duration-300">
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 flex flex-col scroll-smooth">
            {messages.length === 0 ? (
              // Welcome Screen
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-[72px] h-[72px] bg-ai rounded-[20px] shadow-[0_8px_24px_rgba(124,58,237,0.25)] flex items-center justify-center text-white">
                  <Bot size={32} />
                </div>
                <h1 className="text-[32px] font-bold text-text-primary mt-6">How can I help you today?</h1>
                <p className="text-[15px] text-text-secondary mt-2 text-center max-w-[480px]">
                  Describe your IT issue — I'll troubleshoot, find solutions, or create a ticket
                </p>
                
                <div className="mt-8 w-full max-w-[680px]">
                  <div className="bg-white border border-border rounded-[14px] p-4 shadow-card focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-light transition-all">
                    <textarea 
                      className="w-full bg-transparent border-none outline-none resize-none text-[14px] text-text-primary placeholder:text-text-muted min-h-[100px]"
                      placeholder="Describe your issue in detail..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage(inputValue))}
                    />
                    <div className="flex justify-between items-center mt-2 border-t border-border-subtle pt-3">
                      <button className="text-text-muted hover:text-text-primary">
                        <Paperclip size={18} />
                      </button>
                      <button 
                        disabled={!inputValue.trim()}
                        onClick={() => handleSendMessage(inputValue)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${inputValue.trim() ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-border-subtle text-text-muted cursor-not-allowed'}`}
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 justify-center">
                    {STARTER_CHIPS.map(chip => (
                      <button 
                        key={chip}
                        onClick={() => handleSendMessage(chip)}
                        className="bg-white border border-border rounded-full px-4 py-2 text-[13px] text-[#374151] hover:border-primary hover:bg-primary-light hover:text-primary transition-all shadow-sm"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Chat Thread
              <div className="max-w-4xl mx-auto w-full">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex w-full mb-6 ${msg.type === 'user' ? 'justify-end' : msg.type === 'system' ? 'justify-center' : 'justify-start'}`}>
                    
                    {msg.type === 'user' && (
                      <div className="flex items-start gap-2 max-w-[70%]">
                        <div className="bg-primary text-white p-4 rounded-t-[18px] rounded-bl-[18px] rounded-br-[4px] text-[14px]">
                          {msg.text}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-text-secondary flex items-center justify-center text-white text-[12px] font-semibold flex-shrink-0">
                          RK
                        </div>
                      </div>
                    )}

                    {(msg.type === 'ai' || msg.type === 'agent') && (
                      <div className="flex items-start gap-3 max-w-[75%]">
                        {msg.type === 'ai' ? (
                          <div className="w-8 h-8 rounded-full bg-ai flex items-center justify-center text-white flex-shrink-0">
                            <Bot size={16} />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-[12px] font-semibold flex-shrink-0">
                            {msg.sender?.split(' ')[0][0]}{msg.sender?.split(' ')[1][0]}
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          {msg.sender && <span className="text-micro font-medium text-text-secondary">{msg.sender}</span>}
                          {msg.resolutionCard ? (
                            <div className="bg-success/10 border border-success/30 rounded-card p-4 flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-success" />
                                <span className="text-[13px] font-semibold text-success">Resolved with AI</span>
                              </div>
                              <p className="text-[12px] text-text-secondary">KB-1923 applied · Resolved in 4 min · No agent required</p>
                            </div>
                          ) : (
                            <p className="text-[14px] text-text-primary leading-relaxed">{msg.text}</p>
                          )}
                          
                          {msg.kbRef && (
                            <button 
                              onClick={() => { setCanvasState('pdf'); }}
                              className="inline-flex items-center gap-2 bg-primary-light border-none rounded-badge px-3 py-1.5 text-[12px] text-primary hover:bg-primary-dark hover:text-white transition-colors w-fit"
                            >
                              <BookOpen size={12} />
                              {msg.kbRef.id} — {msg.kbRef.title}
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {msg.type === 'system' && (
                      <div className="flex items-center gap-4 w-full">
                        <div className="h-[1px] flex-1 bg-border-subtle"></div>
                        <span className="text-[12px] text-text-muted">{msg.text}</span>
                        <div className="h-[1px] flex-1 bg-border-subtle"></div>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={threadEndRef} />
              </div>
            )}
          </div>

          {/* Fixed Input Bar (when chat is active) */}
          {messages.length > 0 && (
            <div className="bg-white border-t border-border p-5">
              <div className="max-w-3xl mx-auto flex items-end gap-3 bg-bg-page border border-border rounded-[14px] px-4 py-2 focus-within:ring-2 focus-within:ring-primary-light transition-all">
                <button className="text-text-muted hover:text-text-primary pb-1">
                  <Paperclip size={18} />
                </button>
                <textarea 
                  className="flex-1 bg-transparent border-none outline-none resize-none text-[14px] text-text-primary py-2 max-h-[120px]"
                  placeholder="Type a message..."
                  rows={1}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage(inputValue))}
                />
                <button 
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className={`w-9 h-9 rounded-full flex items-center justify-center mb-1 transition-all ${inputValue.trim() ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-border-subtle text-text-muted cursor-not-allowed'}`}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Canvas */}
        <div 
          className={`bg-white border-l border-border transition-all duration-300 ease-in-out h-full overflow-y-auto ${canvasState !== 'none' ? 'w-[480px]' : 'w-0'}`}
          style={{ overflowX: 'hidden' }}
        >
          <div className="min-w-[480px]">
            {/* Checklist View */}
            {canvasState === 'checklist' && (
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <BookOpen size={18} className="text-primary" />
                    <h2 className="text-[18px] font-semibold text-text-primary">Troubleshooting Checklist</h2>
                  </div>
                  <p className="text-[13px] text-text-secondary mt-1">Follow these steps from our Knowledge Base</p>
                </div>
                
                <div className="mx-6 mt-4 bg-primary-light rounded-[10px] p-4 border border-primary/10">
                  <span className="text-[13px] font-semibold text-primary block">Source: KB-2041</span>
                  <span className="text-[13px] text-primary block mt-0.5">VPN Configuration for Remote Workers</span>
                </div>

                <div className="px-6 mt-5">
                  {[
                    "Open VPN client and check connection status",
                    "Disconnect and reconnect to the VPN",
                    "Clear DNS cache: Run 'ipconfig /flushdns' in CMD",
                    "Restart your network adapter",
                    "Try connecting to a different VPN server",
                    "Restart your computer and try again"
                  ].map((step, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-4 py-4 border-b border-border-subtle group cursor-pointer"
                      onClick={() => {
                        const newSteps = [...checklistSteps];
                        newSteps[idx] = !newSteps[idx];
                        setChecklistSteps(newSteps);
                      }}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${checklistSteps[idx] ? 'bg-success text-white' : 'bg-border-subtle text-text-muted'}`}>
                        {checklistSteps[idx] ? <Check size={12} /> : <span className="text-[12px] font-semibold">{idx + 1}</span>}
                      </div>
                      <span className={`text-[14px] transition-all ${checklistSteps[idx] ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="m-6 p-5 border-[1.5px] border-dashed border-border rounded-[12px] text-center">
                  <h4 className="text-[14px] font-medium text-text-primary">Did the above steps resolve your issue?</h4>
                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={() => setCanvasState('success_resolved')}
                      className="flex-1 bg-success text-white flex items-center justify-center gap-2 py-2.5 rounded-btn text-[14px] font-medium shadow-sm"
                    >
                      <CheckCircle size={16} /> Issue Resolved
                    </button>
                    <button 
                      onClick={handleIssueUnresolved}
                      className="flex-1 text-danger flex items-center justify-center gap-2 py-2.5 rounded-btn text-[14px] font-medium hover:bg-danger/5"
                    >
                      <XCircle size={16} /> Issue Unresolved
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Resolved Success View */}
            {canvasState === 'success_resolved' && (
              <div className="p-8 flex flex-col items-center text-center">
                <CheckCircle size={48} className="text-success mt-10" />
                <h2 className="text-[20px] font-semibold text-text-primary mt-4">Issue Resolved with AI</h2>
                <p className="text-[14px] text-text-secondary mt-2">Great! This ticket has been automatically closed.</p>
                <div className="mt-6 w-full bg-bg-page p-4 rounded-[10px] flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <span className="text-[13px] font-medium text-text-primary">Ticket Status: Resolved by AI</span>
                </div>
                <button 
                  onClick={resetPortal}
                  className="mt-8 text-primary font-medium text-[14px]"
                >
                  Return to Home
                </button>
              </div>
            )}

            {/* Create Ticket Form */}
            {canvasState === 'form' && (
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <TicketCheck size={18} className="text-primary" />
                    <h2 className="text-[18px] font-semibold text-text-primary">Create Support Ticket</h2>
                  </div>
                  <p className="text-[13px] text-text-secondary mt-1">Auto-filled from your chat context — review and submit</p>
                </div>

                <div className="p-6 flex flex-col gap-5">
                  <div className="flex flex-col">
                    <label className="text-micro font-semibold tracking-widest text-text-muted mb-1.5">SUBJECT</label>
                    <input 
                      className="bg-white border border-border rounded-input px-3 py-2 text-[14px] focus:border-primary focus:ring-2 focus:ring-primary-light outline-none"
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-micro font-semibold tracking-widest text-text-muted mb-1.5">DESCRIPTION</label>
                    <textarea 
                      className="bg-white border border-border rounded-input px-3 py-2 text-[14px] min-h-[100px] focus:border-primary focus:ring-2 focus:ring-primary-light outline-none resize-none"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-micro font-semibold tracking-widest text-text-muted mb-1.5">CATEGORY</label>
                      <select 
                        className="bg-white border border-border rounded-input px-3 py-2 text-[14px] outline-none"
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        <option>Network → VPN</option>
                        <option>Application → SAP</option>
                        <option>Hardware → Laptop</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-micro font-semibold tracking-widest text-text-muted mb-1.5">PRIORITY</label>
                      <select 
                        className="bg-white border border-border rounded-input px-3 py-2 text-[14px] outline-none"
                        value={formData.priority}
                        onChange={e => setFormData({...formData, priority: e.target.value})}
                      >
                        <option>P1 — Critical</option>
                        <option>P2 — High</option>
                        <option>P3 — Medium</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <label className="text-micro font-semibold tracking-widest text-text-muted mb-1.5">REQUESTER</label>
                      <input disabled className="bg-bg-page border border-border rounded-input px-3 py-2 text-[14px] text-text-muted" value="Rajesh Kumar" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-micro font-semibold tracking-widest text-text-muted mb-1.5">ID</label>
                      <input disabled className="bg-bg-page border border-border rounded-input px-3 py-2 text-[14px] text-text-muted" value="MSI-28451" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-micro font-semibold tracking-widest text-text-muted mb-1.5">LOCATION</label>
                      <input disabled className="bg-bg-page border border-border rounded-input px-3 py-2 text-[14px] text-text-muted" value="Gurgaon" />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-micro font-semibold tracking-widest text-text-muted mb-1.5">ATTACHMENTS</label>
                    <div className="border-[1.5px] border-dashed border-border rounded-input p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-bg-page transition-colors">
                      <Upload size={20} className="text-text-muted mb-2" />
                      <span className="text-[13px] text-text-muted">Drop files here or click to upload</span>
                      <span className="text-[12px] text-text-muted mt-1">Screenshots, logs — max 10MB</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleSubmitTicket}
                    className="w-full bg-primary text-white flex items-center justify-center gap-2 py-3.5 rounded-btn font-medium text-[15px] hover:bg-primary-dark transition-all mt-2"
                  >
                    <Send size={16} /> Submit Ticket
                  </button>
                </div>
              </div>
            )}

            {/* Ticket Success View */}
            {canvasState === 'success_ticket' && (
              <div className="p-10 flex flex-col items-center text-center">
                <CheckCircle size={56} className="text-success mt-12" />
                <h2 className="text-[22px] font-bold text-text-primary mt-5">Ticket Created Successfully!</h2>
                <p className="text-[14px] text-text-secondary mt-2">
                  Your ticket <span className="text-primary font-semibold">INC-4532</span> has been created.
                </p>
                
                <div className="mt-8 w-full bg-[#F0FDF4] border border-[#BBF7D0] rounded-[12px] p-6 grid grid-cols-2 gap-y-4 text-left">
                  <div>
                    <label className="text-micro font-bold text-text-muted block">TICKET ID</label>
                    <span className="text-[14px] font-semibold text-text-primary">INC-4532</span>
                  </div>
                  <div>
                    <label className="text-micro font-bold text-text-muted block">STATUS</label>
                    <span className="text-[14px] font-semibold text-text-primary">Open — In Queue</span>
                  </div>
                  <div>
                    <label className="text-micro font-bold text-text-muted block">SLA TARGET</label>
                    <span className="text-[14px] font-semibold text-text-primary">4 hours</span>
                  </div>
                  <div>
                    <label className="text-micro font-bold text-text-muted block">PRIORITY</label>
                    <span className="text-[14px] font-semibold text-text-primary">P1 — Critical</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[12px] text-text-muted">Redirecting to home screen...</span>
                </div>
              </div>
            )}

            {/* KB List View */}
            {canvasState === 'kb_list' && (
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <BookOpen size={18} className="text-primary" />
                    <h2 className="text-[18px] font-semibold text-text-primary">Related Knowledge Base</h2>
                  </div>
                  <p className="text-[13px] text-text-secondary mt-1">Articles related to this ticket</p>
                </div>
                
                <div className="flex-1">
                  {KB_ARTICLES.map(article => (
                    <div 
                      key={article.id}
                      onClick={() => setCanvasState('pdf')}
                      className="px-6 py-4 border-b border-border-subtle cursor-pointer hover:bg-bg-page transition-colors"
                    >
                      <h4 className="text-[14px] font-medium text-text-primary mb-2">{article.title}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-primary-light text-primary text-[11px] font-medium px-1.5 py-0.5 rounded">{article.id}</span>
                          <span className="bg-border-subtle text-text-secondary text-[11px] px-1.5 py-0.5 rounded">{article.category}</span>
                        </div>
                        <span className="text-[12px] text-success font-medium">{article.match}% match</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PDF Viewer State */}
            {canvasState === 'pdf' && (
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-border">
                  <button 
                    onClick={() => setCanvasState(activeTicketId ? 'kb_list' : 'checklist')}
                    className="flex items-center gap-1.5 text-primary text-[13px] font-medium mb-3"
                  >
                    <ChevronLeft size={14} /> Back to Articles
                  </button>
                  <h2 className="text-[16px] font-semibold text-text-primary">VPN Configuration for Remote Workers</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-primary-light text-primary text-[11px] font-medium px-1.5 py-0.5 rounded">KB-2041</span>
                    <span className="bg-border-subtle text-text-secondary text-[11px] px-1.5 py-0.5 rounded">Network</span>
                    <span className="bg-success/10 text-success text-[11px] px-1.5 py-0.5 rounded font-medium">Published</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 text-[14px] text-text-primary leading-[1.7]">
                  <h3 className="font-bold mb-2">Overview</h3>
                  <p className="mb-4">This article provides comprehensive troubleshooting and resolution steps for VPN-related issues frequently encountered across Maruti Suzuki IT infrastructure.</p>
                  
                  <h3 className="font-bold mb-2">Problem Description</h3>
                  <p className="mb-4">Users may experience VPN disconnection, authentication failures, or inability to connect. Common symptoms include timeout errors.</p>
                  
                  <h3 className="font-bold mb-2">Prerequisites</h3>
                  <ul className="list-disc pl-5 mb-4 flex flex-col gap-1">
                    <li>Admin access is not required</li>
                    <li>Ensure internet connection is active</li>
                    <li>Have employee ID ready</li>
                  </ul>
                  
                  <h3 className="font-bold mb-2">Resolution Steps</h3>
                  <ol className="list-decimal pl-5 flex flex-col gap-2">
                    <li>Check VPN client status and look for error codes.</li>
                    <li>Disconnect and reconnect using the Cisco AnyConnect client.</li>
                    <li>Run 'ipconfig /flushdns' in Command Prompt as administrator.</li>
                    <li>Disable and re-enable the network adapter in Device Manager.</li>
                    <li>Try an alternate VPN gateway if available.</li>
                    <li>Restart your computer and try again.</li>
                  </ol>
                </div>

                <div className="p-4 px-6 border-t border-border flex items-center gap-3 text-text-muted text-[12px]">
                  <span>Views: 892</span>
                  <span>·</span>
                  <span>Helpful: 88%</span>
                  <span>·</span>
                  <span>Updated 2 days ago</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndUserPortal;
