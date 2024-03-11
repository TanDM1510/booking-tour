import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearRedirect,
  createOTP,
} from "../../redux/features/resetPassword/resetPassword";
import { toast } from "react-toastify";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { redirect } = useSelector((store) => store.resetPassword);

  const handleSendOTP = () => {
    if (email === "") {
      toast.error("Please enter your email");
      return;
    }
    dispatch(createOTP(email));
  };

  useEffect(() => {
    if (redirect === 1) {
      dispatch(clearRedirect());
      navigate("/OTP");
    }
  }, [redirect, navigate]);

  return (
    <div className="flex flex-col gap-4">
      <Input
        className="w-full"
        label="Enter your email here"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button color="primary" onClick={handleSendOTP}>
        Send OTP
      </Button>
    </div>
  );
};

export default ForgotPasswordForm;
