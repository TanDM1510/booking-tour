import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";

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

const statusColorMap = {
  true: "success",
  false: "danger",
};
import { columns } from "./data";
const ViewLocationInTour = () => {
  const { id } = useParams();
  const { locationInTours } = useSelector((store) => store.locationInTour);
  const [data, setData] = useState({});
  const { location } = useSelector((store) => store.allLocation);
  const { tours } = useSelector((store) => store.tours);
  console.log(data);
  useEffect(() => {
    if (id) {
      const findLocation = locationInTours.find((us) => us.id == id);
      setData(findLocation || {});
    }
  }, [id]);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="font-semibold text-lg mb-3 ">Location In Tour Details</p>
      <Table aria-label="Example static collection table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>
              {tours.find((t) => t.id == data.tourId)?.tourName}
            </TableCell>
            <TableCell>
              {location.find((t) => t.id == data.locationId)?.locationName}
            </TableCell>
            <TableCell>{data.duration}</TableCell>
            <TableCell>{data.description}</TableCell>
            <TableCell>{data.startCity}</TableCell>
            <TableCell>{data.endCity}</TableCell>
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
              <Link to={"/dashboard/locationTour"}>
                <Button color="primary">Back</Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewLocationInTour;
