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
import {
  clearRedirect,
  updateLocation,
} from "../../../redux/features/location/allLocation";
import { getAllCity } from "../../../redux/features/city/allCity";

const UpdateLocation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { location, isLoading, redirectPage } = useSelector(
    (state) => state.allLocation
  );
  const [updateData, setUpdateData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id && location) {
      const findLocation = location.find((loc) => loc.id === parseInt(id));
      setUpdateData(findLocation || {});
    }
  }, [id]);

  const inputChangeHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "cityId") {
      value = parseInt(value);
    }
    setUpdateData({ ...updateData, [e.target.name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImageFile(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Gom tất cả dữ liệu cập nhật vào currentData
    // currentData sẽ chứa tất cả các khóa và giá trị từ updateData
    // Ví dụ: currentData: { key1: value1, key2: value2, ... }
    formData.append("files", imageFile);
    formData.append("currentData", JSON.stringify(updateData));
    // Kiểm tra nếu có file hình ảnh được chọn, thêm nó vào formData

    dispatch(updateLocation({ formData, id: updateData.id }));
  };

  useEffect(() => {
    dispatch(getAllCity());
  }, [dispatch]);

  const navigate = useNavigate();

  if (redirectPage === 1) {
    dispatch(clearRedirect());
    navigate("/dashboard/location");
  }
  const { city } = useSelector((state) => state.allCity);
  const activeCity = city.filter((c) => c.status === true);

  return (
    <Card className="grid place-items-center">
      <form onSubmit={handleSubmit}>
        <CardHeader className="flex flex-col gap-3 lg:w-96 font-bold text-3xl">
          Update Location
        </CardHeader>
        <CardBody className="flex flex-col gap-3 w-full">
          <Select
            label="City"
            placeholder={
              updateData.cityId
                ? city.find((c) => c.id === updateData.cityId)?.cityName
                : "Select a city"
            }
            required
            name="cityId"
            onChange={inputChangeHandler}
            value={updateData.cityId || updateData}
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
            onChange={inputChangeHandler}
            value={updateData.locationName || ""}
          />
          <Input
            required
            label="Location address"
            name="locationAddress"
            type="text"
            onChange={inputChangeHandler}
            value={updateData.locationAddress || ""}
          />
          <img src={updateData.image} height={70} width={100} />

          <input
            name="files"
            type="file"
            placeholder="Update Image"
            onChange={handleImageChange}
          />
          {/* <label htmlFor="files">Update Image</label>
          <input
            label="Image"
            name="files"
            type="file"
            onChange={handleImageChange}
          /> */}

          <RadioGroup
            isRequired
            className="mt-3"
            name="status"
            label="Active or Disable"
            onChange={inputChangeHandler}
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
  );
};

export default UpdateLocation;
