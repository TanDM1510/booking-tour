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
import { createTrip } from "../../../redux/features/trips/trips";
import { getAllTours } from "../../../redux/features/tours/tours";

const AddTrip = () => {
  const [trip, setTrip] = useState({
    tourId: "",
    tourGuideId: "",
    totalCustomer: "",
    startDate: "",
    endDate: "",
    status: true,
  });

  const dispatch = useDispatch();
  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "tourId") {
      value = parseInt(value);
    } else if (e.target.name === "totalCustomer") {
      value = parseInt(value);
    } else if (e.target.name === "tourGuideId") {
      value = parseInt(value);
    }
    setTrip({ ...trip, [e.target.name]: value });
  };

  const { isLoading } = useSelector((store) => store.trips);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !trip.endDate ||
      !trip.startDate ||
      !trip.totalCustomer ||
      !trip.tourGuideId ||
      !trip.tourId
    ) {
      toast.error("Please fill all the blank");
      return;
    }
    dispatch(createTrip(trip));
    setTrip({
      tourId: "",
      tourGuideId: "",
      totalCustomer: "",
      startDate: "",
      endDate: "",
      status: true,
    });
  };
  useEffect(() => {
    dispatch(getAllTours());
  }, []);
  const { tours } = useSelector((store) => store.tours);
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Add Location in tour"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Input
              required
              label="Tour guide name"
              name="tourGuideId"
              type="number"
              onChange={inputChangHandler}
              value={trip.tourGuideId !== undefined ? trip.tourGuideId : ""}
            />
            <Select
              placeholder="Select a tour"
              required
              name="tourId"
              onChange={inputChangHandler}
              value={trip.tourId !== undefined ? trip.tourId : ""}
            >
              {tours.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.tourName}
                </SelectItem>
              ))}
            </Select>
            <Input
              required
              label="Total Customer"
              name="totalCustomer"
              type="number"
              min={1}
              onChange={inputChangHandler}
              value={trip.totalCustomer !== undefined ? trip.totalCustomer : ""}
            />

            <Input
              required
              label="Start date"
              name="startDate"
              placeholder="Start date"
              type="date"
              onChange={inputChangHandler}
              value={trip.startDate !== undefined ? trip.startDate : ""}
            />
            <Input
              required
              label="End date"
              name="endDate"
              placeholder="End date"
              type="date"
              onChange={inputChangHandler}
              value={trip.endDate !== undefined ? trip.endDate : ""}
            />
          </CardBody>
          <CardFooter className="flex flex-row-reverse gap-2">
            <Link to="/dashboard/trips">
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
export default AddTrip;
