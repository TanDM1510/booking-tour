import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import {
  Avatar,
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
const PointDetails = () => {
  const { id } = useParams();
  const { pointOfInterest } = useSelector((store) => store.allPoiOfInterest);
  const { location } = useSelector((store) => store.allLocation);
  const { pois } = useSelector((store) => store.pois);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    if (id) {
      const findPoint = pointOfInterest.find((us) => us.id == id);
      setData(findPoint || {});
    }
  }, [id]);
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="font-semibold text-lg mb-3 ">Point of interest details</p>
      <Table aria-label="Example static collection table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>{data.POIName}</TableCell>
            <TableCell>{data.POIDescription}</TableCell>
            <TableCell>
              {location.find((l) => l.id === data.locationId)?.locationName}
            </TableCell>
            <TableCell>
              {pois.find((l) => l.id === data.categoryPOI_ID)?.categoryName}
            </TableCell>
            <TableCell>
              <img src={data.image} height={200} width={200} />
            </TableCell>
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
              <Button
                color="primary"
                onClick={() => navigate("/dashboard/poiOfInterest")}
              >
                Back
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PointDetails;
