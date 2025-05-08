import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import LandingPage from "./pages/LandingPage/LandingPage";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import QuestionTable from "./pages/Ques/QuestionTable";
import QuestionDetails from "./pages/Ques/QuestionDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Routes (Only accessible when signed in) */}
        <Route
          path="/dashboard/*"
          element={
            <SignedIn>
              <DashboardLayout />
            </SignedIn>
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
          path="/quesdesc/:id"
          element={
            <SignedIn>
              <QuestionDetails />
            </SignedIn>
          }
        />

        {/* Redirect unauthenticated users */}
        <Route
          path="/dashboard/*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
        <Route
          path="/questions"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
        <Route
          path="/quesdesc/:id"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
