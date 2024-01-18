import bus from "../../images/bus.png";
const NavLogin = () => {
  return (
    <>
      <div className="flex justify-between items-center ">
        <p className="font-bold lg:text-4xl lg:mb-2">Welcome back!</p>

        <img src={bus} width={60} height={60} className="lg:mb-2 lg:mr-2" />
      </div>
      <p className="font-bold lg:text-base lg:mb-14">
        Enter your Credentials to access your account
      </p>
    </>
  );
};
export default NavLogin;
