import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

const ViewCity = () => {
  const { id } = useParams();

  const { city } = useSelector((state) => state.allCity);

  const [data, setData] = useState({}); // Sử dụng giá trị mặc định là {}
  console.log(data);
  useEffect(() => {
    if (id) {
      const findCity = city.find((us) => us.id == id);
      setData(findCity || {}); // Nếu không tìm thấy user, sử dụng object trống
    }
  }, [id]); // Thêm id vào mảng phụ thuộc

  return (
    <div>
      <Card className="grid place-items-center ">
        <CardHeader className="flex flex-col gap-3 lg:w-96 font-bold text-3xl">
          {"City details"}
        </CardHeader>
        <CardBody className="flex flex-col gap-3 w-52 justify-center items-start">
          <p className="font-semibold">City Name : {data.cityName}</p>
          <p className="font-semibold">Country : {data.country}</p>
          <p className="font-semibold">
            Status : {data.status ? "Active" : "Disable"}
          </p>
        </CardBody>
        <CardFooter className="flex flex-row-reverse gap-2"></CardFooter>
      </Card>
    </div>
  );
};

export default ViewCity;
