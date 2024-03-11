import bus from "../../images/bus.png";

const NavForgotPassword = () => {
  return (
    <div>
      {" "}
      <div className="flex justify-between items-center ">
        <p className="font-bold lg:text-4xl lg:mb-2">Reset password !</p>
        <img src={bus} width={60} height={60} className="lg:mb-2 lg:mr-2" />
      </div>
      <p className="font-bold lg:text-base lg:mb-14">
        Enter your email below to get OTP reset password
      </p>
    </div>
  );
};

export default NavForgotPassword;
