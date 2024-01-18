import { Divider } from "@nextui-org/react";
import FormLogin from "./FormLogin";
import NavLogin from "./NavLogin";

import AnotherSignIn from "./AnotherSignIn";
import FooterLogin from "./FooterLogin";

const LoginCard = () => {
  return (
    <div className="lg:basis-1/2 h-full  flex justify-center items-center bg-white overscroll-contain  ">
      <div className="lg:h-[700px]  lg:w-96 overflow-hidden h-[700px] w-80  ">
        <NavLogin />
        <FormLogin />
        <Divider className="my-4 mt-12" />

        <AnotherSignIn />
        <FooterLogin />
      </div>
      <p className="font-bold text-gray-400 text-sm absolute bottom-2 left-3">
        HellaTeam
      </p>
    </div>
  );
};

export default LoginCard;
