import React, { useState, useRef } from "react";
import { Brain, Play, Camera, Mic, Clock, Calendar, BookOpen } from "lucide-react";
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const MemoryCompanion = () => {
  const [activeTab, setActiveTab] = useState("stories");
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [exploreMemory, setExploreMemory] = useState(null);
  const [activeGame, setActiveGame] = useState(null);

  // === Game States ===
  const [photoGuesses, setPhotoGuesses] = useState({});
  const [storyAnswers, setStoryAnswers] = useState({});
  const [voiceGuesses, setVoiceGuesses] = useState({});
  const [timelineItems, setTimelineItems] = useState([
    { id: 1, year: "1955", title: "Born in Chicago" },
    { id: 2, year: "1973", title: "High School Graduation" },
    { id: 3, year: "1977", title: "College Graduation" },
    { id: 4, year: "1982", title: "Marriage" },
    { id: 5, year: "1985", title: "First Child" },
    { id: 6, year: "1988", title: "Second Child" },
  ]);

  const audioRef = useRef(null);

  // === Dummy Data (keep as is) ===
  const stories = [
    { title: "Wedding Day", date: "June 12, 1982", preview: "The day you married Robert at Lakeside Chapel...", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { title: "Emma's Birth", date: "March 24, 1985", preview: "The day your daughter Emma was born at Memorial Hospital...", image: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { title: "Family Trip to Italy", date: "July 2003", preview: "Your family vacation to Rome, Florence, and Venice...", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { title: "Retirement Party", date: "May 15, 2015", preview: "Your retirement celebration after 35 years of teaching...", image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { title: "Michael's Graduation", date: "June 5, 2008", preview: "Your son Michael's college graduation ceremony...", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { title: "First Grandchild", date: "November 12, 2010", preview: "The birth of your first grandchild, Jamie...", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  ];

  const memoryTimeline = [
    { id: 1, year: "1955", title: "Born in Chicago", description: "You were born at Northwestern Memorial Hospital to parents James and Elizabeth.", image: "https://images.unsplash.com/photo-1595815771614-ade0324dd871?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { id: 2, year: "1973", title: "High School Graduation", description: "Graduated as valedictorian from Lincoln Park High School.", image: "https://images.unsplash.com/photo-1564585222527-c2777a5bc6cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { id: 3, year: "1977", title: "College Graduation", description: "Earned your Bachelor's degree in Education from University of Illinois.", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { id: 4, year: "1982", title: "Marriage", description: "Married Robert Johnson at Lakeside Chapel on June 12.", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { id: 5, year: "1985", title: "First Child", description: "Welcomed your daughter Emma on March 24.", image: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { id: 6, year: "1988", title: "Second Child", description: "Welcomed your son Michael on August 17.", image: "https://images.unsplash.com/photo-1518156677180-95a2893f3499?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
  ];

  // === Recording functions ===
  const startRecording = async () => {
    setAudioURL(null); // clear old recordings
    if (!navigator.mediaDevices) return alert("Media devices not supported");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
    };
    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  // === Image upload handler ===
  const handleUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      fileName: file.name,
      url: URL.createObjectURL(file),
    }));
    setUploadedImages([...uploadedImages, ...files]);
  };

  // === TTS for stories ===
  const playStory = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  // === Photo Recognition Component ===
  const PhotoRecognition = () => {
    const [score, setScore] = useState(0);
    const handleGuess = (idx) => {
      const guess = photoGuesses[idx]?.toLowerCase() || "";
      if (guess.includes("robert") || guess.includes("emma") || guess.includes("michael")) {
        alert("Correct!");
        setScore(score + 1);
      } else {
        alert("Try again!");
      }
    };
    return (
      <div>
        <p>Score: {score}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {uploadedImages.length === 0 && <p>No photos uploaded yet!</p>}
          {uploadedImages.map((img, idx) => (
            <div key={idx} className="space-y-1">
              <img src={img.url} alt={img.fileName} className="w-full h-32 object-cover rounded-lg" />
              <input
                type="text"
                placeholder="Who's in the photo?"
                className="w-full p-1 border rounded"
                value={photoGuesses[idx] || ""}
                onChange={(e) => setPhotoGuesses({ ...photoGuesses, [idx]: e.target.value })}
              />
              <button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1 rounded text-sm"
                onClick={() => handleGuess(idx)}
              >
                Submit
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // === Story Completion Component ===
  const StoryCompletion = () => {
    const handleSubmit = (idx) => {
      const guess = storyAnswers[idx]?.toLowerCase() || "";
      const correctWords = ["robert", "emma", "michael"];
      if (correctWords.some((word) => guess.includes(word))) {
        alert("Good job! You matched part of the story.");
      } else {
        alert("Try again! Here's the real story: " + stories[idx].preview);
      }
    };
    return (
      <div className="space-y-4">
        {stories.map((story, idx) => (
          <div key={idx} className="p-2 border rounded-lg">
            <p>{story.preview}</p>
            <input
              type="text"
              placeholder="Complete the story..."
              className="w-full p-1 border rounded mt-1"
              value={storyAnswers[idx] || ""}
              onChange={(e) => setStoryAnswers({ ...storyAnswers, [idx]: e.target.value })}
            />
            <button
              className="mt-1 bg-indigo-600 text-white px-3 py-1 rounded text-sm"
              onClick={() => handleSubmit(idx)}
            >
              Submit
            </button>
          </div>
        ))}
      </div>
    );
  };

  // === Voice Memory Component ===
  const VoiceMemory = () => {
    return (
      <div className="space-y-2">
        {audioURL && <audio ref={audioRef} controls src={audioURL} className="w-full mb-2" />}
        <input
          type="text"
          placeholder="Who's speaking?"
          className="w-full p-1 border rounded"
          value={voiceGuesses[0] || ""}
          onChange={(e) => setVoiceGuesses({ 0: e.target.value })}
        />
        <button
          className="bg-indigo-600 text-white px-3 py-1 rounded mt-1"
          onClick={() => {
            if ((voiceGuesses[0] || "").toLowerCase().includes("robert")) alert("Correct!");
            else alert("Try again!");
          }}
        >
          Submit
        </button>
      </div>
    );
  };

  // === Association Game Component ===
  const AssociationGame = () => {
    const pairs = [
      { left: "Wedding", right: "Robert" },
      { left: "Birth", right: "Emma" },
      { left: "Graduation", right: "Michael" },
    ];
    return (
      <div>
        <p>Match related memories:</p>
        <ul className="list-disc ml-6 space-y-1">
          {pairs.map((p, idx) => (
            <li key={idx}>
              {p.left} → {p.right}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // === Timeline Ordering Component ===
  const SortableItem = ({ item }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
    const style = { transform: CSS.Transform.toString(transform), transition };
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="p-2 bg-white rounded-xl shadow mb-2 cursor-move flex justify-between items-center"
      >
        {item.title} - {item.year}
      </div>
    );
  };

  const TimelineOrdering = () => {
    const sensors = useSensors(useSensor(PointerSensor));
    const handleDragEnd = (event) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        const oldIndex = timelineItems.findIndex((i) => i.id === active.id);
        const newIndex = timelineItems.findIndex((i) => i.id === over.id);
        setTimelineItems(arrayMove(timelineItems, oldIndex, newIndex));
      }
    };
    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={timelineItems} strategy={verticalListSortingStrategy}>
          {timelineItems.map((item) => (
            <SortableItem key={item.id} item={item} />
          ))}
        </SortableContext>
      </DndContext>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Memory Companion</h1>
        <p className="text-gray-600">Your AI-powered memory assistant</p>
      </div>
      {/* Greeting Card */}
      <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-lg flex items-center">
        <Brain size={48} className="mr-6" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Hello Sarah, ready to work on your memories today?</h2>
          <p className="opacity-90">I can help you recall stories, play memory games, or record new memories.</p>
        </div>
      </div>
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="flex border-b">
          {["stories", "games", "record", "timeline"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-2 font-medium text-center ${
                activeTab === tab ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-indigo-500"
              }`}
            >
              {tab === "stories" && "My Stories"}
              {tab === "games" && "Memory Games"}
              {tab === "record" && "Record Memory"}
              {tab === "timeline" && "Memory Timeline"}
            </button>
          ))}
        </div>
        <div className="p-6 space-y-6">
          {/* STORIES */}
          {activeTab === "stories" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Calendar size={14} className="mr-1" /> {story.date}
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">{story.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{story.preview}</p>
                    <button className="flex items-center text-indigo-600 text-sm font-medium mr-4" onClick={() => playStory(story.preview)}>
                      <Play size={16} className="mr-1" /> Listen
                    </button>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800" onClick={() => setExploreMemory(story)}>
                      Explore Memory
                    </button>
                  </div>
                </div>
              ))}
              {exploreMemory && (
                <div className="bg-white p-6 rounded-xl shadow-sm mt-4">
                  <h4 className="font-bold text-gray-800 mb-2">{exploreMemory.title}</h4>
                  <p className="text-gray-600 mb-2">{exploreMemory.preview}</p>
                  <button className="flex items-center text-indigo-600 text-sm font-medium" onClick={() => playStory(exploreMemory.preview)}>
                    <Play size={16} className="mr-1" /> Listen
                  </button>
                  <button className="ml-4 text-sm text-red-600 hover:text-red-800" onClick={() => setExploreMemory(null)}>
                    Close
                  </button>
                </div>
              )}
            </div>
          )}
          {/* GAMES */}
          {activeTab === "games" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Photo Recognition",
                  "Story Completion",
                  "Timeline Ordering",
                  "Voice Memory",
                  "Association Game",
                ].map((title, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4 flex justify-between items-center">
                      <h4 className="font-bold text-gray-800">{title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 p-4">Play {title} game</p>
                    <button
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                      onClick={() => setActiveGame(title)}
                    >
                      Start Game
                    </button>
                  </div>
                ))}
              </div>
              {activeGame && (
                <div className="bg-white p-4 mt-4 rounded-xl shadow-sm">
                  <button className="text-red-600 hover:text-red-800 mb-2" onClick={() => setActiveGame(null)}>
                    Close Game
                  </button>
                  {activeGame === "Photo Recognition" && <PhotoRecognition />}
                  {activeGame === "Story Completion" && <StoryCompletion />}
                  {activeGame === "Timeline Ordering" && <TimelineOrdering />}
                  {activeGame === "Voice Memory" && <VoiceMemory />}
                  {activeGame === "Association Game" && <AssociationGame />}
                </div>
              )}
            </>
          )}
          {/* RECORD */}
          {activeTab === "record" && (
            <div className="space-y-6">
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <div className="flex items-center mb-6">
                  <div className="rounded-full bg-indigo-600 p-3 mr-4">
                    <Mic size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Voice Recording</h4>
                    <p className="text-sm text-gray-600">Tell your story and I'll save it for you</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  {!recording ? (
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg" onClick={startRecording}>
                      Start Recording
                    </button>
                  ) : (
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg" onClick={stopRecording}>
                      Stop Recording
                    </button>
                  )}
                  {audioURL && <audio ref={audioRef} controls src={audioURL} />}
                </div>
                <div className="mt-4">
                  <h4 className="font-bold text-gray-800 mb-2">Upload Photos</h4>
                  <input type="file" multiple accept="image/*" onChange={handleUpload} />
                  <div className="flex flex-wrap gap-4 mt-4">
                    {uploadedImages.map((img, idx) => (
                      <img key={idx} src={img.url} className="w-32 h-32 object-cover rounded-lg" alt={img.fileName} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* TIMELINE */}
          {activeTab === "timeline" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Your Memory Timeline</h3>
              <p className="text-gray-600">Journey through your life's most important moments.</p>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200"></div>
                {memoryTimeline.map((event, idx) => (
                  <div key={idx} className="relative pl-10 pb-8">
                    <div className="absolute left-1.5 mt-1.5 rounded-full border-4 border-white bg-indigo-500 w-5 h-5"></div>
                    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm overflow-hidden">
                      {event.image && (
                        <div className="md:w-48 h-40 md:h-auto">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-2 py-1 rounded mb-2">
                          {event.year}
                        </div>
                        <h4 className="font-bold text-gray-800 mb-1">{event.title}</h4>
                        <p className="text-gray-600">{event.description}</p>
                        <button
                          className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                          onClick={() => playStory(event.description)}
                        >
                          <Play size={14} className="mr-1" /> Explore this memory
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
