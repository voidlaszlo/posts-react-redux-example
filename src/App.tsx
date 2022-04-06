import { Route, Routes } from "react-router-dom";
import { useGetPostsQuery } from "./app/api/posts/postsApi";
import { useLoginQuery } from "./app/api/users/usersApi";
import { useAppDispatch, useAppSelector } from "./app/hooks/hooks";
import Header from "./components/header/Header";
import ExtendedPostComponent from "./components/posts/extendedPostComponent/ExtendedPostComponent";
import PostComponentContainer from "./components/posts/postComponentContainer/PostComponentContainer";
import UserPage from "./components/users/userPage/UserPage";
import { setCurrentUser } from "./features/users/currentUserSlice";
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
