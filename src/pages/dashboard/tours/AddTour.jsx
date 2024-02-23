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
import { createTour } from "../../../redux/features/tours/tours";

const AddTour = () => {
  const [tour, setTour] = useState({
    tourName: "",
    price: "",
    vehicleTypeId: "",
    tourType: "",
    image: "",
    status: "",
  });

  const dispatch = useDispatch();
  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "vehicleTypeId") {
      value = parseInt(value);
    } else if (e.target.name === "price") {
      value = parseInt(value);
    }
    setTour({ ...tour, [e.target.name]: value });
  };

  const { isLoading } = useSelector((store) => store.tours);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !tour.tourName ||
      !tour.price ||
      !tour.vehicleTypeId ||
      !tour.tourType ||
      !tour.image ||
      !tour.status
    ) {
      toast.error("Please fill all the blank");
      return;
    }
    dispatch(createTour(tour));
    setTour({
      tourName: "",
      price: "",
      vehicleTypeId: "",
      tourType: "",
      image: "",
      status: "",
    });
  };
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Add tour"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Input
              required
              label="Vehicle Name"
              name="vehicleTypeId"
              type="number"
              onChange={inputChangHandler}
              value={tour.vehicleTypeId !== undefined ? tour.vehicleTypeId : ""}
            />
            <Input
              required
              label="Tour Name"
              name="tourName"
              type="text"
              onChange={inputChangHandler}
              value={tour.tourName !== undefined ? tour.tourName : ""}
            />
            <Input
              required
              label="Price"
              name="price"
              type="number"
              onChange={inputChangHandler}
              value={tour.price !== undefined ? tour.price : ""}
            />
            <Input
              required
              label="Tour type"
              name="tourType"
              type="text"
              onChange={inputChangHandler}
              value={tour.tourType !== undefined ? tour.tourType : ""}
            />
            <Input
              required
              label="Image"
              name="image"
              type="text"
              onChange={inputChangHandler}
              value={tour.image !== undefined ? tour.image : ""}
            />
            <RadioGroup
              isRequired
              className="mt-3"
              name="status"
              label="Active or Disable"
              onChange={inputChangHandler}
              value={tour.status !== undefined ? tour.status : ""}
            >
              <Radio value={true}>Active</Radio>
              <Radio value={false}>Disable</Radio>
            </RadioGroup>
          </CardBody>
          <CardFooter className="flex flex-row-reverse gap-2">
            <Link to="/dashboard/tours">
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
export default AddTour;
