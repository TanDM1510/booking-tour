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
import { updateLocation } from "../../../redux/features/location/allLocation";
import { getAllCity } from "../../../redux/features/city/allCity";

const UpdateLocation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { location, isLoading } = useSelector((state) => state.allLocation);
  const [updateData, setUpdateData] = useState({});
  console.log(updateData);
  useEffect(() => {
    if (id) {
      const findLocation = location.find((us) => us.id == id);
      setUpdateData(findLocation || {});
    }
  }, [id]);

  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "cityId") {
      value = parseInt(value);
    }
    setUpdateData({ ...updateData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateData);
    dispatch(updateLocation(updateData));
  };
  const { city } = useSelector((store) => store.allCity);
  const activeCity = city.filter((c) => c.status === true);
  console.log(activeCity);
  console.log(city);
  useEffect(() => {
    dispatch(getAllCity());
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Update Location"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Select
              label="City"
              placeholder={
                activeCity.find((c) => c.id === updateData.cityId)?.cityName ||
                "Select a city"
              }
              required
              name="cityId"
              onChange={inputChangHandler}
              value={updateData && updateData.cityId}
            >
              {activeCity.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.cityName}
                </SelectItem>
              ))}
            </Select>

            <Input
              required
              label="Location Name"
              name="locationName"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.locationName}
            />
            <Input
              required
              label="Location address"
              name="locationAddress"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.locationAddress}
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
              onClick={() => navigate("/dashboard/location")}
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

export default UpdateLocation;
