import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { dsaQuestions } from "./dsaQuestions";
import Navbar from "../../components/Navbar";

const QuestionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="text-center text-red-400 text-xl">❌ Invalid question id!</div>
      </div>
    );
  }

  const question = dsaQuestions.find(q => q.id === Number(id));

  useEffect(() => {
    if (question) {
      document.title = `${question.title} - Details`;
    } else {
      document.title = "Question Not Found";
    }
  }, [question]);

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="text-center text-red-400 text-xl">❌ Question not found!</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-slate-200">
      {/* Navbar */}
      <Navbar />

      {/* Content Section */}
      <div className="flex items-start justify-center p-6 ">
        <div className="max-w-5xl w-full mx-auto mt-10 p-8 bg-gray-900 rounded-2xl shadow-2xl text-gray-200">
          <h1 className="text-3xl font-bold text-violet-400">{question.title}</h1>

          <p className="mt-4 text-gray-400 text-lg">
            <strong>Difficulty:</strong>{" "}
            <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${question.difficulty.toLowerCase() === "easy"
              ? "bg-green-900/40 text-green-300 border border-green-700/30"
              : question.difficulty.toLowerCase() === "medium"
                ? "bg-yellow-900/40 text-yellow-300 border border-yellow-700/30"
                : "bg-rose-900/40 text-rose-300 border border-rose-700/30"
              }`}>
              {question.difficulty}
            </span>
          </p>

          <p className="mt-4 text-gray-400">
            <strong>Companies:</strong> {question.companies.join(", ")}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">Description</h2>
          <p className="text-gray-300">{question.description}</p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">Test Cases</h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-4">
            {question.testCases.map((test, idx) => (
              <li key={idx} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <strong>Input:</strong> {test.input} <br />
                <strong>Output:</strong> {test.output}
              </li>
            ))}
          </ul>

          {question.hints && question.hints.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">Hints</h2>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                {question.hints.map((hint, idx) => (
                  <li key={idx}>{hint}</li>
                ))}
              </ul>
            </>
          )}

          {/* Buttons */}
          <div className="mt-10 flex space-x-6">
            <Link to="/questions">
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold transition-all hover:scale-105">
                🔙 Back to Dashboard
              </button>
            </Link>

            <Link
              to={`/questions/solve/${question.id}`}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white rounded-lg text-sm font-semibold transition-all hover:scale-105 shadow-lg"
            >
              Solve This Question 🚀
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
