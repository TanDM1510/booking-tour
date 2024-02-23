import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

const ViewLocationInTour = () => {
  const { id } = useParams();
  const { locationInTours } = useSelector((store) => store.locationInTour);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    if (id) {
      const findLocation = locationInTours.find((us) => us.id == id);
      setData(findLocation || {});
    }
  }, [id]);
  return (
    <div>
      <Card className="grid place-items-center ">
        <CardHeader className="flex flex-col gap-3 lg:w-96 font-bold text-3xl">
          {"City details"}
        </CardHeader>
        <CardBody className="flex flex-col gap-3 w-52 justify-center items-start">
          <p className="font-semibold">Location Name : {data.locationId}</p>
          <p className="font-semibold">Tour Name : {data.tourId}</p>
          <p className="font-semibold">Duration : {data.duration}</p>
          <p className="font-semibold">Description : {data.description}</p>
          <p className="font-semibold">Start City : {data.startCity}</p>
          <p className="font-semibold">End City : {data.endCity}</p>
          <p className="font-semibold">
            Status : {data.status ? "Active" : "Disable"}
          </p>
        </CardBody>
        <CardFooter className="flex flex-row-reverse gap-2"></CardFooter>
      </Card>
    </div>
  );
};

export default ViewLocationInTour;
