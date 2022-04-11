import React, { useState } from "react";
import { usePostMutation } from "../api/postsApi";
import { selectUser } from "../features/userSlice";
import { useAppSelector } from "../hooks/hooks";
import Post from "../models/Post";

const NewPost: React.FC = () => {
  const user = useAppSelector(selectUser);
  const [post, result] = usePostMutation();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setBody(e.target.value);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let date = new Date();
    let dateString = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

    let posty: Partial<Post> = user
      ? {
          likes: [],
          replies: 0,
          views: 0,
          author: {
            name: user.name,
            imageUrl: user.imageUrl,
            href: user.href,
          },
          date: dateString,
          datetime: date.toISOString(),
          title,
          body,
        }
      : {};

    await post(posty);
    setTitle("");
    setBody("");
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form className="relative" onSubmit={onSubmit}>
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-500">
            <label htmlFor="title" className="sr-only">
              Write a title
            </label>
            <input
              name="title"
              id="title"
              value={title}
              onChange={onTitleChange}
              className="block w-full py-3 px-3 border-0 border-b-2 border-gray-100 focus:ring-0 sm:text-sm"
              placeholder="Write your title"
            />
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              value={body}
              onChange={onBodyChange}
              className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
              placeholder="Add your comment..."
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2 bg-white" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-end">
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
