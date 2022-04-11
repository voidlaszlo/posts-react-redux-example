import React from "react";
import { selectProfile } from "./features/profiles/profileSlice";
import { useAppSelector } from "./hooks/hooks";
import Home from "./features/common/Home";
import LoginPage from "./features/common/LoginPage";

function App() {
  const profile = useAppSelector(selectProfile);

  return profile ? <Home /> : <LoginPage />;
}

export default App;
