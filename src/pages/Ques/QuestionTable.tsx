import { Question } from './dsaQuestions';
import { Link } from 'react-router-dom';

interface QuestionTableProps {
  questions: Question[];
}

const QuestionTable: React.FC<QuestionTableProps> = ({ questions }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-400/20 text-blue-400';
      case 'medium':
        return 'bg-yellow-400/20 text-violet-400';
      case 'hard':
        return 'bg-red-400/20 text-fuchsia-400';
      default:
        return 'bg-gray-400/20 text-gray-400';
    }
  };

  return (
    <div className="overflow-x-auto p-6 bg-slate-900 min-h-screen">
      <table className="min-w-full border border-slate-700 shadow-2xl rounded-lg backdrop-blur-sm">
        <thead className="bg-violet-950/30 text-slate-300 uppercase text-sm">
          <tr>
            <th className="px-6 py-4 text-left font-semibold">Title</th>
            <th className="px-6 py-4 text-left font-semibold">Difficulty</th>
            <th className="px-6 py-4 text-left font-semibold">Companies</th>
            <th className="px-6 py-4 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {questions.map((question) => (
            <tr
              key={question.id}
              className="hover:bg-slate-800/40 transition duration-200"
            >
              <td className="px-6 py-4">
                <div className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition">
                  {question.title}
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  {question.description}
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1.5 text-sm font-medium rounded-full ${getDifficultyColor(
                    question.difficulty
                  )}`}
                >
                  {question.difficulty}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-300">
                {question.companies.join(', ')}
              </td>
              <td className="px-6 py-4">
                <Link
                  to={`/dashboard/solve/${question.id}`}
                  className="px-4 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-md transition duration-200 hover:shadow-[0_0_12px_-2px_rgba(124,58,237,0.5)]"
                >
                  Solve
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;