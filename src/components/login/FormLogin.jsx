import { Checkbox, Input, Spinner } from "@nextui-org/react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useState } from "react";
import { MyButton } from "../common/Button";
import { Form, redirect, useNavigation } from "react-router-dom";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/features/user/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post("/signIn", data);
      console.log(response.data);
      if (response.data.status !== "200") {
        toast.error(response.data.message);
        return null;
      }

      if (response.data.status === "200")
        store.dispatch(loginUser(response.data));
      toast.success("logged in successfully");
      return redirect("/");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      return null;
    }
  };

const FormLogin = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Form method="POST">
      <Input
        name="email"
        className="mt-5 "
        type="email"
        label="Email"
        size="md"
      />
      <Input
        name="password"
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
      <div className="flex justify-end">
        {" "}
        <p className="mt-5 text-blue-500 cursor-pointer hover:text-primary-200">
          Forgot your password ?
        </p>
      </div>

      <MyButton
        type="submit"
        className="text-white w-full mt-8 font-bold text-base bg-gradient-135deg"
        color="blue"
        size="md"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex justify-center items-center">
            <Spinner className="mr-5" size="sm" color="white" />
            sending...
          </div>
        ) : (
          "Login"
        )}
      </MyButton>
    </Form>
  );
};

export default FormLogin;
