import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users, UserPlus, Home } from 'lucide-react';
import ApplicantList from './components/ApplicantList';
import EmployeeList from './components/EmployeeList';
import ApplicantForm from './components/ApplicantForm';
import EmployeeForm from './components/EmployeeForm';
import ApplicantDetail from './components/ApplicantDetail';
import EmployeeDetail from './components/EmployeeDetail';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-800">
                  Système de gestion RH
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Tableau de bord
                </Link>
                <Link
                  to="/applicants"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Candidats
                </Link>
                <Link
                  to="/employees"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Employés
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/applicants" element={<ApplicantList />} />
            <Route path="/applicants/new" element={<ApplicantForm />} />
            <Route path="/applicants/:id" element={<ApplicantDetail />} />
            <Route path="/applicants/edit/:id" element={<ApplicantForm />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/new" element={<EmployeeForm />} />
            <Route path="/employees/:id" element={<EmployeeDetail />} />
            <Route path="/employees/edit/:id" element={<EmployeeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
