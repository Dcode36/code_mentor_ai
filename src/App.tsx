import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import LandingPage from './pages/LandingPage/LandingPage';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import QuestionTable from './pages/Ques/QuestionTable';
import QuestionDetails from './pages/Ques/QuestionDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page is always accessible */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Routes with redirect to questions */}
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" redirectUrl="/questions" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" redirectUrl="/questions" />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <>
              <SignedIn>
                <DashboardLayout />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          }
        />

<Route
          path="/questions"
          element={
            <SignedIn>
              <QuestionTable />
            </SignedIn>
          }
        />

        <Route
          path="/question/:id"
          element={
            <SignedIn>
              <QuestionDetails />
            </SignedIn>
          }
        />

        {/* Redirect unknown routes to QuestionTable for signed-in users and LandingPage for signed-out users */}
        <Route
          path="*"
          element={
            <>
              <SignedIn>
                <Navigate to="/questions" replace />
              </SignedIn>
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
