import { NavLink } from "react-router";
import UserMenu from "./UserMenu";
import { useAppDispatch, useAppSelector } from "../../../lib/stores/store";
import { signIn } from "../../../features/account/accountSlice";

const Navbar = () => {
  const user = useAppSelector((state) => state.account.user);
  const dispatch = useAppDispatch();
  return (
    <header className="px-3  w-full fixed top-0 z-50 bg-gradient-to-r from-primary to-black">
      <div className="flex align-middle items-center px-10 mx-auto gap-6 cursor-pointer">
        <div className="h-16 text-white flex items-center gap-3 border-r-white border-r-2 pr-6 ">
          <NavLink
            to="/"
            className="text-2xl font-semibold text-white uppercase"
          >
            Re-vents
          </NavLink>
        </div>
        <nav className="flex gap-3 my-2 uppercase text-lg text-white">
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/createEvent">Create</NavLink>
        </nav>
        <div className="flex align-middle ml-auto gap-3">
          {user ? (
            <UserMenu />
          ) : (
            <>
              <button onClick={() => dispatch(signIn())} className="btn">
                Login
              </button>
              <button className="btn">Register</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
