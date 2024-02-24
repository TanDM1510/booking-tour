import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

const ViewPois = () => {
  const { id } = useParams();
  const { pois } = useSelector((state) => state.pois);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    if (id) {
      const findPois = pois.find((us) => us.id == id);
      setData(findPois || {});
    }
  }, [id]);
  return (
    <div>
      <Card className="grid place-items-center ">
        <CardHeader className="flex flex-col gap-3 lg:w-96 font-bold text-3xl">
          {"City details"}
        </CardHeader>
        <CardBody className="flex flex-col gap-3 w-52 justify-center items-start">
          <p className="font-semibold">Category Name: {data.categoryName}</p>
          <p className="font-semibold">
            Status : {data.status ? "Active" : "Disable"}
          </p>
        </CardBody>
        <CardFooter className="flex flex-row-reverse gap-2"></CardFooter>
      </Card>
    </div>
  );
};

export default ViewPois;
