import type { Profile } from "../../lib/types";

type Props = {
  profile: Profile;
  editMode: boolean;
};

const ProfilePhotos = ({ profile, editMode }: Props) => {
  return (
    <div>
      {editMode ? (
        <div>TODO: Photo upload goes here</div>
      ) : (
        <div className="grid grid-cols-5 gap-3 h-[50vh] overflow-auto">
          <img
            src={profile.photoURL}
            className="rounded-lg w-full"
            alt="uer main image"
          />
          {Array.from({ length: 20 }).map((_, index) => (
            <img
              key={index}
              src="/user.png"
              className="rounded-lg w-full"
              alt="uer main image"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePhotos;
