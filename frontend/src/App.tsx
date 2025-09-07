import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { MemoryCompanion } from './components/MemoryCompanion';
import { MedicationManagement } from './components/MedicationManagement';
import { NutritionSupport } from './components/NutritionSupport';
import { FamilyConnect } from './components/FamilyConnect';
import { HealthcareProvider } from './components/HealthcareProvider';
import { RoleSelection } from './components/RoleSelection';
import { FamilyDashboard } from './components/FamilyDashboard';
import { FamilyAlerts } from './components/FamilyAlerts';
import { FamilyMemorySupport } from './components/FamilyMemorySupport';
import { FamilyMessageSupport } from './components/FamilyMessageSupport';
import { FamilyDailyActivities } from './components/FamilyDailyActivities';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userFlow, setUserFlow] = useState<'role-selection' | 'main'>('role-selection');
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'family'>('patient');

  const handleRoleSelect = (role: 'patient' | 'doctor' | 'family') => {
    setSelectedRole(role);
    setUserFlow('main'); 
    if (role === 'doctor') {
      setActiveTab('overview');
    } else {
      setActiveTab('dashboard');
    }
  };

  const renderPatientContent = () => {
    switch (activeTab) {
      case 'memory':
        return <MemoryCompanion />;
      case 'medication':
        return <MedicationManagement />;
      case 'nutrition':
        return <NutritionSupport />;
      case 'family-connect':
        return <FamilyConnect />;
      default:
        return <Dashboard />;
    }
  };

  const renderDoctorContent = () => {
    return <HealthcareProvider activeTab={activeTab} />;
  };

  const renderFamilyContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <FamilyDashboard />;
      case 'daily-activities':
        return <FamilyDailyActivities />;
      case 'alerts':
        return <FamilyAlerts />;
      case 'memory-support':
        return <FamilyMemorySupport />;
      case 'messages':
        return <FamilyMessageSupport />;
      default:
        return <FamilyDashboard />;
    }
  };

  const renderContent = () => {
    if (selectedRole === 'doctor') {
      return renderDoctorContent();
    } else if (selectedRole === 'family') {
      return renderFamilyContent();
    } else {
      return renderPatientContent();
    }
  };

  if (userFlow === 'role-selection') {
    return <RoleSelection onSelectRole={handleRoleSelect} />;
  }

  return (
    <div className="flex w-full min-h-screen bg-blue-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={selectedRole} />
      <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
    </div>
  );
}
