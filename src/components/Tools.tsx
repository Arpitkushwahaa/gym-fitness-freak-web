import React, { useState } from 'react';
import { Calculator, Activity, Target, TrendingUp } from 'lucide-react';

const Tools = () => {
  const [bmiData, setBmiData] = useState({
    weight: '',
    height: '',
    result: null as number | null,
    category: ''
  });

  const [calorieData, setCalorieData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activity: 'moderate',
    result: null as number | null
  });

  const calculateBMI = () => {
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height) / 100; // Convert cm to m
    
    if (weight > 0 && height > 0) {
      const bmi = weight / (height * height);
      let category = '';
      
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      
      setBmiData({ ...bmiData, result: Math.round(bmi * 10) / 10, category });
    }
  };

  const calculateCalories = () => {
    const age = parseInt(calorieData.age);
    const weight = parseFloat(calorieData.weight);
    const height = parseFloat(calorieData.height);
    
    if (age > 0 && weight > 0 && height > 0) {
      // Harris-Benedict Equation
      let bmr;
      if (calorieData.gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      
      // Activity multipliers
      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        extra: 1.9
      };
      
      const totalCalories = Math.round(bmr * activityMultipliers[calorieData.activity as keyof typeof activityMultipliers]);
      setCalorieData({ ...calorieData, result: totalCalories });
    }
  };

  const tools = [
    {
      id: 1,
      title: 'Body Fat Calculator',
      description: 'Estimate your body fat percentage using measurements',
      icon: Activity,
      comingSoon: true
    },
    {
      id: 2,
      title: 'One Rep Max Calculator',
      description: 'Calculate your maximum lift potential',
      icon: TrendingUp,
      comingSoon: true
    },
    {
      id: 3,
      title: 'Macro Calculator',
      description: 'Determine your ideal macronutrient split',
      icon: Target,
      comingSoon: true
    }
  ];

  return (
    <section id="tools" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Fitness Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Use our scientifically-backed calculators and tools to track your progress, 
            set realistic goals, and optimize your fitness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* BMI Calculator */}
          <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-orange-600 rounded-xl">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">BMI Calculator</h3>
                <p className="text-gray-600">Calculate your Body Mass Index</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={bmiData.weight}
                  onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your weight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={bmiData.height}
                  onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your height"
                />
              </div>
            </div>

            <button
              onClick={calculateBMI}
              className="w-full bg-gradient-to-r from-blue-600 to-orange-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 mb-4"
            >
              Calculate BMI
            </button>

            {bmiData.result && (
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {bmiData.result}
                </div>
                <div className="text-lg font-medium text-blue-600">
                  {bmiData.category}
                </div>
              </div>
            )}
          </div>

          {/* Calorie Calculator */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Calorie Calculator</h3>
                <p className="text-gray-600">Calculate your daily calorie needs</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={calorieData.age}
                    onChange={(e) => setCalorieData({ ...calorieData, age: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={calorieData.gender}
                    onChange={(e) => setCalorieData({ ...calorieData, gender: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={calorieData.weight}
                    onChange={(e) => setCalorieData({ ...calorieData, weight: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Weight"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={calorieData.height}
                    onChange={(e) => setCalorieData({ ...calorieData, height: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Height"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level
                </label>
                <select
                  value={calorieData.activity}
                  onChange={(e) => setCalorieData({ ...calorieData, activity: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="sedentary">Sedentary (little to no exercise)</option>
                  <option value="light">Light (exercise 1-3 days/week)</option>
                  <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                  <option value="active">Active (exercise 6-7 days/week)</option>
                  <option value="extra">Extra Active (very intense exercise)</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculateCalories}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 mb-4"
            >
              Calculate Calories
            </button>

            {calorieData.result && (
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {calorieData.result}
                </div>
                <div className="text-lg font-medium text-green-600">
                  calories per day
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-gray-50 rounded-2xl p-6 text-center relative"
            >
              {tool.comingSoon && (
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Coming Soon
                  </span>
                </div>
              )}
              
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl mb-4">
                <tool.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              
              <button 
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  tool.comingSoon
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-orange-600 text-white hover:shadow-lg hover:scale-105'
                }`}
                disabled={tool.comingSoon}
              >
                {tool.comingSoon ? 'Coming Soon' : 'Use Tool'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;