import Navbar from "./nav/Navbar";
import AnimatedOutlet from "../router/AnimatedOutlet";
import AuthModel from "../../features/account/AuthModel";

function App() {
  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto px-10 mt-24">
        <AnimatedOutlet />
      </div>
      <AuthModel />
    </div>
  );
}

export default App;
