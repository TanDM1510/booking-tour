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
import { updateTrip } from "../../../redux/features/trips/trips";
import { getAllTours } from "../../../redux/features/tours/tours";

const UpdateTrip = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { trips, isLoading } = useSelector((store) => store.trips);
  const [updateData, setUpdateData] = useState({}); // Sử dụng giá trị mặc định là {}
  console.log(updateData);
  useEffect(() => {
    if (id) {
      const findTrip = trips.find((us) => us.id == id);
      setUpdateData(findTrip || {}); // Nếu không tìm thấy user, sử dụng object trống
    }
  }, [id]); // Thêm id vào mảng phụ thuộc
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
    setUpdateData({ ...updateData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateData);
    dispatch(updateTrip(updateData));
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
              value={updateData && updateData.tourGuideId}
            />
            <Select
              placeholder={
                tours.find((t) => t.id === updateData.tourId)?.tourName ||
                "Select a tour"
              }
              required
              name="tourId"
              onChange={inputChangHandler}
              value={updateData && updateData.tourId}
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
              min={0}
              onChange={inputChangHandler}
              value={updateData && updateData.totalCustomer}
            />
            <Input
              required
              name="startDate"
              placeholder={updateData.startDate || "Start date"}
              type="date"
              onChange={inputChangHandler}
              value={updateData && updateData.startDate}
            />
            <Input
              required
              name="endDate"
              placeholder={updateData.endDate || "End date"}
              type="date"
              onChange={inputChangHandler}
              value={updateData && updateData.endDate}
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

export default UpdateTrip;
