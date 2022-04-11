import React from "react";
import User, { Fields } from "../../models/User";

interface Props {
  profile: User;
  isSelf: boolean;
}

const ProfileDescription: React.FC<Props> = (props: Readonly<Props>) => {
  const { profile, isSelf } = props;

  return (
    <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        {Object.keys(profile ? profile.fields : []).map((field) => (
          <div key={field} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              {field}{" "}
              {isSelf && <button className="text-red-400">[Edit]</button>}
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {profile?.fields[field as keyof Fields]}
            </dd>
          </div>
        ))}
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">
            About {isSelf && <button className="text-red-400">[Edit]</button>}
          </dt>
          <p className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
            {profile?.about}
          </p>
        </div>
      </dl>
    </div>
  );
};

ProfileDescription.displayName = "ProfileDescription";
ProfileDescription.defaultProps = {
  profile: {} as User,
  isSelf: false,
};

export default ProfileDescription;
