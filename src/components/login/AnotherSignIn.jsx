import { Button } from "@nextui-org/react";
import google from "../../images/google.png";
import face from "../../images/facebook.png";

const AnotherSignIn = () => {
  return (
    <div className="lg:flex lg:justify-center lg:items-center lg:gap-3 mt-5">
      <Button
        className="w-full mt-4 font-bold text-xs bg-white text-black "
        color="default"
        variant="bordered"
      >
        <p className="ml-4">Sign in with Google</p>
        <img
          src={google}
          alt="google"
          width={15}
          height={15}
          className="absolute lg:left-4 left-16"
        />
      </Button>
      <Button
        variant="bordered"
        className="w-full mt-4  font-bold text-xs bg-white text-black "
        color="default"
      >
        <p className="ml-4">Sign in with Facebook</p>
        <img
          src={face}
          alt="google"
          width={20}
          height={20}
          className="absolute lg:left-3 left-16 decoration-white"
        />
      </Button>
    </div>
  );
};

export default AnotherSignIn;
