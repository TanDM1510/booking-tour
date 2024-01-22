import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useMemo, useState } from "react";
import { MyButton } from "../common/Button";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { genders } from "../../utils";
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

  ///{VALIDATE SIGN UP FORM IN FRONTEND}
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(new Set([]));
  const [phone, setPhone] = useState("");
  const validatePhone = (value) => value.match(/^[0]\d{9,9}$/i);
  const isValidPhone = useMemo(() => {
    if (phone === "") return false;
    return validatePhone(phone) ? false : true;
  }, [phone]);
  const validateFullName = (value) =>
    value.match(
      /^[a-zA-ZÀ-Ỹà-ỹÁ-Ýá-ýÂ-Ứâ-ứẤ-Ựấ-ựĂ-Ắă-ằẤ-Ựấ-ựÊ-Ứê-ứẾ-Ựế-ựÔ-Ứô-ứỐ-Ựố-ựƠ-Ứơ-ứỞ-Ựở-ựĐđÇçÈ-Ỳè-ỳÉ-Ýé-ýË-Ỷë-ỷẼ-Ỹẽ-ỹÍ-Ỳí-ỳÎ-Ứî-ứÏ-Ỷï-ỷÑñÒ-Ỵò-ỵÓ-ỹó-ýÔ-Ựô-ựÕ-Ỹõ-ỹÖ-Ỷö-ỷÙ-Ỵù-ỵÚ-ỹú-ýÛ-Ứû-ứÜ-Ỷü-ỷÝý\s']{3,}/i
    );
  const isValidFullName = useMemo(() => {
    if (fullName === "") return false;
    return validateFullName(fullName) ? false : true;
  }, [fullName]);
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isInvalidEmail = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);
  const validatePassword = (value) =>
    value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);
  const isInvalidPassword = useMemo(() => {
    if (password === "") return false;
    return validatePassword(password) ? false : true;
  }, [password]);

  return (
    <Form method="POST">
      <Input
        size="sm"
        isRequired
        type="text"
        label="Name"
        className="mb-3"
        name="fullName"
        value={fullName}
        isInvalid={isValidFullName}
        color={isValidFullName ? "danger" : "success"}
        errorMessage={
          isValidFullName &&
          "Should be at least 3 characters and start with a letter in the name"
        }
        onValueChange={setFullName}
      />
      <Input
        size="sm"
        isRequired
        type="tel"
        id="phone"
        name="phone"
        className="mb-3"
        label="Phone number"
        value={phone}
        isInvalid={isValidPhone}
        color={isValidPhone ? "danger" : "success"}
        errorMessage={isValidPhone && "Invalid phone number"}
        onValueChange={setPhone}
      />
      <Input
        size="sm"
        isRequired
        type="email"
        label="Email"
        className="mb-3"
        name="email"
        value={email}
        isInvalid={isInvalidEmail}
        color={isInvalidEmail ? "danger" : "success"}
        errorMessage={isInvalidEmail && "Please enter a valid email"}
        onValueChange={setEmail}
      />
      <Input
        size="sm"
        isRequired
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
        className="mb-3"
        value={password}
        isInvalid={isInvalidPassword}
        color={isInvalidPassword ? "danger" : "success"}
        errorMessage={
          isInvalidPassword &&
          "Minimum eight characters, at least one letter and one number"
        }
        onValueChange={setPassword}
      />
      <Select
        isRequired
        size="sm"
        name="gender"
        label="Select your gender"
        selectedKeys={gender}
        className="mb-3"
        onSelectionChange={setGender}
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
