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
import { toast } from "react-toastify";
import { createLocationInTour } from "../../../redux/features/locationInTour/locationInTour";
import { getAllLocation } from "../../../redux/features/location/allLocation";
import { getAllTours } from "../../../redux/features/tours/tours";

const AddLocationInTour = () => {
  const [locationInTour, setLocationInTour] = useState({
    locationId: "",
    tourId: "",
    duration: "",
    description: "",
    startCity: "",
    endCity: "",
    status: true,
  });

  const dispatch = useDispatch();
  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "locationId") {
      value = parseInt(value);
    } else if (e.target.name === "tourId") {
      value = parseInt(value);
    }
    setLocationInTour({ ...locationInTour, [e.target.name]: value });
  };

  const { isLoading } = useSelector((store) => store.locationInTour);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !locationInTour.locationId ||
      !locationInTour.tourId ||
      !locationInTour.duration ||
      !locationInTour.description ||
      !locationInTour.endCity ||
      !locationInTour.startCity
    ) {
      toast.error("Please fill all the blank");
      return;
    }
    dispatch(createLocationInTour(locationInTour));
    setLocationInTour({
      duration: "",
      description: "",
      tourId: locationInTour.tourId,
      locationId: locationInTour.locationId,
      startCity: "",
      endCity: "",
      status: true,
    });
  };
  useEffect(() => {
    dispatch(getAllLocation());
    dispatch(getAllTours());
  }, []);

  const { location } = useSelector((store) => store.allLocation);
  const { tours } = useSelector((store) => store.tours);

  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Add Location in tour"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Select
              placeholder="Select a location"
              required
              name="locationId"
              onChange={inputChangHandler}
              value={
                locationInTour.locationId !== undefined
                  ? locationInTour.locationId
                  : ""
              }
            >
              {location.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.locationName}
                </SelectItem>
              ))}
            </Select>
            <Select
              placeholder="Select a tour"
              required
              name="tourId"
              onChange={inputChangHandler}
              value={
                locationInTour.tourId !== undefined ? locationInTour.tourId : ""
              }
            >
              {tours.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.tourName}
                </SelectItem>
              ))}
            </Select>
            <Input
              required
              label="Duration"
              name="duration"
              type="text"
              onChange={inputChangHandler}
              value={
                locationInTour.duration !== undefined
                  ? locationInTour.duration
                  : ""
              }
            />
            <Input
              required
              label="Start City"
              name="startCity"
              type="text"
              onChange={inputChangHandler}
              value={
                locationInTour.startCity !== undefined
                  ? locationInTour.startCity
                  : ""
              }
            />
            <Input
              required
              label="End City"
              name="endCity"
              type="text"
              onChange={inputChangHandler}
              value={
                locationInTour.endCity !== undefined
                  ? locationInTour.endCity
                  : ""
              }
            />
            <Input
              required
              label="Description"
              name="description"
              type="text"
              onChange={inputChangHandler}
              value={
                locationInTour.description !== undefined
                  ? locationInTour.description
                  : ""
              }
            />
          </CardBody>
          <CardFooter className="flex flex-row-reverse gap-2">
            <Link to="/dashboard/locationTour">
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
export default AddLocationInTour;
