import React, { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, X, Bell } from 'lucide-react';
export const FamilyAlerts = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unresolved' | 'critical'>('unresolved');
  const [alerts, setAlerts] = useState([{
    id: '1',
    type: 'medication',
    severity: 'high',
    title: 'Missed Afternoon Medication',
    description: 'John missed his 2:00 PM blood pressure medication. This is the second missed dose this week.',
    timestamp: '2 hours ago',
    resolved: false,
    actionRequired: true
  }, {
    id: '2',
    type: 'health',
    severity: 'medium',
    title: 'Mood Pattern Change',
    description: 'Detected a decline in mood ratings over the past 3 days. Consider scheduling a check-in.',
    timestamp: '4 hours ago',
    resolved: false,
    actionRequired: true
  }, {
    id: '3',
    type: 'safety',
    severity: 'critical',
    title: 'Extended Inactivity',
    description: 'No activity detected for over 6 hours. Last interaction was at 8:00 AM.',
    timestamp: '6 hours ago',
    resolved: true,
    actionRequired: false
  }, {
    id: '4',
    type: 'routine',
    severity: 'low',
    title: 'Routine Deviation',
    description: 'Morning walk was skipped for the third consecutive day.',
    timestamp: '1 day ago',
    resolved: false,
    actionRequired: false
  }, {
    id: '5',
    type: 'medication',
    severity: 'medium',
    title: 'Medication Reminder Snoozed',
    description: 'Morning medication reminder has been snoozed 3 times.',
    timestamp: '2 days ago',
    resolved: true,
    actionRequired: false
  }]);
  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => alert.id === alertId ? {
      ...alert,
      resolved: true
    } : alert));
  };
  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };
  const filteredAlerts = alerts.filter(alert => {
    if (selectedFilter === 'unresolved') return !alert.resolved;
    if (selectedFilter === 'critical') return alert.severity === 'critical' || alert.severity === 'high';
    return true;
  });
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return '💊';
      case 'health':
        return '❤️';
      case 'safety':
        return '🛡️';
      case 'routine':
        return '📅';
      default:
        return '⚠️';
    }
  };
  const unresolvedCount = alerts.filter(a => !a.resolved).length;
  const criticalCount = alerts.filter(a => (a.severity === 'critical' || a.severity === 'high') && !a.resolved).length;
  return <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Alert Center</h1>
          <p className="text-gray-600">
            Monitor and respond to important notifications about John's care
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
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Unresolved Alerts</p>
              <div className="text-2xl font-bold">{unresolvedCount}</div>
              <p className="text-xs text-gray-500">Require attention</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Critical/High Priority</p>
              <div className="text-2xl font-bold">{criticalCount}</div>
              <p className="text-xs text-gray-500">Urgent alerts</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Today</p>
              <div className="text-2xl font-bold">
                {alerts.filter(a => a.timestamp.includes('hour')).length}
              </div>
              <p className="text-xs text-gray-500">New alerts</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Bell className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Notification Settings</p>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-gray-500">All enabled</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Filter Alerts
        </h3>
        <div className="flex space-x-2">
          {['all', 'unresolved', 'critical'].map(filter => <button key={filter} onClick={() => setSelectedFilter(filter as any)} className={`px-4 py-2 text-sm font-medium rounded-md ${selectedFilter === filter ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              {filter === 'critical' ? 'Critical/High' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>)}
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Active Alerts ({filteredAlerts.length})
        </h3>
        {filteredAlerts.length > 0 ? <div className="space-y-4">
            {filteredAlerts.map(alert => <div key={alert.id} className={`p-4 border rounded-lg ${alert.resolved ? 'border-gray-200 bg-gray-50' : alert.severity === 'critical' || alert.severity === 'high' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {alert.title}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        {alert.resolved && <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
                            RESOLVED
                          </span>}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {alert.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{alert.timestamp}</span>
                        </div>
                        <span className="capitalize">Type: {alert.type}</span>
                        {alert.actionRequired && <span className="text-red-600 font-medium">
                            Action Required
                          </span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!alert.resolved && <button onClick={() => resolveAlert(alert.id)} className="inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolve
                      </button>}
                    <button onClick={() => dismissAlert(alert.id)} className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-gray-400 hover:text-gray-500">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>)}
          </div> : <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No alerts match your current filter criteria.
            </p>
          </div>}
      </div>
    </div>;
};