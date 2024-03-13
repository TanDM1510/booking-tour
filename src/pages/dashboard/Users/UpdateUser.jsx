import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { updateUser } from "../../../redux/features/user/allUser";
import { roles } from "./data";

const UpdateUserRole = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((store) => store.allUser);
  const [updateData, setUpdateData] = useState({});

  const data = {
    id: updateData._id,
    roleId: updateData.roleId,
  };
  console.log(data);
  useEffect(() => {
    if (id) {
      const findUser = users.find((us) => us._id == id);
      setUpdateData(findUser || {});
    }
  }, [id]);

  const inputChangHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") {
      value = value === "true";
    } else if (e.target.name === "roleId") {
      value = parseInt(value);
    }
    setUpdateData({ ...updateData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(data));
  };

  const navigate = useNavigate();
  return (
    <>
      <Card className="grid place-items-center ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col gap-3 lg:w-96  font-bold text-3xl">
            {"Add Location"}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 w-full">
            <Select
              placeholder={
                roles.find((c) => c.id === updateData.roleId)?.name ||
                "Select a role"
              }
              required
              name="roleId"
              onChange={inputChangHandler}
              value={updateData && updateData.roleId}
            >
              {roles.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </Select>
          </CardBody>
          <CardFooter className="flex flex-row-reverse gap-2">
            <Button
              color="danger"
              variant="light"
              onClick={() => navigate("/dashboard/users")}
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

export default UpdateUserRole;
