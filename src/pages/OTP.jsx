import Layout from "../components/common/Layout";

import OTPCard from "../components/forgotPassword/OTPCard";
import Carousel from "../components/login/Carousel";

const OTP = () => {
  return (
    <Layout>
      <main className="flex flex-row  justify-center items-center h-full relative  ">
        <OTPCard />
        <Carousel />
      </main>
    </Layout>
  );
};

export default OTP;
