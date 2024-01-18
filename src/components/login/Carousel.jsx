import imgLogin from "../../images/login1.png";

const Carousel = () => {
  return (
    <div className=" hidden  lg:flex lg:basis-1/2 lg:h-full overflow-hidden ">
      <img
        src={imgLogin}
        className="h-full w-full items-center rounded-tl-3xl rounded-bl-3xl hover:scale-125 object-center transition duration-700a ease-in-out "
      />
    </div>
  );
};

export default Carousel;
