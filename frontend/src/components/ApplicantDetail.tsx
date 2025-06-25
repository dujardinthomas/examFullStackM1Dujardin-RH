import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Calendar, MapPin, FileText, Star, User, IdCard } from 'lucide-react';
import { applicantApi } from '../services/api';
import { Applicant } from '../types';

const ApplicantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchApplicant(parseInt(id));
    }
  }, [id]);

  const fetchApplicant = async (applicantId: number) => {
    try {
      setLoading(true);
      const response = await applicantApi.getById(applicantId);
      setApplicant(response.data);
      setError(null);
    } catch (error) {
      console.error('Erreur lors du chargement du candidat:', error);
      setError('Candidat non trouvé');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!applicant?.id) return;
    
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce candidat ?')) {
      try {
        await applicantApi.delete(applicant.id);
        navigate('/applicants');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression du candidat');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !applicant) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error || 'Candidat non trouvé'}
        <div className="mt-4">
          <Link
            to="/applicants"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 15) return 'bg-green-100 text-green-800';
    if (score >= 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/applicants"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à la liste
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{applicant.name}</h1>
            <p className="text-gray-600">Détails du candidat</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/applicants/edit/${applicant.id}`}
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
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations personnelles */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Informations personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Nom complet</label>
                <p className="mt-1 text-sm text-gray-900">{applicant.name}</p>
              </div>
              {applicant.numberCardIdentity && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Numéro de carte d'identité</label>
                  <div className="mt-1 flex items-center text-sm text-gray-900">
                    <IdCard className="w-4 h-4 mr-2 text-gray-400" />
                    {applicant.numberCardIdentity}
                  </div>
                </div>
              )}
              {applicant.birthDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Date de naissance</label>
                  <div className="mt-1 flex items-center text-sm text-gray-900">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {new Date(applicant.birthDate).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              )}
              {applicant.address && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Adresse</label>
                  <div className="mt-1 flex items-center text-sm text-gray-900">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {applicant.address}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact */}
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
                  <a href={`mailto:${applicant.email}`} className="text-blue-600 hover:text-blue-800">
                    {applicant.email}
                  </a>
                </div>
              </div>
              {applicant.phoneNumber && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Téléphone</label>
                  <div className="mt-1 flex items-center text-sm text-gray-900">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <a href={`tel:${applicant.phoneNumber}`} className="text-blue-600 hover:text-blue-800">
                      {applicant.phoneNumber}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Commentaires */}
          {applicant.comments && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Commentaires
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{applicant.comments}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Score */}
          {applicant.note !== undefined && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Star className="w-5 h-5 mr-2 text-blue-600" />
                Évaluation
              </h3>
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${getScoreColor(applicant.note)}`}>
                  {applicant.note}/20
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(applicant.note / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {applicant.technicalDomain && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Domaine technique</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {applicant.technicalDomain}
              </span>
            </div>
          )}

          {applicant.dateInterview && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Date de l'entretien
              </h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {new Date(applicant.dateInterview).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long'
                  })}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(applicant.dateInterview).toLocaleDateString('fr-FR', {
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;
