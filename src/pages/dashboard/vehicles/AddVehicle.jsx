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
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { createVehicle } from "../../../redux/features/vehicles/vehicles";

const AddVehicle = () => {
  const [vehicle, setVehicle] = useState({
    vehicleName: "",
    capacity: "",
    status: true,
  });

  const dispatch = useDispatch();
  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    }
    setVehicle({ ...vehicle, [e.target.name]: value });
  };

  const { isLoading } = useSelector((store) => store.vehicles);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vehicle.capacity || !vehicle.vehicleName || !vehicle.status) {
      toast.error("Please fill all the blank");
      return;
    }
    dispatch(createVehicle(vehicle));
    setVehicle({
      vehicleName: "",
      capacity: "",
      status: true,
    });
  };
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Add Vehicle"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Input
              required
              label="Vehicle name"
              name="vehicleName"
              type="text"
              onChange={inputChangHandler}
              value={
                vehicle.vehicleName !== undefined ? vehicle.vehicleName : ""
              }
            />
            <Input
              required
              label="Capacity"
              name="capacity"
              type="number"
              onChange={inputChangHandler}
              value={vehicle.capacity !== undefined ? vehicle.capacity : ""}
            />
          </CardBody>
          <CardFooter className="flex flex-row-reverse gap-2">
            <Link to="/dashboard/vehicles">
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
export default AddVehicle;
