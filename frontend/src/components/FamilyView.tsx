import React, { memo } from 'react';
import { Users, MessageCircle, Calendar, Image, Upload, Clock, User, Activity, AlertCircle, Camera, FileText, Video } from 'lucide-react';
export const FamilyView = () => {
  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Family Portal</h1>
        <p className="text-gray-600">
          Stay connected and support your loved one
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-indigo-600 text-white p-5 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">
                  Patient Status: Sarah Johnson
                </h2>
                <p className="opacity-80">Today's updates and activities</p>
              </div>
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors">
                Contact Doctor
              </button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center mb-2">
                    <Activity size={18} className="text-indigo-600 mr-2" />
                    <h3 className="font-medium text-gray-800">Health Status</h3>
                  </div>
                  <div className="flex items-center text-2xl font-bold text-gray-800">
                    <span className="text-3xl mr-2">😊</span> Good
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Updated 2 hours ago
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center mb-2">
                    <Pill size={18} className="text-green-600 mr-2" />
                    <h3 className="font-medium text-gray-800">Medication</h3>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">92%</div>
                  <p className="text-xs text-gray-500 mt-1">
                    Adherence rate this week
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center mb-2">
                    <Brain size={18} className="text-purple-600 mr-2" />
                    <h3 className="font-medium text-gray-800">Memory Score</h3>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">72/100</div>
                  <p className="text-xs text-green-600 mt-1">
                    ↑8% from last month
                  </p>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Today's Activities
              </h3>
              <div className="space-y-4 mb-6">
                {[{
                time: '8:30 AM',
                activity: 'Breakfast',
                description: 'Ate omega-3 rich oatmeal with blueberries',
                completed: true
              }, {
                time: '9:00 AM',
                activity: 'Medication',
                description: 'Took morning dose of Donepezil (10mg)',
                completed: true
              }, {
                time: '10:30 AM',
                activity: 'Memory Exercise',
                description: 'Completed photo recognition session',
                completed: true
              }, {
                time: '12:30 PM',
                activity: 'Lunch',
                description: 'Had Mediterranean salad with salmon',
                completed: true
              }, {
                time: '3:00 PM',
                activity: 'Cognitive Game',
                description: 'Scheduled pattern recognition exercise',
                completed: false
              }].map((item, index) => <div key={index} className="flex items-start p-3 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg">
                    <div className="mr-4">
                      <div className={`w-4 h-4 rounded-full mt-1 ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold text-gray-800">
                          {item.activity}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>)}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle size={20} className="text-amber-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Sleep Pattern Change
                    </h4>
                    <p className="text-sm text-gray-600">
                      Sarah has been waking up 2-3 times during the night for
                      the past week. This may affect her daytime cognitive
                      function.
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Detected 3 days ago
                      </span>
                      <button className="text-amber-700 hover:text-amber-800 text-sm font-medium">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-4">Family Circle</h3>
            <div className="space-y-4">
              {[{
              name: 'Robert Johnson',
              relation: 'Spouse',
              image: 'https://randomuser.me/api/portraits/men/52.jpg',
              status: 'online'
            }, {
              name: 'Emma Wilson',
              relation: 'Daughter',
              image: 'https://randomuser.me/api/portraits/women/44.jpg',
              status: 'online'
            }, {
              name: 'Michael Johnson',
              relation: 'Son',
              image: 'https://randomuser.me/api/portraits/men/32.jpg',
              status: 'offline'
            }, {
              name: 'Jamie Wilson',
              relation: 'Granddaughter',
              image: 'https://randomuser.me/api/portraits/women/22.jpg',
              status: 'offline'
            }].map((member, index) => <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full mr-3" />
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {member.name}
                      </h4>
                      <p className="text-xs text-gray-500">{member.relation}</p>
                    </div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <MessageCircle size={18} />
                  </button>
                </div>)}
            </div>
            <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
              Start Family Chat
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {[{
              title: 'Weekly Family Video Call',
              date: 'June 18, 2023',
              time: '7:00 PM',
              attendees: 4
            }, {
              title: 'Doctor Appointment',
              date: 'June 28, 2023',
              time: '10:00 AM',
              attendees: 2
            }, {
              title: 'Monthly Care Planning',
              date: 'June 30, 2023',
              time: '10:00 AM',
              attendees: 3
            }].map((event, index) => <div key={index} className="border-b border-gray-100 pb-3">
                  <h4 className="font-medium text-gray-800">{event.title}</h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar size={14} className="mr-1" />
                    <span>
                      {event.date}, {event.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex -space-x-2">
                      {[...Array(event.attendees)].map((_, i) => <div key={i} className="w-6 h-6 rounded-full bg-indigo-100 border border-white flex items-center justify-center">
                          <User size={12} className="text-indigo-600" />
                        </div>)}
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Details
                    </button>
                  </div>
                </div>)}
            </div>
            <button className="w-full mt-4 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg text-sm font-medium transition-colors">
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Memory Support</h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All Memories
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Help Sarah remember important moments by adding photos, stories, and
            memories to her Memory Companion.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-100 p-3 rounded-lg text-center hover:bg-gray-200 transition-colors cursor-pointer">
              <Camera size={24} className="mx-auto text-gray-600 mb-2" />
              <span className="text-sm text-gray-700">Upload Photos</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center hover:bg-gray-200 transition-colors cursor-pointer">
              <FileText size={24} className="mx-auto text-gray-600 mb-2" />
              <span className="text-sm text-gray-700">Write Story</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center hover:bg-gray-200 transition-colors cursor-pointer">
              <Video size={24} className="mx-auto text-gray-600 mb-2" />
              <span className="text-sm text-gray-700">Record Video</span>
            </div>
          </div>
          <h4 className="font-medium text-gray-800 mb-3">
            Recently Added Memories
          </h4>
          <div className="grid grid-cols-3 gap-2">
            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Graduation 1" className="rounded-lg w-full h-24 object-cover" />
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Graduation 2" className="rounded-lg w-full h-24 object-cover" />
            <div className="relative rounded-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1627556704302-624286467c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Graduation 3" className="w-full h-24 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-medium">
                +3 more
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Care Tasks</h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Add Task
            </button>
          </div>
          <div className="space-y-3">
            {[{
            task: 'Refill Donepezil prescription',
            assignee: 'Michael',
            due: 'June 20',
            completed: false
          }, {
            task: 'Schedule memory assessment',
            assignee: 'Emma',
            due: 'June 25',
            completed: false
          }, {
            task: 'Arrange transportation to doctor',
            assignee: 'Robert',
            due: 'June 28',
            completed: false
          }, {
            task: 'Update medication list',
            assignee: 'Michael',
            due: 'June 15',
            completed: true
          }, {
            task: 'Family video call',
            assignee: 'Emma',
            due: 'June 18',
            completed: false
          }].map((task, index) => <div key={index} className="flex items-center p-3 border-b border-gray-100">
                <input type="checkbox" checked={task.completed} readOnly className="w-4 h-4 text-indigo-600 rounded mr-3 focus:ring-indigo-500" />
                <div className="flex-1">
                  <p className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {task.task}
                  </p>
                  <div className="flex text-xs text-gray-500">
                    <span>Assigned to: {task.assignee}</span>
                    <span className="mx-2">•</span>
                    <span>Due: {task.due}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>)}
          </div>
          <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
            View All Tasks
          </button>
        </div>
      </div>
    </div>;
};