import React, { useState } from 'react';
import { Book, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-blue-950/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Book className="h-8 w-8 text-cyan-400" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#explore" className="text-cyan-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Explore</a>
                <a href="#learn" className="text-cyan-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Learn & Play</a>
                <a href="#author" className="text-cyan-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Meet Author</a>
                <a href="#join" className="text-cyan-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Join</a>
                <a href="#ai" className="text-cyan-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">AI Stories</a>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyan-100 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#explore" className="text-cyan-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Explore</a>
            <a href="#learn" className="text-cyan-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Learn & Play</a>
            <a href="#author" className="text-cyan-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Meet Author</a>
            <a href="#join" className="text-cyan-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Join</a>
            <a href="#ai" className="text-cyan-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">AI Stories</a>
          </div>
        </div>
      )}
    </nav>
  );
}