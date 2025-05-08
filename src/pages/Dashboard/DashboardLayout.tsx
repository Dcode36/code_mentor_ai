import { useState, useRef, useEffect } from 'react';
import { CheckCircle, Code, PlayCircle, Terminal, ArrowLeft, List, X, Heart, BookOpen, BookMarked, Copy, Save, Lightbulb } from 'lucide-react';
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
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-gray-900 text-white rounded-lg w-4/5 max-w-4xl max-h-5/6 flex flex-col border border-pink-600 shadow-lg shadow-pink-800/30">
                <div className="flex justify-between items-center border-b border-pink-800 p-4 bg-gradient-to-r from-purple-900 to-pink-900">
                    <h2 className="text-xl font-bold text-pink-200">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="text-pink-300 hover:text-pink-100 transition-colors"
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

interface Question {
    id: number;
    title: string;
    difficulty: string;
    acceptance: string;
    status: string;
}

// Enhanced QuestionTable component
const QuestionTable = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch("https://codementor-backend.vercel.app/api/questions");
                const data = await res.json();
                setQuestions(data);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 w-32 bg-pink-800 rounded mb-4"></div>
                    <div className="h-2 w-48 bg-purple-800 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-pink-900 bg-gradient-to-r from-purple-900/40 to-pink-900/40">
                        <th className="py-3 px-4 text-left text-pink-300 font-semibold">ID</th>
                        <th className="py-3 px-4 text-left text-pink-300 font-semibold">Title</th>
                        <th className="py-3 px-4 text-left text-pink-300 font-semibold">Difficulty</th>
                        <th className="py-3 px-4 text-left text-pink-300 font-semibold">Acceptance</th>
                        <th className="py-3 px-4 text-left text-pink-300 font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => (
                        <tr key={question.id} className="border-b border-purple-900/50 hover:bg-gradient-to-r hover:from-purple-900/30 hover:to-pink-900/30 transition-colors">
                            <td className="py-3 px-4 text-pink-200">{question.id}</td>
                            <td className="py-3 px-4 text-pink-100 font-medium">{question.title}</td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    question.difficulty === "Easy" ? "bg-gradient-to-r from-green-800 to-green-700 text-green-200" :
                                    question.difficulty === "Medium" ? "bg-gradient-to-r from-yellow-800 to-yellow-700 text-yellow-200" :
                                    "bg-gradient-to-r from-red-800 to-red-700 text-red-200"
                                }`}>
                                    {question.difficulty}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-pink-200">{question.acceptance}</td>
                            <td className="py-3 px-4">
                                {question.status === "Solved" && (
                                    <span className="text-green-400 flex items-center gap-1">
                                        <CheckCircle size={16} />
                                        Solved
                                    </span>
                                )}
                                {question.status === "Attempted" && (
                                    <span className="text-yellow-400 flex items-center gap-1">
                                        <PlayCircle size={16} />
                                        Attempted
                                    </span>
                                )}
                                {!question.status && (
                                    <span className="text-gray-400">--</span>
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
    const [isFavorite, setIsFavorite] = useState(false);
    const [language, setLanguage] = useState('JavaScript');
    const [showHint, setShowHint] = useState(false);
    const resizeRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    const location = useLocation();
    const problem = location.state?.problem || {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
        sampleInput: "nums = [2,7,11,15], target = 9",
        sampleOutput: "[0,1]",
        constraints: "2 <= nums.length <= 104\n-109 <= nums[i] <= 109\n-109 <= target <= 109\nOnly one valid answer exists."
    };

    // Demo code
    const [code, setCode] = useState(`function twoSum(nums, target) {
    // Create a map to store values and their indices
    const map = new Map();
    
    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
        // Calculate the complement value we need to find
        const complement = target - nums[i];
        
        // Check if we've seen the complement before
        if (map.has(complement)) {
            // If found, return both indices
            return [map.get(complement), i];
        }
        
        // Store current value and its index
        map.set(nums[i], i);
    }
    
    // Return empty array if no solution
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

✓ Test Case 3 Passed
Input: nums = [3,3], target = 6
Output: [0,1]
Expected: [0,1]

