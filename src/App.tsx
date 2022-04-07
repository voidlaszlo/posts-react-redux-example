import { Route, Routes } from "react-router-dom";
import { useGetPostsQuery } from "./api/postsApi";
import { useLoginQuery } from "./api/usersApi";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Header from "./components/Header";
import ExtendedPostComponent from "./components/ExtendedPostComponent";
import PostComponentContainer from "./components/PostComponentContainer";
import UserPage from "./components/UserPage";
import { setCurrentUser } from "./features/currentUserSlice";
import "./app.css";

function App() {
  const dispatch = useAppDispatch();
  const { data: user } = useLoginQuery();
  const { data: posts } = useGetPostsQuery();

  if (user) {
    dispatch(setCurrentUser(user));
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/profiles/:id" element={<UserPage />} />
        <Route path="/posts/:id" element={<ExtendedPostComponent />} />
        <Route
          path="/"
          element={
            posts ? (
              <PostComponentContainer posts={posts} />
            ) : (
              <p>Loading posts...</p>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
