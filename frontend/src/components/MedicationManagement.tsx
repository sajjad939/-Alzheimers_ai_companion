import React, { useState, useEffect, memo, useMemo, useRef } from 'react';
import { Clock, Bell, Pill, CheckCircle, AlertCircle, Calendar, PlusCircle, X } from 'lucide-react';

type Status = 'taken' | 'missed' | 'upcoming';
type Medication = {
  time: string; // e.g., "8:00 AM"
  name: string;
  dosage: string;
  instructions: string;
  status: Status;
};

type MyMed = {
  name: string;
  dosage: string;
  schedule: string;
  color: string;
};

type Refill = {
  name: string;
  dosage: string;
  refillDate: string;
  remaining: number;
};

type PendingReminder = {
  id: string;       // `${dateKey}::${index}`
  dateKey: string;  // YYYY-MM-DD
  index: number;    // medication index in the list for that date
  at: number;       // timestamp (ms) when reminder should fire
  name: string;     // med name (for display only)
};

// ---- storage keys ----
const KEY_MEDICATIONS_BY_DATE = 'medicationsByDate'; // Record<dateKey, Medication[]>
const KEY_MY_MEDS = 'myMeds';
const KEY_REFILLS = 'refills';
const KEY_PENDING_REMINDERS = 'pendingReminders';    // PendingReminder[]

// ---- helpers ----
const dateKeyOf = (d: Date) => d.toISOString().slice(0, 10);

const parseTimeToMinutes = (t: string): number => {
  // "8:00 AM" -> minutes since 00:00
  const [clock, period] = t.trim().split(' ');
  let [h, m] = clock.split(':').map(Number);
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return h * 60 + m;
};

const minutesOf = (d: Date) => d.getHours() * 60 + d.getMinutes();

const notify = (title: string, body: string) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    try { new Notification(title, { body }); } catch { alert(`${title}: ${body}`); }
  } else {
    alert(`${title}: ${body}`);
  }
};

const playBeep = () => {
  try {
    const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
    audio.play().catch(() => {});
  } catch {}
};

// Seed a day’s meds from the initial template but with statuses recalculated for that specific date.
const seedForDate = (template: Medication[], date: Date): Medication[] => {
  const now = new Date();
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const nowMins = minutesOf(now);

  return template.map((m) => {
    const t = parseTimeToMinutes(m.time);
    let status: Status;
    if (sameDay) {
      if (t <= nowMins) status = 'missed';
      else status = 'upcoming';
    } else if (date.getTime() < new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()) {
      // past day => everything missed
      status = 'missed';
    } else {
      // future day => everything upcoming
      status = 'upcoming';
    }
    return { ...m, status };
  });
};

// Make statuses live so the earliest future non-taken is upcoming, past non-taken become missed, taken stays taken
const reevaluateStatuses = (list: Medication[]): Medication[] => {
  const nowMins = minutesOf(new Date());
  const out = list.map((m) => ({ ...m }));
  // first pass: set future as upcoming, past as missed unless taken
  out.forEach((m) => {
    if (m.status !== 'taken') {
      if (parseTimeToMinutes(m.time) < nowMins) m.status = 'missed';
      else m.status = 'upcoming';
    }
  });
  // ensure next upcoming exists naturally (closest future remains upcoming)
  return out;
};

// --- reminders storage helpers ---
const loadPendingReminders = (): PendingReminder[] =>
  JSON.parse(localStorage.getItem(KEY_PENDING_REMINDERS) || '[]');

const savePendingReminders = (arr: PendingReminder[]) =>
  localStorage.setItem(KEY_PENDING_REMINDERS, JSON.stringify(arr));

const addReminder = (r: PendingReminder) => {
  const all = loadPendingReminders().filter((x) => !(x.id === r.id)); // replace if exists
  all.push(r);
  savePendingReminders(all);
};
const removeReminder = (id: string) => {
  const all = loadPendingReminders().filter((x) => x.id !== id);
  savePendingReminders(all);
};

