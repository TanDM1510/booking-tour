import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

const ViewTrip = () => {
  const { id } = useParams();
  const { trips } = useSelector((store) => store.trips);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    if (id) {
      const findTrip = trips.find((us) => us.id == id);
      setData(findTrip || {});
    }
  }, [id]);
  return (
    <div>
      <Card className="grid place-items-center ">
        <CardHeader className="flex flex-col gap-3 lg:w-96 font-bold text-3xl">
          {"City details"}
        </CardHeader>
        <CardBody className="flex flex-col gap-3 w-52 justify-center items-start">
          <p className="font-semibold">Location Name : {data.tourGuideId}</p>
          <p className="font-semibold">Tour Name : {data.tourId}</p>
          <p className="font-semibold">Duration : {data.totalCustomer}</p>
          <p className="font-semibold">Description : {data.startDate}</p>
          <p className="font-semibold">Start City : {data.endDate}</p>
          <p className="font-semibold">
            Status : {data.status ? "Active" : "Disable"}
          </p>
        </CardBody>
        <CardFooter className="flex flex-row-reverse gap-2"></CardFooter>
      </Card>
    </div>
  );
};

export default ViewTrip;
