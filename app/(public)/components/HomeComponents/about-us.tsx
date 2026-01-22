import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutUs() {
  return (
    <section className="py-20 bg-background overflow-hidden" id="about-us">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary">
              Empowering Your Career Journey
            </h2>
            <p className="text-xl text-foreground/80 leading-relaxed">
              We believe that everyone deserves the chance to showcase their true potential. Our mission is to democratize interview preparation by making high-quality, personalized coaching accessible to everyone.
            </p>
            
            <div className="space-y-4">
              {[
                "Industry-standard mock interviews",
                "Personalized learning paths",
                "Expert-curated content",
                "Community support and peer practice"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link 
                href="/register" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 transition-all duration-200"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
            
            <div className="relative bg-card p-8 rounded-3xl shadow-xl border border-secondary/20">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-primary font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2">Practice</h3>
                    <p className="text-card-foreground/70">Take unlimited mock interviews tailored to your target role and industry.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-primary font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2">Analyze</h3>
                    <p className="text-card-foreground/70">Review detailed feedback on your answers, body language, and speaking pace.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-primary font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2">Improve</h3>
                    <p className="text-card-foreground/70">Follow personalized recommendations to refine your skills and boost confidence.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}