import ComponentMapper from "../components/helpers/ComponentMapper";
import PostCard from "../components/PostCard";
import "../css/postComponent.css";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Post from "../models/Post";

interface Props {
  posts: Post[];
}

const PostsPage = ({ posts }: Props) => {
  const { current, infiniteScroll } = useInfiniteScroll(posts);

  return (
    <div className="post-container">
      <h3 className="section-title">Posts</h3>
      {infiniteScroll(
        <ComponentMapper
          items={current}
          elementRenderer={(post: Post) => <PostCard post={post} />}
        />
      )}
    </div>
  );
};

export default PostsPage;
