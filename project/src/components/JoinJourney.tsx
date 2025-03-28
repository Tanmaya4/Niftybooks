import React from 'react';
import { Crown } from 'lucide-react';

export default function JoinJourney() {
  return (
    <section id="join" className="py-24 bg-blue-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Crown className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Join the Journey</h2>
          <p className="text-cyan-100 text-lg max-w-2xl mx-auto">
            Unlock exclusive content and join our community of young explorers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Explorer",
              price: "Free",
              features: ["Basic story access", "Limited activities", "Community forum"]
            },
            {
              title: "Adventurer",
              price: "$9.99/month",
              features: ["Full story access", "All activities", "Monthly new content", "Priority support"]
            },
            {
              title: "Legend",
              price: "$19.99/month",
              features: ["Everything in Adventurer", "AI story generation", "Exclusive events", "1-on-1 sessions"]
            }
          ].map((plan, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-8 text-center transform hover:scale-105 transition-all ${
                index === 1 ? 'border-2 border-orange-500' : ''
              }`}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-6">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-cyan-100">{feature}</li>
                ))}
              </ul>
              <button className={`w-full px-6 py-3 rounded-full font-semibold transition-colors ${
                index === 1
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-cyan-500 text-white hover:bg-cyan-600'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}