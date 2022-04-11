import React from "react";
import { useGetProfilesByIdsQuery } from "../../api/profilesApi";
import Profile from "../../models/Profile";

interface Props {
  profile: Profile;
}

const FriendsList: React.FC<Props> = (props: Readonly<Props>) => {
  const { profile } = props;
  const { data: friends } = useGetProfilesByIdsQuery(profile?.friends);

  return (
    <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
      <h2 className="text-sm font-medium text-gray-500">Friends</h2>
      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {friends?.map((friend) => (
          <div
            key={friend.id}
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
          >
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={friend.imageUrl}
                alt=""
              />
            </div>
            <div className="flex-1 min-w-0">
              <a href={friend.href} className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  {friend.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {friend.fields.Email}
                </p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
