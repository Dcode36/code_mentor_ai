import { useState, useRef, useEffect } from 'react';
import { CheckCircle, Code, PlayCircle, Terminal } from 'lucide-react';

interface Example {
    input: string;
    output: string;
    explanation: string;
}

interface Problem {
    title: string;
    difficulty: string;
    description: string;
    examples: Example[];
    constraints: string[];
}

const LeetCodeDashboard = () => {
    const [activeTab, setActiveTab] = useState<'code' | 'result'>('code');
    const [leftPanelWidth, setLeftPanelWidth] = useState<number>(40); // Initial width percentage
    const resizeRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef<boolean>(false);

    // Demo problem data
    const problem: Problem = {
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
    const [code, setCode] = useState<string>(`function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement)!, i];
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

Runtime: 76 ms, faster than 85.13% of TypeScript submissions
Memory: 42.5 MB, less than 68.22% of TypeScript submissions`;

    // Handle resize logic
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        isDraggingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDraggingRef.current) return;
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

        // Limit the resize range (min 20%, max 80%)
        if (newWidth >= 20 && newWidth <= 80) {
            setLeftPanelWidth(newWidth);
        }
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    // Clean up event listeners
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className="flex h-screen bg-gray-900" ref={containerRef}>
            {/* Problem panel (left side) */}
            <div
                className="bg-gray-800 shadow-md overflow-y-auto border-r border-gray-600"
                style={{ width: `${leftPanelWidth}%` }}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
                        <span className="px-3 py-1 bg-green-900 text-green-300 rounded-full text-sm font-medium">
                            {problem.difficulty}
                        </span>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p className="whitespace-pre-line text-gray-300">{problem.description}</p>

                        <h3 className="font-medium mt-6 mb-2 text-white">Examples:</h3>
                        {problem.examples.map((example, idx) => (
                            <div key={idx} className="mb-4 bg-gray-700 p-4 rounded-md text-gray-300">
                                <p><strong>Input:</strong> {example.input}</p>
                                <p><strong>Output:</strong> {example.output}</p>
                                <p><strong>Explanation:</strong> {example.explanation}</p>
                            </div>
                        ))}

                        <h3 className="font-medium mt-6 mb-2 text-white">Constraints:</h3>
                        <ul className="list-disc pl-5 text-gray-300">
                            {problem.constraints.map((constraint, idx) => (
                                <li key={idx}>{constraint}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Resizable divider */}
            <div
                ref={resizeRef}
                className="cursor-col-resize w-2 bg-gray-600 hover:bg-purple-500 active:bg-purple-600 transition-colors"
                onMouseDown={handleMouseDown}
                style={{ cursor: 'col-resize' }}
            ></div>

            {/* Code panel (right side) */}
            <div
                className="flex flex-col"
                style={{ width: `${100 - leftPanelWidth}%` }}
            >
                {/* Tabs navigation */}
                <div className="flex border-b border-gray-600 bg-gray-800">
                    <button
                        className={`px-4 py-3 flex items-center gap-1 font-medium ${activeTab === 'code' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-300'}`}
                        onClick={() => setActiveTab('code')}
                    >
                        <Code size={18} />
                        Code
                    </button>
                    <button
                        className={`px-4 py-3 flex items-center gap-1 font-medium ${activeTab === 'result' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-300'}`}
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
                            <div className="bg-gray-800 text-white p-3 flex justify-between items-center border-b border-gray-600">
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-gray-700 rounded text-sm">TypeScript</span>
                                </div>
                                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded flex items-center gap-1">
                                    <PlayCircle size={16} />
                                    Run 
                                </button>
                            </div>
                            <div className="flex-1 bg-gray-900 p-4 overflow-y-auto">
                                <textarea
                                    className="w-full h-full bg-gray-900 text-gray-300 font-mono resize-none outline-none"
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