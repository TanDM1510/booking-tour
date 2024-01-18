import { Button } from "@nextui-org/react";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <main className="grid min-h-screen place-items-center px-8">
        <h4 className="text-center font-bold text-4xl ">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            page not found
          </h1>
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
        </h4>
      </main>
    );
  }
  return (
    <main className="grid min-h-screen place-items-center px-8">
      <h4 className="text-center font-bold text-4xl ">there was an error...</h4>
    </main>
  );
};
export default Error;
