import React, { useState } from "react";
import {
  Apple,
  Coffee,
  UtensilsCrossed,
  Flame,
  BarChart3,
  Calendar,
  Search,
  Plus,
  Clock as ClockIcon,
} from "lucide-react";

export const NutritionSupport = () => {
  // ---------------- STATE ----------------
  const [hydration, setHydration] = useState(5); // default 5 cups
  const [mealPlan, setMealPlan] = useState([
    {
      meal: "Breakfast",
      time: "8:30 AM",
      title: "Omega-3 Rich Oatmeal",
      description:
        "Steel-cut oats with walnuts, ground flaxseed, blueberries, and a drizzle of honey",
      image:
        "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=300&q=80",
      completed: true,
      brainBenefits: ["Omega-3 fatty acids", "Antioxidants", "Whole grains"],
    },
    {
      meal: "Lunch",
      time: "12:30 PM",
      title: "Mediterranean Salad",
      description:
        "Mixed greens with grilled salmon, olives, tomatoes, cucumbers, and olive oil dressing",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80",
      completed: true,
      brainBenefits: ["Healthy fats", "Lean protein", "Anti-inflammatory"],
    },
    {
      meal: "Snack",
      time: "3:30 PM",
      title: "Brain-Boosting Snack",
      description: "Dark chocolate (70% cocoa) and a handful of walnuts",
      image:
        "https://images.unsplash.com/photo-1548907040-4bea35f9fd5b?auto=format&fit=crop&w=300&q=80",
      completed: false,
      brainBenefits: ["Flavanols", "Vitamin E", "Omega-3 fatty acids"],
    },
    {
      meal: "Dinner",
      time: "6:30 PM",
      title: "Turmeric Chicken & Vegetables",
      description:
        "Turmeric-spiced chicken breast with roasted broccoli and quinoa",
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=300&q=80",
      completed: false,
      brainBenefits: ["Curcumin", "Cruciferous vegetables", "Complete protein"],
    },
  ]);

  const [recipeSearch, setRecipeSearch] = useState("");

  const recipes = [
    {
      title: "Turmeric Salmon Bowl",
      time: "25 mins",
      difficulty: "Easy",
      benefits: ["Omega-3", "Anti-inflammatory"],
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Blueberry Walnut Salad",
      time: "15 mins",
      difficulty: "Easy",
      benefits: ["Antioxidants", "Vitamin E"],
      image:
        "https://images.unsplash.com/photo-1564093497595-593b96d80180?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Mediterranean Chickpea Bowl",
      time: "20 mins",
      difficulty: "Medium",
      benefits: ["Protein", "Folate"],
      image:
        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Green Tea Smoothie",
      time: "10 mins",
      difficulty: "Easy",
      benefits: ["Antioxidants", "Hydration"],
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80",
    },
  ];

  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(recipeSearch.toLowerCase())
  );

  // ---------------- HANDLERS ----------------
  const toggleMealCompleted = (index: number) => {
    setMealPlan((prev) =>
      prev.map((m, i) => (i === index ? { ...m, completed: !m.completed } : m))
    );
  };

  const logCup = () => {
    if (hydration < 8) setHydration((prev) => prev + 1);
  };

  const viewRecipe = (title: string) => {
    alert(`Viewing recipe for: ${title}`);
  };

  const viewAlternatives = (title: string) => {
    alert(`Showing alternatives for: ${title}`);
  };

  // ---------------- UI ----------------
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          NutriNeuro Brain Health
        </h1>
        <p className="text-gray-600">
          Personalized nutrition for optimal brain health
        </p>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Example: Meals Completed count */}
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Apple size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Brain Health Score</p>
            <h3 className="text-2xl font-bold text-gray-800">78/100</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Coffee size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Hydration</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {hydration}/8 cups
            </h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center">
          <div className="rounded-full bg-amber-100 p-3 mr-4">
            <UtensilsCrossed size={24} className="text-amber-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Meals Today</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {mealPlan.filter((m) => m.completed).length}/{mealPlan.length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <Flame size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Antioxidant Intake</p>
            <h3 className="text-2xl font-bold text-gray-800">High</h3>
          </div>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Meal Plan */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-indigo-600 text-white p-5">
            <h2 className="text-xl font-bold">Today's Meal Plan</h2>
            <p className="opacity-80">
              Mediterranean-inspired meals for brain health
            </p>
          </div>
          <div className="p-5 space-y-6">
            {mealPlan.map((meal, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row border-b border-gray-100 pb-6"
              >
                <div className="md:w-1/3 mb-4 md:mb-0 md:mr-4">
                  <img
                    src={meal.image}
                    alt={meal.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
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
                      <input
                        type="checkbox"
                        checked={meal.completed}
                        onChange={() => toggleMealCompleted(index)}
                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">
                    {meal.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {meal.description}
                  </p>
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-gray-500 mb-1">
                      BRAIN BENEFITS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {meal.brainBenefits.map((benefit, i) => (
                        <span
                          key={i}
                          className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => viewRecipe(meal.title)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      View Recipe
                    </button>
                    <button
                      onClick={() => viewAlternatives(meal.title)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Alternatives
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Hydration */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Hydration Tracker</h3>
              <Coffee size={20} className="text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Aim for 8 cups of water daily for optimal brain function
            </p>
            <div className="flex justify-between mb-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-10 ${
                      i + 1 <= hydration ? "text-blue-500" : "text-gray-300"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.75 1.75a.75.75 0 0 0-1.5 0v1.5h-3a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-3v-1.5Zm-7.5 7.5a3 3 0 0 1 3-3h7.5a3 3 0 0 1 3 3v10.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3V9.25Z" />
                    </svg>
                  </div>
                  <span className="text-xs mt-1">{i + 1}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">
                {hydration} of 8 cups completed
              </span>
              <button
                onClick={logCup}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded transition-colors"
              >
                Log Cup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recipes */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            Brain-Healthy Recipe Suggestions
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              value={recipeSearch}
              onChange={(e) => setRecipeSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-lg text-sm w-64"
            />
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">{recipe.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <ClockIcon size={14} className="mr-1" />
                  {recipe.time}
                  <span className="mx-2">•</span>
                  {recipe.difficulty}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {recipe.benefits.map((benefit, i) => (
                    <span
                      key={i}
                      className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => viewRecipe(recipe.title)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-sm font-medium transition-colors"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredRecipes.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No recipes found for "{recipeSearch}"
          </p>
        )}
        <div className="flex justify-center mt-6">
          <button className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
            <Plus size={18} className="mr-1" />
            View More Recipes
          </button>
        </div>
      </div>
    </div>
  );
};
