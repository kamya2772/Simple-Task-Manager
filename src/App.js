import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import Display from "./components/Display.js";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register.js";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/form" element={<Register />}></Route>
        <Route path="/display" element={<Display />}></Route>
      </Routes>
    </>
  );
}

export default App;
