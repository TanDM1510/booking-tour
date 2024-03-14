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
import { clearRedirect, updateTour } from "../../../redux/features/tours/tours";
import { getAllVehicles } from "../../../redux/features/vehicles/vehicles";
import { tourType } from "./data";

const UpdateTour = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tours, isLoading, redirect } = useSelector((state) => state.tours);
  console.log(redirect);
  const [updateData, setUpdateData] = useState({});
  console.log(updateData);
  useEffect(() => {
    if (id) {
      const findTour = tours.find((us) => us.id == id);
      setUpdateData(findTour || {});
    }
  }, [id]);

  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "vehicleTypeId") {
      value = parseInt(value);
    } else if (e.target.name === "price") {
      value = parseInt(value);
    }
    setUpdateData({ ...updateData, [e.target.name]: value });
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

    dispatch(updateTour({ formData, id: updateData.id }));
  };
  useEffect(() => {
    dispatch(getAllVehicles());
  }, []);
  const { vehicles } = useSelector((store) => store.vehicles);
  const navigate = useNavigate(); // Use navigate for navigation
  const handleClose = () => {
    navigate("/dashboard/tours");
  };
  const [imageFile, setImageFile] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  if (redirect == 1) {
    dispatch(clearRedirect());
    navigate("/dashboard/tours");
  }
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Update tour"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Select
              placeholder={
                vehicles.find((v) => v.id === updateData.vehicleTypeId)
                  ?.vehicleName || "Select a vehicle"
              }
              required
              name="vehicleTypeId"
              onChange={inputChangHandler}
              value={updateData && updateData.vehicleTypeId}
            >
              {vehicles.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.vehicleName}
                </SelectItem>
              ))}
            </Select>
            <Input
              required
              label="Tour Name"
              name="tourName"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.tourName}
            />
            <Input
              required
              label="Price"
              name="price"
              min={0}
              type="number"
              onChange={inputChangHandler}
              value={updateData && updateData.price}
            />
            <img src={updateData.image} height={70} width={100} />

            <input
              name="files"
              type="file"
              placeholder="Update Image"
              onChange={handleImageChange}
            />
            <Select
              placeholder={updateData.tourType || "Select a tour type"}
              required
              name="tourType"
              onChange={inputChangHandler}
              value={updateData && updateData.tourType}
            >
              {tourType.map((s) => (
                <SelectItem key={s.name} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
            </Select>
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
            <Button color="danger" variant="light" onClick={handleClose}>
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

export default UpdateTour;
