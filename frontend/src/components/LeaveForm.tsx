import React, { useState } from 'react';

interface LeaveFormProps {
  onAddLeave: (leave: { startDate: string; endDate: string }) => void;
}

const LeaveForm: React.FC<LeaveFormProps> = ({ onAddLeave }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError('Veuillez renseigner les deux dates.');
      return;
    }
    if (startDate > endDate) {
      setError('La date de début doit être avant la date de fin.');
      return;
    }
    setError(null);
    onAddLeave({ startDate, endDate });
    setStartDate('');
    setEndDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg shadow">
      <h2 className="text-lg font-semibold">Ajouter un congé</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div className="flex-1 mt-2 md:mt-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Ajouter le congé
      </button>
    </form>
  );
};

export default LeaveForm; 