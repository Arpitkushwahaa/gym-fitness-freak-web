import React, { useState } from 'react';
import { Play, Star, Users, Target, X } from 'lucide-react';

const Hero = () => {
  // Add state for video modal
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  // YouTube video ID for a fitness demo video
  const demoVideoId = "UBMk30rjy0o";

  const stats = [
    { icon: Users, value: '10K+', label: 'Active Members' },
    { icon: Target, value: '95%', label: 'Success Rate' },
    { icon: Star, value: '4.9', label: 'Rating' }
  ];

  // Open video modal
  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  // Close video modal
  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent block lg:inline lg:ml-4">
              Body & Mind
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands who've achieved their fitness goals with our expert-designed workouts, 
            personalized diet plans, and cutting-edge tools.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href="#exercises" 
              className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Start Your Journey
              <Target className="h-5 w-5" />
            </a>
            <button 
              onClick={openVideoModal} 
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2 border border-white/20"
            >
              <Play className="h-5 w-5" />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-600 rounded-full mb-3">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-xl shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button 
              onClick={closeVideoModal} 
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Video Player */}
            <div className="relative pb-[56.25%] h-0 overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${demoVideoId}?autoplay=1&mute=0`}
                title="Fitness Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Video Title */}
            <div className="p-6 bg-gradient-to-t from-black/100 to-black/80">
              <h3 className="text-xl font-bold text-white">FitZone Complete Workout Demonstration</h3>
              <p className="text-gray-300 mt-2">Watch our expert trainers demonstrate proper technique for maximum results.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;