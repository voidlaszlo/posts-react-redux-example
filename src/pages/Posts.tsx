import { Menu, Transition } from "@headlessui/react";
import {
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";
import produce from "immer";
import React, { Fragment, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGetPostsQuery, useUpdateMutation } from "../api/postsApi";
import NewPost from "../components/NewPost";
import { selectUser } from "../features/userSlice";
import { useAppSelector } from "../hooks/hooks";
import Post from "../models/Post";
import User from "../models/User";
import {
  byLikes,
  byRecent,
  byViews,
  MOST_LIKED,
  MOST_VIEWED,
  tabs,
} from "./constants";
import { like, sortBy } from "./postsUtils";
import Tabs from "./Tabs";

const Posts = () => {
  const { data: posts = [] } = useGetPostsQuery();
  const [currentSortType, setCurrentSortType] = useState<string>(tabs[0].name);
  const [update] = useUpdateMutation();
  const user = useAppSelector(selectUser);

  let postsToShow: Post[] = [];

  const sortedByRecent = useMemo(
    () => sortBy({ by: byRecent, array: posts }),
    [posts]
  );

  const sortedByLikes = useMemo(
    () => sortBy({ by: byLikes, array: posts }),
    [posts]
  );

  const sortedByViews = useMemo(
    () => sortBy({ by: byViews, array: posts }),
    [posts]
  );

  switch (currentSortType) {
    case MOST_LIKED:
      postsToShow = sortedByLikes;
      break;
    case MOST_VIEWED:
      postsToShow = sortedByViews;
      break;
    default:
      postsToShow = sortedByRecent;
      break;
  }

  const handleLike = (post: Post, userId: number) => {
    update(like(post, userId));
  };

  return (
    <main className="px-2 lg:col-span-9 xl:col-span-6">
      <NewPost />
      <Tabs
        currentSortType={currentSortType}
        setCurrentSortType={setCurrentSortType}
      />
      <div className="mt-4">
        <h1 className="sr-only">Recent posts</h1>
        <ul className="space-y-4">
          {postsToShow.map((post) => (
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
                    <div className="flex-shrink-0 self-center flex">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                            <span className="sr-only">Open options</span>
                            <DotsVerticalIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "flex px-4 py-2 text-sm"
                                    )}
                                  >
                                    <StarIcon
                                      className="mr-3 h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span>Add to favorites</span>
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "flex px-4 py-2 text-sm"
                                    )}
                                  >
                                    <CodeIcon
                                      className="mr-3 h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span>Embed</span>
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "flex px-4 py-2 text-sm"
                                    )}
                                  >
                                    <FlagIcon
                                      className="mr-3 h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span>Report content</span>
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
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
                        className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                      >
                        <ThumbUpIcon
                          //text-rose-500
                          className={`h-5 w-5 ${
                            post.likes.includes(user ? user.id : -1)
                              ? "text-rose-500"
                              : ""
                          }`}
                          aria-hidden="true"
                          onClick={() =>
                            user ? handleLike(post, user.id) : undefined
                          }
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
          ))}
        </ul>
      </div>
    </main>
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default Posts;
