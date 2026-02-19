
import React from 'react';
import { Link } from 'react-router-dom';

interface GlobalNavBarProps {
  personaName: string;
}

const GlobalNavBar: React.FC<GlobalNavBarProps> = ({ personaName }) => {
  return (
    <nav className="h-[56px] bg-bg-surface border-b border-border flex items-center px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex flex-col items-start mr-4">
          <span className="text-[13px] font-bold text-[#DC2626]">MARUTI SUZUKI</span>
          <div className="h-[1px] w-full bg-[#DC2626] mt-[1px]"></div>
        </Link>
        <div className="h-6 w-[1px] bg-border mx-2"></div>
        <span className="text-[16px] font-semibold text-text-primary">{personaName}</span>
      </div>
      
      <div className="flex-1"></div>
      
      <div className="flex items-center gap-4">
        {/* Placeholder for common nav items like Search, Notifications, Profile */}
        <div className="w-8 h-8 rounded-full bg-border-subtle flex items-center justify-center text-text-muted text-[12px] font-bold">
          JD
        </div>
      </div>
    </nav>
  );
};

export default GlobalNavBar;
