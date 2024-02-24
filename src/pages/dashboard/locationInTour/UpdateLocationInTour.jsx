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
  Spinner,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updateLocationInTour } from "../../../redux/features/locationInTour/locationInTour";
import { getAllLocation } from "../../../redux/features/location/allLocation";
import { getAllTours } from "../../../redux/features/tours/tours";

const UpdateLocationInTour = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { locationInTours, isLoading } = useSelector(
    (store) => store.locationInTour
  );
  const [updateData, setUpdateData] = useState({}); // Sử dụng giá trị mặc định là {}
  console.log(updateData);
  useEffect(() => {
    if (id) {
      const findLocation = locationInTours.find((us) => us.id == id);
      setUpdateData(findLocation || {}); // Nếu không tìm thấy user, sử dụng object trống
    }
  }, [id]); // Thêm id vào mảng phụ thuộc
  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "locationId") {
      value = parseInt(value);
    } else if (e.target.name === "tourId") {
      value = parseInt(value);
    }
    setUpdateData({ ...updateData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateData);
    dispatch(updateLocationInTour(updateData));
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
            {"Update Location in tour"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            {/* <Input
              required
              label="Location Name"
              name="locationId"
              type="number"
              onChange={inputChangHandler}
              value={updateData && updateData.locationId}
            />
            <Input
              required
              label="Tour Name"
              name="tourId"
              type="number"
              onChange={inputChangHandler}
              value={updateData && updateData.tourId}
            /> */}
            <select
              required
              name="locationId"
              onChange={inputChangHandler}
              value={updateData && updateData.locationId}
            >
              <option value="">
                {
                  location.find((l) => l.id === updateData.locationId)
                    ?.locationName
                }
              </option>
              {location.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.locationName}
                </option>
              ))}
            </select>
            <select
              required
              name="tourId"
              onChange={inputChangHandler}
              value={updateData && updateData.tourId}
            >
              <option value="">
                {tours.find((t) => t.id === updateData.tourId)?.tourName}
              </option>
              {tours.map((tour) => (
                <option key={tour.id} value={tour.id}>
                  {tour.tourName}
                </option>
              ))}
            </select>
            <Input
              required
              label="Duration"
              name="duration"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.duration}
            />
            <Input
              required
              label="Start City"
              name="startCity"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.startCity}
            />
            <Input
              required
              label="End City"
              name="endCity"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.endCity}
            />
            <Input
              required
              label="Description"
              name="description"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.description}
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

export default UpdateLocationInTour;
