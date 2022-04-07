import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useGetPostsQuery } from "./api/postsApi";
import { useLoginQuery } from "./api/usersApi";
import Header from "./components/Header";
import Loading from "./components/helpers/Loading";
import "./css/app.css";
import { setCurrentUser } from "./features/currentUserSlice";
import { useAppDispatch } from "./hooks/hooks";

const UserPage = lazy(() => import("./pages/UserPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const PostsPage = lazy(() => import("./pages/PostsPage"));

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
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/profiles/:id" element={<UserPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route
            path="/"
            element={posts ? <PostsPage posts={posts} /> : <Loading />}
          />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
