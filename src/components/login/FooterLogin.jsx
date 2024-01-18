import { Link } from "react-router-dom";

const FooterLogin = () => {
  return (
    <div className="flex justify-center items-center gap-2 mt-7">
      <p className="mt-3 font-semibold ">Don’t have an account?</p>
      <Link
        to={"/signup"}
        className="mt-3 font-semibold text-blue-500 cursor-pointer hover:text-primary-200"
      >
        Sign up now
      </Link>
    </div>
  );
};

export default FooterLogin;
