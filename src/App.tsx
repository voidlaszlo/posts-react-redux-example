import React, { useEffect } from "react";
import { useLoginQuery } from "./api/usersApi";
import { setUser } from "./features/userSlice";
import { useAppDispatch } from "./hooks/hooks";
import Home from "./pages/Home";

function App() {
  const { data: user } = useLoginQuery("3");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch, user]);

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
