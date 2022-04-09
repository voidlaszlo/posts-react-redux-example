import React, { useEffect, useState } from "react";
import { useLoginQuery } from "./api/usersApi";
import Loading from "./components/helpers/Loading";
import { setUser } from "./features/userSlice";
import { useAppDispatch } from "./hooks/hooks";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

function App() {
  // TODO: should be in login
  const dispatch = useAppDispatch();
  const { data: user } = useLoginQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
      setIsLoggedIn(true);
    }
  }, [dispatch, user]);

  return (
    <div>
      <React.Suspense fallback={<Loading />}>
        {isLoggedIn ? <Home /> : <LoginPage />}
      </React.Suspense>
    </div>
  );
}

export default App;
