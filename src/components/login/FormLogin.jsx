import { Input, Spinner } from "@nextui-org/react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useMemo, useState } from "react";
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
      if (response.data.status === "500") {
        toast.error(response.data.message);
        return null;
      } else {
        console.log(response.data);
        store.dispatch(loginUser(response.data));
        toast.success("logged in successfully");
        return redirect("/");
      }
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

  //{VALIDATE FRONTEND CHECK....}
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const validatePassword = (value) =>
    value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);

  const isInvalidEmail = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const isInvalidPassword = useMemo(() => {
    if (password === "") return false;
    return validatePassword(password) ? false : true;
  }, [password]);

  return (
    <Form method="POST" className="px-2">
      <Input
        name="email"
        className="mt-5 "
        type="email"
        label="Email"
        size="md"
        isRequired
        value={email}
        isInvalid={isInvalidEmail}
        color={isInvalidEmail ? "danger" : "success"}
        errorMessage={isInvalidEmail && "Please enter a valid email"}
        onValueChange={setEmail}
      />
      <Input
        isRequired
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
        value={password}
        isInvalid={isInvalidPassword}
        color={isInvalidPassword ? "danger" : "success"}
        errorMessage={
          isInvalidPassword &&
          "Minimum eight characters, at least one letter and one number"
        }
        onValueChange={setPassword}
      />

      <p className="mt-5 text-blue-500 cursor-pointer hover:text-primary-200">
        Forgot your password ?
      </p>
      <MyButton
        type="submit"
        className="text-white w-full mt-8 font-bold text-base bg-gradient-135deg"
        color={isInvalidPassword || isInvalidEmail ? "default" : "blue"}
        size="md"
        disabled={isSubmitting || isInvalidEmail || isInvalidPassword}
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
