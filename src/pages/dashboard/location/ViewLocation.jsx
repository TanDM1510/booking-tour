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
const ViewLocation = () => {
  const { id } = useParams();
  const { location } = useSelector((state) => state.allLocation);
  const { city } = useSelector((store) => store.allCity);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    if (id) {
      const findLocation = location.find((us) => us.id == id);
      setData(findLocation || {});
    }
  }, [id]);
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
            <TableCell>{data.locationName}</TableCell>
            <TableCell>
              {city.find((c) => c.id === data.cityId)?.cityName}
            </TableCell>
            <TableCell>{data.locationAddress}</TableCell>

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
              <Link to={"/dashboard/location"}>
                <Button color="primary">Back</Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewLocation;
