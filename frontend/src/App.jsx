import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import All from "./pages/All";
import Pending from "./pages/Pending";
import Completed from "./pages/Completed";
import InProgress from "./pages/InProgress";

function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden px-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<All />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/in-progress" element={<InProgress />} />
      </Routes>
    </div>
  );
}

export default App;
