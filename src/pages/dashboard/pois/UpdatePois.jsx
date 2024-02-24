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
import { Link, useParams } from "react-router-dom";
import { updatePois } from "../../../redux/features/pois/pois";

const UpdatePois = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pois, isLoading } = useSelector((state) => state.pois);
  const [updateData, setUpdateData] = useState({}); // Sử dụng giá trị mặc định là {}
  console.log(updateData);
  useEffect(() => {
    if (id) {
      const findPois = pois.find((us) => us.id == id);
      setUpdateData(findPois || {}); // Nếu không tìm thấy user, sử dụng object trống
    }
  }, [id]); // Thêm id vào mảng phụ thuộc

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
              name="categoryName"
              type="text"
              onChange={inputChangHandler}
              value={updateData && updateData.categoryName}
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
            <Link to="/dashboard/pois">
              <Button color="danger" variant="light">
                Close
              </Button>
            </Link>

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
