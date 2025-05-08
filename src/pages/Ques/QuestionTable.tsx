import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import axios from 'axios'
=======
import axios from 'axios';
import { Link } from 'react-router-dom';
>>>>>>> tejas
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';

interface Question {
<<<<<<< HEAD
  id: number;
  title: string;
  description: string;
  difficulty: string;
  companies?: string[]; // Array of company tags
  acceptance?: string; // Added acceptance rate field
  status?: string; // Added status field (Solved, Attempted, etc)

  sampleInput: string;
  sampleOutput: string;
    explanation?: string;

  constraints?: string[]; // Added constraints field
=======
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
>>>>>>> tejas
}

const QuestionTable: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
<<<<<<< HEAD
  const [loading, setLoading] = useState<boolean>(true);

=======
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
>>>>>>> tejas

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get('https://codementor-backend.vercel.app/api/questions');
        const data = response.data;
        console.log(response.data);

        // Normalize data: ensure each question has all required fields
        const normalizedData = data.map((question: any, index: number) => ({
          id: question.id || index + 1, // Use existing ID or create sequential one
          title: question.title,
          description: question.description,
          difficulty: question.difficulty,
          companies: Array.isArray(question.tags) ? question.tags : [],
          acceptance: question.acceptance || "N/A",
          status: question.status || "",
          sampleInput: question.sampleInput || "",
          sampleOutput: question.sampleOutput || "",

          constraints: question.constraints || []
        }));

        setQuestions(normalizedData);
      } catch (error) {
        console.error('Error fetching questions:', error);
=======
        const res = await axios.get('https://codementor-backend.vercel.app/api/questions');
        setQuestions(res.data);
      } catch (err) {
        console.error('Failed to fetch questions:', err);
>>>>>>> tejas
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
<<<<<<< HEAD
    <div className="bg-black min-h-screen text-slate-200">
      <Navbar />

      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader />
          <p className="mt-4 text-violet-400 animate-pulse">Loading problems...</p>
        </div>
      ) : (
        <div className="overflow-x-auto p-4 md:p-6 max-w-7xl mx-auto">
          <table className="min-w-full mt-12 md:mt-20 border border-violet-800 shadow-2xl rounded-xl overflow-hidden">
            <thead className="sticky top-0 bg-gradient-to-r from-violet-800 to-pink-700 text-white shadow-md z-10">
              <tr>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left font-bold text-sm tracking-wider uppercase">Problem</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left font-bold text-sm tracking-wider uppercase">Difficulty</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left font-bold text-sm tracking-wider uppercase">Companies</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-center font-bold text-sm tracking-wider uppercase">Details</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left font-bold text-sm tracking-wider uppercase">Solve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-800/50">
              {questions.map((question, index) => (
                <tr
                  key={question.id}
                  className={`group transition-all duration-300 ${
                    index % 2 === 0 ? 'bg-black/70' : 'bg-gray-900/70'
                  } hover:bg-violet-900/50 hover:shadow-lg hover:-translate-y-0.5`}
                >
                  <td className="px-4 py-3 md:px-6 md:py-5">
                    <div className="text-base md:text-lg font-semibold text-white group-hover:text-pink-400 transition-colors">
                      #{question.id}. {question.title}
                    </div>
                    <div className="text-sm text-gray-400 mt-2 font-light leading-relaxed">
                      {question.description.length > 120 ? question.description.substring(0, 120) + '...' : question.description}
                    </div>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-5">
                    <span
                      className={`px-3 py-1.5 inline-flex items-center text-xs font-semibold rounded-full ${getDifficultyColor(
                        question.difficulty
                      )}`}
                    >
                      {question.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-5">
                    <div className="flex flex-wrap gap-2 max-w-[160px] md:max-w-[200px]">
                      {(question.companies ?? []).slice(0, 3).map((company, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs font-medium bg-violet-900/30 text-violet-300 rounded-full"
                        >
                          {company}
                        </span>
                      ))}
                      {question.companies && question.companies.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{question.companies.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-5">
                  <Link
  to={`/questions/${question.id}`}
  state={{ problem: question }} // Passing the data as state
  className="flex items-center justify-center w-10 h-10 text-violet-400 hover:text-pink-400 transition-colors rounded-full hover:bg-violet-900/50"
  title="View Description"
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>3
</Link>

                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-5">
                    <Link
                      to={`/dashboard/solve/${question.id}`}
                      state={{ problem: question }}
                      className="inline-flex items-center px-4 py-2 md:px-5 md:py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-pink-500/30 relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <span className="absolute -left-12 w-12 h-full bg-gradient-to-r from-white/10 via-white/30 to-white/10 transform -skew-x-12 transition-all duration-700 ease-in-out group-hover:left-[110%] opacity-40" />
                      </span>
                      <svg
                        className="h-4 w-4 md:h-5 md:w-5 mr-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Solve
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
=======
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
>>>>>>> tejas
  );
};

export default QuestionTable;
