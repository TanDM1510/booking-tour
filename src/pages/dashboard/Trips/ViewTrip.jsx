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
import moment from "moment";
const statusColorMap = {
  true: "success",
  false: "danger",
};
const ViewTrip = () => {
  const { id } = useParams();
  const format = (id) => moment(id).format("MMMM Do YYYY");
  const { trips } = useSelector((store) => store.trips);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    if (id) {
      const findTrip = trips.find((us) => us.id == id);
      setData(findTrip || {});
    }
  }, [id]);
  const { tourGuides } = useSelector((store) => store.tourGuide);
  const { tours } = useSelector((store) => store.tours);
  const navigate = useNavigate(); // Use navigate for navigation
  const handleClose = () => {
    navigate("/dashboard/trips");
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="font-semibold text-lg mb-3 ">Location Details</p>
      <Table aria-label="Example static collection table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>
              {
                tourGuides.find((t) => t._id === data.tourGuideId)?.userId
                  .fullName
              }
            </TableCell>
            <TableCell>
              {tours.find((c) => c.id === data.tourId)?.tourName}
            </TableCell>
            <TableCell>{data.totalCustomer}</TableCell>
            <TableCell>{format(data.startDate)}</TableCell>
            <TableCell>{format(data.endDate)}</TableCell>
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

export default ViewTrip;
