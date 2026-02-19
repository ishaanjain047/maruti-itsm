
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PersonaCard from '../components/PersonaCard';
import { PERSONAS } from '../constants';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center">
      {/* Subtle Background Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: 'radial-gradient(ellipse at 50% 0%, rgba(91,79,232,0.06) 0%, transparent 70%)' 
        }}
      />

      <div className="relative z-10 w-full max-w-[880px] px-6 py-[80px] flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <span className="text-[13px] font-bold text-[#DC2626] tracking-tight">MARUTI SUZUKI</span>
            <div className="h-[1px] w-full bg-[#DC2626] mt-[1px]"></div>
          </div>

          {/* AI Chip */}
          <div className="mt-[20px] flex items-center gap-[8px] border border-border bg-white rounded-full px-[14px] py-[4px] shadow-sm">
            <Sparkles size={14} className="text-primary" />
            <span className="text-[13px] text-text-secondary">AI-Powered Enterprise ITSM</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-[52px] font-bold text-text-primary mt-[16px] tracking-[-0.02em]">
            Maruti ITSM
          </h1>

          {/* Subheading */}
          <p className="text-[16px] text-text-secondary text-center leading-[1.6] max-w-[480px] mt-[12px]">
            Select your role to experience a tailored, AI-driven IT service management workspace
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-[12px] text-micro text-text-muted font-medium mt-[16px]">
            <span>4 Persona Portals</span>
            <span>·</span>
            <span>16 AI Capabilities</span>
            <span>·</span>
            <span>Enterprise Scale</span>
          </div>
        </div>

        {/* Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] w-full mt-4">
          {PERSONAS.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} />
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-[32px] text-center">
          <Link 
            to="/unified" 
            className="text-[13px] text-text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            or go to the unified dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
