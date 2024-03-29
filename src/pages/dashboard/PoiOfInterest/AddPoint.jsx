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
import { getAllLocation } from "../../../redux/features/location/allLocation";
import { toast } from "react-toastify";
import { getAllPois } from "../../../redux/features/pois/pois";
import { createPoint } from "../../../redux/features/poiOfInterest/allPoiOfInterest";
const AddPoint = () => {
  const [point, setPoint] = useState({
    POIName: "",
    POIDescription: "",
    locationId: "",
    categoryPOI_ID: "",
    image: "",
    status: true,
  });

  const { location } = useSelector((store) => store.allLocation);
  const activeLocation = location.filter((l) => l.status === true);
  const { pois } = useSelector((store) => store.pois);
  const activePois = pois.filter((p) => p.status === true);
  useEffect(() => {
    dispatch(getAllPois());
    dispatch(getAllLocation());
  }, []);
  const dispatch = useDispatch();
  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "locationId") {
      value = parseInt(value);
    } else if (e.target.name === "categoryPOI_ID") {
      value = parseInt(value);
    }
    setPoint({ ...point, [e.target.name]: value });
  };
  const { isLoading } = useSelector((store) => store.allPoiOfInterest);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !point.POIName ||
      !point.POIDescription ||
      !point.locationId ||
      !point.categoryPOI_ID
    ) {
      toast.error("Please fill all the blank");
      return;
    }
    dispatch(createPoint(point));
    setPoint({
      POIName: "",
      POIDescription: "",
      locationId: point.locationId,
      categoryPOI_ID: point.categoryPOI_ID,
      image: "",
      status: true,
    });
  };
  const navigate = useNavigate();
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Add point of interest"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Input
              required
              label="Poi Name"
              name="POIName"
              type="text"
              onChange={inputChangHandler}
              value={point.POIName !== undefined ? point.POIName : ""}
            />
            <Input
              required
              label="Description"
              name="POIDescription"
              type="text"
              onChange={inputChangHandler}
              value={
                point.POIDescription !== undefined ? point.POIDescription : ""
              }
            />
            <Select
              placeholder="Select a location"
              required
              name="locationId"
              onChange={inputChangHandler}
              value={point.locationId !== undefined ? point.locationId : ""}
            >
              {activeLocation.map((locationItem) => (
                <SelectItem key={locationItem.id} value={locationItem.id}>
                  {locationItem.locationName}
                </SelectItem>
              ))}
            </Select>
            <Select
              placeholder="Select a category"
              required
              name="categoryPOI_ID"
              onChange={inputChangHandler}
              value={
                point.categoryPOI_ID !== undefined ? point.categoryPOI_ID : ""
              }
            >
              {activePois.map((poisItem) => (
                <SelectItem key={poisItem.id} value={poisItem.id}>
                  {poisItem.categoryName}
                </SelectItem>
              ))}
            </Select>
            {/* <Input
              required
              label="Image"
              name="image"
              type="file"
              onChange={inputChangHandler}
              value={point.image !== undefined ? point.image : ""}
            /> */}
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
export default AddPoint;
