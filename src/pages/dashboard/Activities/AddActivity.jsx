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
import { useNavigate } from "react-router-dom";
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
    status: true,
  });

  const dispatch = useDispatch();
  const { location } = useSelector((store) => store.allLocation);
  const activeLocation = location.filter((l) => l.status === true);

  useEffect(() => {
    dispatch(getAllLocation());
  }, [dispatch]); // Thêm dispatch vào dependency array của useEffect

  const inputChangeHandler = (e) => {
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
      !activity.locationId
    ) {
      toast.error("Please fill all the blanks");
      return;
    }
    dispatch(createActivity(activity));
    setActivity({
      locationId: "",
      activityName: "",
      activityDuration: "",
      activityDescription: "",
      status: true,
    });
  };

  const navigate = useNavigate();

  return (
    <>
      <Card className="grid place-items-center">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96 font-bold text-3xl">
            {"Add Activity"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Input
              required
              label="Activity Name"
              name="activityName"
              type="text"
              onChange={inputChangeHandler}
              value={activity.activityName || ""}
            />
            <Select
              placeholder="Select a location"
              label="Location name"
              required
              name="locationId"
              onChange={inputChangeHandler}
              value={activity.locationId || ""}
            >
              {activeLocation.map((s) => (
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
              onChange={inputChangeHandler}
              value={activity.activityDuration || ""}
            />
            <Input
              required
              label="Activity description"
              name="activityDescription"
              type="text"
              onChange={inputChangeHandler}
              value={activity.activityDescription || ""}
            />
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

export default AddActivity;
