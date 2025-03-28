import React from 'react';
import { Book, Brain, User, Crown, Sparkles, ChevronDown } from 'lucide-react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ExploreBook from './components/ExploreBook';
import LearnPlay from './components/LearnPlay';
import MeetAuthor from './components/MeetAuthor';
import JoinJourney from './components/JoinJourney';
import AIStoryCreator from './components/AIStoryCreator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800">
      <Navigation />
      <main>
        <Hero />
        <ExploreBook />
        <LearnPlay />
        <MeetAuthor />
        <JoinJourney />
        <AIStoryCreator />
      </main>
    </div>
  );
}

export default App;