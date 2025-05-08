import React from "react";
<<<<<<< HEAD
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

=======
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
>>>>>>> tejas
import LandingPage from "./pages/LandingPage/LandingPage";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import QuestionTable from "./pages/Ques/QuestionTable";
import QuestionDetails from "./pages/Ques/QuestionDetail";
import MyProfile from "./pages/MyProfile";
import { SignIn, SignUp } from "@clerk/clerk-react";



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD

=======
        {/* Public route */}
>>>>>>> tejas
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />

<<<<<<< HEAD


        <Route
          path="/dashboard/*"
          element={
            <>
              <SignedIn>
                <DashboardLayout />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/my-profile"
          element={
            <>
              <SignedIn>
                <MyProfile />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/questions"
          element={
            <>
              <SignedIn>
                <QuestionTable />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <>
              <SignedIn>
                <QuestionDetails />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* Catch-all */}
=======
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
>>>>>>> tejas
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
