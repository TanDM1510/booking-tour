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
import { createLocation } from "../../../redux/features/location/allLocation";
import { toast } from "react-toastify";
import { getAllCity } from "../../../redux/features/city/allCity";
const AddLocation = () => {
  const [location, setLocation] = useState({
    cityId: "",
    locationName: "",
    locationAddress: "",
    image: File,
    status: true,
  });
  console.log(location.image);
  console.log(location);
  const { city } = useSelector((store) => store.allCity);
  const activeCity = city.filter((c) => c.status === true);
  useEffect(() => {
    dispatch(getAllCity());
  }, []);
  const dispatch = useDispatch();
  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "cityId") {
      value = parseInt(value);
    } else if (e.target.name === "image") {
      value = e.target.files[0]; // Lấy hình ảnh từ sự kiện thay đổi của input file
    }
    setLocation({ ...location, [e.target.name]: value });
  };
  const { isLoading } = useSelector((store) => store.allLocation);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !location.cityId ||
      !location.locationAddress ||
      !location.locationName ||
      !location.status
    ) {
      toast.error("Please fill all the blank");
      return;
    }
    const formData = new FormData();
    formData.append("cityId", location.cityId);
    formData.append("locationName", location.locationName);
    formData.append("locationAddress", location.locationAddress);
    formData.append("image", location.image);
    formData.append("status", location.status);

    dispatch(createLocation(location));
    setLocation({
      locationName: "",
      locationAddress: "",
      cityId: location.cityId,
      image: location.image,
      status: true,
    });
  };
  const navigate = useNavigate();
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Add Location"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Select
              label="City Name"
              required
              name="cityId"
              onChange={inputChangHandler}
              value={location.cityId !== undefined ? location.cityId : ""}
            >
              {activeCity.map((cityItem) => (
                <SelectItem key={cityItem.id} value={cityItem.id}>
                  {cityItem.cityName}
                </SelectItem>
              ))}
            </Select>
            <Input
              required
              label="Location Name"
              name="locationName"
              type="text"
              onChange={inputChangHandler}
              value={
                location.locationName !== undefined ? location.locationName : ""
              }
            />
            <Input
              required
              label="Location address"
              name="locationAddress"
              type="text"
              onChange={inputChangHandler}
              value={
                location.locationAddress !== undefined
                  ? location.locationAddress
                  : ""
              }
            />
            <input
              required
              name="image"
              type="file"
              onChange={inputChangHandler}
              // Không cần giữ giá trị của hình ảnh ở đây
            />
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
export default AddLocation;
