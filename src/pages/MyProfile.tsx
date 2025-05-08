import React from 'react';
import { Flame, CheckCircle, CalendarDays, Award, Target, Zap, ChevronUp, BarChart3, Trophy, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MyProfile = () => {
  const totalQuestions = 120;
  const correctAnswers = 108;
  const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(1);
  
  const currentStreak = 10;
  const longestStreak = 21;
  const navigate = useNavigate();
  
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
      <button
          onClick={() => navigate(-1)}
          className="flex items-center text-xl text-pink-400 hover:text-white transition mb-4"
        >
          <ArrowLeft className="w-20 h-10 mr-1" />
          Back
        </button>
        {/* Header with Profile Icon */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="h-24 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 border-4 border-gray-800">
            <User className="text-white" size={48} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">My Profile</h1>
          <p className="text-gray-400 mt-2">Track your progress and achievements</p>
        </div>
        
        {/* Performance Dashboard */}
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-purple-900">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="text-pink-500" /> Performance Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl p-4 text-center border-l-4 border-purple-500">
              <div className="flex items-center justify-center mb-2">
                <Target className="text-purple-400 mr-2" size={20} />
                <p className="text-gray-300">Total Questions</p>
              </div>
              <h2 className="text-2xl font-bold text-white">{totalQuestions}</h2>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center border-l-4 border-pink-500">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="text-green-400 mr-2" size={20} />
                <p className="text-gray-300">Correct Answers</p>
              </div>
              <h2 className="text-2xl font-bold text-green-400">{correctAnswers}</h2>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center border-l-4 border-purple-500">
              <div className="flex items-center justify-center mb-2">
                <ChevronUp className="text-pink-400 mr-2" size={20} />
                <p className="text-gray-300">Accuracy</p>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{accuracy}%</h2>
            </div>
          </div>
        </div>
        
        {/* Streak Board */}
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-purple-900">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Flame className="text-pink-500" /> Streak Board
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-5 rounded-xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2">
                <Zap className="text-pink-500" size={18} />
              </div>
              <p className="text-gray-300 mb-2">Current Streak</p>
              <h2 className="text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">{currentStreak} days</h2>
            </div>
            <div className="bg-gray-800 p-5 rounded-xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2">
                <Trophy className="text-purple-500" size={18} />
              </div>
              <p className="text-gray-300 mb-2">Longest Streak</p>
              <h2 className="text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">{longestStreak} days</h2>
            </div>
          </div>
        </div>
        
        {/* Calendar Mockup */}
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-purple-900">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CalendarDays className="text-pink-500" /> Activity Calendar
          </h3>
          <div className="grid grid-cols-7 gap-2 text-sm text-center">
            {Array.from({ length: 28 }, (_, i) => (
              <div
                key={i}
                className={`h-10 w-full rounded-md flex items-center justify-center 
                  ${i % 3 === 0 ? 'bg-green-500 bg-opacity-80' : 
                    i % 4 === 0 ? 'bg-purple-600 bg-opacity-50' : 
                      'bg-gray-800'}`}
              >
                {i % 3 === 0 && <CheckCircle className="text-white" size={16} />}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-300">Solved</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-purple-600 bg-opacity-50 mr-2"></div>
              <span className="text-gray-300">Attempted</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-gray-800 mr-2"></div>
              <span className="text-gray-300">Inactive</span>
            </div>
          </div>
        </div>
        
        {/* Achievement Badge */}
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-purple-900">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="text-pink-500" /> Recent Achievement
          </h3>
          <div className="bg-gray-800 rounded-xl p-4 flex items-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-4">
              <Flame className="text-white" size={28} />
            </div>
            <div>
              <h4 className="text-lg font-medium text-white">10-Day Streak Master</h4>
              <p className="text-gray-300 text-sm">Solved at least one problem every day for 10 days in a row!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;