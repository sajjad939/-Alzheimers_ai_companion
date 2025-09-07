import React, { useState, memo } from 'react';
import { Home, Brain, Pill, Apple, Users, User, Bell, FileText, Settings, LogOut, Menu, X, Calendar, MessageCircle } from 'lucide-react';
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: 'patient' | 'doctor' | 'family';
}
export const Sidebar = ({
  activeTab,
  setActiveTab,
  role
}: SidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); // Close mobile menu when a tab is clicked
  };
  const renderPatientMenu = () => <div className="space-y-1">
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('dashboard')}>
        <Home className="mr-3 h-5 w-5" />
        <span>Dashboard</span>
      </button>
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'memory' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('memory')}>
        <Brain className="mr-3 h-5 w-5" />
        <span>Memory Companion</span>
      </button>
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'medication' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('medication')}>
        <Pill className="mr-3 h-5 w-5" />
        <span>Medication</span>
      </button>
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'nutrition' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('nutrition')}>
        <Apple className="mr-3 h-5 w-5" />
        <span>Nutrition</span>
      </button>
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'family-connect' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('family-connect')}>
        <Users className="mr-3 h-5 w-5" />
        <span>Family Connect</span>
      </button>
    </div>;
  const renderDoctorMenu = () => <div className="space-y-1">
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'overview' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('overview')}>
        <Home className="mr-3 h-5 w-5" />
        <span>Overview</span>
      </button>
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'activities' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('activities')}>
        <Calendar className="mr-3 h-5 w-5" />
        <span>Patient Activities</span>
      </button>
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'alerts' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('alerts')}>
        <Bell className="mr-3 h-5 w-5" />
        <span>Alerts</span>
      </button>
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'reports' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('reports')}>
        <FileText className="mr-3 h-5 w-5" />
        <span>Reports</span>
      </button>
    </div>;
  const renderFamilyMenu = () => <div className="space-y-1">
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('dashboard')}>
        <Home className="mr-3 h-5 w-5" />
        <span>Dashboard</span>
      </button>
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'daily-activities' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('daily-activities')}>
        <Calendar className="mr-3 h-5 w-5" />
        <span>Daily Activities</span>
      </button>
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'alerts' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('alerts')}>
        <Bell className="mr-3 h-5 w-5" />
        <span>Alerts</span>
      </button>
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'memory-support' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('memory-support')}>
        <Brain className="mr-3 h-5 w-5" />
        <span>Memory Support</span>
      </button>
      <button className={`flex items-center w-full px-3 py-2 rounded-lg ${activeTab === 'messages' ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleTabClick('messages')}>
        <MessageCircle className="mr-3 h-5 w-5" />
        <span>Messages</span>
      </button>
    </div>;
  const renderMenu = () => {
    if (role === 'doctor') {
      return renderDoctorMenu();
    } else if (role === 'family') {
      return renderFamilyMenu();
    } else {
      return renderPatientMenu();
    }
  };
  return <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button onClick={toggleMobileMenu} className="bg-white p-2 rounded-full shadow-md">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Sidebar for desktop and mobile */}
      <aside className={`bg-white w-64 min-h-screen p-4 shadow-md flex flex-col z-40 transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'fixed inset-0 translate-x-0' : 'fixed -translate-x-full md:translate-x-0 md:static'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <Brain size={24} />
            </div>
            <h1 className="ml-2 text-xl font-bold text-gray-900">MemoryCare</h1>
          </div>
          {/* Close button for mobile */}
          <button onClick={toggleMobileMenu} className="md:hidden text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">
                {role === 'patient' ? 'Sarah Johnson' : role === 'doctor' ? 'Dr. Jennifer Lee' : 'Emma Wilson'}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {role === 'doctor' ? 'Healthcare Provider' : role}
              </p>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto">{renderMenu()}</nav>
        <div className="border-t border-gray-200 pt-4 mt-4">
          <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Settings className="mr-3 h-5 w-5" />
            <span>Settings</span>
          </button>
          <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg mt-1">
            <LogOut className="mr-3 h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>;
};