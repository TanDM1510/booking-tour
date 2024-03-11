import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Spinner,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCity,
  handleChange,
} from "../../../redux/features/city/citySlice";
import { useNavigate } from "react-router-dom";
const AddCity = () => {
  const dispatch = useDispatch();
  const { isLoading, cityName, country, status } = useSelector(
    (store) => store.city
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityName || !country) {
      toast.error("Please fill all the blank");
      return;
    }
    dispatch(createCity({ cityName, country, status }));
  };
  const handleChanged = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const parsedValue = name === "status" ? value === "true" : value;
    dispatch(handleChange({ name, value: parsedValue }));
  };
  const navigate = useNavigate();
  return (
    <>
      <Card className="grid place-items-center ">
        <form>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Add City"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Input
              required
              label="City Name"
              name="cityName"
              type="text"
              onChange={handleChanged}
              value={cityName}
            />
            <Input
              required
              label="Country"
              name="country"
              type="text"
              onChange={handleChanged}
              value={country}
            />
          </CardBody>
          <CardFooter className="flex flex-row-reverse gap-2">
            <Button
              color="danger"
              variant="light"
              onClick={() => navigate("/dashboard/city")}
            >
              Close
            </Button>

            <Button
              color="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Spinner className="mr-5" size="sm" color="white" />
                  sending...
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};
export default AddCity;
