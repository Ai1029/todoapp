import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lists from "./pages/Lists";
import Eachlist from "./pages/Eachlist";
import Edit from "./pages/Edit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lists />}></Route>
          <Route path="/eachlist/:id" element={<Eachlist />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
