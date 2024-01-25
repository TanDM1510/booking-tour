import SignUpForm from "../components/SignUp/SignUpForm";
import Layout from "../components/common/Layout";
import Carousel from "../components/login/Carousel";

const SignUp = () => {
  return (
    <Layout>
      <main className="flex flex-row  justify-center items-center h-full relative">
        <SignUpForm />
        <Carousel />
      </main>
    </Layout>
  );
};
export default SignUp;
