import React from 'react';
import { Brain, Clock, BarChart3, BookOpen } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-8 h-8 text-primary-foreground" />,
    title: "AI-Powered Interviews",
    description: "Experience realistic interview scenarios with our advanced AI that adapts to your responses."
  },
  {
    icon: <Clock className="w-8 h-8 text-primary-foreground" />,
    title: "Real-time Feedback",
    description: "Get instant analysis of your performance, including tone, pace, and content relevance."
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary-foreground" />,
    title: "Detailed Analytics",
    description: "Track your progress over time with comprehensive charts and performance metrics."
  },
  {
    icon: <BookOpen className="w-8 h-8 text-primary-foreground" />,
    title: "Extensive Question Bank",
    description: "Practice with thousands of curated questions across various domains and difficulty levels."
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-background" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Why Choose Us?</h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Prepare smarter, not harder. Our platform provides everything you need to crack your dream job interview.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-2xl bg-card border border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-primary/20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">{feature.title}</h3>
              <p className="text-card-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}