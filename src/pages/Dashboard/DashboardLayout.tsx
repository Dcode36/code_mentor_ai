import React, { useState } from 'react';
import { ArrowDownCircle, CheckCircle, Code, PlayCircle, Terminal } from 'lucide-react';

const LeetCodeDashboard = () => {
    const [activeTab, setActiveTab] = useState('code');

    // Demo problem data
    const problem = {
        title: "Two Sum",
        difficulty: "Easy",
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    
You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
                explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
            }
        ],
        constraints: [
            "2 <= nums.length <= 104",
            "-109 <= nums[i] <= 109",
            "-109 <= target <= 109",
            "Only one valid answer exists."
        ]
    };

    // Demo code
    const [code, setCode] = useState(`function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
};`);

    // Demo result
    const result = `✓ Test Case 1 Passed
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Expected: [0,1]

✓ Test Case 2 Passed
Input: nums = [3,2,4], target = 6
Output: [1,2]
Expected: [1,2]

Runtime: 76 ms, faster than 85.13% of JavaScript submissions
Memory: 42.5 MB, less than 68.22% of JavaScript submissions`;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Problem panel (left side) */}
            <div className="w-2/5 bg-white shadow-md overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">{problem.title}</h1>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {problem.difficulty}
                        </span>
                    </div>

                    <div className="prose max-w-none">
                        <p className="whitespace-pre-line">{problem.description}</p>

                        <h3 className="font-medium mt-6 mb-2">Examples:</h3>
                        {problem.examples.map((example, idx) => (
                            <div key={idx} className="mb-4 bg-gray-50 p-4 rounded-md">
                                <p><strong>Input:</strong> {example.input}</p>
                                <p><strong>Output:</strong> {example.output}</p>
                                <p><strong>Explanation:</strong> {example.explanation}</p>
                            </div>
                        ))}

                        <h3 className="font-medium mt-6 mb-2">Constraints:</h3>
                        <ul className="list-disc pl-5">
                            {problem.constraints.map((constraint, idx) => (
                                <li key={idx}>{constraint}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Code panel (right side) */}
            <div className="w-3/5 flex flex-col">
                {/* Tabs navigation */}
                <div className="flex border-b border-gray-200 bg-white">
                    <button
                        className={`px-4 py-3 flex items-center gap-1 font-medium ${activeTab === 'code' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('code')}
                    >
                        <Code size={18} />
                        Code
                    </button>
                    <button
                        className={`px-4 py-3 flex items-center gap-1 font-medium ${activeTab === 'result' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('result')}
                    >
                        <Terminal size={18} />
                        Result
                    </button>
                </div>

                {/* Tab content */}
                <div className="flex-1 overflow-hidden">
                    {activeTab === 'code' && (
                        <div className="h-full flex flex-col">
                            <div className="bg-gray-800 text-white p-3 flex justify-between items-center">
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-gray-700 rounded text-sm">JavaScript</span>
                                </div>
                                <button className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded flex items-center gap-1">
                                    <PlayCircle size={16} />
                                    Run
                                </button>
                            </div>
                            <div className="flex-1 bg-gray-900 p-4 overflow-y-auto">
                                <textarea
                                    className="w-full h-full bg-gray-900 text-gray-100 font-mono resize-none outline-none"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'result' && (
                        <div className="h-full bg-gray-900 text-white p-6 overflow-y-auto">
                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle className="text-green-500" size={20} />
                                <span className="font-medium">All Tests Passed</span>
                            </div>
                            <pre className="font-mono text-gray-300 whitespace-pre-wrap">{result}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeetCodeDashboard;