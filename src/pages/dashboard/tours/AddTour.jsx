import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  // Radio,
  // RadioGroup,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";
import { tourType } from "./data";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createTour } from "../../../redux/features/tours/tours";
import { getAllVehicles } from "../../../redux/features/vehicles/vehicles";

const AddTour = () => {
  const [tour, setTour] = useState({
    tourName: "",
    price: "",
    vehicleTypeId: "",
    tourType: "",
    image: "",
    status: true,
  });
  console.log(tour.image);
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
      !tour.tourType
    ) {
      toast.error("Please fill all the blank");
      return;
    }
    dispatch(
      createTour({
        ...tour,
        image: null,
      })
    );
    setTour({
      tourName: "",
      price: "",
      tourType: tour.tourType,
      image: "",
      vehicleTypeId: tour.vehicleTypeId,
      status: true,
    });
  };
  useEffect(() => {
    dispatch(getAllVehicles());
  }, []);
  const { vehicles } = useSelector((store) => store.vehicles);
  const navigate = useNavigate(); // Use navigate for navigation
  const handleClose = () => {
    navigate("/dashboard/tours");
  };

  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Add tour"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Select
              placeholder={"Select a vehicle"}
              required
              name="vehicleTypeId"
              onChange={inputChangHandler}
              value={tour.vehicleTypeId !== undefined ? tour.vehicleTypeId : ""}
            >
              {vehicles.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.vehicleName}
                </SelectItem>
              ))}
            </Select>
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
              min={0}
              name="price"
              type="number"
              onChange={inputChangHandler}
              value={tour.price !== undefined ? tour.price : ""}
            />

            <Select
              placeholder={"Select a tour type"}
              required
              name="tourType"
              onChange={inputChangHandler}
              value={tour.tourType !== undefined ? tour.tourType : ""}
            >
              {tourType.map((s) => (
                <SelectItem key={s.name} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
            </Select>
          </CardBody>
          <CardFooter className="flex flex-row-reverse gap-2">
            <Button color="danger" variant="light" onClick={handleClose}>
              Close
            </Button>
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
