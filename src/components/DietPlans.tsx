import React from 'react';
import { CheckCircle, Clock, Users, Utensils } from 'lucide-react';

const DietPlans = () => {
  const dietPlans = [
    {
      id: 1,
      name: 'Weight Loss Plan',
      description: 'Sustainable calorie deficit with balanced macronutrients',
      duration: '12 weeks',
      difficulty: 'Beginner',
      price: '$49',
      popular: false,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      features: [
        '1200-1500 daily calories',
        'High protein, moderate carbs',
        'Weekly meal prep guides',
        'Healthy snack alternatives',
        'Hydration tracking'
      ],
      meals: ['Breakfast', 'Lunch', 'Dinner', '2 Snacks']
    },
    {
      id: 2,
      name: 'Muscle Building Plan',
      description: 'High-protein diet optimized for muscle growth and recovery',
      duration: '16 weeks',
      difficulty: 'Intermediate',
      price: '$69',
      popular: true,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      features: [
        '2500-3000 daily calories',
        'High protein (2g per kg)',
        'Post-workout nutrition',
        'Supplement recommendations',
        'Progress tracking tools'
      ],
      meals: ['Breakfast', 'Pre-workout', 'Post-workout', 'Lunch', 'Dinner', '2 Snacks']
    },
    {
      id: 3,
      name: 'Athletic Performance',
      description: 'Precision nutrition for peak athletic performance',
      duration: '20 weeks',
      difficulty: 'Advanced',
      price: '$89',
      popular: false,
      image: 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      features: [
        '2800-3500 daily calories',
        'Periodized nutrition',
        'Competition prep protocols',
        'Recovery optimization',
        'Individual customization'
      ],
      meals: ['5-6 strategically timed meals', 'Pre/during/post training']
    }
  ];

  const nutritionTips = [
    {
      title: 'Meal Timing',
      description: 'Eat every 3-4 hours to maintain steady energy levels and metabolism.',
      icon: Clock
    },
    {
      title: 'Hydration',
      description: 'Drink at least 8-10 glasses of water daily, more during intense training.',
      icon: CheckCircle
    },
    {
      title: 'Portion Control',
      description: 'Use your hand as a guide: palm for protein, fist for vegetables.',
      icon: Utensils
    },
    {
      title: 'Quality Sleep',
      description: '7-9 hours of quality sleep is crucial for recovery and muscle growth.',
      icon: Users
    }
  ];

  return (
    <section id="diet" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Nutrition Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Fuel your fitness journey with scientifically-backed nutrition plans 
            tailored to your goals, lifestyle, and dietary preferences.
          </p>
        </div>

        {/* Diet Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {dietPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                plan.popular ? 'ring-2 ring-orange-500 scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-white/90">{plan.description}</p>
                </div>
              </div>

              {/* Plan Content */}
              <div className="p-6">
                {/* Plan Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {plan.duration}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {plan.difficulty}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{plan.price}</div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Daily Meals */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Daily Structure:</h4>
                  <div className="flex flex-wrap gap-2">
                    {plan.meals.map((meal, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {meal}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
                    : 'bg-gradient-to-r from-blue-600 to-orange-600 text-white hover:shadow-lg'
                }`}>
                  Choose This Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Nutrition Tips */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Essential Nutrition Tips
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Master these fundamentals to maximize your results regardless of which plan you choose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nutritionTips.map((tip, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl mb-4">
                  <tip.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h4>
                <p className="text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DietPlans;