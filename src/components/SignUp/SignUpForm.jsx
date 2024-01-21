import AnotherSignIn from "../login/AnotherSignIn";
import { Divider } from "@nextui-org/react";
import FormSignUp from "./FormSignUp";
import SignUpFooter from "./SignUpFooter";

const SignUpForm = () => {
  return (
    <div className="lg:basis-1/2  h-full grid place-items-center  ">
      <section className="lg:h-[700px]  lg:w-96  h-[800px] w-80  relative">
        <p className="text-4xl font-bold text-left mb-10">Get start now!</p>
        <FormSignUp />
        <Divider className="my-4 mb-5" />
        <AnotherSignIn />
        <SignUpFooter />
        <p className="font-bold text-gray-400 text-sm absolute lg:bottom-2 lg:left-3 bottom-0 left-0">
          HellaTeam
        </p>
      </section>
    </div>
  );
};

export default SignUpForm;
