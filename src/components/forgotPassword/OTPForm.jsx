import { Button, Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearRedirect,
  verifyOTP,
} from "../../redux/features/resetPassword/resetPassword";

const OTPForm = ({ length = 6 }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const dispatch = useDispatch();

  const inputRefs = useRef([]);
  console.log(otp);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    // Chấp nhận cả chữ và số
    const newValue = value.replace(/[^a-zA-Z0-9]/g, "");

    const newOtp = [...otp];
    newOtp[index] = newValue.substring(0, 1); // chỉ lấy ký tự đầu tiên
    setOtp(newOtp);

    // Kiểm tra xem mã OTP đã được điền đầy đủ chưa
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length);

    // Di chuyển đến ô input kế tiếp nếu ô input hiện tại đã được điền đầy đủ
    if (newValue && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const navigate = useNavigate();
  console.log(otp.join(""));
  const handleVerifyOTP = () => {
    dispatch(verifyOTP({ otp: otp.join(""), email: "dmtan1510@gmail.com" }));
  };
  const { redirect } = useSelector((store) => store.resetPassword);
  useEffect(() => {
    if (redirect === 1) {
      dispatch(clearRedirect());
      navigate("/reset/password");
    }
  }, [redirect, navigate]);

  return (
    <div className="grid place-items-center gap-3 h-1/4">
      {" "}
      <div className="flex flex-row items-center justify-center gap-2">
        {otp.map((value, index) => {
          return (
            <Input
              key={index}
              type="text"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-7  text-center  "
            />
          );
        })}
      </div>
      {otp.join("").length == length ? (
        <Button color="primary" onClick={handleVerifyOTP}>
          Verify
        </Button>
      ) : (
        <Button isDisabled color="primary" onClick={handleVerifyOTP}>
          Verify
        </Button>
      )}
    </div>
  );
};

export default OTPForm;
