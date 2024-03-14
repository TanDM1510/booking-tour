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
  Spinner,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCity } from "../../../redux/features/city/citySlice";

const UpdateCity = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.allCity);
  const { isLoading } = useSelector((state) => state.city);
  const [updateData, setUpdateData] = useState({});
  console.log(updateData);
  useEffect(() => {
    if (id) {
      const findCity = city.find((us) => us.id == id);
      setUpdateData(findCity || {});
    }
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateData);
    dispatch(updateCity(updateData));
  };

  const inputChangeHandler = (e) => {
    const value =
      e.target.name === "status" ? e.target.value === "true" : e.target.value;
    setUpdateData({ ...updateData, [e.target.name]: value });
  };
  const navigate = useNavigate();
  return (
    <>
      <Card className="grid place-items-center ">
        <form>
          <CardHeader className="flex flex-col gap-3 lg:w-96 font-bold text-3xl">
            {"Edit City"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Input
              required
              label="City Name"
              name="cityName"
              type="text"
              onChange={inputChangeHandler}
              value={updateData && updateData.cityName}
              isDisabled
            />
            <Input
              required
              label="Country"
              name="country"
              type="text"
              onChange={inputChangeHandler}
              value={updateData && updateData.country}
              isDisabled
            />
            <RadioGroup
              isRequired
              className="mt-3"
              name="status"
              label="Active or Disable"
              value={updateData && updateData.status}
              onChange={inputChangeHandler}
            >
              <Radio value={true}>Active</Radio>
              <Radio value={false}>Disable</Radio>
            </RadioGroup>
          </CardBody>
          <CardFooter className="flex flex-row-reverse gap-2">
            <Button
              color="danger"
              variant="light"
              onClick={() => navigate("/dashboard/city")}
            >
              Close
            </Button>

            <Button
              color="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
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

export default UpdateCity;
