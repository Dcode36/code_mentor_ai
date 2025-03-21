import React, { useState } from 'react';
import { dsaQuestions } from './sampledata.json';
import { FileText } from "lucide-react";
import Link from 'antd/es/typography/Link';

const QuestionTable = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(dsaQuestions.map(item => item.topic))];
  const filteredQuestions = selectedCategory === 'All' 
    ? dsaQuestions 
    : dsaQuestions.filter(category => category.topic === selectedCategory);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800'>
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-xl text-gray-200">
        {/* Hero section */}
        <div className="text-center py-8 mb-8 border-b border-gray-700">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Sample Question Set
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Master Data Structures and Algorithms with our curated collection of questions from top tech companies.
            Track your progress and improve your problem-solving skills.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Questions", value: "300+", color: "bg-blue-500" },
            { label: "Solved", value: "42", color: "bg-green-500" },
            { label: "Attempted", value: "78", color: "bg-yellow-500" },
            { label: "Completion", value: "14%", color: "bg-purple-500" }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700 relative overflow-hidden hover:bg-gray-750 transition-colors">
              <div className={`absolute top-0 left-0 w-1 h-full ${stat.color}`}></div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-blue-sm'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full p-3 pl-12 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-500 text-sm"
          />
          <svg className="w-5 h-5 absolute left-3 top-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Questions table */}
        {filteredQuestions.map((category) => (
          <div key={category.topic} className="mb-8">
            <h2 className="text-lg font-semibold mb-4 p-3 bg-gray-800 rounded-md border-l-4 border-blue-500 text-gray-100">
              {category.topic}
              <span className="ml-2 text-sm text-gray-400 font-normal">({category.questions.length})</span>
            </h2>

            <div className="rounded-lg overflow-hidden border border-gray-800 shadow-lg">
              <table className="w-full border-collapse bg-gray-900">
                <thead className="bg-gray-850">
                  <tr className="border-b border-gray-800">
                    <th className="p-3 text-left text-sm font-medium text-gray-300">Title</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-300">Solution</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-300">Difficulty</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-300">Status</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-300">Companies</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-300">Solve</th>
                  </tr>
                </thead>
                <tbody>
                  {category.questions.map((q) => (
                    <tr key={q.id} className="group hover:bg-gray-850 transition-colors border-b border-gray-800 last:border-0">
                      <td className="p-3 text-sm font-medium text-gray-100">
                        {q.title}
                      </td>
                      <td className="p-3">
                        <Link href={`/question/${q.id}`} className="text-gray-400 hover:text-blue-400 transition-colors">
                          <FileText className="w-4 h-4" />
                        </Link>
                      </td>
                      <td className="p-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          q.difficulty === "Easy" ? "text-green-400 bg-green-900/20"
                          : q.difficulty === "Medium" ? "text-yellow-400 bg-yellow-900/20"
                          : "text-red-400 bg-red-900/20"
                        }`}>
                          {q.difficulty}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          q.status === "Solved" ? "text-green-400 bg-green-900/20"
                          : q.status === "Attempted" ? "text-yellow-400 bg-yellow-900/20"
                          : "text-gray-400 bg-gray-800/20"
                        }`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-gray-400 font-medium">
                        {q.company}
                      </td>
                      <td className="p-3">
                        <Link href='/dashboard'>
                          <button className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md
                            transition-all text-sm font-medium group/solve">
                            <span>Solve</span>
                            <svg className="w-3.5 h-3.5 ml-1.5 transform group-hover/solve:translate-x-0.5 transition-transform" 
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionTable;