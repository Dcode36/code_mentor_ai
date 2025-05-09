import { useState } from 'react';
import {
  ChevronRight,
  Terminal,
  Code,
  BookOpen,
  BrainCircuit,
  ExternalLink,
  Check,
  Monitor
} from 'lucide-react';
import Navbar from '../../components/Navbar';

// Demo step screenshots
import demo1 from '../../assets/demo1.png';
import demo2 from '../../assets/demo2.png';
import demo3 from '../../assets/demo3.png';
import demo4 from '../../assets/demo4.png';
import demo5 from '../../assets/demo5.png';

interface Step {
  id: number;
  title: string;
  description: string;
  image: string;
  altText: string;
  icon: JSX.Element;
}

const Demo: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: Step[] = [
    {
      id: 1,
      title: "Select a Problem",
      description: "First, log in to access our problem library. Once logged in, you can browse and choose a problem to solve.",
      image: demo1,
      altText: "GFG problem library interface",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Analyze the Problem",
      description: "Carefully examine the selected problem to understand its requirements and constraints. A thorough analysis will help you develop an efficient and accurate solution.",
      image: demo2,
      altText: "AI analyzing the problem statement",
      icon: <BrainCircuit className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Execute and Test",
      description: "Run your solution against sample and custom test cases to verify its correctness. Evaluate the code's performance with insights into time and space complexity.",
      image: demo3,
      altText: "Solution generation interface",
      icon: <Code className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Get Suggestions & Solution",
      description: "If you're stuck, get intelligent hints from our AI assistant. For challenging problems, receive step-by-step guidance or a complete solution with detailed explanations.",
      image: demo4,
      altText: "Code execution interface",
      icon: <Terminal className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed statistics and insights. Track completed problems, skill improvements, and recommended areas for further practice.",
      image: demo5,
      altText: "Progress tracking dashboard",
      icon: <Monitor className="w-6 h-6" />
    }
  ];

  const codeExample: string = `function twoSum(nums, target) {
  // Create a map to store numbers and their indices
  const numMap = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    // If the complement exists in the map, we found a solution
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }
    
    // Add the current number to the map
    numMap.set(nums[i], i);
  }
  
  // No solution found
  return [];
}`;

  const features: string[] = [
    "Supportable langues java, python, javascript",
    "Time and space complexity analysis",
    "Step-by-step explanation of algorithms",
    "Custom test case input",
    "Performance comparison with different approaches",
    "Learning path recommendations"
  ];

  return (
    <div className="bg-black min-h-screen font-sans text-gray-100">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-6">How It Works</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our AI-powered platform helps you learn and master algorithms by solving GeeksforGeeks problems with detailed guidance.
          </p>
        </div>

        {/* Step Navigation */}
        <div className="flex flex-wrap justify-center mb-12 gap-3">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex items-center px-5 py-3 rounded-full transition-all duration-300 ${
                activeStep === step.id
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{step.icon}</span>
              <span className="font-medium">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        {steps.map((step) => (
          <div
            key={step.id}
            className={`transition-all duration-500 ${
              activeStep === step.id ? 'opacity-100' : 'hidden opacity-0'
            }`}
          >
            <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-purple-800">
              <div className="md:flex items-stretch">
                <div className="md:w-1/2 flex items-center justify-center bg-gray-950 p-4">
                  <img
                    src={step.image}
                    alt={step.altText}
                    className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-purple-900 text-pink-400 rounded-full p-3 mr-4">
                        {step.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        Step {step.id}: {step.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">{step.description}</p>

                    {step.id === 3 && (
                      <div className="bg-gray-800 p-5 rounded-lg mb-8 overflow-auto border border-purple-700 shadow-lg">
                        <pre className="text-sm text-pink-100">{codeExample}</pre>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => setActiveStep(activeStep < steps.length ? activeStep + 1 : 1)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-pink-600/20"
                    >
                      {activeStep === steps.length ? "Start Over" : "Next Step"}
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-xl shadow-lg flex items-start border border-purple-800 hover:border-pink-500 transition-all duration-300">
                <div className="bg-purple-900 text-pink-400 rounded-full p-3 mr-4 flex-shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-lg text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-purple-900 to-pink-700 rounded-xl shadow-2xl p-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Master Algorithms?</h2>
          <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
            Join thousands of developers who are improving their coding skills with our AI-powered problem-solving assistant.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button className="bg-pink-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-pink-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-pink-600/30 text-lg">
              Let's Start Coding 
              <ExternalLink className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-6 lg:px-8 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Code className="w-7 h-7 mr-3 text-pink-400" />
            <span className="font-semibold text-xl">Code Mentor AI</span>
          </div>
          <div className="flex space-x-6 items-center">
            <p className="text-lg">Made with ❤️ by G-14</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Demo;