import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import reactLogo from "./assets/react.svg";
import { FormContext } from "./Contexts/FormContext";
import MultiStepForm from "./components/0/MultiStepForm";
import LifeCompare from "./components/1/LifeCompare";
import ErrorPage from "./components/ErrorPage";

function App() {
    const AppContext = React.createContext();
    return (
        <FormContext.Provider value="">
            <Router>
                <nav className="d-flex justify-contents-between">
                    <Link to="/" className="life-compare-button">
                        first Page
                    </Link>
                    <Link to="/life-compare" className="life-compare-button">
                        Second Page
                    </Link>
                    <hr className="border border-dark"></hr>
                </nav>
                <Routes>
                    <Route path="/" element={<MultiStepForm />} />
                    <Route path="/life-compare" element={<LifeCompare />} />
                    <Route path='*' element={<ErrorPage/>} />
                </Routes>
            </Router>
        </FormContext.Provider>
    );
}

export default App;