// ---- component ----
export const MedicationManagement = memo(() => {
  // Keep your seed data (unchanged)
  const initialTemplate: Medication[] =
    JSON.parse(localStorage.getItem('medications') || 'null') || [
      { time: '8:00 AM', name: 'Donepezil', dosage: '10mg', instructions: 'Take with breakfast', status: 'taken' },
      { time: '1:00 PM', name: 'Memantine', dosage: '5mg', instructions: 'Take with lunch', status: 'taken' },
      { time: '3:00 PM', name: 'Vitamin B Complex', dosage: '1 tablet', instructions: 'Take with a snack', status: 'missed' },
      { time: '8:00 PM', name: 'Donepezil', dosage: '10mg', instructions: 'Take with dinner', status: 'upcoming' },
      { time: '9:00 PM', name: 'Vitamin D', dosage: '1000 IU', instructions: 'Take before bedtime', status: 'upcoming' }
    ];

  const initialMyMeds: MyMed[] =
    JSON.parse(localStorage.getItem(KEY_MY_MEDS) || 'null') || [
      { name: 'Donepezil', dosage: '10mg', schedule: 'Twice daily', color: 'bg-blue-100' },
      { name: 'Memantine', dosage: '5mg', schedule: 'Once daily', color: 'bg-purple-100' },
      { name: 'Vitamin B Complex', dosage: '1 tablet', schedule: 'Once daily', color: 'bg-green-100' },
      { name: 'Vitamin D', dosage: '1000 IU', schedule: 'Once daily', color: 'bg-amber-100' }
    ];

  const initialRefills: Refill[] =
    JSON.parse(localStorage.getItem(KEY_REFILLS) || 'null') || [
      { name: 'Donepezil', dosage: '10mg', refillDate: 'August 25, 2025', remaining: 5 },
      { name: 'Memantine', dosage: '5mg', refillDate: 'August 28, 2025', remaining: 8 },
      { name: 'Vitamin B Complex', dosage: '1 tablet', refillDate: 'September 5, 2025', remaining: 13 }
    ];

  const [date, setDate] = useState(new Date());
  const [medications, setMedications] = useState<Medication[]>(seedForDate(initialTemplate, new Date()));
  const [myMeds, setMyMeds] = useState<MyMed[]>(initialMyMeds);
  const [refills, setRefills] = useState<Refill[]>(initialRefills);

  // Modals
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [showRefillsModal, setShowRefillsModal] = useState(false);

  // Persist: myMeds & refills (unchanged)
  useEffect(() => localStorage.setItem(KEY_MY_MEDS, JSON.stringify(myMeds)), [myMeds]);
  useEffect(() => localStorage.setItem(KEY_REFILLS, JSON.stringify(refills)), [refills]);

  // Ensure notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  // ----- per-day storage for medications -----
  // Load meds for current date (or seed), then reevaluate live statuses
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem(KEY_MEDICATIONS_BY_DATE) || '{}') as Record<string, Medication[]>;
    const key = dateKeyOf(date);
    let list: Medication[];

    if (!all[key]) {
      list = seedForDate(initialTemplate, date);
      all[key] = list;
      localStorage.setItem(KEY_MEDICATIONS_BY_DATE, JSON.stringify(all));
    } else {
      list = all[key];
      // keep taken statuses for that day, but recompute upcoming/missed based on current time if this is today
      list = reevaluateStatuses(list);
    }

    setMedications(list);
  }, [date]);

  // Save meds for current date whenever they change
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem(KEY_MEDICATIONS_BY_DATE) || '{}') as Record<string, Medication[]>;
    const key = dateKeyOf(date);
    all[key] = medications;
    localStorage.setItem(KEY_MEDICATIONS_BY_DATE, JSON.stringify(all));
  }, [medications, date]);

  // ---- live reevaluation every 30s so “Next Medication” stays accurate ----
  useEffect(() => {
    const t = setInterval(() => {
      setMedications((prev) => reevaluateStatuses(prev));
    }, 30_000);
    return () => clearInterval(t);
  }, []);

  // ---- exact-minute notifier (fires at scheduled minute for upcoming) ----
  useEffect(() => {
    const t = setInterval(() => {
      const nowMins = minutesOf(new Date());
      medications.forEach((m) => {
        if (m.status === 'upcoming' && parseTimeToMinutes(m.time) === nowMins) {
          notify('Medication Reminder', `Time to take ${m.name} (${m.time})`);
          playBeep();
        }
      });
    }, 60_000);
    return () => clearInterval(t);
  }, [medications]);

  // ---- persistent reminders: rehydrate and schedule timeouts on mount+date change ----
  const timeoutsRef = useRef<Record<string, number>>({}); // id -> timeoutId

  const scheduleReminderTimeout = (rem: PendingReminder) => {
    const delay = rem.at - Date.now();
    if (delay <= 0) return; // past, will be cleaned up below
    if (timeoutsRef.current[rem.id]) {
      clearTimeout(timeoutsRef.current[rem.id]);
    }
    const tid = window.setTimeout(() => {
      notify('Medication Reminder', `Time to take ${rem.name}`);
      playBeep();
      removeReminder(rem.id);
      delete timeoutsRef.current[rem.id];
    }, delay);
    timeoutsRef.current[rem.id] = tid;
  };

  const rehydrateReminders = () => {
    const all = loadPendingReminders();
    // clear outdated & schedule future ones
    const future = all.filter((r) => r.at > Date.now());
    savePendingReminders(future);
    future.forEach(scheduleReminderTimeout);
  };

  useEffect(() => {
    rehydrateReminders();
    return () => {
      Object.values(timeoutsRef.current).forEach((tid) => clearTimeout(tid));
      timeoutsRef.current = {};
    };
    // rehydrate on date change too (so reminders for other dates still alive)
  }, [date]);

  // ---- computed values ----
  const nextMedication = medications.find((m) => m.status === 'upcoming');
  const allDone = medications.length > 0 && medications.every((m) => m.status === 'taken');

  const adherence = useMemo(() => {
    if (!medications.length) return 0;
    return Math.min(
      100,
      Math.round((medications.filter((m) => m.status === 'taken').length / medications.length) * 100)
    );
  }, [medications]);

  // ---- actions ----
  const markTaken = (index: number) => {
    const med = medications[index];
    setMedications((prev) => {
      const updated = prev.map((m, i) => (i === index ? { ...m, status: 'taken' } : m));
      return reevaluateStatuses(updated);
    });
    // cancel any pending reminder for this med (for today’s dateKey)
    const id = `${dateKeyOf(date)}::${index}`;
    removeReminder(id);
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id];
    }
    notify('Medication Taken', `Marked "${med.name}" as taken`);
    playBeep();
  };

  const addMedication = () => {
    const name = prompt('Enter medication name:');
    const dosage = prompt('Enter dosage:');
    const schedule = prompt('Enter schedule:');
    if (name && dosage && schedule) {
      const color = 'bg-indigo-100';
      setMyMeds((prev) => [...prev, { name, dosage, schedule, color }]);
      alert(`Added new medication: ${name}`);
    }
  };

  const prevDay = () => setDate(new Date(new Date(date).setDate(date.getDate() - 1)));
  const nextDay = () => setDate(new Date(new Date(date).setDate(date.getDate() + 1)));

  // “Set Reminder” (demo: 1 minute) -> persisted
  const setReminder = () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications.');
      return;
    }
    const nextIdx = medications.findIndex((m) => m.status === 'upcoming');
    if (nextIdx < 0) {
      alert('No upcoming medications.');
      return;
    }
    const m = medications[nextIdx];

    const scheduleInMin = 1; // demo
    const at = Date.now() + scheduleInMin * 60_000;

    // persist reminder
    const id = `${dateKeyOf(date)}::${nextIdx}`;
    const rec: PendingReminder = { id, dateKey: dateKeyOf(date), index: nextIdx, at, name: m.name };
    addReminder(rec);
    scheduleReminderTimeout(rec);

    notify('Reminder Set', `Reminder for ${m.name} in ${scheduleInMin} minute${scheduleInMin > 1 ? 's' : ''}`);
    playBeep();
  };

  const handleRefill = (index: number) => {
    const days = prompt(`Enter new remaining days for ${refills[index].name}:`, refills[index].remaining.toString());
    if (days) {
      setRefills((prev) => prev.map((r, i) => (i === index ? { ...r, remaining: parseInt(days) } : r)));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Medication Management</h1>
        <p className="text-gray-600">Track, manage, and get reminded about your medications</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Next Medication */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <Clock size={24} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Next Medication</h2>
              <p className="text-gray-600">
                {nextMedication?.name || 'All done'} - {nextMedication?.time || ''}
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={setReminder}
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Bell size={18} className="mr-2" /> Set Reminder
            </button>
            <button
              onClick={() => {
                const nextIndex = medications.findIndex((m) => m.status === 'upcoming');
                if (nextIndex >= 0) markTaken(nextIndex);
              }}
              className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Pill size={18} className="mr-2" /> Take Now
            </button>
          </div>
        </div>

        {/* All Done banner */}
        {allDone && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 font-medium flex items-center">
            <CheckCircle className="mr-2" /> All medications done for this day!
          </div>
        )}

        {/* Schedule & My Medications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Today's Schedule</h3>
              <div className="flex items-center text-sm">
                <button className="text-gray-500 hover:text-indigo-600 mr-4" onClick={prevDay}>
                  Previous Day
                </button>
                <span className="font-medium">
                  {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
                <button className="text-gray-500 hover:text-indigo-600 ml-4" onClick={nextDay}>
                  Next Day
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {medications.map((med, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-lg border ${
                    med.status === 'taken'
                      ? 'bg-green-50 border-green-200'
                      : med.status === 'missed'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <div className="mr-4">
                    {med.status === 'taken' && <CheckCircle size={24} className="text-green-500" />}
                    {med.status === 'missed' && <AlertCircle size={24} className="text-red-500" />}
                    {med.status === 'upcoming' && <Clock size={24} className="text-amber-500" />}
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {med.name} ({med.dosage})
                      </h4>
                      <p className="text-sm text-gray-600">{med.instructions}</p>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center">
                      <span className="font-medium">{med.time}</span>
                      {med.status === 'upcoming' && (
                        <button
                          onClick={() => markTaken(index)}
                          className="ml-4 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded text-sm transition-colors"
                        >
                          Take Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Weekly adherence */}
            <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Weekly Adherence</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">This Week</span>
                <span className="font-bold text-indigo-600">{adherence}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${adherence}%` }}></div>
              </div>

              {/* Medications */}
              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Medications</h3>
                  <button
                    onClick={addMedication}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                  >
                    <PlusCircle size={16} className="mr-1" /> Add New
                  </button>
                </div>
                <div className="space-y-3">
                  {myMeds.map((med, index) => (
                    <div key={index} className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                      <div className={`w-10 h-10 ${med.color} rounded-full flex items-center justify-center mr-3`}>
                        <Pill size={20} className="text-gray-700" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{med.name}</h4>
                        <div className="flex text-xs text-gray-500">
                          <span>{med.dosage}</span>
                          <span className="mx-2">•</span>
                          <span>{med.schedule}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  View All Medications
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Refills & Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Upcoming Refills</h3>
              <button
                onClick={() => setShowRefillsModal(true)}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {refills.map((refill, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {refill.name} ({refill.dosage})
                    </h4>
                    <div className="text-sm text-gray-500">
                      <Calendar size={14} className="inline mr-1" /> Refill on {refill.refillDate}
                    </div>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        refill.remaining <= 7 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {refill.remaining} days left
                    </span>
                    <button onClick={() => handleRefill(index)} className="ml-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Refill
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Medication Insights</h3>
              <button
                onClick={() => setShowInsightsModal(true)}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View Details
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                <div className="flex items-center mb-2">
                  <AlertCircle size={20} className="text-amber-500 mr-2" />
                  <h4 className="font-medium text-gray-800">Medication Interaction Alert</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Donepezil may interact with your Vitamin B supplement. Consider taking them at different times.
                </p>
                <button className="text-amber-700 hover:text-amber-800 text-sm font-medium">Learn More</button>
              </div>
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Memantine Effectiveness</h4>
                <p className="text-sm text-gray-600">Memantine appears to be effectively reducing memory fluctuations.</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <div className="flex items-center mb-2">
                  <CheckCircle size={20} className="text-green-500 mr-2" />
                  <h4 className="font-medium text-gray-800">Great Progress!</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Your medication adherence has improved this week. Keep up the good work!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Refills Modal --- */}
      {showRefillsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowRefillsModal(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4">All Refills</h2>
            <div className="space-y-3">
              {refills.map((r, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">
                      {r.name} ({r.dosage})
                    </p>
                    <p className="text-sm text-gray-600">Refill on {r.refillDate}</p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        r.remaining <= 7 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {r.remaining} days left
                    </span>
                    <button onClick={() => handleRefill(i)} className="ml-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowRefillsModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Insights Modal --- */}
      {showInsightsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-xl p-6 relative">
            <button
              onClick={() => setShowInsightsModal(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4">Medication Insights</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>Potential interaction: Donepezil ↔ Vitamin B (separate by 2–3 hours).</li>
              <li>Effectiveness: Memantine reports positive trend this week.</li>
              <li>Adherence: {adherence}% this week. Keep going!</li>
            </ul>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowInsightsModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
