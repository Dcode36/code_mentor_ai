import { useParams } from "react-router-dom";
import { dsaQuestions } from "./sampledata.json";

const QuestionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Find the question by ID
  const question = dsaQuestions.flatMap(category => category.questions)
    .find(q => q.id === Number(id));

  if (!question) {
    return (
      <div className="text-center mt-20 text-red-400 text-xl">
        ❌ Question not found!
      </div>
    );
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-lg text-gray-200">
      <h1 className="text-3xl font-bold text-blue-400">{question.title}</h1>
      <p className="mt-2 text-gray-400">
        <strong>Difficulty:</strong> 
        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
          question.difficulty === "Easy"
            ? "bg-green-900/40 text-green-300 border border-green-700/30"
            : question.difficulty === "Medium"
              ? "bg-yellow-900/40 text-yellow-300 border border-yellow-700/30"
              : "bg-red-900/40 text-red-300 border border-red-700/30"
        }`}>
          {question.difficulty}
        </span>
      </p>
      <p className="mt-2"><strong>Company:</strong> {question.company}</p>

      <h2 className="text-xl font-semibold mt-6">Description</h2>
      <p className="mt-2 text-gray-300">{question.description}</p>

      <h2 className="text-xl font-semibold mt-6">Test Cases</h2>
      <ul className="list-disc pl-6 text-gray-300">
        {question.testCases.map((test, idx) => (
          <li key={idx} className="mt-2 bg-gray-800 p-3 rounded-lg border border-gray-700">
            <strong>Input:</strong> {test.input} <br />
            <strong>Output:</strong> {test.output}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Hints</h2>
      <ul className="list-disc pl-6 text-gray-300">
        {question.hints.map((hint, idx) => (
          <li key={idx} className="mt-2">{hint}</li>
        ))}
      </ul>

      <div className="mt-6">
        <a href="/dashboard">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium transition-all hover:scale-105">
            Solve This Question 🚀
          </button>
        </a>
      </div>
    </div>
    </div>
  );
};

export default QuestionDetails;
