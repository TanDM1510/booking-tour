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
import { updatePois } from "../../../redux/features/pois/pois";

const UpdatePois = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pois, isLoading } = useSelector((state) => state.pois);
  const [updateData, setUpdateData] = useState({});
  console.log(updateData);
  useEffect(() => {
    if (id) {
      const findPois = pois.find((us) => us.id == id);
      setUpdateData(findPois || {});
    }
  }, [id]);
  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    }
    setUpdateData({ ...updateData, [e.target.name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateData);
    dispatch(updatePois(updateData));
  };
  const navigate = useNavigate();
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Update Pois"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Input
              required
              label="Category Name"
              name="categotyName"
              type="text"
              placeholder={updateData.category}
              onChange={inputChangHandler}
              value={updateData && updateData.categotyName}
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
              onClick={() => navigate("/dashboard/pois")}
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

export default UpdatePois;
