import NavForgotPass from "./NavForgotPass";

import OTPForm from "./OTPForm";

const OTPCard = () => {
  return (
    <div className="lg:basis-1/2 h-full  grid place-items-center py-5 bg-white overscroll-contain  ">
      <div className="lg:h-full lg:w-96  h-[700px] w-80 relative ">
        <div className=" flex flex-col items-center justify-center h-full w-full">
          {" "}
          <NavForgotPass />
          <OTPForm />
        </div>
      </div>
    </div>
  );
};
export default OTPCard;
