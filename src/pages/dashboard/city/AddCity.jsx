import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Radio,
  RadioGroup,
  Spinner,
} from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import {
  createCity,
  handleChange,
} from "../../../redux/features/city/citySlice";
import { Link } from "react-router-dom";

const AddCity = () => {
  const dispatch = useDispatch();
  const { isLoading, cityName, country, status, statusOption, isEditing } =
    useSelector((store) => store.city);
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
    dispatch(handleChange({ name, value }));
  };
  console.log(isEditing);
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
            <RadioGroup
              className="mt-3"
              name="status"
              label="Active or Disable"
              value={status}
              onChange={handleChanged}
            >
              {statusOption.map((value, index) => {
                return (
                  <Radio type="radio" value={value} key={index}>
                    {value === true ? "Active" : "Disable"}
                  </Radio>
                );
              })}
            </RadioGroup>
          </CardBody>
          <CardFooter className="flex flex-row-reverse gap-2">
            <Link to="/dashboard/city">
              <Button color="danger" variant="light">
                Close
              </Button>
            </Link>

            <Button
              color="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};
export default AddCity;
