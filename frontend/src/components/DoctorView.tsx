import React, { memo } from 'react';
import { Stethoscope, Calendar, FileText, Activity, TrendingUp, AlertTriangle, Download, Share2, Brain, Pill, Clock, UserIcon } from 'lucide-react';
export const DoctorView = () => {
  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Healthcare Provider Portal
        </h1>
        <p className="text-gray-600">Manage patient care and treatment plans</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <UserIcon size={24} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Current Patient
              </h2>
              <p className="text-gray-600">
                Sarah Johnson - Age 68 - Early-stage Alzheimer's
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Calendar size={18} className="mr-2" />
              Schedule Appointment
            </button>
            <button className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText size={18} className="mr-2" />
              View Full Records
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Patient Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center">
                  <div className="rounded-full bg-indigo-100 p-3 mb-3">
                    <Brain size={24} className="text-indigo-600" />
                  </div>
                  <p className="text-gray-500 text-sm">Cognitive Score</p>
                  <h3 className="text-xl font-bold text-gray-800">72/100</h3>
                  <p className="text-xs text-green-600">↑8% from last month</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center">
                  <div className="rounded-full bg-green-100 p-3 mb-3">
                    <Pill size={24} className="text-green-600" />
                  </div>
                  <p className="text-gray-500 text-sm">Medication Adherence</p>
                  <h3 className="text-xl font-bold text-gray-800">92%</h3>
                  <p className="text-xs text-green-600">↑5% from last month</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center">
                  <div className="rounded-full bg-blue-100 p-3 mb-3">
                    <Activity size={24} className="text-blue-600" />
                  </div>
                  <p className="text-gray-500 text-sm">Sleep Quality</p>
                  <h3 className="text-xl font-bold text-gray-800">68%</h3>
                  <p className="text-xs text-red-600">↓7% from last month</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center">
                  <div className="rounded-full bg-purple-100 p-3 mb-3">
                    <Clock size={24} className="text-purple-600" />
                  </div>
                  <p className="text-gray-500 text-sm">Daily Activities</p>
                  <h3 className="text-xl font-bold text-gray-800">85%</h3>
                  <p className="text-xs text-green-600">↑3% from last month</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Recent Reports & Notes
                </h3>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Add New Note
                </button>
              </div>
              <div className="space-y-3">
                {[{
                title: 'Neurological Assessment',
                doctor: 'Dr. Jennifer Lee',
                date: 'May 15, 2023',
                summary: 'Cognitive function stable with slight improvement in short-term memory. Continue current medication regimen.',
                icon: <FileText size={20} className="text-indigo-600" />
              }, {
                title: 'Medication Review',
                doctor: 'Dr. Robert Chen',
                date: 'April 22, 2023',
                summary: 'All medications tolerated well. Adjusted Vitamin D dosage due to slightly low levels.',
                icon: <Stethoscope size={20} className="text-green-600" />
              }, {
                title: 'Mental Health Evaluation',
                doctor: 'Dr. Maria Rodriguez',
                date: 'March 10, 2023',
                summary: 'Mood stable, minimal anxiety. Continue with memory exercises and social engagement activities.',
                icon: <Activity size={20} className="text-purple-600" />
              }].map((report, index) => <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded-lg mr-3">
                          {report.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">
                            {report.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {report.doctor} - {report.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-indigo-600">
                          <Download size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-indigo-600">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">
                      {report.summary}
                    </p>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2">
                      View Full Report
                    </button>
                  </div>)}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">Cognitive Trends</h3>
                <TrendingUp size={20} className="text-indigo-600" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Memory Function</span>
                    <span className="font-medium text-green-600">↑ 8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{
                    width: '72%'
                  }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Attention Span</span>
                    <span className="font-medium text-green-600">↑ 5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{
                    width: '68%'
                  }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Language Processing</span>
                    <span className="font-medium">No change</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{
                    width: '75%'
                  }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Executive Function</span>
                    <span className="font-medium text-amber-600">↓ 3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{
                    width: '62%'
                  }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Last Assessment: May 15, 2023
                  </span>
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold text-gray-800 mb-4">
                Medication Effectiveness
              </h3>
              <div className="space-y-3">
                {[{
                name: 'Donepezil',
                effectiveness: 'High',
                score: 85,
                change: 'improved'
              }, {
                name: 'Memantine',
                effectiveness: 'Moderate',
                score: 70,
                change: 'stable'
              }, {
                name: 'Vitamin B Complex',
                effectiveness: 'Moderate',
                score: 65,
                change: 'improved'
              }].map((med, index) => <div key={index} className="p-3 border border-gray-100 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-gray-800">{med.name}</h4>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${med.effectiveness === 'High' ? 'bg-green-100 text-green-800' : med.effectiveness === 'Moderate' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                        {med.effectiveness}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 mr-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${med.effectiveness === 'High' ? 'bg-green-500' : med.effectiveness === 'Moderate' ? 'bg-blue-500' : 'bg-amber-500'}`} style={{
                        width: `${med.score}%`
                      }}></div>
                        </div>
                      </div>
                      <div className="text-sm">
                        {med.change === 'improved' && <span className="text-green-600">↑</span>}
                        {med.change === 'declined' && <span className="text-red-600">↓</span>}
                        {med.change === 'stable' && <span className="text-gray-600">→</span>}
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
              <div className="flex items-start">
                <AlertTriangle size={24} className="text-amber-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    Clinical Notes
                  </h3>
                  <p className="text-sm text-gray-600">
                    Recent changes in sleep patterns may be affecting cognitive
                    function. Monitor closely and discuss with Dr. Lee at next
                    appointment.
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Added by: Dr. Robert Chen
                    </span>
                    <button className="text-amber-700 hover:text-amber-800 text-sm font-medium">
                      Take Action
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Upcoming Appointments
            </h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Schedule New
            </button>
          </div>
          <div className="space-y-4">
            {[{
            patient: 'Sarah Johnson',
            date: 'June 28, 2023',
            time: '10:00 AM',
            type: 'In-person',
            reason: 'Quarterly Assessment',
            image: 'https://randomuser.me/api/portraits/women/79.jpg'
          }, {
            patient: 'Thomas Wilson',
            date: 'June 29, 2023',
            time: '2:30 PM',
            type: 'Telemedicine',
            reason: 'Medication Review',
            image: 'https://randomuser.me/api/portraits/men/52.jpg'
          }, {
            patient: 'Mary Davis',
            date: 'June 30, 2023',
            time: '11:15 AM',
            type: 'In-person',
            reason: 'Initial Consultation',
            image: 'https://randomuser.me/api/portraits/women/67.jpg'
          }].map((appt, index) => <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                <img src={appt.image} alt={appt.patient} className="w-12 h-12 rounded-full mr-4" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {appt.patient}
                      </h4>
                      <p className="text-sm text-gray-500">{appt.reason}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full h-fit ${appt.type === 'In-person' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {appt.type}
                    </span>
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <Calendar size={14} className="text-gray-500 mr-1" />
                    <span className="text-gray-600">
                      {appt.date}, {appt.time}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                    Details
                  </button>
                </div>
              </div>)}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Treatment Plan</h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Update Plan
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">
                Medication Regimen
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Donepezil 10mg - Twice daily (8:00 AM, 8:00 PM)
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Memantine 5mg - Once daily (1:00 PM)
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Vitamin B Complex - Once daily (3:00 PM)
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Vitamin D 1000 IU - Once daily (9:00 PM)
                </li>
              </ul>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">
                Cognitive Exercises
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Memory recall exercises - 15 minutes, twice daily
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Photo recognition practice - 10 minutes, daily
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Story completion exercises - 15 minutes, 3 times weekly
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Timeline ordering activities - 12 minutes, twice weekly
                </li>
              </ul>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">
                Lifestyle Recommendations
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Mediterranean diet rich in omega-3 fatty acids and
                  antioxidants
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  30 minutes of light physical activity daily
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Regular social engagement with family and friends
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Consistent sleep schedule (10:00 PM - 7:00 AM)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>;
};