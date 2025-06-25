import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { employeeApi } from '../services/api';
import { Employee } from '../types';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    name: '',
    poste: '',
    salary: undefined,
    startContract: '',
    endContract: '',
    numberIdentification: '',
    birthDate: '',
    address: '',
    phoneNumber: '',
    comments: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      fetchEmployee(parseInt(id));
    }
  }, [isEdit, id]);

  const fetchEmployee = async (employeeId: number) => {
    try {
      setLoading(true);
      const response = await employeeApi.getById(employeeId);
      const employee = response.data;
      setFormData({
        name: employee.name || '',
        poste: employee.poste || '',
        salary: employee.salary || undefined,
        startContract: employee.startContract || '',
        endContract: employee.endContract || '',
        numberIdentification: employee.numberIdentification || '',
        birthDate: employee.birthDate || '',
        address: employee.address || '',
        phoneNumber: employee.phoneNumber || '',
        comments: employee.comments || '',
        email: employee.email || '',
      });
    } catch (error) {
      console.error('Erreur lors du chargement de l\'employé:', error);
      setError('Erreur lors du chargement de l\'employé');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Le nom et l\'email sont requis');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isEdit && id) {
        await employeeApi.update(parseInt(id), formData);
      } else {
        await employeeApi.create(formData);
      }

      navigate('/employees');
    } catch (error: any) {
      console.error('Erreur lors de la sauvegarde:', error);
      setError(
        error.response?.data?.message ||
        `Erreur lors de la ${isEdit ? 'modification' : 'création'} de l'employé`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salary' ? parseFloat(value) || 0 : value,
    }));
  };

  if (loading && isEdit) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/employees')}
          className="mr-4 p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Modifier l\'employé' : 'Nouvel employé'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEdit ? 'Modifiez les informations de l\'employé' : 'Ajoutez un nouvel employé'}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Nom complet"
              />
            </div>

            <div>
              <label htmlFor="numberIdentification" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro d'identification
              </label>
              <input
                type="text"
                id="numberIdentification"
                name="numberIdentification"
                value={formData.numberIdentification}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Numéro d'indentification"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Adresse"
              />
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                Date de naissance
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="nom@exemple.com"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Numéro de téléphone"
              />
            </div>

            <div>
              <label htmlFor="poste" className="block text-sm font-medium text-gray-700 mb-1">
                Occupation / Poste
              </label>
              <input
                type="text"
                id="poste"
                name="poste"
                value={formData.poste}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Occupation ou Poste dans l'entreprise"
              />
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                Salaire
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                min={0}
                step={0.01}
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Salaire"
              />
            </div>

            <div>
              <label htmlFor="startContract" className="block text-sm font-medium text-gray-700 mb-1">
                Début du contrat
              </label>
              <input
                type="date"
                id="startContract"
                name="startContract"
                value={formData.startContract}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="endContract" className="block text-sm font-medium text-gray-700 mb-1">
                Fin de contrat
              </label>
              <input
                type="date"
                id="endContract"
                name="endContract"
                value={formData.endContract}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
              Commentaires
            </label>
            <textarea
              id="comments"
              name="comments"
              rows={4}
              value={formData.comments}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Commentaires sur l'employé..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/employees')}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
