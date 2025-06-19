import React from 'react';
import { Calendar, Trophy, Users, Zap, ArrowRight } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      id: 1,
      title: '30-Day Transformation',
      subtitle: 'Beginner Friendly',
      description: 'Perfect starting point for fitness newcomers. Build healthy habits and see real results in just one month.',
      duration: '30 Days',
      level: 'Beginner',
      participants: '2.5K+',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: [
        '3 workouts per week',
        'Nutrition guidance included',
        'Progress tracking tools',
        'Community support',
        'Mobile app access'
      ],
      highlights: ['No gym required', 'Quick 30-min sessions', 'Proven results']
    },
    {
      id: 2,
      title: 'Strength & Power',
      subtitle: 'Intermediate Level',
      description: 'Take your strength to the next level with progressive overload training and advanced techniques.',
      duration: '12 Weeks',
      level: 'Intermediate',
      participants: '1.8K+',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: [
        '4-5 workouts per week',
        'Compound movement focus',
        'Periodized programming',
        'Form check videos',
        'Recovery protocols'
      ],
      highlights: ['Gym equipment needed', '45-60 min sessions', 'Strength gains guaranteed']
    },
    {
      id: 3,
      title: 'Elite Athlete',
      subtitle: 'Advanced Training',
      description: 'High-intensity programming designed for serious athletes and advanced fitness enthusiasts.',
      duration: '16 Weeks',
      level: 'Advanced',
      participants: '950+',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: [
        '6 workouts per week',
        'Sport-specific training',
        'Advanced periodization',
        '1-on-1 coaching calls',
        'Competition preparation'
      ],
      highlights: ['Full gym access required', '60-90 min sessions', 'Peak performance focus']
    }
  ];

  const benefits = [
    {
      icon: Calendar,
      title: 'Structured Planning',
      description: 'Every workout is planned and progresses logically toward your goals.'
    },
    {
      icon: Trophy,
      title: 'Proven Results',
      description: 'Thousands of success stories from members who transformed their lives.'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Join a community of like-minded individuals on the same journey.'
    },
    {
      icon: Zap,
      title: 'Expert Guidance',
      description: 'Programs created by certified trainers with years of experience.'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Workout Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Structured programs designed by expert trainers to help you achieve specific fitness goals, 
            whether you're just starting out or training at an elite level.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Program Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(program.level)}`}>
                      {program.level}
                    </span>
                    <div className="flex items-center gap-1 text-white text-sm">
                      <Trophy className="h-4 w-4" />
                      <span>{program.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{program.title}</h3>
                  <p className="text-orange-300 font-medium">{program.subtitle}</p>
                </div>
              </div>

              {/* Program Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>

                {/* Program Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{program.participants} joined</span>
                  </div>
                </div>

                {/* Program Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {program.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {program.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-orange-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group">
                  Start Program
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Programs?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our programs are more than just workouts – they're comprehensive fitness solutions 
              backed by science and proven by results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl mb-4">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;