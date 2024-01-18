import { Checkbox, Input } from "@nextui-org/react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useState } from "react";
import { MyButton } from "../common/Button";

const FormSignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form>
      <Input type="text" label="Name" color="default" className="mb-5" />
      <Input
        type="number"
        label="Phone number"
        color="default"
        className="mb-5"
      />
      <Input type="email" label="Email" color="default" className="mb-5" />
      <Input
        endContent={
          <button
            className="focus:outline-none mb-1"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <BsFillEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <BsFillEyeFill className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        label="Password"
        color="default"
        className="mb-5"
      />
      <Checkbox className="mb-5" defaultSelected size="sm" isRequired>
        <div className="flex justify-center items-center gap-2 font-semibold">
          <p> I agree to</p>
          <p className="text-blue-500 font-semibold"> the terms & policy</p>
        </div>
      </Checkbox>
      <MyButton
        className="w-full font-bold mb-7  text-white"
        color="blue"
        size="md"
      >
        Sign Up
      </MyButton>
    </form>
  );
};

export default FormSignUp;
