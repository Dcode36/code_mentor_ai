import React from 'react';
import {  Code, Sparkles, Target, Trophy, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';

function LandingPage() {
    const navigate = useNavigate();
  
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <header className="container mx-auto px-6 py-16">
            <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center space-x-2">
                <Brain className="w-8 h-8 text-purple-500" />
                <span className="text-2xl font-bold text-white">CodeMentor.AI</span>
            </div>
            <div className="flex items-center space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
                <a href="#problems" className="text-gray-300 hover:text-white transition">Problems</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
                
            
                        <button 
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                            onClick={() => navigate("/questions")}
                        >
                            Dashboard
                        </button>

            
              
            </div>
        </nav>

                <div className="flex items-center justify-between">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl font-bold text-white mb-6">
                            Master Coding with AI-Powered Learning
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Get step-by-step guidance, personalized hints, and AI-generated explanations
                            for coding problems. Learn faster and smarter with CodeMentor.AI.
                        </p>
                        <div className="flex space-x-4">
                            <button onClick={()=>{navigate('/dashboard')}} className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition flex items-center">
                                <Sparkles className="w-5 h-5 mr-2" />
                                Try it Free
                            </button>
                            <button className="border border-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition">
                                View Problems
                            </button>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <img
                            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
                            alt="Coding Interface"
                            className="rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="bg-gray-800 py-20" id="features">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Why Choose CodeMentor.AI?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Brain className="w-8 h-8 text-purple-500" />}
                            title="AI-Powered Guidance"
                            description="Get intelligent hints and step-by-step solutions tailored to your learning style."
                        />
                        <FeatureCard
                            icon={<Target className="w-8 h-8 text-purple-500" />}
                            title="Personalized Learning"
                            description="Adaptive difficulty and custom problem recommendations based on your progress."
                        />
                        <FeatureCard
                            icon={<Users className="w-8 h-8 text-purple-500" />}
                            title="Community Support"
                            description="Connect with other learners and share solutions in our vibrant community."
                        />
                    </div>
                </div>
            </section>

            {/* Problem Categories */}
            <section className="py-20" id="problems">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Popular Problem Categories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ProblemCard
                            title="Arrays & Strings"
                            count={150}
                            difficulty="Easy to Hard"
                        />
                        <ProblemCard
                            title="Dynamic Programming"
                            count={200}
                            difficulty="Medium to Hard"
                        />
                        <ProblemCard
                            title="Tree & Graphs"
                            count={175}
                            difficulty="All Levels"
                        />
                        <ProblemCard
                            title="System Design"
                            count={100}
                            difficulty="Advanced"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-purple-600">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">
                        Ready to Level Up Your Coding Skills?
                    </h2>
                    <button className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition flex items-center mx-auto">
                        <Trophy className="w-5 h-5 mr-2" />
                        Start Coding Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-8">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Brain className="w-6 h-6 text-purple-500" />
                            <span className="text-white font-semibold">CodeMentor.AI</span>
                        </div>
                        <div className="text-gray-400 text-sm">
                            © 2025 CodeMentor.AI. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="bg-gray-700 p-6 rounded-lg">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    );
}

interface ProblemCardProps {
    title: string;
    count: number;
    difficulty: string;
}

function ProblemCard({ title, count, difficulty }: ProblemCardProps) {
    return (
        <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition cursor-pointer">
            <Code className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-300">{count} Problems</p>
            <p className="text-purple-400">{difficulty}</p>
        </div>
    );
}

export default LandingPage;
