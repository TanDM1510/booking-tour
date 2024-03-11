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
import { useNavigate, useParams } from "react-router-dom";
import { updateActivity } from "../../../redux/features/activities/allActivities";
import { getAllLocation } from "../../../redux/features/location/allLocation";

const UpdateActivity = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { location } = useSelector((store) => store.allLocation);
  useEffect(() => dispatch(getAllLocation()), []);

  const { activities, isLoading } = useSelector((state) => state.allActivities);
  const [updateData, setUpdateData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      const findActivity = activities.find((us) => us.id == id);
      setUpdateData(findActivity || {});
    }
  }, [id]);
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
            <Select
              placeholder={
                location.find((l) => l.id === updateData.locationId)
                  ?.locationName || "Select a location"
              }
              required
              name="locationId"
              onChange={inputChangHandler}
              value={updateData && updateData.locationId}
            >
              {location.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.locationName}
                </SelectItem>
              ))}
            </Select>
            <Input
              required
              label="Activity duration"
              name="activityDuration"
              type="time"
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
            <Button
              color="danger"
              variant="light"
              onClick={() => navigate("/dashboard/activities")}
            >
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

export default UpdateActivity;
