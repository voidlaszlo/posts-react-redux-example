import {
  ChatAltIcon,
  EyeIcon,
  ShareIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import { useUpdateMutation } from "../../api/postsApi";
import Post from "../../models/Post";
import PostCardMenu from "./PostCardMenu";
import { like } from "./postsUtils";

interface Props {
  post: Post;
  userId: number;
}

const PostCard: React.FC<Props> = (props: Readonly<Props>) => {
  const { post, userId } = props;
  const [update] = useUpdateMutation();

  const handleLike = (post: Post, userId: number) => {
    update(like(post, userId));
  };

  return (
    <>
      <li
        key={post.id}
        className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg"
      >
        <article aria-labelledby={"post-title-" + post.id}>
          <div>
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={post.author.imageUrl}
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  <Link to={post.author.href} className="hover:underline">
                    {post.author.name}
                  </Link>
                </p>
                <p className="text-sm text-gray-500">
                  <time dateTime={post.datetime}>{post.date}</time>
                </p>
              </div>
              <PostCardMenu />
            </div>
            <h2
              id={"post-title-" + post.id}
              className="mt-4 text-base font-medium text-gray-900"
            >
              {post.title}
            </h2>
          </div>
          <div
            className="mt-2 text-sm text-gray-700 space-y-4"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
          <div className="mt-6 flex justify-between space-x-8">
            <div className="flex space-x-6">
              <span className="inline-flex items-center text-sm">
                <button
                  type="button"
                  onClick={() => handleLike(post, userId)}
                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                >
                  <ThumbUpIcon
                    //text-rose-500
                    className={`h-5 w-5 ${
                      post.likes.includes(userId) ? "text-rose-500" : ""
                    }`}
                    aria-hidden="true"
                  />
                  <span className="font-medium text-gray-900">
                    {post.likes.length}
                  </span>
                  <span className="sr-only">likes</span>
                </button>
              </span>
              <span className="inline-flex items-center text-sm">
                <button
                  type="button"
                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                >
                  <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium text-gray-900">
                    {post.replies}
                  </span>
                  <span className="sr-only">replies</span>
                </button>
              </span>
              <span className="inline-flex items-center text-sm">
                <button
                  type="button"
                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                >
                  <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium text-gray-900">
                    {post.views}
                  </span>
                  <span className="sr-only">views</span>
                </button>
              </span>
            </div>
            <div className="flex text-sm">
              <span className="inline-flex items-center text-sm">
                <button
                  type="button"
                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                >
                  <ShareIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium text-gray-900">Share</span>
                </button>
              </span>
            </div>
          </div>
        </article>
      </li>
    </>
  );
};

export default PostCard;
