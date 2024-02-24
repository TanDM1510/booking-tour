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
import { updateActivity } from "../../../redux/features/activities/allActivities";
import { getAllLocation } from "../../../redux/features/location/allLocation";

const UpdateActivity = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { location } = useSelector((store) => store.allLocation);
  useEffect(() => dispatch(getAllLocation()), []);

  const { activities, isLoading } = useSelector((state) => state.allActivities);
  const [updateData, setUpdateData] = useState({}); // Sử dụng giá trị mặc định là {}

  useEffect(() => {
    if (id) {
      const findActivity = activities.find((us) => us.id == id);
      setUpdateData(findActivity || {}); // Nếu không tìm thấy user, sử dụng object trống
    }
  }, [id]); // Thêm id vào mảng phụ thuộc

  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "locationId") {
      value = parseInt(value);
    }

    setUpdateData({ ...updateData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateData);
    dispatch(updateActivity(updateData));
  };

  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Add Activity"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Input
              required
              label="Activity Name"
              name="activityName"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.activityName}
            />
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
              {location.map((locations) => (
                <option key={locations.id} value={locations.id}>
                  {locations.locationName}
                </option>
              ))}
            </select>
            <Input
              required
              label="Activity duration"
              name="activityDuration"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.activityDuration}
            />
            <Input
              required
              label="Activity description"
              name="activityDescription"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.activityDescription}
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
            <Link to="/dashboard/activities">
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

export default UpdateActivity;
