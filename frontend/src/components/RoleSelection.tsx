import React from 'react';
import { UserIcon, Stethoscope, Users, ArrowRightIcon, Brain } from 'lucide-react';
interface RoleSelectionProps {
  onSelectRole: (role: 'patient' | 'doctor' | 'family') => void;
}
export const RoleSelection = ({
  onSelectRole
}: RoleSelectionProps) => {
  return <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Brain size={40} className="text-indigo-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-indigo-700">NeuroBrain360</h1>
          <p className="text-gray-500 mt-1">AI-Powered Neurological Health</p>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Who are you?
        </h2>
        <div className="space-y-4">
          <button onClick={() => onSelectRole('patient')} className="w-full bg-white border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 rounded-lg p-4 flex items-center transition-colors">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <UserIcon size={24} className="text-indigo-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-gray-800">Patient</h3>
              <p className="text-sm text-gray-500">
                Access your personal health dashboard
              </p>
            </div>
            <ArrowRightIcon size={20} className="text-gray-400" />
          </button>
          <button onClick={() => onSelectRole('doctor')} className="w-full bg-white border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 rounded-lg p-4 flex items-center transition-colors">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Stethoscope size={24} className="text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-gray-800">Healthcare Provider</h3>
              <p className="text-sm text-gray-500">
                Manage patient care and treatment
              </p>
            </div>
            <ArrowRightIcon size={20} className="text-gray-400" />
          </button>
          <button onClick={() => onSelectRole('family')} className="w-full bg-white border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 rounded-lg p-4 flex items-center transition-colors">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Users size={24} className="text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-gray-800">Family Member</h3>
              <p className="text-sm text-gray-500">
                Support and monitor your loved one
              </p>
            </div>
            <ArrowRightIcon size={20} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>;
};