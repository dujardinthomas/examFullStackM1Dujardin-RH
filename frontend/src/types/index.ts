export interface Applicant {
  id?: number;
  name: string;
  numberCardIdentity?: string;
  birthDate?: string;
  address?: string;
  email: string;
  phoneNumber?: string;
  note?: number;
  technicalDomain?: string;
  dateInterview?: string;
  comments?: string;
}

export interface Employee {
  id?: number;
  name: string;
  poste?: string;
  salary?: number;
  startContract?: string;
  endContract?: string;
  numberIdentification?: string;
  birthDate?: string;
  address?: string;
  phoneNumber?: string;
  comments?: string;
  email: string;
}
