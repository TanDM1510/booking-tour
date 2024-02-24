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
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createActivity } from "../../../redux/features/activities/allActivities";
import { getAllLocation } from "../../../redux/features/location/allLocation";

const AddActivity = () => {
  const [activity, setActivity] = useState({
    locationId: "",
    activityName: "",
    activityDuration: "",
    activityDescription: "",
    status: "",
  });

  const dispatch = useDispatch();
  const { location } = useSelector((store) => store.allLocation);
  useEffect(() => dispatch(getAllLocation()), []);
  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "locationId") {
      value = parseInt(value);
    }

    setActivity({ ...activity, [e.target.name]: value });
  };

  const { isLoading } = useSelector((store) => store.allActivities);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !activity.activityDescription ||
      !activity.activityDuration ||
      !activity.activityName ||
      !activity.status ||
      !activity.locationId
    ) {
      toast.error("Please fill all the blank");
      return;
    }
    dispatch(createActivity(activity));
    setActivity({
      locationId: "",
      activityName: "",
      activityDuration: "",
      activityDescription: "",
      status: "",
    });
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
              value={
                activity.activityName !== undefined ? activity.activityName : ""
              }
            />
            {/* 
            <select
              required
              name="locationId"
              onChange={inputChangHandler}
              value={
                activity.locationId !== undefined ? activity.locationId : ""
              }
            >
              <option value="">Select a location</option>
              {location.map((locations) => (
                <option key={locations.id} value={locations.id}>
                  {locations.locationName}
                </option>
              ))}
            </select> */}
            <Select
              placeholder="Select a location"
              required
              name="locationId"
              onChange={inputChangHandler}
              value={location.cityId !== undefined ? location.cityId : ""}
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
              type="text"
              onChange={inputChangHandler}
              value={
                activity.activityDuration !== undefined
                  ? activity.activityDuration
                  : ""
              }
            />
            <Input
              required
              label="Activity description"
              name="activityDescription"
              type="text"
              onChange={inputChangHandler}
              value={
                activity.activityDescription !== undefined
                  ? activity.activityDescription
                  : ""
              }
            />
            <RadioGroup
              isRequired
              className="mt-3"
              name="status"
              label="Active or Disable"
              onChange={inputChangHandler}
              value={activity.status !== undefined ? activity.status : ""}
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
export default AddActivity;
