import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { applicantApi } from '../services/api';
import { Applicant } from '../types';

const ApplicantForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<Omit<Applicant, 'id'>>({
    name: '',
    numberCardIdentity: '',
    birthDate: '',
    address: '',
    email: '',
    phoneNumber: '',
    note: 0,
    technicalDomain: '',
    dateInterview: '',
    comments: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      fetchApplicant(parseInt(id));
    }
  }, [isEdit, id]);

  const fetchApplicant = async (applicantId: number) => {
    try {
      setLoading(true);
      const response = await applicantApi.getById(applicantId);
      const applicant = response.data;
      setFormData({
        name: applicant.name || '',
        numberCardIdentity: applicant.numberCardIdentity || '',
        birthDate: applicant.birthDate || '',
        address: applicant.address || '',
        email: applicant.email || '',
        phoneNumber: applicant.phoneNumber || '',
        note: applicant.note || undefined,
        technicalDomain: applicant.technicalDomain || '',
        dateInterview: applicant.dateInterview || '',
        comments: applicant.comments || '',
      });
    } catch (error) {
      console.error('Erreur lors du chargement du candidat:', error);
      setError('Erreur lors du chargement du candidat');
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
        await applicantApi.update(parseInt(id), formData);
      } else {
        await applicantApi.create(formData);
      }

      navigate('/applicants');
    } catch (error: any) {
      console.error('Erreur lors de la sauvegarde:', error);
      setError(
        error.response?.data?.message ||
        `Erreur lors de la ${isEdit ? 'modification' : 'création'} du candidat`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'note' ? parseInt(value) || 0 : value,
    }));
  };

  if (loading && isEdit) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/applicants')}
          className="mr-4 p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Modifier le candidat' : 'Nouveau candidat'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEdit ? 'Modifiez les informations du candidat' : 'Ajoutez un nouveau candidat'}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom complet"
              />
            </div>

            <div>
              <label htmlFor="numberCardIdentity" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de carte d'identité
              </label>
              <input
                type="text"
                id="numberCardIdentity"
                name="numberCardIdentity"
                value={formData.numberCardIdentity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Numéro de carte d'identité"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@exemple.com"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Numéro de téléphone"
              />
            </div>

            <div>
              <label htmlFor="technicalDomain" className="block text-sm font-medium text-gray-700 mb-1">
                Domaine technique
              </label>
              <input
                type="text"
                id="technicalDomain"
                name="technicalDomain"
                value={formData.technicalDomain}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Développement web, DevOps, etc."
              />
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                Evaluation (1 - 10)
              </label>
              <input
                type="number"
                id="note"
                name="note"
                min="0"
                max="10"
                value={formData.note}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Note (0-10)"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dateInterview" className="block text-sm font-medium text-gray-700 mb-1">
              Date d'entretien
            </label>
            <input
              type="date"
              id="dateInterview"
              name="dateInterview"
              value={formData.dateInterview}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Commentaires sur le candidat..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/applicants')}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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

export default ApplicantForm;
