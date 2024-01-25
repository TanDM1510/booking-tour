import { Input, Spinner } from "@nextui-org/react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useEffect, useMemo, useState } from "react";
import { MyButton } from "../common/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginsUser } from "../../redux/features/user/userSlice";
const initialState = {
  password: "",
  email: "",
};

const FormLogin = () => {
  const [values, setValues] = useState(initialState);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //{VALIDATE FRONTEND CHECK....}

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const validatePassword = (value) =>
    value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);

  const isInvalidEmail = useMemo(() => {
    if (values.email === "") return false;
    return validateEmail(values.email) ? false : true;
  }, [values.email]);

  const isInvalidPassword = useMemo(() => {
    if (values.password === "") return false;
    return validatePassword(values.password) ? false : true;
  }, [values.password]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    } else {
      dispatch(loginsUser({ email: email, password: password }));
    }
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => navigate("/"), 3000);
    }
  }, [user]);

  return (
    <form className="px-2" onSubmit={onSubmit}>
      <Input
        name="email"
        className="mt-5 "
        type="email"
        label="Email"
        size="md"
        isRequired
        value={values.email}
        onChange={handleChange}
        isInvalid={isInvalidEmail}
        color={isInvalidEmail ? "danger" : "default"}
        errorMessage={isInvalidEmail && "Please enter a valid email"}
      />
      <Input
        isInvalid={isInvalidPassword}
        color={isInvalidPassword ? "danger" : "default"}
        errorMessage={
          isInvalidPassword &&
          "Minimum eight characters, at least one letter and one number"
        }
        onChange={handleChange}
        value={values.password}
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
      />

      <p className="mt-5 text-blue-500 cursor-pointer hover:text-primary-200">
        Forgot your password ?
      </p>
      <MyButton
        size="md"
        type="submit"
        className="text-white w-full mt-8 font-bold text-base"
        color={isInvalidPassword || isInvalidEmail ? "hidden" : "blue"}
        disabled={isLoading || isInvalidEmail || isInvalidPassword}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner className="mr-5" size="sm" color="white" />
            sending...
          </div>
        ) : (
          "Login"
        )}
      </MyButton>
    </form>
  );
};

export default FormLogin;
