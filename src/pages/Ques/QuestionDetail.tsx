import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

interface Question {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  companies?: string[];
  acceptance?: string;
  status?: string;

  sampleInput: string;
  sampleOutput: string;
  explanation?: string;

  constraints?: string[];
}

const QuestionDetails: React.FC = () => {
  const location = useLocation();
  const question = location.state?.problem as Question | null;

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-red-400 text-xl animate-pulse">
          <span className="text-4xl">⛔</span>
          <p className="mt-4">Question not found!</p>
        </div>
      </div>
    );
  }

  const difficultyStyles: Record<'easy' | 'medium' | 'hard', string> = {
    easy: 'bg-emerald-500/20 text-emerald-300 border-emerald-700/30',
    medium: 'bg-amber-500/20 text-amber-300 border-amber-700/30',
    hard: 'bg-rose-500/20 text-rose-300 border-rose-700/30',
  };

  return (
    <div className="bg-black min-h-screen text-slate-200">
      <Navbar />

      <div className="flex items-start justify-center p-4 md:p-6">
        <div className="max-w-4xl w-full mx-auto mt-8 md:mt-12 p-6 md:p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700/50">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              #{question.id}. {question.title}
            </h1>
            <div className="mt-2 md:mt-0 flex items-center space-x-4">
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${difficultyStyles[question.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard']}`}>
                {question.difficulty}
              </span>
            </div>
          </div>

          {/* Companies Section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Featured Companies</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {question.companies?.map((company, index) => (
                <span key={index} className="px-3 py-1 text-xs font-medium bg-violet-900/30 text-violet-300 rounded-full hover:bg-violet-800/50 transition-colors">
                  {company}
                </span>
              ))}
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-3 pb-2 border-b border-gray-700/50">Problem Description</h2>
            <p className="text-gray-300 leading-relaxed text-justify">
              {question.description.split('\n').map((line, i) => (
                <span key={i} className="block mb-3">{line}</span>
              ))}
            </p>
          </div>

          {/* Test Cases Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700/50">Sample Test Cases</h2>
            <div className="grid gap-4">

                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-violet-500/30 transition-colors group">
                  <div className="font-mono text-sm">
                    <div className="text-emerald-400">Input:</div>
                    <div className="ml-4 text-gray-300 break-words">› {question.sampleInput}</div>
                    <div className="mt-2 text-pink-400">Output:</div>
                    <div className="ml-4 text-gray-300 break-words">› {question.sampleOutput}</div>
                  </div>
                </div>

            </div>
          </div>


<div className="mt-8">
  <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700/50">Pro Tips</h2>
  <div className="space-y-3">
    {/* Add a check to ensure constraints is an array */}
    {Array.isArray(question.constraints) && question.constraints.length > 0 ? (
      question.constraints.map((constraint, idx) => (
        <div key={idx} className="p-4 bg-gray-800/30 rounded-lg border border-dashed border-gray-700/50 hover:border-amber-500/30 transition-colors">
          <div className="flex items-start">
            <span className="text-amber-400 mr-2">💡</span>
            <span className="text-gray-300">{constraint}</span>
          </div>
        </div>
      ))
    ) : (
      <div className="text-gray-500">No pro tips available for this question.</div>
    )}
  </div>
</div>


          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-between">
            <Link to="/questions" className="px-6 py-3 flex items-center justify-center bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg font-medium transition-all hover:scale-[1.02] group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span className="ml-2">Back to Problems</span>
            </Link>

            <Link to={`/dashboard/solve/${question.id}`} className="px-6 py-3 flex items-center justify-center bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white rounded-lg font-medium transition-all hover:scale-[1.02] relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0 opacity-0 hover:opacity-20 transition-opacity" />
              <span className="mr-2">Solve Now</span>
              <span className="animate-pulse">🚀</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
