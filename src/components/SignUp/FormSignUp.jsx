import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { MyButton } from "../common/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../../redux/features/user/userSlice";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { genders } from "../../utils";
const initialState = {
  fullName: "",
  email: "",
  password: "",
  gender: "",
  phone: "",
};
const FormSignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [values, setValues] = useState(initialState);
  const { isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password, gender, phone } = values;
    if (!fullName || !email || !password || !gender || !phone) {
      toast.error("Please fill out all fields");
      return;
    } else {
      dispatch(registerUser({ email, password, gender, phone, fullName }));
    }
  };

  ///{VALIDATE SIGN UP FORM IN FRONTEND}

  const validatePhone = (value) => value.match(/^[0]\d{9,9}$/i);

  const isValidPhone = useMemo(() => {
    if (values.phone === "") return false;
    return validatePhone(values.phone) ? false : true;
  }, [values.phone]);

  const validateFullName = (value) =>
    value.match(
      /^[a-zA-ZÀ-Ỹà-ỹÁ-Ýá-ýÂ-Ứâ-ứẤ-Ựấ-ựĂ-Ắă-ằẤ-Ựấ-ựÊ-Ứê-ứẾ-Ựế-ựÔ-Ứô-ứỐ-Ựố-ựƠ-Ứơ-ứỞ-Ựở-ựĐđÇçÈ-Ỳè-ỳÉ-Ýé-ýË-Ỷë-ỷẼ-Ỹẽ-ỹÍ-Ỳí-ỳÎ-Ứî-ứÏ-Ỷï-ỷÑñÒ-Ỵò-ỵÓ-ỹó-ýÔ-Ựô-ựÕ-Ỹõ-ỹÖ-Ỷö-ỷÙ-Ỵù-ỵÚ-ỹú-ýÛ-Ứû-ứÜ-Ỷü-ỷÝý\s']{3,}/i
    );
  const isValidFullName = useMemo(() => {
    if (values.fullName === "") return false;
    return validateFullName(values.fullName) ? false : true;
  }, [values.fullName]);
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isInvalidEmail = useMemo(() => {
    if (values.email === "") return false;
    return validateEmail(values.email) ? false : true;
  }, [values.email]);
  const validatePassword = (value) =>
    value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);
  const isInvalidPassword = useMemo(() => {
    if (values.password === "") return false;
    return validatePassword(values.password) ? false : true;
  }, [values.password]);
  return (
    <form onSubmit={onSubmit}>
      <Input
        isInvalid={isValidFullName}
        color={isValidFullName ? "danger" : "default"}
        errorMessage={
          isValidFullName &&
          "Should be at least 3 characters and start with a letter in the name"
        }
        size="sm"
        isRequired
        type="text"
        label="Name"
        className="mb-3"
        name="fullName"
        value={values.fullName}
        onChange={handleChange}
      />
      <Input
        isInvalid={isValidPhone}
        color={isValidPhone ? "danger" : "default"}
        errorMessage={isValidPhone && "Invalid phone number"}
        size="sm"
        isRequired
        type="tel"
        name="phone"
        className="mb-3"
        label="Phone number"
        value={values.phone}
        onChange={handleChange}
      />
      <Input
        isInvalid={isInvalidEmail}
        color={isInvalidEmail ? "danger" : "default"}
        errorMessage={isInvalidEmail && "Please enter a valid email"}
        size="sm"
        isRequired
        type="email"
        label="Email"
        className="mb-3"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <Input
        size="sm"
        isRequired
        name="password"
        type={isVisible ? "text" : "password"}
        label="Password"
        className="mb-3"
        value={values.password}
        onChange={handleChange}
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
        isInvalid={isInvalidPassword}
        color={isInvalidPassword ? "danger" : "default"}
        errorMessage={
          isInvalidPassword &&
          "Minimum eight characters, at least one letter and one number"
        }
      />
      <Select
        isRequired
        size="sm"
        name="gender"
        label="Select your gender"
        selectedKeys={values.gender}
        className="mb-3"
        onChange={handleChange}
      >
        {genders.map((gender) => {
          return (
            <SelectItem value={gender.value} key={gender.id}>
              {gender.gender}
            </SelectItem>
          );
        })}
      </Select>

      <Checkbox className="mb-5" defaultSelected size="sm" isRequired>
        <div className="flex justify-center items-center gap-2 font-semibold">
          <p> I agree to</p>
          <Link to="/" className="text-blue-500 font-semibold">
            {" "}
            the terms & policy
          </Link>
        </div>
      </Checkbox>
      <MyButton
        type="submit"
        className="text-white w-full mt-8 font-bold text-base"
        color={
          isInvalidPassword || isInvalidEmail || isValidFullName || isValidPhone
            ? "hidden"
            : "blue"
        }
        size="md"
        disabled={
          isLoading ||
          isInvalidEmail ||
          isInvalidPassword ||
          isValidFullName ||
          isValidPhone
        }
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner className="mr-5" size="sm" color="white" />
            sending...
          </div>
        ) : (
          "Sign Up"
        )}
      </MyButton>
    </form>
  );
};

export default FormSignUp;
