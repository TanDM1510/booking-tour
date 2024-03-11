import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main className="grid min-h-screen place-items-center px-8">
      <div className="text-center font-bold text-4xl ">
        <p className="text-9xl font-semibold text-primary">404</p>
        <h4 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          page not found
        </h4>
        <p className="mt-6 text-lg leading-7">
          Sorry, we couldn't find the page you're looking for
        </p>
        <div className="mt-10">
          <Button color="primary">
            <Link to="/" className="btn btn-secondary capitalize">
              go back home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Error;
