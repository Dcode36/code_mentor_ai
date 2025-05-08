import { useEffect } from "react"; 
import { useParams, useLocation, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const QuestionDetails: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { problem: question } = location.state || {};

  useEffect(() => {
    if (question) {
      document.title = `${question.title} - Details`;
    } else {
      document.title = "Question Not Found";
    }
  }, [question]);

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-center p-4">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-red-500/30 max-w-md">
          <div className="text-red-400 text-2xl font-bold mb-4">❌ Question not found!</div>
          <p className="text-gray-400 mb-6">The question you're looking for doesn't exist or has been removed.</p>
          <Link to="/questions">
            <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
              Return to Questions
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Function to render difficulty badge with appropriate styling
  const renderDifficultyBadge = (difficulty: string) => {
    const badgeStyles = {
      easy: "bg-green-900/40 text-green-300 border border-green-700/30",
      medium: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/30",
      hard: "bg-rose-900/40 text-rose-300 border border-rose-700/30"
    };
    
    const difficultyKey = difficulty.toLowerCase() as keyof typeof badgeStyles;
    const badgeStyle = badgeStyles[difficultyKey] || badgeStyles.medium;
    
    return (
      <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${badgeStyle}`}>
        {difficulty}
      </span>
    );
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen text-slate-200">
      {/* Navbar */}
      <Navbar />

      {/* Content Section */}
      <div className="flex items-start justify-center p-4 md:p-6">
        <div className="max-w-5xl w-full mx-auto mt-6 md:mt-10 p-6 md:p-8 bg-gray-900 rounded-2xl shadow-2xl text-gray-200 border border-gray-800">
          {/* Question Header */}
          <div className="border-b border-gray-800 pb-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">{question.title}</h1>
            
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <span className="text-gray-400">Difficulty:</span>
                {renderDifficultyBadge(question.difficulty)}
              </div>
              
              {question.category && (
                <div className="flex items-center">
                  <span className="text-gray-400">Category:</span>
                  <span className="ml-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
                    {question.category}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
              <span className="mr-2">📝</span> Description
            </h2>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 text-gray-300 leading-relaxed">
              {question.description}
            </div>
          </div>

          {/* Test Cases Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
              <span className="mr-2">🧪</span> Test Cases
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-5 rounded-xl border border-gray-700/50">
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-400">Input:</span>
                  <div className="mt-1 p-3 bg-gray-900 rounded-lg font-mono text-green-300 border border-gray-700/30">
                    {question.sampleInput}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-400">Output:</span>
                  <div className="mt-1 p-3 bg-gray-900 rounded-lg font-mono text-blue-300 border border-gray-700/30">
                    {question.sampleOutput}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hints Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
              <span className="mr-2">💡</span> Hints
            </h2>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 text-gray-300">
              <ul className="space-y-3">
                {typeof question.hints === 'string' ? (
                  <li className="list-disc ml-5">{question.hints}</li>
                ) : Array.isArray(question.hints) ? (
                  question.hints.map((hint: string, index: number) => (
                  <li key={index} className="list-disc ml-5">{hint}</li>
                  ))
                ) : null}
              </ul>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/questions" className="order-2 sm:order-1">
              <button className="w-full sm:w-auto px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg border border-gray-700 flex items-center justify-center">
                <span className="mr-2">🔙</span> Back to Dashboard
              </button>
            </Link>

            <Link
              to={`/questions/solve/${question.id}`}
              className="order-1 sm:order-2 inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-xl shadow-lg border border-violet-500/20"
            >
              Solve This Question <span className="ml-2">🚀</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;