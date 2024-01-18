import { Button } from "@nextui-org/react";
import google from "../../images/google.png";
import face from "../../images/facebook.png";

const AnotherSignIn = () => {
  return (
    <div className="flex justify-center items-center gap-3 mt-10">
      <Button
        className="w-full mt-4 font-bold text-xs bg-white text-black "
        color="default"
        variant="bordered"
      >
        Sign in with Google
        <img
          src={google}
          alt="google"
          width={15}
          height={15}
          className="absolute left-4"
        />
      </Button>
      <Button
        variant="bordered"
        className="w-full mt-4 font-bold text-xs bg-white text-black "
        color="default"
      >
        Sign in with Facebook
        <img
          src={face}
          alt="google"
          width={20}
          height={20}
          className="absolute left-3 decoration-white"
        />
      </Button>
    </div>
  );
};

export default AnotherSignIn;
