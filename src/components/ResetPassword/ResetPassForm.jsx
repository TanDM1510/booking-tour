import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearRedirect,
  resetPass,
} from "../../redux/features/resetPassword/resetPassword";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassForm = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    // Kiểm tra xác thực và xử lý form ở đây
    if (newPassword === "" || confirmPassword === "") {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới không khớp.");
      return;
    }

    // Dispatch action resetPass với mật khẩu mới
    dispatch(
      resetPass({ email: "dmtan1510@gmail.com", password: newPassword })
    );

    // Đặt lại các trường và thông báo lỗi sau khi reset thành công
    setNewPassword("");
    setConfirmPassword("");
  };
  const { redirect } = useSelector((store) => store.resetPassword);
  const navigate = useNavigate();
  useEffect(() => {
    if (redirect === 1) {
      dispatch(clearRedirect());
      navigate("/login");
    }
  }, [redirect, navigate]);
  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full">
      <Input
        label="Nhập mật khẩu mới"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        label="Xác nhận mật khẩu mới"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button color="primary" className="w-full" onClick={handleSubmit}>
        Gửi
      </Button>
    </div>
  );
};

export default ResetPassForm;
