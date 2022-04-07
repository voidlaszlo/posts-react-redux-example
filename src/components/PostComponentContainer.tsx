import Post from "../models/Post";
import "../css/postComponent.css";
import PostComponent from "./PostComponent";
import React from "react";

interface PostComponentContainerProps {
  posts: Post[];
}

const PostComponentContainer = ({ posts }: PostComponentContainerProps) => {
  return (
    <div className="post-container">
      <h3 className="section-title">Posts</h3>
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <PostComponent>{post}</PostComponent>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PostComponentContainer;