Runtime: 65 ms, faster than 92.36% of JavaScript submissions
Memory: 42.1 MB, less than 74.58% of JavaScript submissions`;

    const hint = "Consider using a hash map to store values and their indices. For each element, check if its complement (target - current value) exists in the map. This approach gives us O(n) time complexity.";

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

    const copyCode = () => {
        navigator.clipboard.writeText(code).then(() => {
            // Could add toast notification here
            console.log('Code copied to clipboard');
        });
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900" ref={containerRef}>
            {/* Header with gradient */}
            <header className="bg-gradient-to-r from-purple-900 to-pink-900 text-white px-4 py-3 border-b border-pink-700 flex justify-between items-center shadow-md">
                <Link
                    to="/questions"
                    className="flex items-center gap-2 text-pink-200 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back to Problems</span>
                </Link>
                <h1 className="text-xl font-bold text-pink-100 hidden md:block">CodeMentor AI</h1>
                
                <div className="flex items-center gap-3">
                    <button 
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${isFavorite ? 'text-pink-400' : 'text-gray-400'} hover:bg-pink-800/30 transition-colors`}
                        onClick={toggleFavorite}
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                    
                    <button 
                        className="flex items-center gap-2 bg-pink-700 text-white hover:bg-pink-600 px-4 py-2 rounded-md transition-colors shadow-lg shadow-pink-900/30"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <List size={18} />
                        <span>Problem List</span>
                    </button>
                </div>
            </header>

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Problem panel (left side) - Dark background with purple/pink accents */}
                <div 
                    className="bg-gray-900 text-white shadow-md overflow-y-auto border-r border-pink-900/50" 
                    style={{ width: `${leftPanelWidth}%` }}
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{problem.title}</h1>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                problem.difficulty === "Easy" ? "bg-gradient-to-r from-green-800 to-green-700 text-green-200" :
                                problem.difficulty === "Medium" ? "bg-gradient-to-r from-yellow-800 to-yellow-700 text-yellow-200" :
                                "bg-gradient-to-r from-red-800 to-red-700 text-red-200"
                            }`}>
                                {problem.difficulty}
                            </span>
                        </div>

                        <div className="prose max-w-none text-gray-300">
                            <p className="whitespace-pre-line">{problem.description}</p>

                            <div className="mt-6 mb-4 border-l-4 border-pink-700 pl-4 bg-gray-800/50 p-3 rounded-r-md">
                                <h3 className="font-medium mb-2 text-pink-300">Example:</h3>
                                <div className="font-mono text-sm bg-gray-800 p-3 rounded-md">
                                    <p><span className="text-pink-400">Input:</span> {problem.sampleInput}</p>
                                    <p><span className="text-pink-400">Output:</span> {problem.sampleOutput}</p>
                                </div>
                            </div>

                            <div className="mt-6 border p-4 border-purple-800/50 rounded-md bg-purple-900/10">
                                <h3 className="font-medium mb-2 text-pink-300">Constraints:</h3>
                                <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">{problem.constraints}</pre>
                            </div>
                            
                            {showHint && (
                                <div className="mt-6 p-4 bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-md border border-pink-800/30">
                                    <h3 className="flex items-center gap-2 font-medium mb-2 text-pink-300">
                                        <Lightbulb size={18} className="text-pink-400" />
                                        Hint:
                                    </h3>
                                    <p className="text-gray-300">{hint}</p>
                                </div>
                            )}
                            
                            <div className="mt-6">
                                <button 
                                    className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-all"
                                    onClick={() => setShowHint(!showHint)}
                                >
                                    <Lightbulb size={18} />
                                    {showHint ? "Hide Hint" : "Show Hint"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resizable divider with animation */}
                <div 
                    ref={resizeRef}
                    className="cursor-col-resize w-1 bg-gradient-to-b from-purple-700 via-pink-700 to-purple-700 hover:w-2 active:bg-pink-500 transition-all duration-200 flex items-center justify-center"
                    onMouseDown={handleMouseDown}
                    style={{ cursor: 'col-resize' }}
                >
                    <div className="h-8 w-1 rounded-full bg-pink-400/70 opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Code panel (right side) */}
                <div 
                    className="flex flex-col bg-gray-900"
                    style={{ width: `${100 - leftPanelWidth}%` }}
                >
                    {/* Tabs navigation with gradient */}
                    <div className="flex border-b border-pink-900/50 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
                        <button
                            className={`px-4 py-3 flex items-center gap-2 font-medium transition-all ${activeTab === 'code' ? 'text-pink-300 border-b-2 border-pink-500 bg-gray-900/30' : 'text-gray-400 hover:text-pink-200 hover:bg-gray-800/30'}`}
                            onClick={() => setActiveTab('code')}
                        >
                            <Code size={18} />
                            Code
                        </button>
                        <button
                            className={`px-4 py-3 flex items-center gap-2 font-medium transition-all ${activeTab === 'result' ? 'text-pink-300 border-b-2 border-pink-500 bg-gray-900/30' : 'text-gray-400 hover:text-pink-200 hover:bg-gray-800/30'}`}
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
                                <div className="bg-gray-900 text-white p-3 flex justify-between items-center border-b border-pink-900/50">
                                    <div className="flex gap-2 items-center">
                                        <select 
                                            className="bg-gray-800 text-pink-200 border border-purple-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                        >
                                            <option value="JavaScript">JavaScript</option>
                                            <option value="Python">Python</option>
                                            <option value="Java">Java</option>
                                            <option value="C++">C++</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            className="bg-gray-800 text-pink-300 hover:bg-gray-700 px-3 py-1 rounded flex items-center gap-1 transition-colors border border-gray-700"
                                            onClick={copyCode}
                                        >
                                            <Copy size={14} />
                                            Copy
                                        </button>
                                        <button 
                                            className="bg-gray-800 text-pink-300 hover:bg-gray-700 px-3 py-1 rounded flex items-center gap-1 transition-colors border border-gray-700"
                                        >
                                            <Save size={14} />
                                            Save
                                        </button>
                                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-1 rounded-md flex items-center gap-1 transition-colors shadow-md shadow-pink-900/20">
                                            <PlayCircle size={16} />
                                            Run
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 bg-gray-900 p-4 overflow-y-auto">
                                    <textarea
                                        className="w-full h-full bg-gray-900 text-pink-100 font-mono resize-none outline-none focus:ring-1 focus:ring-pink-600 rounded-md p-2 border border-gray-800"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        spellCheck="false"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'result' && (
                            <div className="h-full bg-gray-900 text-white p-6 overflow-y-auto">
                                <div className="flex items-center gap-2 mb-4 p-3 bg-green-900/20 border border-green-800/30 rounded-md">
                                    <CheckCircle className="text-green-400" size={20} />
                                    <span className="font-medium text-green-300">All Tests Passed</span>
                                </div>
                                <pre className="font-mono text-pink-100 whitespace-pre-wrap bg-gray-800 p-4 rounded-md border border-gray-700/50 shadow-inner">{result}</pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Enhanced Question List Modal */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title="Problems List"
            >
                <QuestionTable />
            </Modal>
        </div>
    );
};

export default LeetCodeDashboard;