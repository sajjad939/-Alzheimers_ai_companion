import React, { useState, useEffect, useRef, memo } from 'react';
import {
  Users,
  MessageCircle,
  Calendar,
  Image,
  Upload,
  Clock,
  User,
  Activity,
  AlertCircle,
  Brain,
  Pill,
  Apple,
  CheckCircle,
  XCircle,
  Bell,
  AlertTriangle,
  Mic,
  Video,
  Send,
  Smile,
  Phone,
  PaperclipIcon
} from 'lucide-react';

/**
 * FamilyConnect
 *
 * - Keeps your original UI/markup and styles intact.
 * - Adds full functionality: posting updates (text, file, voice), chat (send/persist), events (details + add to calendar),
 *   voice recording simulation, attachments via hidden file inputs, localStorage persistence, and small modals for composer/event details.
 *
 * Replace your existing component with this file. It does not require external libs beyond lucide-react.
 */

export const FamilyConnect = () => {
  // Core UI tab state (keeps original names)
  
  const [activeTab, setActiveTab] = useState('updates');
  const [messageInput, setMessageInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [callActive, setCallActive] = useState(false);

  // New: persistent states stored in localStorage
  const [updates, setUpdates] = useState(() => {
    try {
      const saved = localStorage.getItem('familyUpdates_v2');
      return saved ? JSON.parse(saved) : []; // will be an array of { id, author, text, time, attachments, voice }
    } catch {
      return [];
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('familyMessages_v2');
      // messages: { id, sender, text, time, attachments, voice }
      return saved ? JSON.parse(saved) : [
        // keep a couple of default static messages (so UI is consistent)
      ];
    } catch {
      return [];
    }
  });

  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('familyEvents_v2');
      return saved ? JSON.parse(saved) : [
        { id: 'e1', title: 'Weekly Family Video Call', date: 'June 18, 2023', time: '7:00 PM', attendees: 4, description: '' },
        { id: 'e2', title: 'Doctor Appointment', date: 'June 28, 2023', time: '10:00 AM', attendees: 2, description: '' },
        { id: 'e3', title: 'Monthly Care Planning', date: 'June 30, 2023', time: '10:00 AM', attendees: 3, description: '' }
      ];
    } catch {
      return [];
    }
  });

  // UI helpers & small modals (composer + event detail)
  const [showPostComposer, setShowPostComposer] = useState(false);
  const [composerText, setComposerText] = useState('');
  const [composerAttachments, setComposerAttachments] = useState([]); // stores file objects' preview URLs
  const [composerVoice, setComposerVoice] = useState(null); // simulated string
  const fileInputRef = useRef(null);

  const [selectedEvent, setSelectedEvent] = useState(null); // for Details modal
  const [showEventModal, setShowEventModal] = useState(false);

  // Chat scroll ref
  const chatScrollRef = useRef(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('familyUpdates_v2', JSON.stringify(updates));
  }, [updates]);

  useEffect(() => {
    localStorage.setItem('familyMessages_v2', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('familyEvents_v2', JSON.stringify(events));
  }, [events]);

  // Auto scroll chat when new message
  useEffect(() => {
    try {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }
    } catch {}
  }, [messages, activeTab]);

  // ---------- Handlers for original features (kept names) ----------
  const handleStartRecording = () => {
    setIsRecording(true);
    // simulate recording duration; user requested simulation
    setTimeout(() => {
      setIsRecording(false);
      setMessageInput((prev) => (prev ? prev + ' ' : '') + 'Voice message recorded');
    }, 1400);
  };

  const handleStopRecording = () => {
    // In original you call stop on mouse up; keep behavior: if it's recording and mouse up, stop immediately
    setIsRecording(false);
    setMessageInput((prev) => (prev ? prev + ' ' : '') + 'Voice message recorded');
  };

  const handleStartCall = () => {
    setCallActive(true);
  };

  const handleEndCall = () => {
    setCallActive(false);
  };

  // ---------- New features ----------

  // Post composer: open composer when user clicks "Post Update"
  const onClickPostUpdate = () => {
    setShowPostComposer(true);
    // Focus composer (if visible) - we cannot easily focus a textarea in original markup; we show a small overlay composer
  };

  // Save post
  const handlePostSubmit = () => {
    if (!composerText.trim() && composerAttachments.length === 0 && !composerVoice) {
      // nothing to post
      setShowPostComposer(false);
      return;
    }
    const newUpdate = {
      id: Date.now(),
      author: 'You',
      text: composerText.trim() || (composerVoice ? '(voice post)' : 'New update'),
      time: new Date().toLocaleString(),
      attachments: composerAttachments.slice(), // array of preview URLs
      voice: composerVoice || null
    };
    setUpdates((prev) => [newUpdate, ...prev]);
    // clear composer
    setComposerText('');
    composerAttachments.forEach((u) => {
      // revoke object URLs if generated
      try {
        if (u.startsWith('blob:')) URL.revokeObjectURL(u);
      } catch {}
    });
    setComposerAttachments([]);
    setComposerVoice(null);
    setShowPostComposer(false);
  };

  // Add chat message (Send button in chat)
  const handleSendMessage = () => {
    const text = messageInput.trim();
    if (!text) return;
    const newMsg = {
      id: Date.now(),
      sender: 'You',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: [],
      voice: null
    };
    setMessages((prev) => [...prev, newMsg]);
    setMessageInput('');
  };

  // When clicking "Start Family Chat" button in the Family Circle card
  const handleStartFamilyChat = () => {
    setActiveTab('message-support');
  };

  // Composer voice simulate (attach to composer)
  const handleComposerVoiceRecord = () => {
    setComposerVoice('🎤 Voice recorded');
  };

  // handle composer file input
  const handleComposerFileSelected = (e) => {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setComposerAttachments((prev) => [...prev, ...urls]);
    // clear the input to allow same file selection again
    e.target.value = '';
  };

  // Remove composer attachment
  const removeComposerAttachment = (url) => {
    setComposerAttachments((prev) => prev.filter((u) => u !== url));
    try {
      if (url.startsWith('blob:')) URL.revokeObjectURL(url);
    } catch {}
  };

  // Add event to calendar (via Upcoming Events area)
  const handleAddEvent = (eventData) => {
    // eventData: { title, date, time?, attendees?, description? }
    const eObj = {
      id: Date.now(),
      title: eventData.title || 'Event',
      date: eventData.date || new Date().toLocaleDateString(),
      time: eventData.time || '',
      attendees: eventData.attendees || 1,
      description: eventData.description || ''
    };
    setEvents((prev) => [...prev, eObj]);
    alert('Event added to calendar.');
  };

  // Show details for an event (opens modal)
  const handleShowEventDetails = (evt) => {
    setSelectedEvent(evt);
    setShowEventModal(true);
  };

  // Simple handler for "Add to Calendar" button in an update -> creates event using update time
  const handleAddUpdateToCalendar = (update) => {
    const eObj = {
      id: Date.now(),
      title: `${update.author} - Update`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attendees: 1,
      description: update.text || ''
    };
    setEvents((prev) => [...prev, eObj]);
    alert('Update added to calendar.');
  };

  // Clicking the attachment Paperclip in chat area: opens hidden file input which when selected adds a message with attachment
  const chatFileInputRef = useRef(null);

  const handleChatFileSelected = (e) => {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    // append a message with attachments
    const newMsg = {
      id: Date.now(),
      sender: 'You',
      text: '(file attached)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: urls,
      voice: null
    };
    setMessages((prev) => [...prev, newMsg]);
    e.target.value = '';
  };

  // remove event helper
  const handleRemoveEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // ---------- Small convenience: preload a couple of updates/messages into state if none exist (keeps UI familiar) ----------
  useEffect(() => {
    // If updates empty and no saved, we won't override user's original static markup — we will display posted updates above static content.
    // Keep messages as-is unless user had saved messages.
    // Do nothing here intentionally.
  }, []);

  // ---------- Render (keeps your original markup & layout) ----------
  return (
    <div className="space-y-6">
      {/* ---------------- Header ---------------- */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Family Connect</h1>
        <p className="text-gray-600">Stay connected with your loved ones</p>
      </div>

      {/* ---------------- Status Card ---------------- */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-indigo-600 text-white p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-xl font-bold">Sarah's Status</h2>
            <p className="opacity-80">Last updated: Today, 3:45 PM</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
            <button
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
              onClick={() => {
                // open doctor contact placeholder (could be replaced by a popup)
                alert('Contact Doctor: placeholder — implement actual contact flow if needed.');
              }}
            >
              Contact Doctor
            </button>
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-400 transition-colors"
              onClick={() => setActiveTab('message-support')}
            >
              Send Message
            </button>
          </div>
        </div>

        {/* ---------------- Tabs ---------------- */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('updates')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'updates' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Family Updates
            </button>
            <button
              onClick={() => setActiveTab('message-support')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'message-support' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Message Support
            </button>
          </div>
        </div>

        {/* ---------------- Family Updates Tab ---------------- */}
        <div className="p-4 sm:p-5">
          {activeTab === 'updates' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">Family Updates</h3>
                <button
                  onClick={onClickPostUpdate}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Post Update
                </button>
              </div>

              {/* Render any posted updates (user-created) above the static ones */}
              {updates.map((update) => (
                <div key={update.id} className="border-b border-gray-100 pb-6">
                  <h4 className="font-bold text-gray-800">{update.author}</h4>
                  <p className="text-gray-600 mb-2">{update.text}</p>
                  {update.attachments && update.attachments.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {update.attachments.map((a, idx) => (
                        <img key={idx} src={a} alt={`attachment-${idx}`} className="rounded-lg w-full h-20 object-cover" />
                      ))}
                    </div>
                  )}
                  {update.voice && <div className="text-sm text-gray-600 mb-1">🔊 {update.voice}</div>}
                  <span className="text-xs text-gray-500">{update.time}</span>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex space-x-4">
                      <button className="text-gray-500 hover:text-indigo-600 text-sm flex items-center">
                        <MessageCircle size={16} className="mr-1" /> Comment
                      </button>
                    </div>
                    <button
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      onClick={() => handleAddUpdateToCalendar(update)}
                    >
                      Add to Calendar
                    </button>
                  </div>
                </div>
              ))}

              {/* --- Original static updates (kept exactly as provided, unchanged markup) --- */}
              <div className="border-b border-gray-100 pb-6">
                <div className="flex items-start">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael" className="w-10 h-10 rounded-full mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                      <h3 className="font-bold text-gray-800">Michael Johnson</h3>
                      <span className="text-xs text-gray-500 mt-1 sm:mt-0">Today, 2:34 PM</span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      I've scheduled Mom's next neurologist appointment for June
                      28th at 10:00 AM. I'll be taking her there. The doctor
                      wanted to discuss the latest medication adjustments.
                    </p>
                    <div className="flex items-center text-sm text-indigo-600">
                      <Calendar size={16} className="mr-1" />
                      <span>Appointment added to calendar</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
                      <div className="flex space-x-4 mb-2 sm:mb-0">
                        <button className="text-gray-500 hover:text-indigo-600 text-sm flex items-center">
                          <MessageCircle size={16} className="mr-1" />
                          Comment
                        </button>
                        <button className="text-gray-500 hover:text-indigo-600 text-sm flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          <span className="ml-1">Thanks</span>
                        </button>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Add to Calendar</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-100 pb-6">
                <div className="flex items-start">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Emma" className="w-10 h-10 rounded-full mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                      <h3 className="font-bold text-gray-800">Emma Wilson</h3>
                      <span className="text-xs text-gray-500 mt-1 sm:mt-0">Yesterday, 11:15 AM</span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Added some new photos from Jamie's graduation to Mom's
                      Memory Companion. These should help with her memory
                      exercises this week!
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                      <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Graduation 1" className="rounded-lg w-full h-24 object-cover" />
                      <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Graduation 2" className="rounded-lg w-full h-24 object-cover" />
                      <div className="relative rounded-lg overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1627556704302-624286467c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Graduation 3" className="w-full h-24 object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-medium">+3 more</div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex space-x-4 mb-2 sm:mb-0">
                        <button className="text-gray-500 hover:text-indigo-600 text-sm flex items-center">
                          <MessageCircle size={16} className="mr-1" /> Comment
                        </button>
                        <button className="text-gray-500 hover:text-indigo-600 text-sm flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          <span className="ml-1">Thanks</span>
                        </button>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View All Photos</button>
                    </div>
                    <div className="mt-4 pl-6 border-l-2 border-gray-100">
                      <div className="flex items-start">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael" className="w-8 h-8 rounded-full mr-2 flex-shrink-0" />
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-gray-800 text-sm">Michael Johnson</h4>
                            <span className="text-xs text-gray-500 ml-2">10:30 AM</span>
                          </div>
                          <p className="text-sm text-gray-600">These are great! Mom will love seeing these during her memory session tomorrow.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Dr. Lee" className="w-10 h-10 rounded-full mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                      <h3 className="font-bold text-gray-800">Dr. Jennifer Lee</h3>
                      <span className="text-xs text-gray-500 mt-1 sm:mt-0">Monday, 9:45 AM</span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      I've reviewed Sarah's latest cognitive assessment. I'm
                      pleased to see the improvement in her short-term memory
                      scores. Let's continue with the current medication regimen
                      and memory exercises.
                    </p>
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-4">
                      <div className="flex items-center">
                        <Activity size={18} className="text-green-600 mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm">Cognitive Assessment Results</h4>
                          <p className="text-xs text-gray-600">Memory Score: 72/100 (↑8 from last month)</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex space-x-4 mb-2 sm:mb-0">
                        <button className="text-gray-500 hover:text-indigo-600 text-sm flex items-center"><MessageCircle size={16} className="mr-1" /> Comment</button>
                        <button className="text-gray-500 hover:text-indigo-600 text-sm flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          <span className="ml-1">Thanks</span>
                        </button>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View Full Report</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- Message Support Tab ---------------- */}
          {activeTab === 'message-support' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">Message Support</h3>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button onClick={handleStartCall} className="flex items-center justify-center bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition-colors">
                    <Video size={16} className="mr-1.5" /> Start Video Call
                  </button>
                  <button className="flex items-center justify-center bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors" onClick={() => alert('Audio call (simulated)')}>
                    <Phone size={16} className="mr-1.5" /> Start Audio Call
                  </button>
                </div>
              </div>

              {/* Call UI */}
              {callActive && (
                <div className="relative h-80 bg-gray-900 rounded-lg mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User size={48} className="text-white" />
                      </div>
                      <h4 className="text-white font-medium">Connecting to Sarah...</h4>
                      <p className="text-gray-300 text-sm mt-2">Video call in progress</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                    <button onClick={handleEndCall} className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Phone size={24} className="text-white transform rotate-135" />
                    </button>
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              <div className="bg-white border border-gray-200 rounded-lg">
                <div ref={chatScrollRef} className="h-64 sm:h-96 overflow-y-auto p-4 space-y-4">
                  {/* static messages (unchanged) */}
                  <div className="flex items-start">
                    <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="Sarah" className="w-10 h-10 rounded-full mr-3 flex-shrink-0" />
                    <div className="bg-indigo-50 rounded-lg p-3 max-w-md">
                      <p className="text-gray-800">Hello dear! How are you today? I was wondering if you could help me find my reading glasses later.</p>
                      <span className="text-xs text-gray-500 mt-1 block">11:30 AM</span>
                    </div>
                  </div>

                  <div className="flex items-start justify-end">
                    <div className="bg-blue-600 text-white rounded-lg p-3 max-w-md">
                      <p>Of course, Mom! I'll help you find them when I come over. Are they the ones with the red frames?</p>
                      <span className="text-xs text-blue-100 mt-1 block">11:32 AM</span>
                    </div>
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="You" className="w-10 h-10 rounded-full ml-3 flex-shrink-0" />
                  </div>

                  <div className="flex items-start">
                    <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="Sarah" className="w-10 h-10 rounded-full mr-3 flex-shrink-0" />
                    <div className="bg-indigo-50 rounded-lg p-3 max-w-md">
                      <p className="text-gray-800">Yes, those are the ones! I think I left them in the living room. Also, don't forget we have that doctor's appointment on Thursday.</p>
                      <span className="text-xs text-gray-500 mt-1 block">11:45 AM</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Today, 3:15 PM</span>
                  </div>

                  <div className="flex items-start">
                    <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="Sarah" className="w-10 h-10 rounded-full mr-3 flex-shrink-0" />
                    <div>
                      <div className="bg-indigo-50 rounded-lg p-3 max-w-md">
                        <p className="text-gray-800">I just finished my memory exercises for today!</p>
                        <span className="text-xs text-gray-500 mt-1 block">3:15 PM</span>
                      </div>
                      <div className="bg-gray-100 text-gray-800 rounded-lg p-3 mt-2 flex items-center">
                        <Mic className="h-5 w-5 mr-2 text-indigo-600 flex-shrink-0" />
                        <span>Voice message (0:12)</span>
                      </div>
                    </div>
                  </div>

                  {/* dynamic messages from state */}
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'items-start justify-end' : 'items-start'}`}>
                      {msg.sender !== 'You' && <img src="https://randomuser.me/api/portraits/women/79.jpg" alt={msg.sender} className="w-10 h-10 rounded-full mr-3 flex-shrink-0" />}
                      <div className={`${msg.sender === 'You' ? 'bg-blue-600 text-white' : 'bg-indigo-50 text-gray-800'} rounded-lg p-3 max-w-md`}>
                        <p>{msg.text}</p>
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            {msg.attachments.map((a, i) => (
                              <img key={i} src={a} alt={`att-${i}`} className="w-full h-16 object-cover rounded" />
                            ))}
                          </div>
                        )}
                        {msg.voice && <div className="text-sm text-gray-100 mt-1">🔊 {msg.voice}</div>}
                        <span className={`text-xs block mt-1 ${msg.sender === 'You' ? 'text-blue-100' : 'text-gray-500'}`}>{msg.time}</span>
                      </div>
                      {msg.sender === 'You' && <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="You" className="w-10 h-10 rounded-full ml-3 flex-shrink-0" />}
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 p-3">
                  <div className="flex items-end">
                    <div className="flex-1 relative">
                      <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        rows={2}
                      />
                      <button className="absolute right-3 bottom-3 text-gray-400 hover:text-indigo-600">
                        <Smile size={20} />
                      </button>
                    </div>
                    <div className="flex ml-3">
                      <input ref={chatFileInputRef} type="file" multiple style={{ display: 'none' }} onChange={handleChatFileSelected} />
                      <button
                        className="p-3 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 mr-2"
                        onClick={() => chatFileInputRef.current && chatFileInputRef.current.click()}
                      >
                        <PaperclipIcon size={20} />
                      </button>
                      <button
                        className={`p-3 rounded-full ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                        onMouseDown={() => {
                          // start simulated recording for chat input
                          setIsRecording(true);
                        }}
                        onMouseUp={() => {
                          if (isRecording) {
                            setIsRecording(false);
                            // attach voice to messageInput
                            setMessageInput((prev) => (prev ? prev + ' ' : '') + 'Voice message recorded');
                          }
                        }}
                        onMouseLeave={() => isRecording && setIsRecording(false)}
                      >
                        <Mic size={20} />
                      </button>
                      <button
                        className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 ml-2"
                        onClick={handleSendMessage}
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                  {isRecording && (
                    <div className="mt-2 text-center">
                      <span className="text-red-500 text-sm font-medium">Recording voice message...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- Events Section ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* messages list already above, left intact */}
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border-b border-gray-100 pb-3">
                  <h4 className="font-medium text-gray-800">{event.title}</h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar size={14} className="mr-1" />
                    <span>{event.date}{event.time ? `, ${event.time}` : ''}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex -space-x-2">
                      {[...Array(event.attendees || 1)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-indigo-100 border border-white flex items-center justify-center">
                          <User size={12} className="text-indigo-600" />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        onClick={() => handleShowEventDetails(event)}
                      >
                        Details
                      </button>
                      <button
                        className="text-sm text-gray-500 hover:text-red-600"
                        onClick={() => {
                          handleRemoveEvent(event.id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={() =>
                  handleAddEvent({
                    title: 'Custom Event',
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    attendees: 1,
                    description: ''
                  })
                }
                className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add to Calendar
              </button>
            </div>
          </div>

          {/* Family Circle & Start Family Chat (we wire the button) */}
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
              }].map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full mr-3" />
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{member.name}</h4>
                      <p className="text-xs text-gray-500">{member.relation}</p>
                    </div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-800" onClick={() => handleStartFamilyChat()}>
                    <MessageCircle size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => { setActiveTab('message-support'); }} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
              Start Family Chat
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- Composer Modal (simple overlay) ---------------- */}
      {showPostComposer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-2xl">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Post an update</h3>
              <button className="text-gray-600" onClick={() => setShowPostComposer(false)}><XCircle /></button>
            </div>
            <textarea
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              className="w-full border rounded p-2 mt-3"
              placeholder="Write something..."
              rows={4}
            />
            <div className="flex items-center gap-3 mt-3">
              <input ref={fileInputRef} type="file" multiple style={{ display: 'none' }} onChange={handleComposerFileSelected} />
              <button className="px-3 py-1 rounded bg-gray-100" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                <PaperclipIcon /> Attach
              </button>
              <button className="px-3 py-1 rounded bg-gray-100" onClick={handleComposerVoiceRecord}>
                <Mic /> Record Voice
              </button>
              <div className="ml-auto flex items-center gap-2">
                <button className="px-3 py-1 rounded border" onClick={() => setShowPostComposer(false)}>Cancel</button>
                <button className="px-3 py-1 rounded bg-indigo-600 text-white" onClick={handlePostSubmit}><Send /> Post</button>
              </div>
            </div>

            {composerAttachments.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {composerAttachments.map((a) => (
                  <div key={a} className="relative">
                    <img src={a} alt="att" className="w-full h-24 object-cover rounded" />
                    <button onClick={() => removeComposerAttachment(a)} className="absolute top-1 right-1 bg-white rounded-full p-1 text-sm">✕</button>
                  </div>
                ))}
              </div>
            )}
            {composerVoice && <div className="mt-2 text-sm text-gray-600">🔊 {composerVoice}</div>}
          </div>
        </div>
      )}

      {/* ---------------- Event Details Modal ---------------- */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
              <button className="text-gray-600" onClick={() => { setShowEventModal(false); setSelectedEvent(null); }}><XCircle /></button>
            </div>
            <p className="text-sm text-gray-600 mt-2">{selectedEvent.description || 'No description provided.'}</p>
            <p className="text-xs text-gray-500 mt-2">When: {selectedEvent.date}{selectedEvent.time ? `, ${selectedEvent.time}` : ''}</p>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-3 py-1 rounded border" onClick={() => { setShowEventModal(false); setSelectedEvent(null); }}>Close</button>
              <button className="px-3 py-1 rounded bg-indigo-600 text-white" onClick={() => { handleAddEvent(selectedEvent); setShowEventModal(false); setSelectedEvent(null); }}>Add to Calendar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(FamilyConnect);
