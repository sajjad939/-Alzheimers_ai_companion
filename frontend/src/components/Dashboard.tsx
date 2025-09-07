import React, { useState } from "react";
import { Brain, Pill, Apple, Activity, Calendar } from "lucide-react";

export const Dashboard = () => {
  const [activities, setActivities] = useState([
    { time: "9:00 AM", title: "Photo Memory Session", description: "Review family vacation photos from 2015", completed: true },
    { time: "11:30 AM", title: "Story Recording", description: "Record your childhood story about summer camp", completed: true },
    { time: "3:00 PM", title: "Cognitive Exercise", description: "Complete the pattern recognition game", completed: false },
  ]);
  const [medications, setMedications] = useState([
    { time: "8:00 AM", name: "Donepezil", dosage: "10mg", taken: true },
    { time: "1:00 PM", name: "Memantine", dosage: "5mg", taken: true },
    { time: "8:00 PM", name: "Donepezil", dosage: "10mg", taken: false },
    { time: "9:00 PM", name: "Vitamin B Complex", dosage: "1 tablet", taken: false },
  ]);
  const [meals, setMeals] = useState([
    { meal: "Breakfast", food: "Omega-3 rich oatmeal with blueberries", time: "8:30 AM", completed: true },
    { meal: "Lunch", food: "Mediterranean salad with olive oil and fish", time: "12:30 PM", completed: true },
    { meal: "Snack", food: "Walnuts and dark chocolate", time: "3:30 PM", completed: false },
    { meal: "Dinner", food: "Turmeric chicken with broccoli and quinoa", time: "6:30 PM", completed: false },
  ]);
  const [familyUpdates] = useState([
    { name: "Emma", relation: "Daughter", message: "Added 5 new photos from Jamie's graduation", time: "2 hours ago", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Michael", relation: "Son", message: "Scheduled a doctor appointment for next Tuesday", time: "Yesterday", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  ]);
  const [healthcareTeam] = useState([
    { name: "Dr. Jennifer Lee", specialty: "Neurologist", nextAppt: "June 28, 2023", image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Dr. Robert Chen", specialty: "Primary Care", nextAppt: "July 15, 2023", image: "https://randomuser.me/api/portraits/men/76.jpg" },
  ]);

  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showAllMedications, setShowAllMedications] = useState(false);
  const [showHealthcareContact, setShowHealthcareContact] = useState(false);
  const [message, setMessage] = useState("");

  const toggleActivity = (index: number) =>
    setActivities(prev => prev.map((a, i) => i === index ? { ...a, completed: !a.completed } : a));
  const toggleMedication = (index: number) =>
    setMedications(prev => prev.map((m, i) => i === index ? { ...m, taken: !m.taken } : m));
  const toggleMeal = (index: number) =>
    setMeals(prev => prev.map((m, i) => i === index ? { ...m, completed: !m.completed } : m));
  const sendMessage = () => { if(message) { alert(`Message sent: ${message}`); setMessage(""); } };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, Sarah</h1>
          <p className="text-gray-600">Your brain health companion is here to help</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Calendar size={24} className="text-indigo-500 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Today</p>
              <p className="font-semibold">{new Date().toDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex items-center">
          <div className="rounded-full bg-indigo-100 p-3 mr-4"><Activity size={24} className="text-indigo-600"/></div>
          <div>
            <p className="text-gray-500 text-sm">Brain Activity Score</p>
            <h3 className="text-2xl font-bold text-gray-800">87/100</h3>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4"><Pill size={24} className="text-green-600"/></div>
          <div>
            <p className="text-gray-500 text-sm">Medication Adherence</p>
            <h3 className="text-2xl font-bold text-gray-800">{Math.round((medications.filter(m=>m.taken).length/medications.length)*100)}%</h3>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4"><Apple size={24} className="text-blue-600"/></div>
          <div>
            <p className="text-gray-500 text-sm">Nutrition Score</p>
            <h3 className="text-2xl font-bold text-gray-800">{Math.round((meals.filter(m=>m.completed).length/meals.length)*100)}/100</h3>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4"><Brain size={24} className="text-purple-600"/></div>
          <div>
            <p className="text-gray-500 text-sm">Memory Sessions</p>
            <h3 className="text-2xl font-bold text-gray-800">{activities.filter(a=>a.completed).length} Today</h3>
          </div>
        </div>
      </div>

      {/* Memory Activities & Medications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Activities */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-gray-800">Today's Memory Activities</h2>
    {/* Only show toggle if activities > 2 */}
    {activities.length > 2 && (
      <button
        className="text-indigo-600 hover:text-indigo-800"
        onClick={() => setShowAllActivities(!showAllActivities)}
      >
        {showAllActivities ? "Show Less" : "View All"}
      </button>
    )}
  </div>
  <div className="space-y-4">
    {(showAllActivities ? activities : activities.slice(0, 2)).map((activity, index) => (
      <div
        key={index}
        className="flex items-start p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg cursor-pointer"
        onClick={() => toggleActivity(index)}
      >
        <div className="mr-4">
          <div
            className={`w-4 h-4 rounded-full mt-1 ${
              activity.completed ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800">{activity.title}</h3>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </div>
          <p className="text-gray-600 text-sm">{activity.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>


        {/* Medications */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Medications</h2>
          {(showAllMedications ? medications : medications.slice(0,2)).map((med,index)=>(
            <div key={index} className="flex items-center justify-between p-3 border-b border-gray-100 cursor-pointer" onClick={()=>toggleMedication(index)}>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${med.taken?"bg-green-500":"bg-amber-500"}`}></div>
                <div>
                  <h4 className="font-medium text-gray-800">{med.name}</h4>
                  <p className="text-xs text-gray-500">{med.dosage}</p>
                </div>
              </div>
              <span className="text-sm font-medium">{med.time}</span>
            </div>
          ))}
          <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors" onClick={()=>setShowAllMedications(!showAllMedications)}>
            {showAllMedications ? "Show Less" : "View Medication Schedule"}
          </button>
        </div>
      </div>

      {/* Family, Nutrition, Healthcare */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Family */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Family Updates</h2>
          {familyUpdates.map((update,index)=>(
            <div key={index} className="flex items-start p-3">
              <img src={update.image} alt={update.name} className="w-10 h-10 rounded-full mr-3"/>
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-gray-800">{update.name}</h4>
                  <span className="text-xs text-gray-500 ml-2">({update.relation})</span>
                </div>
                <p className="text-sm text-gray-600">{update.message}</p>
                <span className="text-xs text-gray-500">{update.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Nutrition */}
        <div className="bg-white rounded-xl shadow p-6 space-y-3">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Today's Nutrition Plan</h2>
          {meals.map((meal,index)=>(
            <div key={index} className="flex items-start cursor-pointer" onClick={()=>toggleMeal(index)}>
              <input type="checkbox" checked={meal.completed} readOnly className="w-4 h-4 text-indigo-600 rounded mr-3 mt-1"/>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-800">{meal.meal}</h4>
                  <span className="text-xs text-gray-500">{meal.time}</span>
                </div>
                <p className="text-sm text-gray-600">{meal.food}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Healthcare */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Healthcare Team</h2>
          {healthcareTeam.map((provider,index)=>(
            <div key={index} className="flex items-center p-3 border-b border-gray-100">
              <img src={provider.image} alt={provider.name} className="w-12 h-12 rounded-full mr-3"/>
              <div>
                <h4 className="font-medium text-gray-800">{provider.name}</h4>
                <p className="text-xs text-gray-500">{provider.specialty}</p>
                <p className="text-sm text-indigo-600">Next: {provider.nextAppt}</p>
              </div>
            </div>
          ))}
          <button className="w-full mt-2 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg font-medium transition-colors" onClick={()=>setShowHealthcareContact(!showHealthcareContact)}>Contact Healthcare Team</button>
          {showHealthcareContact && (
            <div className="mt-2">
              <input type="text" placeholder="Type your message..." value={message} onChange={(e)=>setMessage(e.target.value)} className="w-full border border-gray-300 rounded p-2 mb-2"/>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium" onClick={sendMessage}>Send Message</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
