import ResetPasswordCard from "../components/ResetPassword/ResetPasswordCard";
import Layout from "../components/common/Layout";
import Carousel from "../components/login/Carousel";

const ResetPassword = () => {
  return (
    <Layout>
      <main className="flex flex-row  justify-center items-center h-full relative  ">
        <ResetPasswordCard />
        <Carousel />
      </main>
    </Layout>
  );
};
export default ResetPassword;
