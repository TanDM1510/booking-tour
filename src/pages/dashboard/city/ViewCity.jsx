import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { columns } from "./data";
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
const ViewCity = () => {
  const { id } = useParams();
  const { city } = useSelector((state) => state.allCity);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    if (id) {
      const findCity = city.find((us) => us.id == id);
      setData(findCity || {});
    }
  }, [id]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="font-semibold text-lg mb-3 ">City Details</p>
      <Table aria-label="Example static collection table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>{data.cityName}</TableCell>
            <TableCell>{data.country}</TableCell>
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
              <Link to={"/dashboard/city"}>
                <Button color="primary">Back</Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewCity;
