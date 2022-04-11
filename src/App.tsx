import React from "react";
import { selectUser } from "./features/userSlice";
import { useAppSelector } from "./hooks/hooks";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

function App() {
  const user = useAppSelector(selectUser);

  return user ? <Home /> : <LoginPage />;
}

export default App;
