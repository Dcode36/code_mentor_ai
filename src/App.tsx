import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import QuestionTable from "./pages/Ques/QuestionTable";
import { dsaQuestions } from "./pages/Ques/dsaQuestions";
import QuestionDetails from "./pages/Ques/QuestionDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard/*" element={<DashboardLayout/>} />

        {/* Question Table Route */}
        <Route path="/questions" element={<QuestionTable questions={dsaQuestions} />} />
        <Route path="/quesdesc/:id"  element =  {<QuestionDetails/>}/>

        {/* Handle unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
