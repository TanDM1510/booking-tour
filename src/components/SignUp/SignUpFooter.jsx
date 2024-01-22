import { Link } from "react-router-dom";

const SignUpFooter = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <p className="mt-5 font-semibold "> Have an account?</p>
      <Link
        to={"/login"}
        className="mt-5 font-semibold text-blue-900 cursor-pointer hover:text-primary-200"
      >
        Login now
      </Link>
    </div>
  );
};

export default SignUpFooter;
