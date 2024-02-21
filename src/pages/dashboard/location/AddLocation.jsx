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

import { Link } from "react-router-dom";
import { useState } from "react";
import { createLocation } from "../../../redux/features/location/allLocation";

import { toast } from "react-toastify";

const AddLocation = () => {
  const [location, setLocation] = useState({
    cityId: "",
    locationName: "",
    locationAddress: "",
    status: "",
  });

  const dispatch = useDispatch();
  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "cityId") {
      value = parseInt(value);
    }
    setLocation({ ...location, [e.target.name]: value });
  };

  const { isLoading } = useSelector((store) => store.allLocation);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !location.cityId ||
      !location.locationAddress ||
      !location.locationName ||
      !location.status
    ) {
      toast.error("Please fill all the blank");
      return;
    }
    dispatch(createLocation(location));
    setLocation({
      cityId: "",
      locationName: "",
      locationAddress: "",
      status: "",
    });
  };
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Add Location"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Input
              required
              label="City Name"
              name="cityId"
              type="number"
              onChange={inputChangHandler}
              value={location.cityId !== undefined ? location.cityId : ""}
            />
            <Input
              required
              label="Location Name"
              name="locationName"
              type="text"
              onChange={inputChangHandler}
              value={
                location.locationName !== undefined ? location.locationName : ""
              }
            />
            <Input
              required
              label="Location address"
              name="locationAddress"
              type="text"
              onChange={inputChangHandler}
              value={
                location.locationAddress !== undefined
                  ? location.locationAddress
                  : ""
              }
            />
            <RadioGroup
              isRequired
              className="mt-3"
              name="status"
              label="Active or Disable"
              onChange={inputChangHandler}
              value={location.status !== undefined ? location.status : ""}
            >
              <Radio value={true}>Active</Radio>
              <Radio value={false}>Disable</Radio>
            </RadioGroup>
          </CardBody>
          <CardFooter className="flex flex-row-reverse gap-2">
            <Link to="/dashboard/location">
              <Button color="danger" variant="light">
                Close
              </Button>
            </Link>

            <Button color="primary" type="submit" disabled={isLoading}>
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
export default AddLocation;
