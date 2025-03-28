import React from 'react';
import { Book } from 'lucide-react';

export default function ExploreBook() {
  return (
    <section id="explore" className="py-24 bg-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Book className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Explore the Book</h2>
          <p className="text-cyan-100 text-lg max-w-2xl mx-auto">
            Dive into an interactive reading experience where every page brings new surprises
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Interactive Pages",
              description: "Watch as static pages transform into animated scenes",
              image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
            },
            {
              title: "Character Stories",
              description: "Meet and interact with fascinating characters",
              image: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
            },
            {
              title: "Audio Narration",
              description: "Listen to professional narration with sound effects",
              image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-blue-950/50 rounded-xl overflow-hidden transform hover:scale-105 transition-all">
              <div className="h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-cyan-100">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}