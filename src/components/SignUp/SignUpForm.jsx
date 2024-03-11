import AnotherSignIn from "../login/AnotherSignIn";
import { Divider } from "@nextui-org/react";
import FormSignUp from "./FormSignUp";
import SignUpFooter from "./SignUpFooter";

const SignUpForm = () => {
  return (
    <div className="lg:basis-1/2  h-full grid place-items-center  ">
      <section className="lg:h-full lg:w-96  h-[800px] w-80  relative">
        <p className="text-4xl font-bold text-left mb-10">Get start now!</p>
        <FormSignUp />
        <Divider className="my-4 mb-5" />
        <AnotherSignIn />
        <SignUpFooter />
      </section>
    </div>
  );
};

export default SignUpForm;
