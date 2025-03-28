import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function AIStoryCreator() {
  const [prompt, setPrompt] = useState('');
  const [theme, setTheme] = useState('fantasy');

  return (
    <section id="ai" className="py-24 bg-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Sparkles className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">AI Story Creator</h2>
          <p className="text-cyan-100 text-lg max-w-2xl mx-auto">
            Create your own magical stories with our AI-powered story generator
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-950/50 rounded-xl p-8">
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Your Story Idea
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-blue-900/50 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                rows={4}
                placeholder="Once upon a time..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Story Theme
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg bg-blue-900/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="fantasy">Fantasy</option>
                <option value="adventure">Adventure</option>
                <option value="scifi">Science Fiction</option>
                <option value="mystery">Mystery</option>
              </select>
            </div>

            <button className="w-full px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all flex items-center justify-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Generate Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}