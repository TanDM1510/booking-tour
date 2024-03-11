import Layout from "../components/common/Layout";
import ForgotCard from "../components/forgotPassword/ForgotCard";

import Carousel from "../components/login/Carousel";

const ForgotPassword = () => {
  return (
    <Layout>
      <main className="flex flex-row  justify-center items-center h-full relative  ">
        <ForgotCard />
        <Carousel />
      </main>
    </Layout>
  );
};
export default ForgotPassword;
