import React, { useState, useEffect } from 'react';
import { Users, UserPlus, TrendingUp, Calendar } from 'lucide-react';
import { applicantApi, employeeApi } from '../services/api';
import { Applicant, Employee } from '../types';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applicantsResponse, employeesResponse] = await Promise.all([
          applicantApi.getAll(),
          employeeApi.getAll()
        ]);
        
        setApplicants(Array.isArray(applicantsResponse.data) ? applicantsResponse.data : []);
        setEmployees(Array.isArray(employeesResponse.data) ? employeesResponse.data : []);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setApplicants([]);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">Vue d'ensemble du système RH</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 pointer" onClick={() => navigate('/applicants')}>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <UserPlus className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Candidats</h3>
              <p className="text-2xl font-bold text-blue-600">{applicants.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 pointer" onClick={() => navigate('/employees')}>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Users className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Employés</h3>
              <p className="text-2xl font-bold text-green-600">{employees.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 pointer" onClick={() => navigate('/applicants')}>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Entretiens</h3>
              <p className="text-2xl font-bold text-orange-600">
                {applicants.filter(applicant => applicant.dateInterview).length}
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
