import React from "react";
import { selectUser } from "./features/profiles/profileSlice";
import { useAppSelector } from "./hooks/hooks";
import Home from "./features/common/Home";
import LoginPage from "./features/common/LoginPage";

function App() {
  const user = useAppSelector(selectUser);

  return user ? <Home /> : <LoginPage />;
}

export default App;
