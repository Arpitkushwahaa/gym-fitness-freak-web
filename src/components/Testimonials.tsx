import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      image: 'https://images.pexels.com/photos/3768689/pexels-photo-3768689.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      rating: 5,
      text: "FitZone completely transformed my approach to fitness. The personalized workout plans and nutrition guidance helped me lose 25 pounds in 4 months. The community support is incredible!",
      achievement: "Lost 25 lbs in 4 months"
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Software Engineer',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      rating: 5,
      text: "As someone who travels frequently for work, I needed flexible workout options. FitZone's programs adapt to any situation - hotel room, gym, or home. I've never been stronger!",
      achievement: "Gained 15 lbs muscle mass"
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Teacher',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      rating: 5,
      text: "After having two kids, I thought I'd never get back in shape. FitZone's postpartum programs were exactly what I needed. I'm now in the best shape of my life at 35!",
      achievement: "Achieved pre-pregnancy fitness"
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Retired Veteran',
      image: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      rating: 5,
      text: "At 52, I thought my athletic days were behind me. FitZone proved me wrong. The age-appropriate modifications and injury prevention focus helped me compete in my first triathlon!",
      achievement: "Completed first triathlon at 52"
    },
    {
      id: 5,
      name: 'Jessica Park',
      role: 'College Student',
      image: 'https://images.pexels.com/photos/3768114/pexels-photo-3768114.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      rating: 5,
      text: "Between classes and part-time work, I barely had time for fitness. FitZone's quick, effective workouts fit perfectly into my schedule. Plus, the student discount was a lifesaver!",
      achievement: "Built consistent workout habit"
    },
    {
      id: 6,
      name: 'Robert Kim',
      role: 'Business Owner',
      image: 'https://images.pexels.com/photos/1484810/pexels-photo-1484810.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      rating: 5,
      text: "Running a business left no time for self-care. FitZone's executive wellness program helped me build sustainable habits. My energy levels and focus have dramatically improved!",
      achievement: "Reduced stress, increased energy"
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Success Stories' },
    { number: '95%', label: 'Goal Achievement Rate' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '50+', label: 'Countries Served' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real people, real results. See how FitZone has helped thousands of members 
            transform their lives and achieve their fitness goals.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="h-12 w-12 text-blue-600" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Achievement Badge */}
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-3 mb-6">
                <div className="text-sm font-medium text-blue-700">
                  🎯 {testimonial.achievement}
                </div>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 text-center shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of members who have transformed their lives with FitZone. 
            Your fitness journey starts with a single step.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              Start Your Transformation
            </button>
            <button className="text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300">
              View More Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;