import { useState, useRef, useEffect } from 'react';
import { CheckCircle, Code, PlayCircle, Terminal, ArrowLeft, List, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Modal component for the QuestionTable
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-black text-white rounded-lg w-4/5 max-w-4xl max-h-5/6 flex flex-col">
                <div className="flex justify-between items-center border-b border-gray-800 p-4">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto flex-1">
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
                    <tr className="border-b border-gray-800">
                        <th className="py-3 px-4 text-left text-white">ID</th>
                        <th className="py-3 px-4 text-left text-white">Title</th>
                        <th className="py-3 px-4 text-left text-white">Difficulty</th>
                        <th className="py-3 px-4 text-left text-white">Acceptance</th>
                        <th className="py-3 px-4 text-left text-white">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => (
                        <tr key={question.id} className="border-b border-gray-800 hover:bg-gray-900">
                            <td className="py-3 px-4">{question.id}</td>
                            <td className="py-3 px-4 text-white">{question.title}</td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                    question.difficulty === "Easy" ? "bg-gray-700 text-white" :
                                    question.difficulty === "Medium" ? "bg-gray-600 text-white" :
                                    "bg-gray-800 text-white"
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
    const resizeRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    const location = useLocation();
    const problem = location.state?.problem; // Safe access
  
    if (!problem) {
      return <div>Problem not found. Please try again.</div>;
    }

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
        <div className="flex flex-col h-screen bg-black" ref={containerRef}>
            {/* Header */}
            <header className="bg-black text-white px-4 py-3 border-b border-gray-800 flex justify-between items-center">
                <Link
                    to="/questions" // 👈 go to dashboard directly
                    className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Problems</span>
                </Link>
                <h1 className="text-xl font-bold text-white hidden md:block">CodeMentor AI</h1>
                
                <button 
                    className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-4 py-2 rounded transition-colors"
                    onClick={() => setIsModalOpen(true)}
                >
                    <List size={18} />
                    <span>Problem List</span>
                </button>
            </header>

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Problem panel (left side) - Changed to white background */}
                <div 
                    className="bg-white text-black shadow-md overflow-y-auto" 
                    style={{ width: `${leftPanelWidth}%` }}
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold text-black">{problem.title}</h1>
                            <span className="px-3 py-1 bg-gray-200 text-black rounded-full text-sm font-medium">
                                {problem.difficulty}
                            </span>
                        </div>

                        <div className="prose max-w-none text-black">
                            <p className="whitespace-pre-line">{problem.description}</p>

                            <h3 className="font-medium mt-6 mb-2 text-black">TestCases:</h3>
                            {problem.testCases.map((testcase: { input: string; output: string; explanation?: string }, idx:number) => (
                                <div key={idx}>
                                    <p>Input: {testcase.input}</p>
                                    <p>Output: {testcase.output}</p>
                                    {testcase.explanation && <p>Explanation: {testcase.explanation}</p>}
                                </div>
                            ))}

                            <h3 className="font-medium mt-6 mb-2 text-black">Constraints:</h3>
                        </div>
                    </div>
                </div>

                {/* Resizable divider */}
                <div 
                    ref={resizeRef}
                    className="cursor-col-resize w-2 bg-gray-400 hover:bg-gray-300 active:bg-gray-200 transition-colors"
                    onMouseDown={handleMouseDown}
                    style={{ cursor: 'col-resize' }}
                ></div>

                {/* Code panel (right side) */}
                <div 
                    className="flex flex-col"
                    style={{ width: `${100 - leftPanelWidth}%` }}
                >
                    {/* Tabs navigation */}
                    <div className="flex border-b border-gray-800 bg-black">
                        <button
                            className={`px-4 py-3 flex items-center gap-1 font-medium ${activeTab === 'code' ? 'text-white border-b-2 border-white' : 'text-gray-400'}`}
                            onClick={() => setActiveTab('code')}
                        >
                            <Code size={18} />
                            Code
                        </button>
                        <button
                            className={`px-4 py-3 flex items-center gap-1 font-medium ${activeTab === 'result' ? 'text-white border-b-2 border-white' : 'text-gray-400'}`}
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
                                <div className="bg-black text-white p-3 flex justify-between items-center border-b border-gray-800">
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 bg-gray-800 rounded text-sm">JavaScript</span>
                                    </div>
                                    <button className="bg-white text-black hover:bg-gray-200 px-4 py-1 rounded flex items-center gap-1">
                                        <PlayCircle size={16} />
                                        Run
                                    </button>
                                </div>
                                <div className="flex-1 bg-black p-4 overflow-y-auto">
                                    <textarea
                                        className="w-full h-full bg-black text-white font-mono resize-none outline-none"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'result' && (
                            <div className="h-full bg-black text-white p-6 overflow-y-auto">
                                <div className="flex items-center gap-2 mb-4">
                                    <CheckCircle className="text-white" size={20} />
                                    <span className="font-medium text-white">All Tests Passed</span>
                                </div>
                                <pre className="font-mono text-white whitespace-pre-wrap">{result}</pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Question List Modal */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title=" Problems "
            >
                <QuestionTable />
            </Modal>
        </div>
    );
};

export default LeetCodeDashboard;