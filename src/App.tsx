import React from "react";
import { AppBar } from "@mui/material";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { LanguageSwitcher } from "./Components/LanguageSwitcher";
import { HomePage } from "./Pages/Home";
import { TestPage } from "./Pages/Test";
import { LanguageProvider } from "./Providers/LanguageProvider";
import { WordsProvider } from "./Providers/WordsProvider";

// Main component in application. Here we have all provider warappers and routing logic.
// In case if we go into more routes or will have some conditional routing (auth or smth) - we should take it out to separate components
function App() {
  return (
    <LanguageProvider>
      <WordsProvider>
        <Router>
          <AppBar position="fixed" color="default">
            <LanguageSwitcher />
          </AppBar>
          <Routes>
            <Route path="/test" element={<TestPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </WordsProvider>
    </LanguageProvider>
  );
}

export default App;
