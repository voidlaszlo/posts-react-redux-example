import React, { lazy } from "react";
import { useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery } from "../api/postsApi";
import { useGetUserByIdQuery } from "../api/usersApi";
import Loading from "../components/helpers/Loading";
import "../css/userPage.styles.css";
import { getFirstChars, splitStringAtSpace } from "../utils";

const PostsPage = lazy(() => import("./PostsPage"));
const UserAddress = lazy(() => import("../components/UserAddress"));
const UserCompany = lazy(() => import("../components/UserCompany"));

const UserPage = () => {
  let params = useParams();
  const { data: user } = useGetUserByIdQuery(Number(params.id));
  const { data: posts } = useGetPostsByUserIdQuery(user?.id);
  const monogram = getFirstChars(splitStringAtSpace(user?.name));

  return (
    <>
      <h3 className="section-title">Profile</h3>
      <div className="card">
        <div className="card-header">
          <div className="user-avatar">
            <h2>{monogram}</h2>
          </div>
          <div>
            <h2>{user?.username}</h2>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="card-body">
          <div className="box user-info">
            <div>
              <small>Name</small>
              <p>{user?.name}</p>
            </div>
            <div>
              <small>Phone</small>
              <p>{user?.phone}</p>
            </div>
          </div>
          <React.Suspense fallback={<Loading />}>
            <UserAddress address={user?.address} />
            <UserCompany company={user?.company} />
          </React.Suspense>
        </div>
        {posts && <PostsPage posts={posts} />}
      </div>
    </>
  );
};

export default UserPage;
