import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Code, Brain, Trophy, BarChart2, BookOpen, Users, BugIcon, Clock } from 'lucide-react'; 

interface PerformanceProps {
    code: string;
    language: string;
}

const Performance: React.FC<PerformanceProps> = ({ code, language }) => {
    const [apiResponse, setApiResponse] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPerformance = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.post(
                    'https://codementor-backend.vercel.app/api/gemini/rate-user-code',
                    {
                        code,
                        language,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setApiResponse(response.data);
            } catch (err) {
                setError('Failed to fetch performance data');
            } finally {
                setLoading(false);
            }
        };

        fetchPerformance();
    }, [code, language]);

    return (


        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin border-t-4 border-violet-400 w-16 h-16 border-solid rounded-full"></div>
                </div>
            ) : error ? (
                <p className="text-red-500 text-center text-lg">{error}</p>
            ) : (
                apiResponse && (

                    <div className="max-w-4xl mx-auto  p-6 rounded-lg shadow-lg">
                        <h1 className="text-4xl font-bold text-center mb-6 text-violet-400">Code Performance</h1>
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold">
                                <span className="bg-violet-400 text-white py-1 px-4 rounded-full">
                                    Performance Score: {apiResponse.analysis.score}
                                </span>
                            </h2>
                        </div>

                        <div className="mb-4">
                            <p className="text-lg font-semibold text-violet-400 flex gap-1"><Code/> Code Quality:</p>
                            <p className="text-white-700">{apiResponse.analysis.codeQuality}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-lg font-semibold text-violet-400 flex gap-1"><Clock/> Time Complexity:</p>
                            <p className="text-white-700">{apiResponse.analysis.timeComplexity || 'N/A'}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-lg font-semibold text-violet-400 flex gap-1"><Trophy/> Space Complexity:</p>
                            <p className="text-white-700">{apiResponse.analysis.spaceComplexity || 'N/A'}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-lg font-semibold text-violet-400 flex gap-1"><BugIcon/> Bugs or Issues:</p>
                            <p className="text-white-700">{apiResponse.analysis.bugsOrIssues}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-lg font-semibold text-violet-400 flex gap-1 "><BookOpen/> Scope of Improvement:</p>
                            <p className="text-white-700">{apiResponse.analysis.scopeOfImprovement}</p>
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default Performance;
