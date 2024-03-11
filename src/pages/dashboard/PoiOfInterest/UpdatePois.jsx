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
import { updatePoint } from "../../../redux/features/poiOfInterest/allPoiOfInterest";
import { getAllPois } from "../../../redux/features/pois/pois";
import { getAllLocation } from "../../../redux/features/location/allLocation";

const UpdatePoint = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pointOfInterest, isLoading } = useSelector(
    (state) => state.allPoiOfInterest
  );
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    if (id) {
      const findPoint = pointOfInterest.find((us) => us.id == id);
      setUpdateData(findPoint || {});
    }
  }, [id]);
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
    console.log(updateData);
    dispatch(updatePoint(updateData));
  };
  const { location } = useSelector((store) => store.allLocation);
  const { pois } = useSelector((store) => store.pois);
  useEffect(() => {
    dispatch(getAllPois());
    dispatch(getAllLocation());
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Add Location"}
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
              {location.map((locationItem) => (
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
              {pois.map((poisItem) => (
                <SelectItem key={poisItem.id} value={poisItem.id}>
                  {poisItem.categoryName}
                </SelectItem>
              ))}
            </Select>
            <Input
              required
              label="Image"
              name="image"
              type="file"
              onChange={inputChangHandler}
              value={updateData && updateData.image}
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
