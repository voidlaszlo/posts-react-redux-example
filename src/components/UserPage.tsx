import { useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery } from "../api/posts/postsApi";
import { useGetUserByIdQuery } from "../api/users/usersApi";
import PostComponentContainer from "./PostComponentContainer";
import UserAddress from "./UserAddress";
import UserCompany from "./UserCompany";
import "../css/userPage.styles.css";
import { getFirstChars, splitStringAtSpace } from "../utils";

const UserPage = () => {
  let params = useParams();
  const { data: user } = useGetUserByIdQuery(Number(params.id));
  const { data: posts } = useGetPostsByUserIdQuery(user ? user.id : -1);
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
          <UserAddress address={user?.address} />
          <UserCompany company={user?.company} />
        </div>
        {posts && <PostComponentContainer posts={posts} />}
      </div>
    </>
  );
};

export default UserPage;
