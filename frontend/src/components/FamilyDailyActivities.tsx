import React from 'react';
import { Activity, Brain, Pill, Apple, CheckCircle, XCircle, Clock, Calendar } from 'lucide-react';
export const FamilyDailyActivities = () => {
  return <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Daily Activities
          </h1>
          <p className="text-gray-600">
            Monitor Sarah's daily routines and activities
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
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-gray-500">6 of 7 doses taken</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Memory Exercises</p>
              <div className="text-2xl font-bold">3/3</div>
              <p className="text-xs text-gray-500">Completed today</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Physical Activity</p>
              <div className="text-2xl font-bold">2/3</div>
              <p className="text-xs text-gray-500">Exercises completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Apple className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Nutrition</p>
              <div className="text-2xl font-bold">Good</div>
              <p className="text-xs text-gray-500">All meals completed</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Today's Activity Timeline
          </h3>
          <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
            View Full Schedule
          </button>
        </div>
        <div className="space-y-4">
          {[{
          time: '8:00 AM',
          activity: 'Morning Medication',
          description: 'Donepezil (10mg)',
          status: 'completed'
        }, {
          time: '8:30 AM',
          activity: 'Breakfast',
          description: 'Omega-3 rich oatmeal with blueberries',
          status: 'completed'
        }, {
          time: '9:30 AM',
          activity: 'Memory Exercise',
          description: 'Photo recognition session',
          status: 'completed'
        }, {
          time: '10:30 AM',
          activity: 'Morning Walk',
          description: '15-minute walk around the neighborhood',
          status: 'skipped'
        }, {
          time: '12:00 PM',
          activity: 'Lunch Medication',
          description: 'Memantine (5mg)',
          status: 'completed'
        }, {
          time: '12:30 PM',
          activity: 'Lunch',
          description: 'Mediterranean salad with salmon',
          status: 'completed'
        }, {
          time: '2:00 PM',
          activity: 'Cognitive Game',
          description: 'Pattern recognition exercise',
          status: 'completed'
        }, {
          time: '3:30 PM',
          activity: 'Social Activity',
          description: 'Video call with Emma (daughter)',
          status: 'completed'
        }, {
          time: '5:30 PM',
          activity: 'Evening Walk',
          description: '20-minute walk in the garden',
          status: 'upcoming'
        }, {
          time: '6:30 PM',
          activity: 'Dinner',
          description: 'Grilled chicken with vegetables',
          status: 'upcoming'
        }, {
          time: '8:00 PM',
          activity: 'Evening Medication',
          description: 'Donepezil (10mg) and Vitamin B Complex',
          status: 'upcoming'
        }].map((activity, index) => <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-500">
                    {activity.time}
                  </span>
                  <div className={`w-3 h-3 mt-2 rounded-full ${activity.status === 'completed' ? 'bg-green-500' : activity.status === 'skipped' ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {activity.activity}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${activity.status === 'completed' ? 'bg-green-100 text-green-700' : activity.status === 'skipped' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
              </span>
            </div>)}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Today's Nutrition Plan
          </h3>
          <div className="space-y-4">
            {[{
            meal: 'Breakfast',
            food: 'Omega-3 rich oatmeal with blueberries',
            time: '8:30 AM',
            completed: true
          }, {
            meal: 'Lunch',
            food: 'Mediterranean salad with olive oil and fish',
            time: '12:30 PM',
            completed: true
          }, {
            meal: 'Snack',
            food: 'Walnuts and dark chocolate',
            time: '3:30 PM',
            completed: false
          }, {
            meal: 'Dinner',
            food: 'Turmeric chicken with broccoli and quinoa',
            time: '6:30 PM',
            completed: false
          }].map((meal, index) => <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                <div className="mr-3">
                  {meal.completed ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Clock className="h-5 w-5 text-gray-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-800">{meal.meal}</h4>
                    <span className="text-xs text-gray-500">{meal.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{meal.food}</p>
                </div>
              </div>)}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Medication Schedule
          </h3>
          <div className="space-y-4">
            {[{
            time: '8:00 AM',
            name: 'Donepezil',
            dosage: '10mg',
            taken: true
          }, {
            time: '12:00 PM',
            name: 'Memantine',
            dosage: '5mg',
            taken: true
          }, {
            time: '8:00 PM',
            name: 'Donepezil',
            dosage: '10mg',
            taken: false
          }, {
            time: '8:00 PM',
            name: 'Vitamin B Complex',
            dosage: '1 tablet',
            taken: false
          }].map((med, index) => <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${med.taken ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-800">{med.name}</h4>
                      <span className="ml-2 text-xs text-gray-500">
                        {med.dosage}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{med.time}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${med.taken ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {med.taken ? 'Taken' : 'Scheduled'}
                </span>
              </div>)}
            <button className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
              View Full Medication History
            </button>
          </div>
        </div>
      </div>
    </div>;
};