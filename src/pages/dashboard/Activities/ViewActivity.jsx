import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
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
const ViewActivity = () => {
  const { id } = useParams();
  const statusColorMap = {
    true: "success",
    false: "danger",
  };
  const { activities } = useSelector((state) => state.allActivities);
  const { location } = useSelector((state) => state.allLocation);
  const [data, setData] = useState({}); // Sử dụng giá trị mặc định là {}
  console.log(data);
  useEffect(() => {
    if (id) {
      const findActivity = activities.find((us) => us.id == id);
      setData(findActivity || {}); // Nếu không tìm thấy user, sử dụng object trống
    }
  }, [id]); // Thêm id vào mảng phụ thuộc
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="font-semibold text-lg mb-3 ">Activity Details</p>
      <Table aria-label="Example static collection table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>
              {location.find((l) => l.id === data.locationId)?.locationName}
            </TableCell>
            <TableCell>{data.activityName}</TableCell>
            <TableCell>{data.activityDuration}</TableCell>
            <TableCell>{data.activityDescription}</TableCell>
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
              <Link to={"/dashboard/activities"}>
                <Button color="primary">Back</Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
export default ViewActivity;
