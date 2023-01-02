import { Route, Routes } from "react-router-dom";
// import reactLogo from "./assets/react.svg";
import MultiStepForm from "./components/0/MultiStepForm";
import LifeCompare from "./components/1/LifeCompare";

function App() {
    return (
        <Routes>
            <Route path="/LifeCompare" element={<LifeCompare />} />
            <Route path="/life" element={<MultiStepForm />} />
        </Routes>
    );
}

export default App;
