import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

const ViewTour = () => {
  const { id } = useParams();
  const { tours } = useSelector((state) => state.tours);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    if (id) {
      const findTour = tours.find((us) => us.id == id);
      setData(findTour || {});
    }
  }, [id]);
  return (
    <div>
      <Card className="grid place-items-center ">
        <CardHeader className="flex flex-col gap-3 lg:w-96 font-bold text-3xl">
          {"City details"}
        </CardHeader>
        <CardBody className="flex flex-col gap-3 w-52 justify-center items-start">
          <p className="font-semibold">Tour Name : {data.tourName}</p>
          <p className="font-semibold">Price : {data.price}</p>
          <p className="font-semibold">Vehicle Name: {data.vehicleTypeId}</p>
          <p className="font-semibold">Image : {data.image}</p>
          <p className="font-semibold">Tour Type : {data.tourType}</p>
          <p className="font-semibold">
            Status : {data.status ? "Active" : "Disable"}
          </p>
        </CardBody>
        <CardFooter className="flex flex-row-reverse gap-2"></CardFooter>
      </Card>
    </div>
  );
};

export default ViewTour;
