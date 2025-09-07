import React, { useState, memo } from 'react';
import { MessageCircle, User, Video, Phone, Mic, Send, Smile, PaperclipIcon } from 'lucide-react';
export const FamilyMessageSupport = () => {
  const [messageInput, setMessageInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, would start voice recording here
  };
  const handleStopRecording = () => {
    setIsRecording(false);
    // In a real app, would stop recording and process audio
    setMessageInput('Voice message recorded');
  };
  const handleStartCall = () => {
    setCallActive(true);
    // In a real app, would initiate video call
  };
  const handleEndCall = () => {
    setCallActive(false);
    // In a real app, would end video call
  };
  return <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold text-gray-900">
            Message Support
          </h1>
          <p className="text-gray-600">
            Stay connected with Sarah through messages and calls
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-indigo-600 text-white p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center mb-3 sm:mb-0">
                <div className="relative">
                  <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="Sarah" className="w-10 h-10 rounded-full" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
                <div className="ml-3">
                  <h2 className="font-bold">Sarah Johnson</h2>
                  <p className="text-xs opacity-80">Online now</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleStartCall()} className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
                  <Video size={18} />
                </button>
                <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                  <Phone size={18} />
                </button>
              </div>
            </div>
            {callActive && <div className="relative h-80 bg-gray-900 mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User size={48} className="text-white" />
                    </div>
                    <h4 className="text-white font-medium">
                      Connecting to Sarah...
                    </h4>
                    <p className="text-gray-300 text-sm mt-2">
                      Video call in progress
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded border border-gray-700">
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                  <button className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center" onClick={handleEndCall}>
                    <Phone size={24} className="text-white transform rotate-135" />
                  </button>
                  <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <Mic size={20} className="text-white" />
                  </button>
                  <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <Video size={20} className="text-white" />
                  </button>
                </div>
              </div>}
            <div className="h-64 sm:h-96 overflow-y-auto p-4 space-y-4">
              <div className="flex items-start">
                <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="Sarah" className="w-10 h-10 rounded-full mr-3 flex-shrink-0" />
                <div className="bg-indigo-50 rounded-lg p-3 max-w-md">
                  <p className="text-gray-800">
                    Hello dear! How are you today? I was wondering if you could
                    help me find my reading glasses later.
                  </p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    11:30 AM
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-end">
                <div className="bg-blue-600 text-white rounded-lg p-3 max-w-md">
                  <p>
                    Of course, Mom! I'll help you find them when I come over.
                    Are they the ones with the red frames?
                  </p>
                  <span className="text-xs text-blue-100 mt-1 block">
                    11:32 AM
                  </span>
                </div>
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="You" className="w-10 h-10 rounded-full ml-3 flex-shrink-0" />
              </div>
              <div className="flex items-start">
                <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="Sarah" className="w-10 h-10 rounded-full mr-3 flex-shrink-0" />
                <div className="bg-indigo-50 rounded-lg p-3 max-w-md">
                  <p className="text-gray-800">
                    Yes, those are the ones! I think I left them in the living
                    room. Also, don't forget we have that doctor's appointment
                    on Thursday.
                  </p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    11:45 AM
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Today, 3:15 PM
                </span>
              </div>
              <div className="flex items-start">
                <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="Sarah" className="w-10 h-10 rounded-full mr-3 flex-shrink-0" />
                <div>
                  <div className="bg-indigo-50 rounded-lg p-3 max-w-md">
                    <p className="text-gray-800">
                      I just finished my memory exercises for today!
                    </p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      3:15 PM
                    </span>
                  </div>
                  <div className="bg-gray-100 text-gray-800 rounded-lg p-3 mt-2 flex items-center">
                    <Mic className="h-5 w-5 mr-2 text-indigo-600 flex-shrink-0" />
                    <span>Voice message (0:12)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 p-3">
              <div className="flex items-end">
                <div className="flex-1 relative">
                  <textarea value={messageInput} onChange={e => setMessageInput(e.target.value)} placeholder="Type a message..." className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" rows={2}></textarea>
                  <button className="absolute right-3 bottom-3 text-gray-400 hover:text-indigo-600">
                    <Smile size={20} />
                  </button>
                </div>
                <div className="flex ml-3">
                  <button className="p-3 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 mr-2">
                    <PaperclipIcon size={20} />
                  </button>
                  <button className={`p-3 rounded-full ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`} onMouseDown={handleStartRecording} onMouseUp={handleStopRecording} onMouseLeave={() => isRecording && handleStopRecording()}>
                    <Mic size={20} />
                  </button>
                  <button className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 ml-2" onClick={() => messageInput && setMessageInput('')}>
                    <Send size={20} />
                  </button>
                </div>
              </div>
              {isRecording && <div className="mt-2 text-center">
                  <span className="text-red-500 text-sm font-medium">
                    Recording voice message...
                  </span>
                </div>}
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
            <h3 className="font-bold text-gray-800 mb-4">Communication Tips</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  Use simple, clear sentences and allow extra time for Sarah to
                  process information.
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  Avoid asking "Do you remember?" questions which can cause
                  frustration.
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  Visual cues and images can help reinforce verbal
                  communication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};