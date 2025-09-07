import React, { useState, memo } from 'react';
import { Brain, Pill, Apple, Users, Activity, Calendar, Play, MessageSquare } from 'lucide-react';
export const PatientView = () => {
  const [activeSection, setActiveSection] = useState('overview');
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Patient Portal</h1>
          <p className="text-gray-600">
            Manage your health, memories, and daily routines
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Calendar size={24} className="text-indigo-500 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Today</p>
              <p className="font-semibold">June 15, 2023</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex border-b mb-6">
          <button onClick={() => setActiveSection('overview')} className={`px-4 py-2 font-medium ${activeSection === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
            Overview
          </button>
          <button onClick={() => setActiveSection('memory')} className={`px-4 py-2 font-medium ${activeSection === 'memory' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
            Memory
          </button>
          <button onClick={() => setActiveSection('medication')} className={`px-4 py-2 font-medium ${activeSection === 'medication' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
            Medication
          </button>
          <button onClick={() => setActiveSection('nutrition')} className={`px-4 py-2 font-medium ${activeSection === 'nutrition' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
            Nutrition
          </button>
        </div>
        {activeSection === 'overview' && <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center">
                <div className="rounded-full bg-indigo-100 p-3 mr-4">
                  <Activity size={24} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Brain Activity Score</p>
                  <h3 className="text-2xl font-bold text-gray-800">87/100</h3>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <Pill size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Medication Adherence</p>
                  <h3 className="text-2xl font-bold text-gray-800">92%</h3>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <Apple size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Nutrition Score</p>
                  <h3 className="text-2xl font-bold text-gray-800">78/100</h3>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <Brain size={24} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Memory Sessions</p>
                  <h3 className="text-2xl font-bold text-gray-800">3 Today</h3>
                </div>
              </div>
            </div>
            <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-md flex items-center">
              <div className="mr-6">
                <Brain size={48} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">
                  Hello Sarah, how are you feeling today?
                </h2>
                <p className="opacity-90">
                  Track your mood, complete your daily tasks, and keep your
                  memories fresh.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Today's Tasks
                </h3>
                <div className="space-y-3">
                  {[{
                task: 'Take morning medication',
                completed: true
              }, {
                task: 'Memory exercise session',
                completed: true
              }, {
                task: 'Eat lunch',
                completed: true
              }, {
                task: 'Take afternoon medication',
                completed: false
              }, {
                task: '30-minute walk',
                completed: false
              }].map((item, index) => <div key={index} className="flex items-center">
                      <input type="checkbox" checked={item.completed} readOnly className="w-4 h-4 text-indigo-600 rounded mr-3" />
                      <span className={item.completed ? 'text-gray-500 line-through' : 'text-gray-800'}>
                        {item.task}
                      </span>
                    </div>)}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  How are you feeling today?
                </h3>
                <div className="flex justify-around py-4">
                  <button className="flex flex-col items-center">
                    <div className="text-5xl mb-2">😊</div>
                    <span className="text-sm text-gray-600">Great</span>
                  </button>
                  <button className="flex flex-col items-center">
                    <div className="text-5xl mb-2">😐</div>
                    <span className="text-sm text-gray-600">Okay</span>
                  </button>
                  <button className="flex flex-col items-center">
                    <div className="text-5xl mb-2">😟</div>
                    <span className="text-sm text-gray-600">Not Well</span>
                  </button>
                </div>
                <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  Record Mood
                </button>
              </div>
            </div>
          </div>}
        {activeSection === 'memory' && <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Your Memory Collection
              </h3>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Add New Memory
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[{
            title: 'Wedding Day',
            date: 'June 12, 1982',
            preview: 'The day you married Robert at Lakeside Chapel...',
            image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
          }, {
            title: "Emma's Birth",
            date: 'March 24, 1985',
            preview: 'The day your daughter Emma was born at Memorial Hospital...',
            image: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
          }, {
            title: 'Family Trip to Italy',
            date: 'July 2003',
            preview: 'Your family vacation to Rome, Florence, and Venice...',
            image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
          }, {
            title: 'Retirement Party',
            date: 'May 15, 2015',
            preview: 'Your retirement celebration after 35 years of teaching...',
            image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
          }, {
            title: "Michael's Graduation",
            date: 'June 5, 2008',
            preview: "Your son Michael's college graduation ceremony...",
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
          }, {
            title: 'First Grandchild',
            date: 'November 12, 2010',
            preview: 'The birth of your first grandchild, Jamie...',
            image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
          }].map((story, index) => <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Calendar size={14} className="mr-1" />
                      {story.date}
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">
                      {story.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {story.preview}
                    </p>
                    <button className="flex items-center text-indigo-600 text-sm font-medium">
                      <Play size={16} className="mr-1" />
                      Listen to story
                    </button>
                  </div>
                </div>)}
            </div>
          </div>}
        {activeSection === 'medication' && <div className="space-y-6">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <Pill size={24} className="text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Next Medication
                </h2>
                <p className="text-gray-600">Donepezil, 10mg - 8:00 PM Today</p>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Today's Schedule
            </h3>
            <div className="space-y-4">
              {[{
            time: '8:00 AM',
            name: 'Donepezil',
            dosage: '10mg',
            instructions: 'Take with breakfast',
            status: 'taken'
          }, {
            time: '1:00 PM',
            name: 'Memantine',
            dosage: '5mg',
            instructions: 'Take with lunch',
            status: 'taken'
          }, {
            time: '3:00 PM',
            name: 'Vitamin B Complex',
            dosage: '1 tablet',
            instructions: 'Take with a snack',
            status: 'missed'
          }, {
            time: '8:00 PM',
            name: 'Donepezil',
            dosage: '10mg',
            instructions: 'Take with dinner',
            status: 'upcoming'
          }, {
            time: '9:00 PM',
            name: 'Vitamin D',
            dosage: '1000 IU',
            instructions: 'Take before bedtime',
            status: 'upcoming'
          }].map((med, index) => <div key={index} className={`flex items-center p-4 rounded-lg border ${med.status === 'taken' ? 'bg-green-50 border-green-200' : med.status === 'missed' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {med.name} ({med.dosage})
                        </h4>
                        <p className="text-sm text-gray-600">
                          {med.instructions}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="font-medium">{med.time}</span>
                        {med.status === 'upcoming' && <button className="ml-4 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded text-sm transition-colors">
                            Take Now
                          </button>}
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>}
        {activeSection === 'nutrition' && <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Today's Nutrition Plan
            </h3>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-500 mr-2" />
                  <span>
                    {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                {[{
              meal: 'Breakfast',
              time: '8:30 AM',
              title: 'Omega-3 Rich Oatmeal',
              description: 'Steel-cut oats with walnuts, ground flaxseed, blueberries, and a drizzle of honey',
              image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
              completed: true
            }, {
              meal: 'Lunch',
              time: '12:30 PM',
              title: 'Mediterranean Salad',
              description: 'Mixed greens with grilled salmon, olives, tomatoes, cucumbers, and olive oil dressing',
              image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
              completed: true
            }, {
              meal: 'Snack',
              time: '3:30 PM',
              title: 'Brain-Boosting Snack',
              description: 'Dark chocolate (70% cocoa) and a handful of walnuts',
              image: 'https://images.unsplash.com/photo-1548907040-4bea35f9fd5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
              completed: false
            }, {
              meal: 'Dinner',
              time: '6:30 PM',
              title: 'Turmeric Chicken & Vegetables',
              description: 'Turmeric-spiced chicken breast with roasted broccoli and quinoa',
              image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
              completed: false
            }].map((meal, index) => <div key={index} className="flex flex-col md:flex-row border-b border-gray-100 pb-6">
                    <div className="md:w-1/3 mb-4 md:mb-0 md:mr-4">
                      <img src={meal.image} alt={meal.title} className="w-full h-48 object-cover rounded-lg" />
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded">
                            {meal.meal}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            {meal.time}
                          </span>
                        </div>
                        <div>
                          <input type="checkbox" checked={meal.completed} readOnly className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg mb-1">
                        {meal.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {meal.description}
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Family Messages</h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[{
            name: 'Emma',
            relation: 'Daughter',
            message: "Hi Mom! Just added some new photos from Jamie's graduation to help with your memory exercises.",
            time: '2 hours ago',
            image: 'https://randomuser.me/api/portraits/women/44.jpg'
          }, {
            name: 'Michael',
            relation: 'Son',
            message: "Just a reminder that I've scheduled your doctor appointment for next Tuesday at 10 AM. I'll pick you up at 9:30.",
            time: 'Yesterday',
            image: 'https://randomuser.me/api/portraits/men/32.jpg'
          }].map((update, index) => <div key={index} className="flex items-start p-3 border-b border-gray-100">
                <img src={update.image} alt={update.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium text-gray-800">{update.name}</h4>
                    <span className="text-xs text-gray-500 ml-2">
                      ({update.relation})
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{update.message}</p>
                  <span className="text-xs text-gray-500">{update.time}</span>
                </div>
              </div>)}
          </div>
          <div className="mt-4 flex">
            <input type="text" placeholder="Type a message..." className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg transition-colors">
              <MessageSquare size={20} />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Healthcare Team
          </h3>
          <div className="space-y-4">
            {[{
            name: 'Dr. Jennifer Lee',
            specialty: 'Neurologist',
            nextAppt: 'June 28, 2023',
            image: 'https://randomuser.me/api/portraits/women/68.jpg'
          }, {
            name: 'Dr. Robert Chen',
            specialty: 'Primary Care',
            nextAppt: 'July 15, 2023',
            image: 'https://randomuser.me/api/portraits/men/76.jpg'
          }].map((provider, index) => <div key={index} className="flex items-center p-3 border-b border-gray-100">
                <img src={provider.image} alt={provider.name} className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">{provider.name}</h4>
                  <p className="text-xs text-gray-500">{provider.specialty}</p>
                  <p className="text-sm text-indigo-600">
                    Next: {provider.nextAppt}
                  </p>
                </div>
              </div>)}
            <button className="w-full mt-2 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg font-medium transition-colors">
              Contact Healthcare Team
            </button>
          </div>
        </div>
      </div>
    </div>;
};