import { useState, useEffect } from "react";
import Login from "./components/Login";
import Niversario from "./components/Niversario";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("naiely_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setCheckedAuth(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("naiely_auth", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("naiely_auth");
    setIsAuthenticated(false);
  };

  if (!checkedAuth) return null; 

  return (
    <div className="min-h-screen bg-[#05020a] text-white overflow-hidden font-sans selection:bg-pink-500/30">
      {isAuthenticated ? (
        <Niversario onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}