import Layout from "../components/common/Layout";
import Carousel from "../components/login/Carousel";
import LoginCard from "../components/login/LoginCard";

const Login = () => {
  return (
    <Layout>
      <main className="flex flex-row  justify-center items-center h-full relative  ">
        <LoginCard />
        <Carousel />
      </main>
    </Layout>
  );
};
export default Login;
