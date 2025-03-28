import React from 'react';
import { Brain } from 'lucide-react';

export default function LearnPlay() {
  return (
    <section id="learn" className="py-24 bg-blue-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Brain className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Learn & Play</h2>
          <p className="text-cyan-100 text-lg max-w-2xl mx-auto">
            Engage with interactive activities that make learning fun and memorable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-8 transform hover:scale-105 transition-all">
            <h3 className="text-2xl font-bold text-white mb-4">Interactive Quizzes</h3>
            <p className="text-cyan-100 mb-6">Test your knowledge with fun, engaging quizzes that adapt to your learning pace.</p>
            <button className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
              Try a Quiz
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-8 transform hover:scale-105 transition-all">
            <h3 className="text-2xl font-bold text-white mb-4">Story Puzzles</h3>
            <p className="text-cyan-100 mb-6">Solve puzzles and unlock new chapters in this interactive learning adventure.</p>
            <button className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
              Start Puzzle
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}