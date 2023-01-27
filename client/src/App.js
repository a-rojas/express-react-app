import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import Home from "./pages/Home";
import Animal from "./pages/Animal";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/animal' element={<Animal/>} />
          <Route path='/animal/:id' element={<Animal/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
