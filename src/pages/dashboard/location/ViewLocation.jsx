import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

const ViewLocation = () => {
  const { id } = useParams();
  const { location } = useSelector((state) => state.allLocation);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    if (id) {
      const findLocation = location.find((us) => us.id == id);
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
          <p className="font-semibold">City Name : {data.cityId}</p>
          <p className="font-semibold">Location Name : {data.locationName}</p>
          <p className="font-semibold">
            Location Name : {data.locationAddress}
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

export default ViewLocation;
