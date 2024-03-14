import { useEffect, useState } from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import { getAllBookings } from "../../redux/features/bookings/bookings";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/features/user/allUser";
import { getAllTrips } from "../../redux/features/trips/trips";
import { getAllTourGuides } from "../../redux/features/tourGuide/tourGuides";

export default function DashboardStatsGrid() {
  const { bookings } = useSelector((store) => store.booking);
  console.log(bookings);
  let totalAmount = 0;

  if (bookings && bookings.length > 0) {
    totalAmount = bookings.reduce((accumulator, currentBooking) => {
      return accumulator + currentBooking.totalAmount;
    }, 0);
  }
  const { users } = useSelector((store) => store.allUser);
  const { trips } = useSelector((store) => store.trips);
  const { tourGuides } = useSelector((store) => store.tourGuide);
  console.log(tourGuides);
  const tripsWithTourGuides = trips.map((trip) => {
    // Tìm tour guide tương ứng với tourGuideId của trip
    const tourGuide = tourGuides.find(
      (guide) => guide?._id === trip.tourGuideId
    );

    // Nếu tìm thấy tour guide, trả về một bản sao của trip mở rộng với thông tin của tour guide
    // Nếu không, trả về trip ban đầu
    return tourGuide ? { ...trip, tourGuide } : trip;
  });
  console.log(tripsWithTourGuides);
  const [tourguide, setTourGuide] = useState("");

  useEffect(() => {
    if (trips && trips.length > 0) {
      // Tạo một đối tượng để lưu trữ số lần xuất hiện của mỗi tourguideId
      const tourguideIdCount = {};

      // Lặp qua mảng trips và đếm số lần xuất hiện của mỗi tourguideId
      trips.forEach((trip) => {
        const { tourGuideId } = trip;
        if (tourguideIdCount[tourGuideId]) {
          tourguideIdCount[tourGuideId]++;
        } else {
          tourguideIdCount[tourGuideId] = 1;
        }
      });

      // Tìm tourguideId xuất hiện nhiều nhất
      let mostFrequentTourguideId;
      let maxCount = 0;
      Object.keys(tourguideIdCount).forEach((tourGuideId) => {
        if (tourguideIdCount[tourGuideId] > maxCount) {
          mostFrequentTourguideId = tourGuideId;
          maxCount = tourguideIdCount[tourGuideId];
        }
      });

      console.log(
        "Tourguide ID xuất hiện nhiều nhất:",
        mostFrequentTourguideId
      );
      setTourGuide(mostFrequentTourguideId);
    } else {
      console.log("Không có dữ liệu trips để xử lý.");
    }
  }, [trips]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTrips());
    dispatch(getAllBookings());
    dispatch(getAllUser());
    dispatch(getAllTourGuides());
  }, []);
  return (
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Sales</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalAmount} VND
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Best Tour Guide
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {
                tripsWithTourGuides.find((l) => l?.tourGuide?._id === tourguide)
                  ?.tourGuide?.userId?.fullName
              }
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Customers
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {users.length}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Bookings
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {bookings.length}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
