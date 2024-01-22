import { Divider } from "@nextui-org/react";
import FormLogin from "./FormLogin";
import NavLogin from "./NavLogin";

import AnotherSignIn from "./AnotherSignIn";
import FooterLogin from "./FooterLogin";

const LoginCard = () => {
  return (
    <div className="lg:basis-1/2 h-full  grid place-items-center py-5 bg-white overscroll-contain  ">
      <div className="lg:h-[700px]  lg:w-96 overflow-hidden h-[700px] w-80 relative ">
        <NavLogin />
        <FormLogin />
        <Divider className="my-4 mt-12" />
        <AnotherSignIn />
        <FooterLogin />
      </div>
    </div>
  );
};

export default LoginCard;
