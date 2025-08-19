import { Navigate } from "react-router";
import { useAppSelector } from "../../lib/stores/store";
import AnimatedOutlet from "./AnimatedOutlet";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../lib/firebase/firebase";

const RequireAuth = () => {
  const currentUser = useAppSelector((state) => state.account.user);
  const hasToasted = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    auth.authStateReady().then(() => setReady(true));
  }, []);
  useEffect(() => {
    if (!currentUser && !hasToasted.current && ready) {
      toast.error("You can't enter this area, until you login");
      hasToasted.current = true;
    }
  }, [currentUser, ready]);

  if (!ready) return <div>Getting ready, Please wait</div>;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <AnimatedOutlet />;
};

export default RequireAuth;
