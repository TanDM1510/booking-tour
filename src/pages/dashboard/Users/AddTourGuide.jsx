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
import { toast } from "react-toastify";

import { getAllUser } from "../../../redux/features/user/allUser";
import { createTourGuide } from "../../../redux/features/tourGuide/tourGuides";

const AddTourGuide = () => {
  const [tourGuide, setTourGuide] = useState({
    userId: "",
    languages: [],
    status: true,
  });

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const { users } = useSelector((store) => store.allUser);
  const activeUser = users.filter((user) => user.status === true);
  const { isLoading } = useSelector((store) => store.tourGuide);

  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setTourGuide({ ...tourGuide, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tourGuide.userId || !tourGuide.languages) {
      toast.error("Please fill in all the fields.");
      return;
    }

    try {
      await dispatch(createTourGuide(tourGuide));

      setTourGuide({
        userId: "",
        languages: [],
        status: true,
      });
    } catch (error) {
      toast.error("Failed to add tour guide. Please try again later.");
    }
  };

  const navigate = useNavigate();

  return (
    <Card className="grid place-items-center ">
      <form onSubmit={handleSubmit}>
        <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
          {"Add Tour Guide"}
        </CardHeader>
        <CardBody className="flex flex-col gap-3 w-full">
          <Select
            placeholder="Select a user"
            required
            name="userId"
            onChange={inputChangeHandler}
            value={tourGuide.userId}
          >
            {activeUser.map((user) => (
              <SelectItem key={user._id} value={user._id}>
                {user.fullName}
              </SelectItem>
            ))}
          </Select>
          {/* <Input
            
            required
            label="Languages"
            name="languages"
            type="text"
            onChange={inputChangeHandler}
            value={tourGuide.languages}
          /> */}
        </CardBody>
        <CardFooter className="flex flex-row-reverse gap-2">
          <Button
            color="danger"
            variant="light"
            onClick={() => navigate(`/dashboard/users`)}
          >
            Close
          </Button>

          <Button color="primary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Spinner className="mr-5" size="sm" color="white" />
                Sending...
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

export default AddTourGuide;
