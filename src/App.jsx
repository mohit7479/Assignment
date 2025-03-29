import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ConfigPage from "./pages/Config_Page";
import OutputPage from "./pages/Output_page";
import { Button } from "./components/ui/Button";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center">
        Dynamic Button Workflow App
      </h1>
      <p className="text-center text-muted-foreground max-w-md">
        Create custom button workflows with sequential actions and see them in
        action.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/config">
          <Button size="lg" className="w-full sm:w-auto">
            Configure Workflow
          </Button>
        </Link>
        <Link to="/output">
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Run Workflow
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default App;
