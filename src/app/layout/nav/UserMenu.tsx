import { CalendarIcon, PowerIcon, UserIcon } from "@heroicons/react/24/outline";
import { users } from "../../../lib/data/sampleData";

const UserMenu = () => {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className=" m-1 text-white text-xl font-semibold flex gap-3 items-center"
      >
        <div className="avatar">
          <div className="w-11 rounded-full">
            <img src={users[0].photoURL} alt="user avatar" />
          </div>
        </div>
        <span>Bob</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li>
          <div className="flex gap-3 items-center">
            <UserIcon className="size-6" />
            My Profile
          </div>
        </li>
        <li>
          <div className="flex gap-3 items-center">
            <CalendarIcon className="size-6" />
            Create event
          </div>
        </li>
        <div className="divicer my-0"></div>
        <li>
          <div className="flex gap-3 items-center">
            <PowerIcon className="size-6 text-error" />
            Sign out
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
