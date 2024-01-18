import { Checkbox, Input } from "@nextui-org/react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useState } from "react";
import { MyButton } from "../common/Button";

const FormLogin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form>
      <Input className="mt-5 " type="email" label="Email" size="md" />
      <Input
        className="mt-5 "
        endContent={
          <button
            className="focus:outline-none mb-2"
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
        label="Enter password"
        size="md"
      />
      <div className="flex justify-between">
        {" "}
        <Checkbox
          className="mt-3 text-xs font-semibold"
          size="sm"
          defaultSelected
        >
          Remember me
        </Checkbox>
        <p className="mt-3 text-blue-500 cursor-pointer hover:text-primary-200">
          Forgot your password ?
        </p>
      </div>
      <MyButton
        className="text-white w-full mt-8 font-bold text-base bg-gradient-135deg"
        color="blue"
        size="md"
      >
        Login
      </MyButton>
    </form>
  );
};

export default FormLogin;
