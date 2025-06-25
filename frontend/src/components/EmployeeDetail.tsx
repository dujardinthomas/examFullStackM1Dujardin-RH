import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Calendar, MapPin, FileText, Euro, User, IdCard, Briefcase } from 'lucide-react';
import { employeeApi } from '../services/api';
import { Employee } from '../types';

const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchEmployee(parseInt(id));
    }
  }, [id]);

  const fetchEmployee = async (employeeId: number) => {
    try {
      setLoading(true);
      const response = await employeeApi.getById(employeeId);
      setEmployee(response.data);
      setError(null);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'employé:', error);
      setError('Employé non trouvé');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!employee?.id) return;
    
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      try {
        await employeeApi.delete(employee.id);
        navigate('/employees');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de l\'employé');
      }
    }
  };

  const isContractActive = (startDate?: string, endDate?: string) => {
    if (!startDate) return false;
    const now = new Date();
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    return start <= now && (!end || end >= now);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error || 'Employé non trouvé'}
        <div className="mt-4">
          <Link
            to="/employees"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/employees"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à la liste
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
            <p className="text-gray-600">Détails de l'employé</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/employees/edit/${employee.id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Informations personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Nom complet</label>
                <p className="mt-1 text-sm text-gray-900">{employee.name}</p>
              </div>
              {employee.numberIdentification && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Numéro d'identification</label>
                  <div className="mt-1 flex items-center text-sm text-gray-900">
                    <IdCard className="w-4 h-4 mr-2 text-gray-400" />
                    {employee.numberIdentification}
                  </div>
                </div>
              )}
              {employee.birthDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Date de naissance</label>
                  <div className="mt-1 flex items-center text-sm text-gray-900">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {new Date(employee.birthDate).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              )}
              {employee.address && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Adresse</label>
                  <div className="mt-1 flex items-center text-sm text-gray-900">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {employee.address}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              Contact
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <div className="mt-1 flex items-center text-sm text-gray-900">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <a href={`mailto:${employee.email}`} className="text-blue-600 hover:text-blue-800">
                    {employee.email}
                  </a>
                </div>
              </div>
              {employee.phoneNumber && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Téléphone</label>
                  <div className="mt-1 flex items-center text-sm text-gray-900">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <a href={`tel:${employee.phoneNumber}`} className="text-blue-600 hover:text-blue-800">
                      {employee.phoneNumber}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              Informations professionnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {employee.poste && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Poste</label>
                  <p className="mt-1 text-sm text-gray-900">{employee.poste}</p>
                </div>
              )}
              {employee.salary && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Salaire</label>
                  <div className="mt-1 flex items-center text-sm text-gray-900">
                    <Euro className="w-4 h-4 mr-2 text-gray-400" />
                    {employee.salary} €
                  </div>
                </div>
              )}
              {employee.startContract && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Début du contrat</label>
                  <div className="mt-1 flex items-center text-sm text-gray-900">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {new Date(employee.startContract).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              )}
              {employee.endContract && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Fin du contrat</label>
                  <div className="mt-1 flex items-center text-sm text-gray-900">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {new Date(employee.endContract).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              )}
            </div>
          </div>

          {employee.comments && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Commentaires
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{employee.comments}</p>
              </div>
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default EmployeeDetail;
