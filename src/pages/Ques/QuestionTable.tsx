import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';

interface Question {
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
}

const QuestionTable: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
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

  return (
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
  );
};

export default QuestionTable;
