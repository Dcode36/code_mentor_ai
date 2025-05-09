import React, { useState, useEffect, useRef } from 'react';
import { Code, Brain, Trophy, LineChart, BookOpen, Users } from "lucide-react";
import { AnimatedTestimonials } from '../../components/ui/animated-testimonials';
import Navbar from './../../components/Navbar';
import img from '../../assets/image.png'


const LandingPage: React.FC = () => {


  // Refs for scroll animations
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      icon: <Code className="text-violet-400 group-hover:text-white transition-colors" size={24} />,
      title: "Interactive Coding Challenges",
      description: "Practice with hundreds of carefully crafted problems spanning all difficulty levels from beginner to advanced."
    },
    {
      icon: <Brain className="text-violet-400 group-hover:text-white transition-colors" size={24} />,
      title: "AI Learning Assistant",
      description: "Get personalized hints, code reviews, and step-by-step explanations adapted to your learning style."
    },
    {
      icon: <Trophy className="text-violet-400 group-hover:text-white transition-colors" size={24} />,
      title: "Skill Progression System",
      description: "Track your mastery with our comprehensive skill tree that guides your learning journey."
    },
    {
      icon: <LineChart className="text-violet-400 group-hover:text-white transition-colors" size={24} />,
      title: "Performance Analytics",
      description: "Visualize your progress with detailed insights on your strengths and areas for improvement."
    },
    {
      icon: <BookOpen className="text-violet-400 group-hover:text-white transition-colors" size={24} />,
      title: "Comprehensive DSA Library",
      description: "Access our extensive collection of tutorials, visualizations, and implementation guides."
    },
    {
      icon: <Users className="text-violet-400 group-hover:text-white transition-colors" size={24} />,
      title: "Collaborative Learning",
      description: "Join community discussions, participate in coding competitions, and share solutions with peers."
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "CodeMentorAI helped me understand complex algorithms by breaking them down into manageable steps. I went from struggling with basic problems to confidently solving medium and hard interview questions!",
      name: "Digvijay Kadam",
      designation: "Btech CSE, SGU",
      src: img,
    },
    {
      quote: "The personalized hints are a game-changer. They give you just enough direction without spoiling the solution. I've significantly improved my problem-solving skills in just two months.",
      name: "Prithviraj Indulkar",
      designation: "Btech CSE, SGU",
      src: "https://pbs.twimg.com/profile_images/1906416178643468288/zVTiQwA6_400x400.jpg"
    },
    {
      quote: "I was preparing for technical interviews and CodeMentorAI's progressive hint system helped me learn how to think through problems systematically. I got offers from three top tech companies!",
      name: "Pranav Sutar",
      designation: "Btech CSE, SGU",
      src: "https://www.shutterstock.com/image-photo/joyful-happy-african-american-young-600nw-1470743384.jpg"
    },
    {
      quote: "I was preparing for technical interviews and CodeMentorAI's progressive hint system helped me learn how to think through problems systematically. I got offers from three top tech companies!",
      name: "Tejas Patil",
      designation: "Btech CSE, SGU",
      src: "https://tejas-patil.vercel.app/assets/profile-DvDMLWJ6.png"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How does the AI hint system work?",
      answer: "Our AI analyzes your current progress and understanding of the problem to provide tailored hints that guide you toward the solution without giving it away entirely. You can request progressively more detailed hints if you're still stuck."
    },
    {
      question: "Is CodeMentorAI suitable for beginners?",
      answer: "Absolutely! Our platform is designed for learners at all levels. Beginners will benefit from our step-by-step guidance and comprehensive explanations, while advanced users can use our platform to tackle more complex problems."
    },
    {
      question: "Can I use CodeMentorAI to prepare for technical interviews?",
      answer: "Yes! Many of our users successfully use CodeMentorAI for interview preparation. We offer curated problem sets that mimic questions commonly asked by top tech companies and provide detailed explanations of optimal solutions."
    },
    {
      question: "How often are new problems added?",
      answer: "We add new problems weekly, focusing on keeping our content up-to-date with the latest interview trends and covering a wide range of algorithms and data structures."
    },
    {
      question: "Can I use CodeMentorAI with my preferred programming language?",
      answer: "We support all major programming languages including Python, JavaScript, Java, C++, Go, and Ruby. Solutions and explanations are provided in your language of choice."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 14-day money-back guarantee. If you're not satisfied with your subscription, you can request a full refund within 14 days of your purchase."
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">


      {/* Header */}
      <Navbar />


      {/* Hero Section with Reveal Animation */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 blur-sm">
            <div className="absolute top-10 left-5 md:top-20 md:left-10 w-72 h-72 bg-violet-700 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-40 right-5 md:top-60 md:right-10 w-72 h-72 bg-pink-700 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-10 left-1/3 md:bottom-20 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 sm:px-12 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6 animate-fadeInUp">
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
              Master Data Structures & Algorithms
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Level Up Your Coding Skills With
              <span className="block bg-gradient-to-r from-violet-400 via-pink-400 to-red-400 bg-clip-text text-transparent mt-2">
                AI-Powered Guidance
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
              Solve DSA challenges with personalized hints, detailed walkthroughs, and AI-driven feedback designed to fit your learning style.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/questions"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition transform hover:scale-105"
              >
                Start Coding For Free
              </a>
              <a
                href="/demo"
                className="px-8 py-4 border border-violet-700 rounded-lg text-white font-semibold hover:bg-violet-900 hover:bg-opacity-30 transition"
              >
                See How It Works
              </a>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 flex items-center justify-center text-gray-400 text-sm">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No credit card required. Start learning instantly.
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Scroll Animations */}
      <section id="features" ref={featuresRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-animate fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Level Up Your <span className="text-violet-400">DSA Skills</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover how our AI-powered platform accelerates your mastery of algorithms and data structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 staggered-animation">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => featureCardsRef.current[index] = el}
                className="bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-violet-900 hover:border-violet-700 group scroll-animate"
              >
                <div className="w-12 h-12 rounded-lg bg-violet-900 bg-opacity-30 flex items-center justify-center mb-4 group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-pink-600 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Scroll Animation */}
      <section ref={testimonialsRef} id='about-us' className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-animate fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of developers who have transformed their coding skills with CodeMentorAI.
            </p>
          </div>

          <div className="scroll-animate scale-in">
            <AnimatedTestimonials testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* FAQ Section with Scroll Animation */}
      <section id="faq" ref={faqRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-animate fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about CodeMentorAI.
            </p>
          </div>

          <div className="max-w-3xl mx-auto scroll-animate fade-up">
            <div className="space-y-4 staggered-animation">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-black rounded-lg shadow-md border border-violet-900 overflow-hidden scroll-animate">
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer px-6 py-4">
                      <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                      <span className="text-violet-400 group-open:rotate-180 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-4 pt-0 text-gray-300">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Scroll Animation */}
      <section ref={ctaRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-10 w-80 h-80 bg-violet-900 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center scroll-animate scale-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to accelerate your <br />
              <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                DSA learning journey?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have transformed their problem-solving skills with CodeMentorAI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/questions"
                className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-medium rounded-lg px-8 py-4 text-center transition-all hover:transform hover:scale-105"
              >
                Get Started For Free
              </a>
         
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
{/* Footer */}
<footer className="bg-black pt-8 pb-4 border-t border-gray-800">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      {/* About Us Section */}
      <div>
        <h3 className="text-lg font-semibold text-white">About Us</h3>
        <p className="text-gray-400 text-sm">
          <a href="#about-us" className="text-violet-400 hover:text-violet-300 transition-colors">Learn more about our mission</a>
        </p>
      </div>

      {/* Location Section */}
      <div>
        <h3 className="text-lg font-semibold text-white">Location</h3>
        <p className="text-gray-400 text-sm">
          <a href="/" className="text-violet-400 hover:text-violet-300 transition-colors">Kolhapur ❤️</a>
        </p>
      </div>

      {/* FAQ Section */}
      <div>
        <h3 className="text-lg font-semibold text-white">FAQ</h3>
        <p className="text-gray-400 text-sm">
          <a href="#faq" className="text-violet-400 hover:text-violet-300 transition-colors">Frequently Asked Questions</a>
        </p>
      </div>
    </div>

    {/* Footer Copyright */}
    <div className="text-center mt-8 text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} CodeMentorAI. All rights reserved.</p>
    </div>
  </div>
</footer>




    </div>
  );
}

export default LandingPage;