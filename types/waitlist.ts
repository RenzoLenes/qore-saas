export type CompanySize = '1-10' | '11-50' | '51-200' | '200+';

export type Industry =
  | 'Construcción'
  | 'Retail'
  | 'Servicios'
  | 'Logística'
  | 'Oficina/Administrativo'
  | 'Otro';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'rejected';

export interface WaitlistLead {
  id: string;
  email: string;
  company_name: string;
  company_size: CompanySize;
  industry: Industry | null;
  contact_consent: boolean;
  status: LeadStatus;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface WaitlistFormData {
  email: string;
  company_name: string;
  company_size: CompanySize;
  industry?: Industry;
  contact_consent: boolean;
}
