import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

const ViewActivity = () => {
  const { id } = useParams();

  const { activities } = useSelector((state) => state.allActivities);

  const [data, setData] = useState({}); // Sử dụng giá trị mặc định là {}
  console.log(data);
  useEffect(() => {
    if (id) {
      const findActivity = activities.find((us) => us.id == id);
      setData(findActivity || {}); // Nếu không tìm thấy user, sử dụng object trống
    }
  }, [id]); // Thêm id vào mảng phụ thuộc

  return (
    <div>
      <Card className="grid place-items-center ">
        <CardHeader className="flex flex-col gap-3 lg:w-96 font-bold text-3xl">
          {"Activity details"}
        </CardHeader>
        <CardBody className="flex flex-col gap-3 w-52 justify-center items-start">
          <p className="font-semibold">Location Name : {data.locationId}</p>
          <p className="font-semibold">Activity Name : {data.activityName}</p>
          <p className="font-semibold">
            Activity Duration: {data.activityDuration}
          </p>
          <p className="font-semibold">
            Activity Description : {data.activityDescription}
          </p>
          <p className="font-semibold">
            Status : {data.status ? "Active" : "Disable"}
          </p>
        </CardBody>
        <CardFooter className="flex flex-row-reverse gap-2"></CardFooter>
      </Card>
    </div>
  );
};

export default ViewActivity;
