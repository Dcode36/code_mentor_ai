import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';

interface Question {
  id: React.Key | null | undefined;
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  tags?: string[];
  sampleInput?: string;
  sampleOutput?: string;
  constraints?: string;
  createdAt?: string;
  updatedAt?: string;
}

const QuestionTable: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:8900/api/questions');
        setQuestions(res.data);
      } catch (err) {
        console.error('Failed to fetch questions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-500/20 text-emerald-300';
      case 'medium':
        return 'bg-amber-500/20 text-amber-300';
      case 'hard':
        return 'bg-rose-500/20 text-rose-300';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          question.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === null || 
                             question.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  return (
    <>
      <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen text-slate-200">
        {/* Navbar Section */}
        <Navbar />

        <div className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-500 mb-4">
              CodeMentor Challenges
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Enhance your coding skills by solving these coding challenges. Pick a problem, solve it, and improve your algorithmic thinking.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="w-full sm:w-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setDifficultyFilter(null)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  difficultyFilter === null
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDifficultyFilter('easy')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  difficultyFilter === 'easy'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Easy
              </button>
              <button
                onClick={() => setDifficultyFilter('medium')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  difficultyFilter === 'medium'
                    ? 'bg-amber-700 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setDifficultyFilter('hard')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  difficultyFilter === 'hard'
                    ? 'bg-rose-700 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Hard
              </button>
            </div>
          </div>

          {/* Questions Table */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader />
            </div>
          ) : (
            <>
              <div className="overflow-hidden shadow-xl rounded-xl border border-violet-700/50 backdrop-blur-sm bg-black/50">
                <table className="min-w-full divide-y divide-violet-700/50">
                  <thead className="bg-gradient-to-r from-violet-900/80 to-pink-900/80">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold text-sm tracking-wider uppercase text-gray-200">Problem</th>
                      <th className="px-6 py-4 text-left font-bold text-sm tracking-wider uppercase text-gray-200 hidden md:table-cell">Difficulty</th>
                      <th className="px-6 py-4 text-left font-bold text-sm tracking-wider uppercase text-gray-200 hidden lg:table-cell">Tags</th>
                      <th className="px-6 py-4 text-center font-bold text-sm tracking-wider uppercase text-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-violet-700/30 bg-black/30">
                    {filteredQuestions.length > 0 ? (
                      filteredQuestions.map((question, index) => (
                        <tr 
                          key={question._id} 
                          className={`hover:bg-violet-900/20 transition-colors group ${
                            index % 2 === 0 ? 'bg-black/60' : 'bg-black/40'
                          }`}
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 hidden sm:block">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-white font-bold">
                                  {index + 1}
                                </div>
                              </div>
                              <div className="ml-0 sm:ml-4">
                                <div className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors">
                                  {question.title}
                                </div>
                                <div className="text-sm text-gray-400 mt-1 font-light line-clamp-1">
                                  {question.description}
                                </div>
                                <div className="md:hidden mt-2">
                                  <span
                                    className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getDifficultyColor(
                                      question.difficulty
                                    )}`}
                                  >
                                    {question.difficulty}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 hidden md:table-cell">
                            <span
                              className={`px-4 py-1.5 inline-flex items-center text-xs font-semibold rounded-full ${getDifficultyColor(
                                question.difficulty
                              )}`}
                            >
                              {question.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-5 hidden lg:table-cell">
                            {question.tags && question.tags.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {question.tags.slice(0, 3).map((tag, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-violet-900/50 text-xs rounded">
                                    {tag}
                                  </span>
                                ))}
                                {question.tags.length > 3 && (
                                  <span className="px-2 py-1 bg-violet-900/30 text-xs rounded">
                                    +{question.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-500 text-sm">-</span>
                            )}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex justify-center gap-3">
                              <Link
                                to={`/quesdesc/${question._id}`}
                                state={{ problem: question }}
                                className="text-violet-400 hover:text-violet-300 p-2 rounded-full hover:bg-violet-900/50 transition-all tooltip-container"
                                title="View Details"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span className="tooltip">View Details</span>
                              </Link>
                              <Link
                                to={`/dashboard/solve/${question._id}`}
                                state={{ problem: question }}
                                className="text-pink-400 hover:text-pink-300 p-2 rounded-full hover:bg-pink-900/50 transition-all tooltip-container"
                                title="Solve Challenge"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="tooltip">Solve Challenge</span>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                          <div className="flex flex-col items-center">
                            <svg className="w-12 h-12 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-lg">No questions found matching your criteria</p>
                            <button 
                              onClick={() => {setSearchQuery(''); setDifficultyFilter(null);}}
                              className="mt-3 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors"
                            >
                              Clear filters
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination or Stats */}
              <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
                <div>
                  Showing <span className="font-medium text-white">{filteredQuestions.length}</span> of <span className="font-medium text-white">{questions.length}</span> questions
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span>{questions.filter(q => q.difficulty.toLowerCase() === 'easy').length} Easy</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span>{questions.filter(q => q.difficulty.toLowerCase() === 'medium').length} Medium</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <span>{questions.filter(q => q.difficulty.toLowerCase() === 'hard').length} Hard</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Additional CSS for tooltips */}
      <style>{`
        .tooltip-container {
          position: relative;
        }
        .tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s;
        }
        .tooltip-container:hover .tooltip {
          opacity: 1;
          visibility: visible;
        }
      `}</style>
    </>
  );
};

export default QuestionTable;
