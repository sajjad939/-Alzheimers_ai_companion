import React, { useState, memo } from 'react';
import { Clock, Calendar, CheckCircle, XCircle, Upload, Brain, Camera, Video, FileText, Search, Image, Heart, User, UserPlus, Settings, Tag } from 'lucide-react';
export const FamilyMemorySupport = () => {
  const [activeMemoryTab, setActiveMemoryTab] = useState('collection');
  return <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold text-gray-900">
            Memory Support
          </h1>
          <p className="text-gray-600">
            Help strengthen Sarah's memory with photos and stories
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

      {/* Memory Support Navigation Tabs */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="flex overflow-x-auto border-b">
          <button onClick={() => setActiveMemoryTab('collection')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeMemoryTab === 'collection' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
            Memory Collection
          </button>
          <button onClick={() => setActiveMemoryTab('exercises')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeMemoryTab === 'exercises' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
            Memory Exercises
          </button>
          <button onClick={() => setActiveMemoryTab('progress')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeMemoryTab === 'progress' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
            Progress Tracking
          </button>
          <button onClick={() => setActiveMemoryTab('timeline')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeMemoryTab === 'timeline' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
            Memory Timeline
          </button>
        </div>
        <div className="p-4 sm:p-6">
          {/* Memory Collection Tab Content */}
          {activeMemoryTab === 'collection' && <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
                  Memory Collection
                </h3>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="relative w-full sm:w-auto">
                    <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search memories..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
                    Add New
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                  <Camera className="h-12 w-12 text-gray-400 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">
                    Upload Photos
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Add family photos to help with Sarah's memory exercises
                  </p>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Select Photos
                  </button>
                </div>
                <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                  <Video className="h-12 w-12 text-gray-400 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">
                    Record Video
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Create video messages or record special moments
                  </p>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Start Recording
                  </button>
                </div>
                <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                  <FileText className="h-12 w-12 text-gray-400 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">
                    Write Story
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Document important memories and family stories
                  </p>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Create Story
                  </button>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Recent Memories
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[{
                type: 'photo',
                title: 'Family Vacation 2018',
                image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                date: '3 days ago'
              }, {
                type: 'photo',
                title: 'Birthday Party',
                image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                date: '1 week ago'
              }, {
                type: 'video',
                title: 'Christmas Message',
                image: 'https://images.unsplash.com/photo-1627556704302-624286467c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                date: '2 weeks ago'
              }, {
                type: 'story',
                title: 'How We Met',
                image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                date: '1 month ago'
              }].map((memory, index) => <div key={index} className="group relative rounded-lg overflow-hidden">
                      <img src={memory.image} alt={memory.title} className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                        <h5 className="text-white font-medium text-sm">
                          {memory.title}
                        </h5>
                        <p className="text-xs text-gray-300">{memory.date}</p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {memory.type === 'photo' && <Image size={16} className="text-white bg-black/30 p-1 rounded" />}
                        {memory.type === 'video' && <Video size={16} className="text-white bg-black/30 p-1 rounded" />}
                        {memory.type === 'story' && <FileText size={16} className="text-white bg-black/30 p-1 rounded" />}
                      </div>
                    </div>)}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Memory Categories
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[{
                name: 'Family',
                count: 24,
                icon: <User size={16} />
              }, {
                name: 'Vacations',
                count: 18,
                icon: <Image size={16} />
              }, {
                name: 'Celebrations',
                count: 12,
                icon: <Heart size={16} />
              }, {
                name: 'Friends',
                count: 8,
                icon: <UserPlus size={16} />
              }].map((category, index) => <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 p-2 rounded-full mr-3">
                          {category.icon}
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {category.count}
                      </span>
                    </div>)}
                </div>
              </div>
            </div>}
          {/* Memory Exercises Tab Content */}
          {activeMemoryTab === 'exercises' && <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Memory Exercises
                </h3>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Customize Exercises
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[{
              title: 'Photo Recognition',
              description: 'Help Sarah identify people and places in family photos',
              frequency: 'Daily',
              difficulty: 'Moderate',
              lastCompleted: 'Yesterday',
              icon: <Image className="h-8 w-8 text-indigo-600" />,
              color: 'bg-indigo-100'
            }, {
              title: 'Story Completion',
              description: 'Ask Sarah to complete stories from her past',
              frequency: '3x Weekly',
              difficulty: 'Challenging',
              lastCompleted: '3 days ago',
              icon: <FileText className="h-8 w-8 text-purple-600" />,
              color: 'bg-purple-100'
            }, {
              title: 'Name Association',
              description: 'Practice connecting names with faces of family and friends',
              frequency: 'Daily',
              difficulty: 'Easy',
              lastCompleted: 'Today',
              icon: <Tag className="h-8 w-8 text-green-600" />,
              color: 'bg-green-100'
            }, {
              title: 'Timeline Ordering',
              description: 'Arrange life events in chronological order',
              frequency: 'Weekly',
              difficulty: 'Challenging',
              lastCompleted: '5 days ago',
              icon: <Clock className="h-8 w-8 text-orange-600" />,
              color: 'bg-orange-100'
            }].map((exercise, index) => <div key={index} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex flex-col sm:flex-row items-start">
                      <div className={`p-3 rounded-full ${exercise.color} mr-4 mb-3 sm:mb-0 flex-shrink-0`}>
                        {exercise.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900">
                          {exercise.title}
                        </h4>
                        <p className="text-gray-600 mb-3">
                          {exercise.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {exercise.frequency}
                          </span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            {exercise.difficulty}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                            Last: {exercise.lastCompleted}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium mb-2 sm:mb-0">
                            Start Exercise
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                            View History
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                <div className="flex flex-col sm:flex-row items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4 mb-3 sm:mb-0 flex-shrink-0">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      AI Recommendation
                    </h4>
                    <p className="text-gray-600 mb-3">
                      Based on recent performance, Sarah would benefit from more
                      frequent name association exercises and photo recognition
                      with recent family photos.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                      Apply Recommendations
                    </button>
                  </div>
                </div>
              </div>
            </div>}
          {/* Progress Tracking Tab Content */}
          {activeMemoryTab === 'progress' && <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-0">
                  Memory Progress Tracking
                </h3>
                <div className="flex space-x-2">
                  <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
                    Week
                  </button>
                  <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm">
                    Month
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
                    3 Months
                  </button>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h4 className="font-medium text-gray-900 mb-4">
                  Memory Performance
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Photo Recognition</span>
                      <span className="font-medium text-green-600">↑ 8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{
                    width: '76%'
                  }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Name Association</span>
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
                      <span className="text-gray-600">Story Recall</span>
                      <span className="font-medium">No change</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{
                    width: '62%'
                  }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Timeline Ordering</span>
                      <span className="font-medium text-amber-600">↓ 3%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{
                    width: '54%'
                  }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Exercise Completion
                  </h4>
                  <div className="flex justify-center">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4F46E5" strokeWidth="3" strokeDasharray="85, 100" strokeLinecap="round" />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="text-3xl font-bold text-gray-900">
                          85%
                        </div>
                        <div className="text-sm text-gray-500">Completed</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    17 of 20 scheduled exercises completed this month
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Monthly Trends
                  </h4>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        72/100
                      </div>
                      <div className="text-sm text-gray-500">Current Score</div>
                    </div>
                    <div className="text-left sm:text-right mt-2 sm:mt-0">
                      <div className="text-lg font-bold text-green-600">
                        +8%
                      </div>
                      <div className="text-sm text-gray-500">
                        From Last Month
                      </div>
                    </div>
                  </div>
                  <div className="h-20 flex items-end justify-between mt-4">
                    {[65, 58, 62, 67, 72].map((value, index) => <div key={index} className="flex flex-col items-center">
                        <div className={`w-6 sm:w-8 ${index === 4 ? 'bg-indigo-600' : 'bg-indigo-200'} rounded-t`} style={{
                    height: `${value * 0.2}px`
                  }}></div>
                        <div className="text-xs text-gray-500 mt-1">
                          {['Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h4 className="font-medium text-gray-900 mb-4">
                  Recent Activity
                </h4>
                <div className="space-y-3">
                  {[{
                activity: 'Completed Photo Recognition Exercise',
                score: '85%',
                time: 'Today, 10:30 AM',
                change: '+5%'
              }, {
                activity: 'Completed Name Association Exercise',
                score: '78%',
                time: 'Yesterday, 2:15 PM',
                change: '+3%'
              }, {
                activity: 'Missed Timeline Ordering Exercise',
                score: 'N/A',
                time: 'June 15, 3:00 PM',
                change: 'N/A'
              }, {
                activity: 'Completed Story Recall Exercise',
                score: '62%',
                time: 'June 14, 11:45 AM',
                change: 'No change'
              }].map((item, index) => <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border border-gray-100 rounded-lg">
                      <div className="mb-2 sm:mb-0">
                        <div className="font-medium text-gray-800">
                          {item.activity}
                        </div>
                        <div className="text-xs text-gray-500">{item.time}</div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="font-medium text-gray-800">
                          {item.score}
                        </div>
                        <div className={`text-xs ${item.change.includes('+') ? 'text-green-600' : item.change === 'No change' ? 'text-gray-500' : 'text-gray-400'}`}>
                          {item.change}
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>}
          {/* Memory Timeline Tab Content */}
          {activeMemoryTab === 'timeline' && <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-0">
                  Memory Timeline
                </h3>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Add Life Event
                </button>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block"></div>
                <div className="space-y-8">
                  {[{
                year: '1955',
                title: 'Birth',
                description: 'Sarah was born in Chicago, Illinois',
                image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
              }, {
                year: '1977',
                title: 'Marriage',
                description: 'Sarah married Robert Johnson in San Francisco',
                image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
              }, {
                year: '1980',
                title: 'First Child',
                description: 'Emma was born at Memorial Hospital',
                image: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
              }, {
                year: '1983',
                title: 'Second Child',
                description: 'Michael was born at City Hospital',
                image: 'https://images.unsplash.com/photo-1485423036251-8b2a2909899f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
              }, {
                year: '2010',
                title: 'Retirement',
                description: 'Sarah retired after 35 years as a teacher',
                image: 'https://images.unsplash.com/photo-1484712401471-05c7215830eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
              }].map((event, index) => <div key={index} className="relative pl-0 sm:pl-10">
                      <div className="absolute left-0 top-1.5 w-8 h-8 bg-indigo-100 border-4 border-white ring-2 ring-indigo-600 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600 hidden sm:flex">
                        {index + 1}
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg border border-gray-200">
                        {event.image && <img src={event.image} alt={event.title} className="w-full md:w-32 h-32 object-cover rounded-lg" />}
                        <div>
                          <div className="text-sm font-bold text-indigo-600 mb-1">
                            {event.year}
                          </div>
                          <h4 className="text-lg font-medium text-gray-900">
                            {event.title}
                          </h4>
                          <p className="text-gray-600">{event.description}</p>
                          <div className="flex gap-2 mt-3 flex-wrap">
                            <button className="text-sm text-gray-600 hover:text-gray-800">
                              Edit
                            </button>
                            <button className="text-sm text-gray-600 hover:text-gray-800">
                              Add Photos
                            </button>
                            <button className="text-sm text-gray-600 hover:text-gray-800">
                              Add Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-5">
                <div className="flex flex-col sm:flex-row items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4 mb-3 sm:mb-0 flex-shrink-0">
                    <Brain className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      Timeline Tips
                    </h4>
                    <p className="text-gray-600 mb-3">
                      Adding specific dates, locations, and people involved in
                      each life event can help strengthen Sarah's long-term
                      memory connections. Consider adding 2-3 photos for each
                      significant life event.
                    </p>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                      Learn More About Memory Timelines
                    </button>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Care Insights
            </h3>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
              View All
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-amber-100 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                Sleep Pattern Change
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Sarah has been waking up 2-3 times during the night for the past
                week. This may affect her daytime cognitive function.
              </p>
              <p className="text-xs text-gray-500">Detected 3 days ago</p>
            </div>
            <div className="p-4 border border-green-100 bg-green-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Improved Mood</h4>
              <p className="text-sm text-gray-600 mb-2">
                Sarah's mood has shown consistent improvement after starting the
                new memory exercises and social activities.
              </p>
              <p className="text-xs text-gray-500">Trend over past 2 weeks</p>
            </div>
            <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                Social Engagement
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Sarah participated in all scheduled social activities this week,
                showing increased verbal engagement.
              </p>
              <p className="text-xs text-gray-500">Updated yesterday</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Care Tasks</h3>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
              Add Task
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded mr-3" />
                <div>
                  <p className="font-medium text-gray-800">
                    Refill Donepezil prescription
                  </p>
                  <p className="text-xs text-gray-500">
                    Assigned to: Michael • Due: June 20
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded mr-3" />
                <div>
                  <p className="font-medium text-gray-800">
                    Schedule memory assessment
                  </p>
                  <p className="text-xs text-gray-500">
                    Assigned to: Emma • Due: June 25
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded mr-3" />
                <div>
                  <p className="font-medium text-gray-800">
                    Arrange transportation to doctor
                  </p>
                  <p className="text-xs text-gray-500">
                    Assigned to: Robert • Due: June 28
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded mr-3" />
                <div>
                  <p className="font-medium text-gray-800">
                    Update medication list
                  </p>
                  <p className="text-xs text-gray-500">
                    Assigned to: Michael • Due: June 15
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Family video call</p>
                  <p className="text-xs text-gray-500">
                    Assigned to: Emma • Due: June 18
                  </p>
                </div>
              </div>
            </div>
            <button className="w-full mt-3 text-indigo-600 text-sm font-medium hover:text-indigo-800">
              View All Tasks
            </button>
          </div>
        </div>
      </div>
    </div>;
};