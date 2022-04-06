import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../../../app/api/users/usersApi";
import Post from "../../../models/posts/post.model";
import { makeFirstLetterUpperCase } from "../utils/utils";

interface PostComponentProps {
  children: Post;
}

const PostComponent = ({ children: post }: PostComponentProps) => {
  const { data: owner } = useGetUserByIdQuery(post.userId);
  const [isExtended, setIsExtended] = useState(false);
  const [isProfilePage, setIsProfilePage] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/posts")) {
      setIsExtended(true);
    }

    if (location.pathname.includes(`/profiles/${owner?.id}`)) {
      setIsProfilePage(true);
    }
  }, []);

  const navigateToOwnersProfile = () => {
    return () => {
      navigate(`../profiles/${owner?.id}`, {
        replace: false,
        state: { data: location },
      });
    };
  };

  const navigateToExtendedPost = () => {
    return () => {
      navigate(`../posts/${post.id}`, {
        replace: false,
        state: { data: location },
      });
    };
  };

  return (
    <div key={post.id} className={isExtended ? "post reversed" : "post"}>
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
        <h3 className="post-title">{makeFirstLetterUpperCase(post.title)}</h3>
        <p>{post.body}</p>
      </div>
      <div hidden={isProfilePage} className="post-footer">
        <small>written by </small>
        <button className="owner-btn" onClick={navigateToOwnersProfile()}>
          {owner?.username}
        </button>
      </div>
    </div>
  );
};

export default PostComponent;
