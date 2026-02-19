
import React from 'react';

export interface Persona {
  id: string;
  label: string;
  accent: string;
  count: string;
  icon: React.ReactNode;
  name: string;
  subtitle: string;
  description: string;
  route: string;
}

export enum TicketPriority {
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  P4 = 'P4',
}

export enum TicketStatus {
  PUBLISHED = 'Published',
  REVIEW = 'Review',
  STALE = 'Stale',
  DRAFT = 'Draft',
}

export enum TicketCategory {
  NETWORK = 'Network',
  APPLICATION = 'Application',
  HARDWARE = 'Hardware',
  EMAIL = 'Email',
  SECURITY = 'Security',
}
