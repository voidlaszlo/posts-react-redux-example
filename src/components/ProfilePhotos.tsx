import User from "../models/User";

const files = [
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  },
  // More files...
];

interface Props {
  profile: User;
  isSelf: boolean;
}

const ProfilePhotos: React.FC<Props> = (props: Readonly<Props>) => {
  const { profile, isSelf } = props;

  return profile.photos[0] ? (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-2 mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {profile.photos.map((photo) => (
        <li key={photo.source} className="relative">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
            <img
              src={photo.source}
              alt=""
              className="object-cover pointer-events-none group-hover:opacity-75"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for {photo.title}</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {profile.name} has no photos yet..
    </p>
  );
};

ProfilePhotos.displayName = "ProfilePhotos";
ProfilePhotos.defaultProps = {};

export default ProfilePhotos;
