import React, { useState, memo } from 'react';
import { Stethoscope, Calendar, FileText, Activity, TrendingUp, AlertTriangle, Download, Share2, Brain, Pill, Clock, UserIcon, MessageCircle, Apple, Users, CheckCircle, XCircle, AlertCircle, Bell } from 'lucide-react';
export const HealthcareProvider = ({
  activeTab = 'overview'
}) => {
  const [localActiveTab, setLocalActiveTab] = useState(activeTab);
  // Use the prop if provided, otherwise use local state
  const currentTab = activeTab || localActiveTab;
  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Healthcare Provider Portal
        </h1>
        <p className="text-gray-600">Manage patient care and treatment plans</p>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <UserIcon size={24} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Current Patient
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Sarah Johnson - Age 68 - Early-stage Alzheimer's
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm">
              <Calendar size={16} className="mr-2" />
              Schedule Appointment
            </button>
            <button className="flex items-center bg-white border border-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              <FileText size={16} className="mr-2" />
              View Records
            </button>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex overflow-x-auto border-b mb-6 pb-1">
            <button onClick={() => setLocalActiveTab('overview')} className={`px-3 sm:px-4 py-2 font-medium whitespace-nowrap ${currentTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
              Overview
            </button>
            <button onClick={() => setLocalActiveTab('activities')} className={`px-3 sm:px-4 py-2 font-medium whitespace-nowrap ${currentTab === 'activities' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
              Patient Activities
            </button>
            <button onClick={() => setLocalActiveTab('alerts')} className={`px-3 sm:px-4 py-2 font-medium whitespace-nowrap ${currentTab === 'alerts' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
              Alerts
            </button>
            <button onClick={() => setLocalActiveTab('reports')} className={`px-3 sm:px-4 py-2 font-medium whitespace-nowrap ${currentTab === 'reports' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
              Reports
            </button>
          </div>
          {currentTab === 'overview' && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            </div>}
          {currentTab === 'activities' && <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 flex items-center">
                    <Brain size={20} className="text-indigo-600 mr-2" />
                    Memory Exercises
                  </h3>
                  <span className="text-sm text-gray-500">Last 7 days</span>
                </div>
                <div className="space-y-3">
                  {[{
                activity: 'Photo Recognition Session',
                date: 'Today, 10:30 AM',
                duration: '15 minutes',
                score: '85%',
                status: 'completed'
              }, {
                activity: 'Story Completion Exercise',
                date: 'Today, 3:00 PM',
                duration: '12 minutes',
                score: '78%',
                status: 'completed'
              }, {
                activity: 'Timeline Ordering Task',
                date: 'Yesterday, 11:15 AM',
                duration: '10 minutes',
                score: '92%',
                status: 'completed'
              }, {
                activity: 'Voice Memory Exercise',
                date: 'June 13, 2023, 4:30 PM',
                duration: '8 minutes',
                score: '65%',
                status: 'completed'
              }, {
                activity: 'Association Game',
                date: 'June 12, 2023, 2:00 PM',
                duration: '20 minutes',
                score: '71%',
                status: 'missed',
                reason: 'Patient reported fatigue'
              }].map((item, index) => <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-100 rounded-lg">
                      <div className="flex items-start mb-2 sm:mb-0">
                        {item.status === 'completed' ? <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" /> : <XCircle size={18} className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />}
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {item.activity}
                          </h4>
                          <p className="text-xs text-gray-500">{item.date}</p>
                          <p className="text-xs text-gray-500">
                            Duration: {item.duration}
                          </p>
                          {item.reason && <p className="text-xs text-red-500 mt-1">
                              {item.reason}
                            </p>}
                        </div>
                      </div>
                      {item.status === 'completed' && <div className="text-right">
                          <div className="text-lg font-bold text-gray-800">
                            {item.score}
                          </div>
                          <span className="text-xs text-gray-500">Score</span>
                        </div>}
                    </div>)}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 flex items-center">
                    <Pill size={20} className="text-green-600 mr-2" />
                    Medication Adherence
                  </h3>
                  <span className="text-sm text-gray-500">Last 7 days</span>
                </div>
                <div className="space-y-3">
                  {[{
                medication: 'Donepezil 10mg',
                schedule: 'Morning Dose (8:00 AM)',
                date: 'Today',
                status: 'taken',
                time: 'Taken at 8:05 AM'
              }, {
                medication: 'Memantine 5mg',
                schedule: 'Afternoon Dose (1:00 PM)',
                date: 'Today',
                status: 'taken',
                time: 'Taken at 1:15 PM'
              }, {
                medication: 'Donepezil 10mg',
                schedule: 'Evening Dose (8:00 PM)',
                date: 'Today',
                status: 'upcoming'
              }, {
                medication: 'Vitamin B Complex',
                schedule: 'Afternoon Dose (3:00 PM)',
                date: 'Today',
                status: 'missed',
                alert: 'medium'
              }, {
                medication: 'Donepezil 10mg',
                schedule: 'Morning Dose (8:00 AM)',
                date: 'Yesterday',
                status: 'taken',
                time: 'Taken at 8:10 AM'
              }, {
                medication: 'Donepezil 10mg',
                schedule: 'Evening Dose (8:00 PM)',
                date: 'Yesterday',
                status: 'taken',
                time: 'Taken at 8:30 PM'
              }].map((item, index) => <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${item.status === 'missed' ? 'border-amber-200 bg-amber-50' : 'border-gray-100'}`}>
                      <div className="flex items-start">
                        {item.status === 'taken' && <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2" />}
                        {item.status === 'missed' && <AlertCircle size={18} className="text-amber-500 mt-0.5 mr-2" />}
                        {item.status === 'upcoming' && <Clock size={18} className="text-gray-400 mt-0.5 mr-2" />}
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {item.medication}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {item.schedule} - {item.date}
                          </p>
                          {item.time && <p className="text-xs text-green-600">
                              {item.time}
                            </p>}
                          {item.status === 'missed' && <p className="text-xs text-amber-600 mt-1">
                              Missed dose
                            </p>}
                        </div>
                      </div>
                      {item.status === 'missed' && item.alert && <div className="bg-amber-100 px-2 py-1 rounded text-xs font-medium text-amber-800">
                          Medium Priority
                        </div>}
                    </div>)}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Overall adherence rate: 92%
                    </span>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Adjust Medication Schedule
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 flex items-center">
                    <Apple size={20} className="text-blue-600 mr-2" />
                    Nutrition Tracking
                  </h3>
                  <span className="text-sm text-gray-500">Last 7 days</span>
                </div>
                <div className="space-y-3">
                  {[{
                meal: 'Breakfast',
                food: 'Omega-3 rich oatmeal with blueberries',
                date: 'Today, 8:30 AM',
                completed: true,
                notes: 'Consumed 100%'
              }, {
                meal: 'Lunch',
                food: 'Mediterranean salad with olive oil and fish',
                date: 'Today, 12:45 PM',
                completed: true,
                notes: 'Consumed 85%'
              }, {
                meal: 'Snack',
                food: 'Walnuts and dark chocolate',
                date: 'Today, 3:30 PM',
                completed: false,
                alert: 'low'
              }, {
                meal: 'Dinner',
                food: 'Turmeric chicken with broccoli and quinoa',
                date: 'Today, 6:30 PM',
                completed: false,
                upcoming: true
              }, {
                meal: 'Breakfast',
                food: 'Whole grain toast with avocado and eggs',
                date: 'Yesterday, 8:45 AM',
                completed: true,
                notes: 'Consumed 90%'
              }].map((item, index) => <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${!item.completed && !item.upcoming ? 'border-amber-100 bg-amber-50' : 'border-gray-100'}`}>
                      <div className="flex items-start">
                        {item.completed && <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2" />}
                        {!item.completed && !item.upcoming && <XCircle size={18} className="text-amber-500 mt-0.5 mr-2" />}
                        {item.upcoming && <Clock size={18} className="text-gray-400 mt-0.5 mr-2" />}
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {item.meal}: {item.food}
                          </h4>
                          <p className="text-xs text-gray-500">{item.date}</p>
                          {item.notes && <p className="text-xs text-green-600">
                              {item.notes}
                            </p>}
                          {!item.completed && !item.upcoming && <p className="text-xs text-amber-600 mt-1">
                              Missed meal
                            </p>}
                        </div>
                      </div>
                      {!item.completed && !item.upcoming && item.alert && <div className="bg-amber-100 px-2 py-1 rounded text-xs font-medium text-amber-800">
                          Low Priority
                        </div>}
                    </div>)}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Nutrition plan adherence: 85%
                    </span>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Adjust Nutrition Plan
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 flex items-center">
                    <Users size={20} className="text-purple-600 mr-2" />
                    Family Interaction
                  </h3>
                  <span className="text-sm text-gray-500">Last 7 days</span>
                </div>
                <div className="space-y-3">
                  {[{
                interaction: 'Video Call with Emma (Daughter)',
                date: 'Today, 11:00 AM',
                duration: '25 minutes',
                notes: 'Patient was engaged and responsive',
                mood: 'Positive'
              }, {
                interaction: 'In-person Visit - Robert (Spouse)',
                date: 'Yesterday, 2:00 PM',
                duration: '3 hours',
                notes: 'Went for a walk in the garden',
                mood: 'Positive'
              }, {
                interaction: 'Photo Sharing - Michael (Son)',
                date: 'June 13, 2023',
                notes: 'Added 5 new family photos to memory companion',
                mood: 'Neutral'
              }, {
                interaction: 'Scheduled Video Call - Jamie (Granddaughter)',
                date: 'June 12, 2023',
                status: 'missed',
                notes: 'Patient was sleeping, rescheduled for next week',
                alert: 'low'
              }].map((item, index) => <div key={index} className={`p-3 border rounded-lg ${item.status === 'missed' ? 'border-gray-200 bg-gray-50' : 'border-gray-100'}`}>
                      <div className="flex items-start">
                        {!item.status && <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2" />}
                        {item.status === 'missed' && <AlertCircle size={18} className="text-gray-400 mt-0.5 mr-2" />}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-gray-800">
                              {item.interaction}
                            </h4>
                            {item.mood && <span className={`text-xs px-2 py-1 rounded-full ${item.mood === 'Positive' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                {item.mood}
                              </span>}
                          </div>
                          <p className="text-xs text-gray-500">{item.date}</p>
                          {item.duration && <p className="text-xs text-gray-500">
                              Duration: {item.duration}
                            </p>}
                          <p className="text-sm text-gray-600 mt-1">
                            {item.notes}
                          </p>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>}
          {currentTab === 'alerts' && <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <AlertTriangle size={20} className="text-red-600 mr-2" />
                  High Priority Alerts
                </h3>
                <div className="space-y-3">
                  {[{
                alert: 'Significant Sleep Pattern Change',
                details: 'Patient has been waking up 3-4 times per night for the past 5 days',
                date: 'Detected 3 days ago',
                recommendation: 'Consider sleep assessment and possible adjustment to evening routine'
              }].map((item, index) => <div key={index} className="p-4 bg-white border border-red-100 rounded-lg">
                      <h4 className="font-bold text-gray-800">{item.alert}</h4>
                      <p className="text-sm text-gray-600 my-2">
                        {item.details}
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">{item.date}</span>
                        <button className="text-red-600 hover:text-red-800 font-medium">
                          Take Action
                        </button>
                      </div>
                      <div className="mt-3 pt-3 border-t border-red-100">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Recommendation:</span>{' '}
                          {item.recommendation}
                        </p>
                      </div>
                    </div>)}
                </div>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 sm:p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <Brain size={20} className="text-indigo-600 mr-2" />
                  Care Insights
                </h3>
                <div className="space-y-3">
                  {[{
                insight: 'Memory Performance Pattern',
                details: 'Patient shows improved recognition with visual cues compared to verbal prompts',
                date: 'Based on last 14 days',
                recommendation: 'Consider increasing visual memory exercises in daily routine'
              }, {
                insight: 'Social Engagement Impact',
                details: 'Patient exhibits 30% improvement in cognitive test scores following family visits',
                date: 'Observed pattern over 3 months',
                recommendation: 'Encourage more regular family interaction, particularly before cognitive assessments'
              }].map((item, index) => <div key={index} className="p-4 bg-white border border-indigo-100 rounded-lg">
                      <h4 className="font-bold text-gray-800">
                        {item.insight}
                      </h4>
                      <p className="text-sm text-gray-600 my-2">
                        {item.details}
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">{item.date}</span>
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                          View Analysis
                        </button>
                      </div>
                      <div className="mt-3 pt-3 border-t border-indigo-100">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Recommendation:</span>{' '}
                          {item.recommendation}
                        </p>
                      </div>
                    </div>)}
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <CheckCircle size={20} className="text-green-600 mr-2" />
                  Care Tasks
                </h3>
                <div className="space-y-3">
                  {[{
                task: 'Update Medication Plan',
                assignee: 'Dr. Jennifer Lee',
                due: 'June 24, 2023',
                priority: 'High',
                status: 'In Progress'
              }, {
                task: 'Schedule Cognitive Assessment',
                assignee: 'Susan Taylor',
                due: 'June 28, 2023',
                priority: 'Medium',
                status: 'Not Started'
              }, {
                task: 'Family Care Conference',
                assignee: 'Dr. Robert Chen',
                due: 'July 5, 2023',
                priority: 'Medium',
                status: 'Scheduled'
              }, {
                task: 'Review Sleep Study Results',
                assignee: 'Dr. Jennifer Lee',
                due: 'June 22, 2023',
                priority: 'High',
                status: 'Not Started'
              }].map((item, index) => <div key={index} className="p-4 bg-white border border-green-100 rounded-lg">
                      <div className="flex flex-col sm:flex-row justify-between items-start">
                        <div className="mb-3 sm:mb-0">
                          <h4 className="font-bold text-gray-800">
                            {item.task}
                          </h4>
                          <p className="text-sm text-gray-600 my-1">
                            Assigned to: {item.assignee}
                          </p>
                          <p className="text-sm text-gray-600">
                            Due: {item.due}
                          </p>
                        </div>
                        <div className="flex flex-row sm:flex-col items-center sm:items-end">
                          <span className={`text-xs px-2 py-1 rounded-full mr-2 sm:mr-0 sm:mb-2 ${item.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {item.priority} Priority
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : item.status === 'Scheduled' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-green-100 flex flex-col sm:flex-row justify-between">
                        <button className="text-sm text-green-600 hover:text-green-800 font-medium mb-2 sm:mb-0">
                          Mark Complete
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-800">
                          View Details
                        </button>
                      </div>
                    </div>)}
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Add New Task
                  </button>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <AlertCircle size={20} className="text-amber-600 mr-2" />
                  Medium Priority Alerts
                </h3>
                <div className="space-y-3">
                  {[{
                alert: 'Missed Medication - Vitamin B Complex',
                details: 'Patient missed afternoon dose today',
                date: 'Today, 3:00 PM',
                recommendation: 'Follow up to ensure evening medications are taken'
              }, {
                alert: 'Decline in Short-term Memory Score',
                details: 'Short-term memory assessment shows 8% decline since last week',
                date: 'Yesterday',
                recommendation: 'Increase frequency of memory exercises focusing on recent events'
              }].map((item, index) => <div key={index} className="p-4 bg-white border border-amber-100 rounded-lg">
                      <h4 className="font-bold text-gray-800">{item.alert}</h4>
                      <p className="text-sm text-gray-600 my-2">
                        {item.details}
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">{item.date}</span>
                        <button className="text-amber-600 hover:text-amber-800 font-medium">
                          Review
                        </button>
                      </div>
                      <div className="mt-3 pt-3 border-t border-amber-100">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Recommendation:</span>{' '}
                          {item.recommendation}
                        </p>
                      </div>
                    </div>)}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <Bell size={20} className="text-blue-600 mr-2" />
                  Low Priority Alerts
                </h3>
                <div className="space-y-3">
                  {[{
                alert: 'Missed Afternoon Snack',
                details: 'Patient skipped the brain-boosting snack today',
                date: 'Today, 3:30 PM',
                recommendation: 'Monitor energy levels before evening activities'
              }, {
                alert: 'Missed Video Call with Granddaughter',
                details: 'Scheduled call was missed due to patient napping',
                date: 'June 12, 2023',
                recommendation: 'Reschedule family calls for morning hours when patient is more alert'
              }].map((item, index) => <div key={index} className="p-4 bg-white border border-blue-100 rounded-lg">
                      <h4 className="font-bold text-gray-800">{item.alert}</h4>
                      <p className="text-sm text-gray-600 my-2">
                        {item.details}
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">{item.date}</span>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Note
                        </button>
                      </div>
                      <div className="mt-3 pt-3 border-t border-blue-100">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Recommendation:</span>{' '}
                          {item.recommendation}
                        </p>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>}
          {currentTab === 'reports' && <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                <h3 className="font-bold text-gray-800 mb-4">
                  Weekly Activity Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Memory Exercises
                    </h4>
                    <div className="text-2xl font-bold text-gray-800">85%</div>
                    <p className="text-xs text-green-600">↑5% from last week</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Completion rate
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Medication
                    </h4>
                    <div className="text-2xl font-bold text-gray-800">92%</div>
                    <p className="text-xs text-green-600">↑2% from last week</p>
                    <p className="text-xs text-gray-500 mt-1">Adherence rate</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Nutrition
                    </h4>
                    <div className="text-2xl font-bold text-gray-800">88%</div>
                    <p className="text-xs text-amber-600">↓3% from last week</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Plan compliance
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Social Engagement
                    </h4>
                    <div className="text-2xl font-bold text-gray-800">78%</div>
                    <p className="text-xs text-green-600">↑8% from last week</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Participation rate
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">
                    Key Observations
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                    <li>
                      Patient shows improved engagement with memory exercises,
                      particularly photo recognition
                    </li>
                    <li>
                      Medication adherence remains high with occasional missed
                      afternoon supplements
                    </li>
                    <li>
                      Sleep quality has declined, affecting daytime cognitive
                      performance
                    </li>
                    <li>
                      Social interactions with family members have increased
                      this week
                    </li>
                    <li>
                      Nutrition plan adherence declined slightly, primarily with
                      afternoon snacks
                    </li>
                  </ul>
                  <div className="flex flex-col sm:flex-row justify-between pt-4 border-t border-gray-100">
                    <button className="flex items-center text-gray-700 hover:text-gray-900 mb-2 sm:mb-0">
                      <Download size={18} className="mr-1" />
                      Download Report
                    </button>
                    <button className="flex items-center text-gray-700 hover:text-gray-900">
                      <Share2 size={18} className="mr-1" />
                      Share with Family
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                  <h3 className="font-bold text-gray-800 mb-4">
                    Cognitive Assessment Trends
                  </h3>
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
                        <span className="text-gray-600">
                          Language Processing
                        </span>
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
                        <span className="text-gray-600">
                          Executive Function
                        </span>
                        <span className="font-medium text-amber-600">↓ 3%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{
                      width: '62%'
                    }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                  <h3 className="font-bold text-gray-800 mb-4">
                    Treatment Effectiveness
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
                  name: 'Cognitive Exercises',
                  effectiveness: 'High',
                  score: 80,
                  change: 'improved'
                }, {
                  name: 'Nutrition Plan',
                  effectiveness: 'Moderate',
                  score: 75,
                  change: 'stable'
                }].map((item, index) => <div key={index} className="p-3 border border-gray-100 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium text-gray-800">
                            {item.name}
                          </h4>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.effectiveness === 'High' ? 'bg-green-100 text-green-800' : item.effectiveness === 'Moderate' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                            {item.effectiveness}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-1 mr-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className={`h-2 rounded-full ${item.effectiveness === 'High' ? 'bg-green-500' : item.effectiveness === 'Moderate' ? 'bg-blue-500' : 'bg-amber-500'}`} style={{
                          width: `${item.score}%`
                        }}></div>
                            </div>
                          </div>
                          <div className="text-sm">
                            {item.change === 'improved' && <span className="text-green-600">↑</span>}
                            {item.change === 'declined' && <span className="text-red-600">↓</span>}
                            {item.change === 'stable' && <span className="text-gray-600">→</span>}
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Recent Notes & Observations
                </h3>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Add New Note
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3 flex-shrink-0">
                      <Brain size={18} className="text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <h4 className="font-bold text-gray-800">
                          Memory Function Assessment
                        </h4>
                        <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                          Today, 2:30 PM
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Patient showed improved recognition of family photos
                        from 2015-2018 period. Long-term memory remains
                        relatively stable, while short-term recall shows
                        continued challenges. The new photo recognition
                        exercises seem to be having a positive effect.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 pt-3 border-t border-gray-200">
                        <span className="text-xs text-gray-500 mb-2 sm:mb-0">
                          Added by: Dr. Jennifer Lee
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-gray-500 hover:text-indigo-600">
                            <FileText size={16} />
                          </button>
                          <button className="text-gray-500 hover:text-indigo-600">
                            <Share2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-2 rounded-full mr-3 flex-shrink-0">
                      <AlertCircle size={18} className="text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <h4 className="font-bold text-gray-800">
                          Sleep Pattern Observation
                        </h4>
                        <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                          Yesterday, 9:15 AM
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Patient reports waking up 3-4 times during the night for
                        the past 5 days. This appears to be affecting daytime
                        alertness and cognitive performance. Consider adjusting
                        evening routine and possibly consulting with sleep
                        specialist if pattern continues.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 pt-3 border-t border-amber-200">
                        <span className="text-xs text-gray-500 mb-2 sm:mb-0">
                          Added by: Dr. Robert Chen
                        </span>
                        <button className="text-amber-700 hover:text-amber-800 text-sm font-medium">
                          Take Action
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                      <Pill size={18} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <h4 className="font-bold text-gray-800">
                          Medication Response Evaluation
                        </h4>
                        <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                          June 12, 2023
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Current medication regimen appears well-tolerated.
                        Donepezil continues to show positive effects on memory
                        function. No significant side effects reported. Will
                        continue with current dosage and reassess in one month.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 pt-3 border-t border-gray-200">
                        <span className="text-xs text-gray-500 mb-2 sm:mb-0">
                          Added by: Dr. Jennifer Lee
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-gray-500 hover:text-indigo-600">
                            <FileText size={16} />
                          </button>
                          <button className="text-gray-500 hover:text-indigo-600">
                            <Share2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="font-bold text-gray-800 mb-4">
                Upcoming Appointments
              </h3>
              <div className="space-y-3">
                {[{
                date: 'June 28, 2023',
                time: '10:00 AM',
                type: 'Quarterly Assessment',
                with: 'Sarah Johnson',
                format: 'In-person'
              }, {
                date: 'June 30, 2023',
                time: '2:00 PM',
                type: 'Family Care Meeting',
                with: 'Johnson Family',
                format: 'Video Call'
              }, {
                date: 'July 15, 2023',
                time: '11:30 AM',
                type: 'Medication Review',
                with: 'Sarah Johnson',
                format: 'In-person'
              }].map((appt, index) => <div key={index} className="flex items-center p-3 border border-gray-100 rounded-lg">
                    <div className="rounded-full bg-indigo-100 p-2 mr-3 flex-shrink-0">
                      <Calendar size={18} className="text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{appt.type}</h4>
                      <p className="text-xs text-gray-500">
                        {appt.date}, {appt.time}
                      </p>
                      <p className="text-xs text-gray-500">With: {appt.with}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full h-fit ${appt.format === 'In-person' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {appt.format}
                    </span>
                  </div>)}
              </div>
              <button className="w-full mt-4 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg text-sm font-medium transition-colors">
                Schedule Appointment
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="font-bold text-gray-800 mb-4">
                Family Communications
              </h3>
              <div className="space-y-3">
                {[{
                name: 'Robert Johnson',
                relation: 'Spouse',
                date: 'Today, 9:45 AM',
                message: 'Sarah had trouble sleeping last night. Should we adjust her evening medication time?',
                image: 'https://randomuser.me/api/portraits/men/52.jpg',
                unread: true
              }, {
                name: 'Emma Wilson',
                relation: 'Daughter',
                date: 'Yesterday',
                message: "I've added new family photos to Mom's memory app. When is her next appointment?",
                image: 'https://randomuser.me/api/portraits/women/44.jpg',
                unread: false
              }].map((msg, index) => <div key={index} className={`p-3 border rounded-lg ${msg.unread ? 'border-indigo-200 bg-indigo-50' : 'border-gray-100'}`}>
                    <div className="flex items-start">
                      <img src={msg.image} alt={msg.name} className="w-10 h-10 rounded-full mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {msg.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {msg.relation}
                            </p>
                          </div>
                          <div className="flex items-center mt-1 sm:mt-0">
                            {msg.unread && <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>}
                            <span className="text-xs text-gray-500">
                              {msg.date}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {msg.message}
                        </p>
                        <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium mt-2">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>)}
              </div>
              <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                Message Family
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-gray-800">
              Research Participation
            </h3>
            <p className="text-gray-600">
              Contribute anonymized data to help advance Alzheimer's research
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              Learn More
            </button>
            <button className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              Opt In
            </button>
          </div>
        </div>
      </div>
    </div>;
};