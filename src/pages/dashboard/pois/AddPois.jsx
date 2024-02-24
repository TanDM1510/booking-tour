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

import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { createPois } from "../../../redux/features/pois/pois";

const AddPois = () => {
  const [category, setCategory] = useState({
    categoryName: "",
    status: "",
  });

  const dispatch = useDispatch();
  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    }
    setCategory({ ...category, [e.target.name]: value });
  };

  const { isLoading } = useSelector((store) => store.pois);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category.categoryName || !category.status) {
      toast.error("Please fill all the blank");
      return;
    }
    dispatch(createPois(category));
    setCategory({
      categoryName: "",
      status: "",
    });
  };
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Add Pois"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Input
              required
              label="Category Name"
              name="categoryName"
              type="text"
              onChange={inputChangHandler}
              value={
                category.categoryName !== undefined ? category.categoryName : ""
              }
            />

            <RadioGroup
              isRequired
              className="mt-3"
              name="status"
              label="Active or Disable"
              onChange={inputChangHandler}
              value={category.status !== undefined ? category.status : ""}
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
export default AddPois;
