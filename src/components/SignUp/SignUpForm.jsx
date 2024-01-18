import AnotherSignIn from "../login/AnotherSignIn";
import { Divider } from "@nextui-org/react";
import FormSignUp from "./FormSignUp";
import SignUpFooter from "./SignUpFooter";

const SignUpForm = () => {
  return (
    <div className="lg:basis-1/2  h-full flex justify-center items-center">
      <section className="h-[700px]  w-96 overflow-hidden  ">
        <p className="text-4xl font-bold text-left mb-10">Get start now!</p>
        <FormSignUp />
        <Divider className="my-4 mb-5" />
        <AnotherSignIn />
        <SignUpFooter />
      </section>
      <p className="font-bold text-gray-400 text-sm absolute bottom-2 left-3">
        HellaTeam
      </p>
    </div>
  );
};

export default SignUpForm;
