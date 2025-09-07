import React from 'react';
import { Activity, Heart, Pill, AlertTriangle, Calendar, Brain } from 'lucide-react';
export const FamilyDashboard = () => {
  const patientData = {
    name: 'John Smith',
    lastActive: '2 hours ago',
    medicationCompliance: {
      taken: 6,
      missed: 1,
      total: 7
    },
    moodData: {
      current: 'good',
      emoji: '🙂',
      trend: 'stable'
    },
    aiInsights: ['Medication adherence has improved by 15% this week', 'Sleep patterns show consistency - averaging 7.5 hours', 'Social interactions increased after family visit on Tuesday', 'Recommend gentle reminder for afternoon medication'],
    recentActivity: [{
      time: '8:30 AM',
      activity: 'Morning medication',
      status: 'completed'
    }, {
      time: '9:00 AM',
      activity: 'Breakfast',
      status: 'completed'
    }, {
      time: '9:30 AM',
      activity: 'Morning walk',
      status: 'snoozed'
    }, {
      time: '12:00 PM',
      activity: 'Lunch medication',
      status: 'missed'
    }, {
      time: '1:00 PM',
      activity: 'Lunch',
      status: 'completed'
    }]
  };
  const compliancePercentage = Math.round(patientData.medicationCompliance.taken / patientData.medicationCompliance.total * 100);
  return <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome, Family Member
          </h1>
          <p className="text-gray-600">
            Monitoring {patientData.name} • Last active {patientData.lastActive}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Pill className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Medication Adherence</p>
              <div className="text-2xl font-bold">{compliancePercentage}%</div>
              <p className="text-xs text-gray-500">
                {patientData.medicationCompliance.taken} of{' '}
                {patientData.medicationCompliance.total} taken
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Heart className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Current Mood</p>
              <div className="text-2xl font-bold capitalize">
                {patientData.moodData.current}
              </div>
              <p className="text-xs text-gray-500">
                Trend: {patientData.moodData.trend}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Today's Activities</p>
              <div className="text-2xl font-bold">
                {patientData.recentActivity.filter(a => a.status === 'completed').length}
              </div>
              <p className="text-xs text-gray-500">
                of {patientData.recentActivity.length} completed
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Alerts</p>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-gray-500">Require attention</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            AI Health Insights
          </h3>
          <div className="space-y-4">
            {patientData.aiInsights.map((insight, index) => <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="bg-indigo-100 p-1 rounded-full mr-2">
                    <Brain className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div className="text-sm font-medium">AI Analysis</div>
                </div>
                <p className="text-gray-700">{insight}</p>
                <p className="text-xs text-gray-500 mt-2">Updated</p>
              </div>)}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Today's Activity Timeline
          </h3>
          <div className="space-y-4">
            {patientData.recentActivity.map((activity, index) => <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${activity.status === 'completed' ? 'bg-green-500' : activity.status === 'missed' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                  <div>
                    <div className="font-medium text-gray-900">
                      {activity.activity}
                    </div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${activity.status === 'completed' ? 'bg-green-100 text-green-700' : activity.status === 'missed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {activity.status}
                </span>
              </div>)}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-start h-12 px-4 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar className="h-5 w-5 mr-3" />
            Memory Archive
          </button>
          <button className="flex items-center justify-start h-12 px-4 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50">
            <Heart className="h-5 w-5 mr-3" />
            Send Support
          </button>
          <button className="flex items-center justify-start h-12 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <AlertTriangle className="h-5 w-5 mr-3" />
            Review Alerts
          </button>
        </div>
      </div>
    </div>;
};