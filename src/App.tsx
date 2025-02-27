import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SimpleInfiniteScroll from "./pages/SimpleInfiniteScroll";
import VirtualizedInfiniteScroll from "./pages/VirtualizedInfiniteScroll"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simple" element={<SimpleInfiniteScroll />} />
        <Route path="/virtualized" element={<VirtualizedInfiniteScroll />} />
      </Routes>
    </Router>
  );
};

export default App;
