import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../api/usersApi";
import Post from "../models/Post";
import User from "../models/User";
import { makeFirstLetterUpperCase } from "../utils";

interface Props {
  post?: Post;
}

const PostCard = ({ post }: Props) => {
  const { data: { username } = {} as User } = useGetUserByIdQuery(post?.userId);
  const [isExtended, setIsExtended] = useState(false);
  const [isProfilePage, setIsProfilePage] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/posts")) {
      setIsExtended(true);
    }

    if (location.pathname.includes(`/profiles/${post?.userId}`)) {
      setIsProfilePage(true);
    }
  }, [location.pathname, post?.userId]);

  const navigateToOwnersProfile = () => () => {
    navigate(`../profiles/${post?.userId}`, {
      replace: false,
      state: { data: location },
    });
  };

  const navigateToExtendedPost = () => () => {
    navigate(`../posts/${post?.id}`, {
      replace: false,
      state: { data: location },
    });
  };

  return (
    <div key={post?.id} className={isExtended ? "post reversed" : "post"}>
      <div className="post-header">
        <button
          className="extended-post-btn"
          hidden={isExtended}
          onClick={navigateToExtendedPost()}
        >
          +
        </button>
      </div>
      <div className="post-body">
        <h3 className="post-title">{makeFirstLetterUpperCase(post?.title)}</h3>
        <p>{post?.body}</p>
      </div>
      <div hidden={isProfilePage} className="post-footer">
        <small>written by </small>
        <button className="owner-btn" onClick={navigateToOwnersProfile()}>
          {username}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
