import React from 'react';
import { User } from 'lucide-react';

export default function MeetAuthor() {
  return (
    <section id="author" className="py-24 bg-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <User className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Meet the Author</h2>
          <p className="text-cyan-100 text-lg max-w-2xl mx-auto">
            Get to know the creative mind behind the magic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-w-4 aspect-h-5 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
                alt="Author"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Sarah Johnson</h3>
            <p className="text-cyan-100">
              Award-winning children's author with a passion for creating immersive educational experiences. 
              With over 15 years of storytelling experience, Sarah brings magic to every page.
            </p>
            <div className="space-y-4">
              <button className="w-full sm:w-auto px-6 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors">
                Watch Author's Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}