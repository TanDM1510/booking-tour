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
  updatePoint,
} from "../../../redux/features/poiOfInterest/allPoiOfInterest";
import { getAllPois } from "../../../redux/features/pois/pois";
import { getAllLocation } from "../../../redux/features/location/allLocation";

const UpdatePoint = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pointOfInterest, isLoading, redirectPage } = useSelector(
    (state) => state.allPoiOfInterest
  );
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    if (id) {
      const findPoint = pointOfInterest.find((us) => us.id == id);
      setUpdateData(findPoint || {});
    }
  }, [id, updateData]);
  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "locationId") {
      value = parseInt(value);
    } else if (e.target.name === "categoryPOI_ID") {
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

    dispatch(updatePoint({ formData, id: updateData.id }));
  };
  const { location } = useSelector((store) => store.allLocation);
  const activeLocation = location.filter((l) => l.status === true);
  const { pois } = useSelector((store) => store.pois);
  const activePois = pois.filter((p) => p.status === true);
  useEffect(() => {
    dispatch(getAllPois());
    dispatch(getAllLocation());
  }, []);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImageFile(file);
  };

  if (redirectPage === 1) {
    dispatch(clearRedirect());
    navigate("/dashboard/poiOfInterest");
  }
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Update Poi of interest"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Input
              required
              label="Poi Name"
              name="POIName"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.POIName}
            />
            <Input
              required
              label="Description"
              name="POIDescription"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.POIDescription}
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
              {activeLocation.map((locationItem) => (
                <SelectItem key={locationItem.id} value={locationItem.id}>
                  {locationItem.locationName}
                </SelectItem>
              ))}
            </Select>
            <Select
              placeholder={
                pois.find((l) => l.id === updateData.categoryPOI_ID)
                  ?.categoryName || "Select a category"
              }
              required
              name="categoryPOI_ID"
              onChange={inputChangHandler}
              value={updateData && updateData.categoryPOI_ID}
            >
              {activePois.map((poisItem) => (
                <SelectItem key={poisItem.id} value={poisItem.id}>
                  {poisItem.categoryName}
                </SelectItem>
              ))}
            </Select>
            <img src={updateData.image} height={70} width={100} />

            <input
              name="files"
              type="file"
              placeholder="Update Image"
              onChange={handleImageChange}
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
              onClick={() => navigate("/dashboard/poiOfInterest")}
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

export default UpdatePoint;
