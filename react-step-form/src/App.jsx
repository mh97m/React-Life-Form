import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
import MultiStepForm from "./components/0/MultiStepForm";
import lifeCompare from "./components/1/lifeCompare";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path='/' element={<MultiStepForm />} />
      <Route path='/lifeCompare' element={<lifeCompare />} />
    </Routes>
  );
}

export default App;
