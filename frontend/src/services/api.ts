import axios from 'axios';
import { Applicant, Employee } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const applicantApi = {
  getAll: () => api.get<Applicant[]>('/applicants'),
  getById: (id: number) => api.get<Applicant>(`/applicants/${id}`),
  create: (applicant: Omit<Applicant, 'id'>) => api.post<Applicant>('/applicants', applicant),
  update: (id: number, applicant: Omit<Applicant, 'id'>) => api.put<Applicant>(`/applicants/${id}`, applicant),
  delete: (id: number) => api.delete(`/applicants/${id}`),
};

export const employeeApi = {
  getAll: () => api.get<Employee[]>('/employees'),
  getById: (id: number) => api.get<Employee>(`/employees/${id}`),
  create: (employee: Omit<Employee, 'id'>) => api.post<Employee>('/employees', employee),
  update: (id: number, employee: Omit<Employee, 'id'>) => api.put<Employee>(`/employees/${id}`, employee),
  delete: (id: number) => api.delete(`/employees/${id}`),
};

export default api;
