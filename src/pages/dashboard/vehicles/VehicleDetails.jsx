import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { columns } from "./data";
const statusColorMap = {
  true: "success",
  false: "danger",
};
const ViewVehicle = () => {
  const { id } = useParams();
  const { vehicles } = useSelector((state) => state.vehicles);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    if (id) {
      const findVehicel = vehicles.find((us) => us.id == id);
      setData(findVehicel || {});
    }
  }, [id]);
  const navigate = useNavigate(); // Use navigate for navigation
  const handleClose = () => {
    navigate("/dashboard/vehicles");
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="font-semibold text-lg mb-3 ">Vehicle Details</p>
      <Table aria-label="Example static collection table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>{data.vehicleName}</TableCell>
            <TableCell>{data.capacity}</TableCell>
            <TableCell>
              <Chip
                className="capitalize"
                color={statusColorMap[data.status]}
                size="sm"
                variant="flat"
              >
                {data.status ? "Active" : "Disable"}
              </Chip>
            </TableCell>
            <TableCell>
              <Button color="primary" onClick={handleClose}>
                Back
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewVehicle;
