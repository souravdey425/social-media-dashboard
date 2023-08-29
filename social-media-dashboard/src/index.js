import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ClerkProvider, RedirectToSignIn, SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Home from "./components/Home";
import TopUpModal from "./components/TopUpModal";
import PaymentForm from "./components/PaymentForm";

import "./index.css"


if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById("root"));



const ClerkWithRoutes = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/sign-in/*"
          element={
          <div className="flex items-center justify-center h-full"><SignIn redirectUrl={'/home'} routing="path" path="/sign-in" /> </div>}
        />
        <Route
          path="/sign-up/*"
          element={
            <div className="flex items-center justify-center h-full"><SignUp redirectUrl={'/home'} routing="path" path="/sign-up" /></div>}
        />
        <Route
          path="/home"
          element={
            <>
            <SignedIn>
              <Home />
              <TopUpModal/>
             
              
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
            </>
          }
        />
        <Route path="/pay" element={<PaymentForm/>}/>
      </Routes>
    </ClerkProvider>
  );
};


root.render(

  <React.StrictMode>
  <div className="bg-primary min-h-screen">
    <BrowserRouter>
      <ClerkWithRoutes />
    </BrowserRouter>
    </div>
  </React.StrictMode>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();