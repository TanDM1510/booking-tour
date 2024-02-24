import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

const ViewVehicle = () => {
  const { id } = useParams();
  const { vehicles } = useSelector((state) => state.vehicles);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    if (id) {
      const findVehicel = vehicles.find((us) => us.id == id);
      setData(findVehicel || {});
    }
  }, [id]);
  return (
    <div>
      <Card className="grid place-items-center ">
        <CardHeader className="flex flex-col gap-3 lg:w-96 font-bold text-3xl">
          {"Vehicle details"}
        </CardHeader>
        <CardBody className="flex flex-col gap-3 w-52 justify-center items-start">
          <p className="font-semibold">Vehicle Name : {data.vehicleName}</p>
          <p className="font-semibold">Capacity : {data.capacity}</p>
          <p className="font-semibold">
            Status : {data.status ? "Active" : "Disable"}
          </p>
        </CardBody>
        <CardFooter className="flex flex-row-reverse gap-2"></CardFooter>
      </Card>
    </div>
  );
};

export default ViewVehicle;
