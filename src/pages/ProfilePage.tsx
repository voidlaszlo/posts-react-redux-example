import { ChevronLeftIcon, MailIcon, PhoneIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useGetUserByIdQuery, useGetUsersByIdsQuery } from "../api/usersApi";
import FriendsList from "../components/FriendsList";
import ProfileDescription from "../components/ProfileDescription";
import ProfilePhotos from "../components/ProfilePhotos";
import { selectUser } from "../features/userSlice";
import { useAppSelector } from "../hooks/hooks";
import { Fields } from "../models/User";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "Profile", href: `#`, current: true },
  { name: "Photos", href: `#`, current: false },
];

const ProfilePage = () => {
  let { id } = useParams();
  const [currentTab, setCurrentTab] = useState("Photos");
  const self = useAppSelector(selectUser);
  const [isSelf, setIsSelf] = useState(false);
  const { data: profile } = useGetUserByIdQuery(Number(id));

  useEffect(() => {
    if (id === self?.id) {
      setIsSelf(true);
    }
  }, [id, self?.id]);

  const handleTabClick = (to: string) => () => {
    setCurrentTab(to);
  };

  return (
    <main className="lg:col-span-9 xl:col-span-6 bg-white">
      {/* Breadcrumb */}
      <nav
        className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
        aria-label="Breadcrumb"
      >
        <a
          href="/"
          className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
        >
          <ChevronLeftIcon
            className="-ml-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <span>Home</span>
        </a>
      </nav>

      <article>
        {/* Profile header */}
        <div>
          <div>
            <img
              className="h-32 w-full object-cover lg:h-48"
              src={profile?.coverImageUrl}
              alt=""
            />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="flex">
                <img
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  src={profile?.imageUrl}
                  alt=""
                />
              </div>
              <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">
                    {profile?.name}
                  </h1>
                </div>
                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <MailIcon
                      className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>Message</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <PhoneIcon
                      className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {profile?.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 sm:mt-2 2xl:mt-5">
          <div className="border-b border-gray-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    onClick={handleTabClick(tab.name)}
                    key={tab.name}
                    className={classNames(
                      tab.name === currentTab
                        ? "border-pink-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Description */}
        {profile && currentTab === "Profile" && (
          <ProfileDescription profile={profile} isSelf={isSelf} />
        )}

        {/* Photos */}
        {profile && currentTab === "Photos" && (
          <ProfilePhotos profile={profile} isSelf={isSelf} />
        )}

        {/* Friends list */}
        {profile && <FriendsList profile={profile} />}
      </article>
    </main>
  );
};

export default ProfilePage;
