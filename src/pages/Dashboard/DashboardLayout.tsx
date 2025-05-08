import { useState, useRef, useEffect } from 'react';
import { CheckCircle, Code, PlayCircle, Terminal, ArrowLeft, List, X, Lightbulb, BookOpen } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Modal component for the QuestionTable and other modals
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-gray-900 text-white rounded-lg w-4/5 max-w-4xl max-h-[90vh] flex flex-col border-2 border-purple-500/50 shadow-xl shadow-purple-900/30">
                <div className="flex justify-between items-center border-b border-purple-500/30 p-4 bg-gray-900">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-purple-300 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Mock QuestionTable component
const QuestionTable = () => {
    const questions = [
        { id: 1, title: "Two Sum", difficulty: "Easy", acceptance: "47.5%", status: "Solved" },
        { id: 2, title: "Add Two Numbers", difficulty: "Medium", acceptance: "38.2%", status: "Attempted" },
        { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", acceptance: "33.8%", status: "" },
        { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", acceptance: "34.1%", status: "" },
        { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium", acceptance: "31.5%", status: "Solved" },
        { id: 6, title: "Zigzag Conversion", difficulty: "Medium", acceptance: "41.7%", status: "" },
        { id: 7, title: "Reverse Integer", difficulty: "Medium", acceptance: "26.9%", status: "Attempted" },
        { id: 8, title: "String to Integer (atoi)", difficulty: "Medium", acceptance: "16.6%", status: "" },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-purple-800">
                        <th className="py-3 px-4 text-left text-white">ID</th>
                        <th className="py-3 px-4 text-left text-white">Title</th>
                        <th className="py-3 px-4 text-left text-white">Difficulty</th>
                        <th className="py-3 px-4 text-left text-white">Acceptance</th>
                        <th className="py-3 px-4 text-left text-white">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => (
                        <tr key={question.id} className="border-b border-purple-800 hover:bg-purple-900/30">
                            <td className="py-3 px-4">{question.id}</td>
                            <td className="py-3 px-4 text-white">{question.title}</td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${question.difficulty === "Easy" ? "bg-green-900 text-white" :
                                    question.difficulty === "Medium" ? "bg-yellow-900 text-white" :
                                        "bg-red-900 text-white"
                                    }`}>
                                    {question.difficulty}
                                </span>
                            </td>
                            <td className="py-3 px-4">{question.acceptance}</td>
                            <td className="py-3 px-4">
                                {question.status === "Solved" && (
                                    <span className="text-white flex items-center gap-1">
                                        <CheckCircle size={16} />
                                        Solved
                                    </span>
                                )}
                                {question.status === "Attempted" && (
                                    <span className="text-gray-400">
                                        Attempted
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const LeetCodeDashboard = () => {
    const [activeTab, setActiveTab] = useState('code');
    const [leftPanelWidth, setLeftPanelWidth] = useState(40); // Initial width percentage
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHintModalOpen, setIsHintModalOpen] = useState(false);
    const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
    const [language, setLanguage] = useState('JavaScript');
    const resizeRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    const location = useLocation();
    const problem = location.state?.problem || {
        title: "Two Sum",
        difficulty: "Easy",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
        testCases: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]"
            }
        ]
    };

    // Mock hint and solution content
    const hintContent = `
    <div class="space-y-4">
        <p>Consider using a data structure to store numbers you've already seen.</p>
        <p>For each number, check if its complement (target - current number) already exists in your data structure.</p>
        <p>Hash maps provide O(1) lookup time, which could be helpful here.</p>
    </div>
    `;

    const solutionContent = `
    <div class="space-y-4">
        <h3 class="text-lg font-medium">Approach: Hash Map</h3>
        <p>This problem can be solved efficiently using a hash map:</p>
        <pre class="bg-gray-800 p-4 rounded-md">
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
};</pre>
        <p class="mt-4"><strong>Time Complexity:</strong> O(n) where n is the length of the input array.</p>
        <p><strong>Space Complexity:</strong> O(n) for storing the hash map.</p>
    </div>
    `;

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

    // Handle resize logic
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.preventDefault();
        isDraggingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    interface MouseMoveEvent extends MouseEvent {
        clientX: number;
    }

    const handleMouseMove = (e: MouseMoveEvent): void => {
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
        <div className="flex flex-col h-screen bg-gray-900" ref={containerRef}>
            {/* Header */}
            <header className="bg-gradient-to-r from-violet-700 to-pink-500 text-white px-4 py-3 border-b border-purple-800 flex justify-between items-center">
                <Link
                    to="/questions"
                    className="flex items-center gap-2 text-white hover:text-purple-200 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Problems</span>
                </Link>
                <h1 className="text-xl font-bold text-white hidden md:block">CodeMentor AI</h1>

                {/* <button
                    className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors bg-opacity-50 backdrop-blur-md"
                    onClick={() => setIsModalOpen(true)}
                >
                    <List size={18} />
                    <span>Problem List</span>
                </button> */}
            </header>

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Problem panel (left side) */}
                <div
                    className="bg-gray-800 text-white shadow-md overflow-y-auto border-r border-purple-800"
                    style={{ width: `${leftPanelWidth}%` }}
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${problem.difficulty === "Easy" ? "bg-green-900 text-white" :
                                problem.difficulty === "Medium" ? "bg-yellow-900 text-white" :
                                    "bg-red-900 text-white"
                                }`}>
                                {problem.difficulty}
                            </span>
                        </div>

                        <div className="prose max-w-none text-white">
                            <p className="whitespace-pre-line">{problem.description}</p>

                            <h3 className="font-medium mt-6 mb-2 text-white">TestCases:</h3>

                            <div className="mb-4 p-3 bg-gray-900 rounded-md border border-purple-800">
                                <p>Input: {problem.sampleInput}</p>
                                <p>Output: {problem.sampleOutput}</p>

                            </div>

                            <h3 className="font-medium mt-6 mb-2 text-white">Constraints: {problem.constraints}</h3>

                            {/* Hint and Solution Buttons */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    className="flex items-center gap-2 bg-gradient-to-r from-violet-700 to-pink-500 text-white px-4 py-2 rounded transition-colors"
                                    onClick={() => setIsHintModalOpen(true)}
                                >
                                    <Lightbulb size={18} />
                                    <span>Hint</span>
                                </button>

                                <button
                                    className="flex items-center gap-2 bg-gradient-to-r from-violet-700 to-pink-500 text-white px-4 py-2 rounded transition-colors"
                                    onClick={() => setIsSolutionModalOpen(true)}
                                >
                                    <BookOpen size={18} />
                                    <span>Solution</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resizable divider */}
                <div
                    ref={resizeRef}
                    className="cursor-col-resize w-2 bg-gradient-to-b from-violet-700 to-pink-500 hover:opacity-80 active:opacity-70 transition-opacity"
                    onMouseDown={handleMouseDown}
                    style={{ cursor: 'col-resize' }}
                ></div>

                {/* Code panel (right side) */}
                <div
                    className="flex flex-col bg-gray-900"
                    style={{ width: `${100 - leftPanelWidth}%` }}
                >
                    {/* Tabs navigation */}
                    <div className="flex border-b border-purple-800 bg-gray-900">
                        <button
                            className={`px-4 py-3 flex items-center gap-1 font-medium ${activeTab === 'code' ? 'text-white border-b-2 border-pink-500' : 'text-gray-400'}`}
                            onClick={() => setActiveTab('code')}
                        >
                            <Code size={18} />
                            Code
                        </button>
                        <button
                            className={`px-4 py-3 flex items-center gap-1 font-medium ${activeTab === 'result' ? 'text-white border-b-2 border-pink-500' : 'text-gray-400'}`}
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
                                <div className="bg-gray-900 text-white p-3 flex justify-between items-center border-b border-purple-800">
                                    <div className="flex items-center gap-2">
                       
                                        <select
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                            className="bg-gray-800 text-white text-sm px-2 py-1 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        >
                                            <option value="JavaScript">JavaScript</option>
                                            <option value="Java">Java</option>
                                            <option value="Python">Python</option>
                                        </select>
                                    </div>

                                    <button className="bg-gradient-to-r from-violet-700 to-pink-500 text-white hover:opacity-90 px-4 py-1 rounded flex items-center gap-1">
                                        <PlayCircle size={16} />
                                        Run
                                    </button>
                                </div>
                                <div className="flex-1 bg-gray-900 p-4 overflow-y-auto">
                                    <textarea
                                        className="w-full h-full bg-gray-900 text-white font-mono resize-none outline-none border border-purple-800 p-3 rounded"
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
                                    <span className="font-medium text-white">All Tests Passed</span>
                                </div>
                                <pre className="font-mono text-white whitespace-pre-wrap bg-gray-800 p-4 rounded-md border border-purple-800">{result}</pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Question List Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Problems"
            >
                <QuestionTable />
            </Modal>

            {/* Hint Modal */}
            <Modal
                isOpen={isHintModalOpen}
                onClose={() => setIsHintModalOpen(false)}
                title="Hint"
            >
                <div dangerouslySetInnerHTML={{ __html: hintContent }} className="text-white" />
            </Modal>

            {/* Solution Modal */}
            <Modal
                isOpen={isSolutionModalOpen}
                onClose={() => setIsSolutionModalOpen(false)}
                title="Solution"
            >
                <div dangerouslySetInnerHTML={{ __html: solutionContent }} className="text-white" />
            </Modal>
        </div>
    );
};

export default LeetCodeDashboard;