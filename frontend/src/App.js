import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from "./utils/Themes.js";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserDataProvider } from "./data/UserDataContext";
import Login from "./components/Login/Login.jsx";
import Dashboard from "./components/Admin/pages/Dashboard.jsx";
import EducationPage from "./components/Admin/pages/Education.jsx";
import ExperiencePage from "./components/Admin/pages/Experience.jsx";
import ProfilePage from "./components/Admin/pages/Profile.jsx";
import ProjectsPage from "./components/Admin/pages/Projects.jsx";
import SkillsPage from "./components/Admin/pages/Skills.jsx";
import TimelinePage from "./components/Admin/pages/Timeline.jsx";
import Home from "./components/Home/Home.jsx";
import Protected from "./components/Admin/Protected.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <UserDataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/account"
              element={<Protected Component={Dashboard} />}
            />
            <Route
              path="/education"
              element={<Protected Component={EducationPage} />}
            />
            <Route
              path="/experience"
              element={<Protected Component={ExperiencePage} />}
            />
            <Route
              path="/profile"
              element={<Protected Component={ProfilePage} />}
            />
            <Route
              path="/projects"
              element={<Protected Component={ProjectsPage} />}
            />
            <Route
              path="/skills"
              element={<Protected Component={SkillsPage} />}
            />
            <Route
              path="/timeline"
              element={<Protected Component={TimelinePage} />}
            />
          </Routes>
        </Router>
      </UserDataProvider>
    </ThemeProvider>
  );
}

export default App;
