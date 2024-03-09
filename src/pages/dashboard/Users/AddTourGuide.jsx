import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createLocation } from "../../../redux/features/location/allLocation";
import { toast } from "react-toastify";
import { getAllCity } from "../../../redux/features/city/allCity";
const AddTourGuide = () => {
  const [location, setLocation] = useState({
    cityId: "",
    locationName: "",
    locationAddress: "",
    status: true,
  });
  const { city } = useSelector((store) => store.allCity);
  console.log(city);
  useEffect(() => {
    dispatch(getAllCity());
  }, []);
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
      status: true,
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
            <Select
              placeholder="Select a city"
              required
              name="cityId"
              onChange={inputChangHandler}
              value={location.cityId !== undefined ? location.cityId : ""}
            >
              {city.map((cityItem) => (
                <SelectItem key={cityItem.id} value={cityItem.id}>
                  {cityItem.cityName}
                </SelectItem>
              ))}
            </Select>
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
export default AddTourGuide;
