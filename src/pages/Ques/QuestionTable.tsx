import { Question } from './dsaQuestions';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

interface QuestionTableProps {
  questions: Question[];
}

const QuestionTable: React.FC<QuestionTableProps> = ({ questions }) => {



  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-900 text-emerald-300';
      case 'medium':
        return 'bg-amber-900 text-amber-300';
      case 'hard':
        return 'bg-rose-900 text-rose-300';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  return (
    <>
      <div className="bg-black min-h-screen text-slate-200">
        {/* Navbar Section */}
        <Navbar />

        {/* Table Section */}
        <div className="overflow-x-auto p-6 max-w-7xl mx-auto ">
          <table className="min-w-full mt-20 border border-violet-700 shadow-xl rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-violet-700 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-sm tracking-wider uppercase">Problem Statement</th>
                <th className="px-6 py-4 text-left font-bold text-sm tracking-wider uppercase">Difficulty</th>
                <th className="px-6 py-4 text-left font-bold text-sm tracking-wider uppercase">Companies</th>
                <th className="px-6 py-4 text-center font-bold text-sm tracking-wider uppercase">Description</th>
                <th className="px-6 py-4 text-left font-bold text-sm tracking-wider uppercase">Solve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-700">
              {questions.map((question, index) => (
                <tr
                  key={question.id}
                  className={`group transition-all duration-300 ${index % 2 === 0 ? 'bg-black' : 'bg-gray-900'
                    } hover:bg-violet-900`}
                >
                  <td className="px-6 py-5">
                    <div className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors">
                      #{question.id}. {question.title}
                    </div>
                    <div className="text-sm text-gray-400 mt-2 font-light">
                      {question.description}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-1.5 inline-flex items-center text-xs font-semibold rounded-full ${getDifficultyColor(
                        question.difficulty
                      )}`}
                    >
                      {question.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="max-w-[200px] truncate text-gray-300 font-medium">
                      {question.companies.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-5 flex justify-center">
                    <Link
                      to={`/quesdesc/${question.id}`}
                      state={{ problem: question }}
                      className="text-violet-400 hover:text-pink-400 transition-colors p-2 rounded-full hover:bg-violet-900/50"
                      title="View Description"
                    >
                      👁️
                    </Link>

                  </td>
                  <td className="px-6 py-5">
                    <Link
                      to={`/dashboard/solve/${question.id}`}
                      state={{ problem: question }}
                      className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-pink-500/30"
                    >
                      <svg
                        className="h-5 w-5 mr-2"
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
      </div>
    </>
  );
};

export default QuestionTable;
