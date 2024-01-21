import { Checkbox, Input, Spinner } from "@nextui-org/react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useState } from "react";
import { MyButton } from "../common/Button";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { Form, redirect, useNavigation } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post("/signUp", data);
    if (response.data.status !== "200") {
      toast.error(response.data.message);
      return null;
    }
    if (response.data.status === "200")
      toast.success("account created successfully");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "please double check your credentials";
    toast.error(errorMessage);
    console.log(error);
    return null;
  }
};
const FormSignUp = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Form method="POST">
      <Input
        type="text"
        label="Name"
        color="default"
        className="mb-3"
        name="fullName"
      />
      <Input
        type="number"
        label="Phone number"
        color="default"
        className="mb-3"
        name="phone"
      />
      <Input
        type="email"
        label="Email"
        color="default"
        className="mb-3"
        name="email"
      />
      <Input
        name="password"
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
        className="mb-3"
      />
      <Input
        type="text"
        label="Gender"
        color="default"
        className="mb-3"
        name="gender"
      />
      {/* <Checkbox className="mb-5" defaultSelected size="sm" isRequired>
        <div className="flex justify-center items-center gap-2 font-semibold">
          <p> I agree to</p>
          <p className="text-blue-500 font-semibold"> the terms & policy</p>
        </div>
      </Checkbox> */}
      <MyButton
        type="submit"
        className="w-full font-bold mb-7  text-white"
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
          "Sign up"
        )}
      </MyButton>
    </Form>
  );
};

export default FormSignUp;
