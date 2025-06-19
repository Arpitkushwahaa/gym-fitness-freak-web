import React, { useState, useEffect } from 'react';
import { Dumbbell, Target, Clock, BarChart3, X, Play, CheckCircle, StopCircle, TimerReset, Plus, Folder, FolderPlus, List, Calendar, ArrowLeft } from 'lucide-react';

// Define types
interface Exercise {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  duration: string;
  calories: number;
  image: string;
  description: string;
  instructions: string[];
  sets: string;
  reps: string;
  restTime: string;
  equipment: string;
  targetMuscles: string[];
}

interface Routine {
  id: number;
  name: string;
  description: string;
  exercises: Exercise[];
}

const Exercises = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [time, setTime] = useState(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  
  // Routine management state
  const [routines, setRoutines] = useState<Routine[]>([
    {
      id: 1,
      name: "Full Body Workout",
      description: "Complete full body workout focusing on all muscle groups",
      exercises: []
    },
    {
      id: 2,
      name: "Upper Body Strength",
      description: "Focus on chest, shoulders, back and arms",
      exercises: []
    }
  ]);
  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [routineFormData, setRoutineFormData] = useState({
    name: '',
    description: ''
  });
  const [isRoutineListVisible, setIsRoutineListVisible] = useState(false);
  const [viewingRoutine, setViewingRoutine] = useState<Routine | null>(null);

  // Listen for showRoutines event from navbar
  useEffect(() => {
    const handleShowRoutines = () => {
      setIsRoutineListVisible(true);
      // Scroll to the exercises section
      const exercisesSection = document.getElementById('exercises');
      if (exercisesSection) {
        exercisesSection.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
    window.addEventListener('showRoutines', handleShowRoutines);
    
    return () => {
      window.removeEventListener('showRoutines', handleShowRoutines);
    };
  }, []);

  // Timer useEffect
  useEffect(() => {
    let interval = null;
    
    if (isTimerActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isTimerActive && time !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, time]);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Start workout and timer
  const startWorkout = () => {
    setIsTimerActive(true);
    setIsWorkoutStarted(true);
  };

  // Stop workout and timer
  const stopWorkout = () => {
    setIsTimerActive(false);
    setIsWorkoutStarted(false);
  };

  // Reset timer
  const resetTimer = () => {
    setTime(0);
    setIsTimerActive(false);
  };

  // Start a complete workout routine
  const startWorkoutSession = (routine: Routine) => {
    // Functionality for starting a complete workout routine
    alert(`Starting workout routine: ${routine.name}`);
    // Future enhancement: implement multi-exercise workout flow
  };

  // Add exercise to routine
  const addToRoutine = (exerciseId: number) => {
    if (!selectedRoutine) return;

    const exerciseToAdd = exercises.find(ex => ex.id === exerciseId);
    if (!exerciseToAdd) return;

    // Check if exercise is already in routine
    const isExerciseInRoutine = selectedRoutine.exercises.some(ex => ex.id === exerciseId);
    if (isExerciseInRoutine) return;

    // Add exercise to routine
    const updatedRoutines = routines.map(routine => {
      if (routine.id === selectedRoutine.id) {
        return {
          ...routine,
          exercises: [...routine.exercises, exerciseToAdd]
        };
      }
      return routine;
    });

    setRoutines(updatedRoutines);
    setIsRoutineModalOpen(false);
    setSelectedRoutine(null);

    // Show success notification
    alert(`${exerciseToAdd.name} added to ${selectedRoutine.name}`);
  };

  // Create new routine
  const createRoutine = () => {
    if (!routineFormData.name.trim()) {
      alert("Please enter a name for your routine");
      return;
    }

    const newRoutine: Routine = {
      id: routines.length > 0 ? Math.max(...routines.map(r => r.id)) + 1 : 1,
      name: routineFormData.name,
      description: routineFormData.description || "Custom routine",
      exercises: []
    };

    setRoutines([...routines, newRoutine]);
    setRoutineFormData({ name: '', description: '' });

    // If this was created during add to routine flow, select it automatically
    if (selectedExercise) {
      setSelectedRoutine(newRoutine);
    } else {
      setIsRoutineModalOpen(false);
    }
  };

  // Remove exercise from routine
  const removeFromRoutine = (routineId: number, exerciseId: number) => {
    const updatedRoutines = routines.map(routine => {
      if (routine.id === routineId) {
        return {
          ...routine,
          exercises: routine.exercises.filter(ex => ex.id !== exerciseId)
        };
      }
      return routine;
    });

    setRoutines(updatedRoutines);
    
    // Update viewing routine if currently viewing
    if (viewingRoutine && viewingRoutine.id === routineId) {
      const updatedRoutine = updatedRoutines.find(r => r.id === routineId);
      setViewingRoutine(updatedRoutine || null);
    }
  };

  // Handle "Add to Routine" button click
  const handleAddToRoutine = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsRoutineModalOpen(true);
  };

  // Delete routine
  const deleteRoutine = (routineId: number) => {
    if (confirm("Are you sure you want to delete this routine?")) {
      setRoutines(routines.filter(routine => routine.id !== routineId));
      if (viewingRoutine && viewingRoutine.id === routineId) {
        setViewingRoutine(null);
      }
    }
  };

  // View routine details
  const viewRoutine = (routine: Routine) => {
    setViewingRoutine(routine);
  };

  // Toggle routine list visibility
  const toggleRoutineList = () => {
    setIsRoutineListVisible(!isRoutineListVisible);
  };

  const categories = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Cardio'];

  const exercises = [
    {
      id: 1,
      name: 'Push-ups',
      category: 'Chest',
      difficulty: 'Beginner',
      duration: '15 min',
      calories: 120,
      image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Build upper body strength with this classic bodyweight exercise.',
      instructions: [
        'Start in a plank position with hands slightly wider than shoulders',
        'Lower your body until chest nearly touches the floor',
        'Push back up to starting position',
        'Keep your core tight throughout the movement',
        'Maintain a straight line from head to heels'
      ],
      sets: '3 sets',
      reps: '8-15 reps',
      restTime: '60 seconds',
      equipment: 'None (Bodyweight)',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps', 'Core']
    },
    {
      id: 2,
      name: 'Deadlifts',
      category: 'Back',
      difficulty: 'Advanced',
      duration: '20 min',
      calories: 180,
      image: 'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Master the king of all exercises for full-body strength.',
      instructions: [
        'Stand with feet hip-width apart, bar over mid-foot',
        'Bend at hips and knees to grip the bar',
        'Keep chest up and back straight',
        'Drive through heels to lift the bar',
        'Stand tall, then lower with control'
      ],
      sets: '4 sets',
      reps: '5-8 reps',
      restTime: '2-3 minutes',
      equipment: 'Barbell, Weight plates',
      targetMuscles: ['Hamstrings', 'Glutes', 'Lower back', 'Traps']
    },
    {
      id: 3,
      name: 'Squats',
      category: 'Legs',
      difficulty: 'Intermediate',
      duration: '18 min',
      calories: 150,
      image: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Build powerful legs and glutes with proper squat technique.',
      instructions: [
        'Stand with feet shoulder-width apart',
        'Lower by pushing hips back and bending knees',
        'Keep chest up and knees tracking over toes',
        'Descend until thighs are parallel to floor',
        'Drive through heels to return to standing'
      ],
      sets: '3 sets',
      reps: '10-15 reps',
      restTime: '90 seconds',
      equipment: 'Bodyweight or Barbell',
      targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core']
    },
    {
      id: 4,
      name: 'Bicep Curls',
      category: 'Arms',
      difficulty: 'Beginner',
      duration: '12 min',
      calories: 90,
      image: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Isolate and strengthen your bicep muscles effectively.',
      instructions: [
        'Stand with feet hip-width apart, dumbbells in hands',
        'Keep elbows close to your sides',
        'Curl weights up by flexing biceps',
        'Squeeze at the top of the movement',
        'Lower with control to starting position'
      ],
      sets: '3 sets',
      reps: '12-15 reps',
      restTime: '45 seconds',
      equipment: 'Dumbbells',
      targetMuscles: ['Biceps', 'Forearms']
    },
    {
      id: 5,
      name: 'Shoulder Press',
      category: 'Shoulders',
      difficulty: 'Intermediate',
      duration: '16 min',
      calories: 130,
      image: 'https://images.pexels.com/photos/3837757/pexels-photo-3837757.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Develop strong, stable shoulders with overhead pressing.',
      instructions: [
        'Stand with feet shoulder-width apart',
        'Hold dumbbells at shoulder height',
        'Press weights straight up overhead',
        'Keep core engaged throughout',
        'Lower with control to starting position'
      ],
      sets: '3 sets',
      reps: '8-12 reps',
      restTime: '75 seconds',
      equipment: 'Dumbbells or Barbell',
      targetMuscles: ['Shoulders', 'Triceps', 'Upper chest']
    },
    {
      id: 6,
      name: 'Plank',
      category: 'Core',
      difficulty: 'Beginner',
      duration: '10 min',
      calories: 80,
      image: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Strengthen your core and improve stability with planks.',
      instructions: [
        'Start in push-up position on forearms',
        'Keep body in straight line from head to heels',
        'Engage core muscles throughout',
        'Breathe normally while holding position',
        'Hold for specified time duration'
      ],
      sets: '3 sets',
      reps: '30-60 seconds hold',
      restTime: '30 seconds',
      equipment: 'None (Bodyweight)',
      targetMuscles: ['Core', 'Shoulders', 'Glutes']
    },
    {
      id: 7,
      name: 'HIIT Cardio',
      category: 'Cardio',
      difficulty: 'Advanced',
      duration: '25 min',
      calories: 300,
      image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'High-intensity interval training for maximum fat burn.',
      instructions: [
        'Warm up for 5 minutes with light movement',
        'Alternate between high-intensity (30 sec) and rest (30 sec)',
        'Include exercises like burpees, mountain climbers, jumping jacks',
        'Maintain maximum effort during work intervals',
        'Cool down with 5 minutes of stretching'
      ],
      sets: '8-12 rounds',
      reps: '30 sec work / 30 sec rest',
      restTime: 'Built into intervals',
      equipment: 'None (Bodyweight)',
      targetMuscles: ['Full body', 'Cardiovascular system']
    },
    {
      id: 8,
      name: 'Pull-ups',
      category: 'Back',
      difficulty: 'Advanced',
      duration: '14 min',
      calories: 140,
      image: 'https://images.pexels.com/photos/4162494/pexels-photo-4162494.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Challenge your upper body with this compound movement.',
      instructions: [
        'Hang from pull-up bar with overhand grip',
        'Hands slightly wider than shoulder-width',
        'Pull body up until chin clears the bar',
        'Lower with control to full arm extension',
        'Keep core engaged throughout movement'
      ],
      sets: '3 sets',
      reps: '5-10 reps',
      restTime: '2 minutes',
      equipment: 'Pull-up bar',
      targetMuscles: ['Lats', 'Rhomboids', 'Biceps', 'Core']
    }
  ];

  const filteredExercises = selectedCategory === 'All' 
    ? exercises 
    : exercises.filter(exercise => exercise.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
    // Reset timer state when opening a new exercise
    setTime(0);
    setIsTimerActive(false);
    setIsWorkoutStarted(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExercise(null);
    // Reset timer when closing modal
    setTime(0);
    setIsTimerActive(false);
    setIsWorkoutStarted(false);
  };

  return (
    <section id="exercises" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Exercise Library
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover hundreds of exercises with detailed instructions, video demonstrations, 
            and progressive difficulty levels to match your fitness journey.
          </p>

          {/* Routines Management Button */}
          <button
            onClick={toggleRoutineList}
            className="mx-auto bg-gradient-to-r from-blue-600 to-orange-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2 mb-8"
            style={{ width: 'fit-content' }}
          >
            <Folder className="h-5 w-5" />
            {isRoutineListVisible ? 'Hide My Routines' : 'Show My Routines'}
          </button>
        </div>

        {/* My Routines Section */}
        {isRoutineListVisible && (
          <div className="mb-16 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">My Workout Routines</h3>
              <button
                onClick={() => {
                  setSelectedExercise(null);
                  setRoutineFormData({ name: '', description: '' });
                  setIsRoutineModalOpen(true);
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FolderPlus className="h-4 w-4" />
                Create New Routine
              </button>
            </div>

            {viewingRoutine ? (
              // Routine details view
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <button
                      onClick={() => setViewingRoutine(null)}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 mb-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to routines
                    </button>
                    <h4 className="text-xl font-bold">{viewingRoutine.name}</h4>
                    <p className="text-gray-600">{viewingRoutine.description}</p>
                  </div>
                  <button
                    onClick={() => startWorkoutSession(viewingRoutine)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Start Routine
                  </button>
                </div>

                {viewingRoutine.exercises.length === 0 ? (
                  <p className="text-gray-500 text-center py-6">No exercises in this routine yet. Add exercises from the library below.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {viewingRoutine.exercises.map((exercise) => (
                      <div key={exercise.id} className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 relative">
                        <img
                          src={exercise.image}
                          alt={exercise.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h5 className="font-semibold text-gray-900">{exercise.name}</h5>
                          <div className="text-sm text-gray-500">{exercise.sets}, {exercise.reps}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                              {exercise.difficulty}
                            </span>
                            <span className="text-xs text-gray-500">{exercise.category}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromRoutine(viewingRoutine.id, exercise.id)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Routines list view
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routines.length === 0 ? (
                  <p className="text-gray-500 text-center py-6 col-span-full">No routines yet. Create your first workout routine!</p>
                ) : (
                  routines.map((routine) => (
                    <div key={routine.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-r from-blue-600 to-orange-600 text-white p-2 rounded-lg">
                          <List className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-semibold">{routine.name}</h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{routine.description}</p>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Dumbbell className="h-4 w-4" />
                          <span>{routine.exercises.length} exercises</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>~{routine.exercises.length * 5} min</span>
                        </div>
                      </div>
                      <div className="flex justify-between gap-2">
                        <button
                          onClick={() => viewRoutine(routine)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => deleteRoutine(routine.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
            >
              {/* Exercise Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                </div>
              </div>

              {/* Exercise Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{exercise.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{exercise.description}</p>
                
                {/* Exercise Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{exercise.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="h-4 w-4" />
                    <span>{exercise.calories} cal</span>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => handleStartExercise(exercise)}
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Dumbbell className="h-4 w-4" />
                  Start Exercise
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-gray-700 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border border-gray-200">
            Load More Exercises
          </button>
        </div>
      </div>

      {/* Exercise Modal */}
      {isModalOpen && selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedExercise.image}
                alt={selectedExercise.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedExercise.name}</h2>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedExercise.difficulty)}`}>
                    {selectedExercise.difficulty}
                  </span>
                  <span className="text-white/90">{selectedExercise.category}</span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Workout Timer */}
              <div className={`mb-6 p-4 rounded-xl border ${isTimerActive ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Workout Timer</h4>
                    <p className="text-gray-600 text-sm">Track your workout duration</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-gray-900">{formatTime(time)}</div>
                    <div className="flex gap-2">
                      {!isWorkoutStarted ? (
                        <button 
                          onClick={startWorkout}
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                        >
                          <Play className="h-5 w-5" />
                        </button>
                      ) : (
                        <button 
                          onClick={stopWorkout}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                        >
                          <StopCircle className="h-5 w-5" />
                        </button>
                      )}
                      <button 
                        onClick={resetTimer}
                        className="bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-full transition-colors"
                      >
                        <TimerReset className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                {isWorkoutStarted && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Target Duration: {selectedExercise.duration}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">Workout in progress</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Exercise Details */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Exercise Details</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedExercise.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Sets</div>
                      <div className="text-lg font-bold text-gray-900">{selectedExercise.sets}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Reps/Duration</div>
                      <div className="text-lg font-bold text-gray-900">{selectedExercise.reps}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Rest Time</div>
                      <div className="text-lg font-bold text-gray-900">{selectedExercise.restTime}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Equipment</div>
                      <div className="text-lg font-bold text-gray-900">{selectedExercise.equipment}</div>
                    </div>
                  </div>

                  {/* Target Muscles */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Target Muscles</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExercise.targetMuscles.map((muscle, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Perform</h3>
                  <div className="space-y-4">
                    {selectedExercise.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-200">
                {!isWorkoutStarted ? (
                  <button 
                    onClick={startWorkout}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-orange-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Play className="h-5 w-5" />
                    Start Workout
                  </button>
                ) : (
                  <button 
                    onClick={stopWorkout}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <StopCircle className="h-5 w-5" />
                    Complete Workout
                  </button>
                )}
                <button 
                  onClick={() => handleAddToRoutine(selectedExercise)}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Target className="h-5 w-5" />
                  Add to Routine
                </button>
                <button 
                  onClick={closeModal}
                  className="sm:w-auto px-8 bg-white text-gray-700 py-4 rounded-xl font-medium border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add to Routine Modal */}
      {isRoutineModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedExercise ? `Add ${selectedExercise.name} to Routine` : 'Create New Routine'}
              </h3>
              <button
                onClick={() => {
                  setIsRoutineModalOpen(false);
                  setSelectedRoutine(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Create New Routine Form */}
            {(!routines.length || selectedRoutine?.id === -1) ? (
              <div className="mb-6 p-4 border border-gray-200 rounded-xl bg-gray-50">
                <h4 className="font-bold text-gray-900 mb-4">Create New Routine</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Routine Name</label>
                    <input
                      type="text"
                      value={routineFormData.name}
                      onChange={(e) => setRoutineFormData({...routineFormData, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Morning Workout"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                    <textarea
                      value={routineFormData.description}
                      onChange={(e) => setRoutineFormData({...routineFormData, description: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                      placeholder="Describe your workout routine"
                    />
                  </div>
                  <button
                    onClick={createRoutine}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Routine
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Select Routine */}
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">Select a routine to add this exercise to, or create a new one:</p>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {routines.map((routine) => (
                      <div
                        key={routine.id}
                        onClick={() => setSelectedRoutine(routine)}
                        className={`p-3 rounded-xl cursor-pointer transition-colors ${
                          selectedRoutine?.id === routine.id
                            ? 'bg-blue-100 border border-blue-300'
                            : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <div className="font-medium text-gray-900">{routine.name}</div>
                        <div className="text-sm text-gray-500">{routine.exercises.length} exercises</div>
                      </div>
                    ))}
                    <div
                      onClick={() => setSelectedRoutine({ id: -1, name: 'New Routine', description: '', exercises: [] })}
                      className="p-3 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center gap-2 text-blue-600"
                    >
                      <Plus className="h-4 w-4" />
                      Create New Routine
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setIsRoutineModalOpen(false);
                      setSelectedRoutine(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => selectedExercise && addToRoutine(selectedExercise.id)}
                    disabled={!selectedRoutine || selectedRoutine.id === -1}
                    className={`px-4 py-2 rounded-lg ${
                      selectedRoutine && selectedRoutine.id !== -1
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Add to Routine
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Exercises;