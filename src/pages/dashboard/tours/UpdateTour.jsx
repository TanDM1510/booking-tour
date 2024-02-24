import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updateTour } from "../../../redux/features/tours/tours";
import { getAllVehicles } from "../../../redux/features/vehicles/vehicles";

const UpdateTour = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tours, isLoading } = useSelector((state) => state.tours);
  const [updateData, setUpdateData] = useState({}); // Sử dụng giá trị mặc định là {}
  console.log(updateData);
  useEffect(() => {
    if (id) {
      const findTour = tours.find((us) => us.id == id);
      setUpdateData(findTour || {}); // Nếu không tìm thấy user, sử dụng object trống
    }
  }, [id]); // Thêm id vào mảng phụ thuộc

  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "vehicleTypeId") {
      value = parseInt(value);
    } else if (e.target.name === "price") {
      value = parseInt(value);
    }
    setUpdateData({ ...updateData, [e.target.name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateData);
    dispatch(updateTour(updateData));
  };
  useEffect(() => {
    dispatch(getAllVehicles());
  }, []);
  const { vehicles } = useSelector((store) => store.vehicles);
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Update tour"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            {/* <Input
              required
              label="Vehicle Name"
              name="vehicleTypeId"
              type="number"
              onChange={inputChangHandler}
              value={updateData && updateData.vehicleTypeId}
            /> */}
            {/* <select
              required
              name="vehicleTypeId"
              onChange={inputChangHandler}
              value={updateData && updateData.vehicleTypeId}
            >
              <option value="">Select a vehicle</option>
              {vehicles.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.vehicleName}
                </option>
              ))}
            </select> */}
            <Select
              placeholder={
                vehicles.find((v) => v.id === updateData.vehicleTypeId)
                  ?.vehicleName || "Select a vehicle"
              }
              required
              name="vehicleTypeId"
              onChange={inputChangHandler}
              value={updateData && updateData.vehicleTypeId}
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
              value={updateData && updateData.tourName}
            />
            <Input
              required
              label="Price"
              name="price"
              type="number"
              onChange={inputChangHandler}
              value={updateData && updateData.price}
            />
            <Input
              required
              label="Tour type"
              name="tourType"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.tourType}
            />
            <Input
              required
              label="Image"
              name="image"
              type="file"
              onChange={inputChangHandler}
              value={updateData && updateData.image}
            />
            <RadioGroup
              isRequired
              className="mt-3"
              name="status"
              label="Active or Disable"
              onChange={inputChangHandler}
              value={updateData && updateData.status}
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

export default UpdateTour;
