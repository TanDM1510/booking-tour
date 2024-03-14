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
  const activeLocation = location.filter((l) => l.status === true);
  const { activities, isLoading } = useSelector((state) => state.allActivities);

  const [updateData, setUpdateData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (id && activities) {
      const findActivity = activities.find((act) => act.id === parseInt(id));
      setUpdateData(findActivity || {});
    }
  }, [id, activities]);

  useEffect(() => {
    dispatch(getAllLocation());
  }, [dispatch]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: name === "status" ? value === "true" : parseInt(value) || value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateData) {
      dispatch(updateActivity(updateData));
    }
  };

  return (
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
            value={updateData.activityName || ""}
          />
          <Select
            placeholder={
              location.find((l) => l.id === updateData.locationId)
                ?.locationName || "Select a location"
            }
            required
            name="locationId"
            onChange={inputChangeHandler}
            value={updateData.locationId || ""}
          >
            {activeLocation.map((loc) => (
              <SelectItem key={loc.id} value={loc.id}>
                {loc.locationName}
              </SelectItem>
            ))}
          </Select>
          <Input
            required
            label="Activity duration"
            name="activityDuration"
            type="text"
            onChange={inputChangeHandler}
            value={updateData.activityDuration || ""}
          />
          <Input
            required
            label="Activity description"
            name="activityDescription"
            type="text"
            onChange={inputChangeHandler}
            value={updateData.activityDescription || ""}
          />
          <RadioGroup
            isRequired
            className="mt-3"
            name="status"
            label="Active or Disable"
            onChange={inputChangeHandler}
            value={String(updateData.status)}
          >
            <Radio value={"true"}>Active</Radio>
            <Radio value={"false"}>Disable</Radio>
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
  );
};

export default UpdateActivity;
