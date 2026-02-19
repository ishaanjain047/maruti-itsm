
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Persona } from '../types';

interface PersonaCardProps {
  persona: Persona;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(persona.route)}
      className="bg-bg-surface border border-border rounded-[16px] p-[28px] cursor-pointer transition-all duration-200 hover:border-primary hover:shadow-[0_4px_20px_rgba(91,79,232,0.1)] group"
    >
      <div className="flex justify-between items-center">
        <span 
          className="text-micro font-semibold tracking-[0.1em]" 
          style={{ color: persona.accent }}
        >
          {persona.label}
        </span>
        <span className="text-[12px] text-text-muted">
          {persona.count}
        </span>
      </div>

      <div 
        className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center text-white mt-[16px]"
        style={{ backgroundColor: persona.accent }}
      >
        {persona.icon}
      </div>

      <h3 className="text-[20px] font-semibold text-text-primary mt-[16px]">
        {persona.name}
      </h3>
      <p className="text-[13px] text-text-muted mt-[2px]">
        {persona.subtitle}
      </p>

      <p className="text-body text-text-secondary leading-[1.6] mt-[12px]">
        {persona.description}
      </p>

      <div className="text-[14px] text-primary font-medium mt-[20px] flex items-center group-hover:translate-x-1 transition-transform">
        Enter Portal →
      </div>
    </div>
  );
};

export default PersonaCard;
