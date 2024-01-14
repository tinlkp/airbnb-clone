import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { AiFillStar } from "react-icons/ai";
import KingBedIcon from "@mui/icons-material/KingBed";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ShowerIcon from "@mui/icons-material/Shower";
import IronIcon from "@mui/icons-material/Iron";
import CountertopsIcon from "@mui/icons-material/Countertops";
import TvIcon from "@mui/icons-material/Tv";
import WifiIcon from "@mui/icons-material/Wifi";
import PersonIcon from "@mui/icons-material/Person";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link, useNavigate } from "react-router-dom";
import "./Room.scss";
import { roomService } from "../../../../services/Room";
import { useSelector } from "react-redux";

export default function Room() {
  const userState = useSelector((state) => state.userReducer);

  const [room, setRoom] = useState([]);
  const navigate = useNavigate();
  const fetchRoom = async () => {
    const result = await roomService.fetchRoomApi();
    setRoom(result.data);
  };

  const handleBooking = (roomId) => {
    if (userState) {
      navigate(`/room-detail/${roomId}`);
    } else {
      navigate("/login");
    }
  };
  const renderRoom = () => {
    return room.map((element) => {
      return (
        <Link
          key={element.id}
          to={`/room-detail/${element.id}`}
          className="roomLink"
        >
          <Swiper
            slidesPerView={1}
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="roomSwiper"
            onClick={() => handleBooking(element.id)}
          >
            <SwiperSlide>
              <img src={element.hinh_anh} alt="..." className="w-" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={element.hinh_anh} alt="..." className="w-" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={element.hinh_anh} alt="..." className="w-" />
            </SwiperSlide>
            <button className="absolute top-3 right-3 z-30">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                className="icon-heart"
              >
                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" />
              </svg>
            </button>
          </Swiper>
          <div>
            <p className="flex justify-between mt-2">
              <span className="font-bold truncate">{element.ten_phong}</span>
              <span className="flex justify-between items-center ml-1">
                <span className="ml-2 text-yellow-500 mx-1">
                  <AiFillStar />
                </span>
                9.14
              </span>
            </p>
            <p className="text-sm mt-2">
              <span className="flex items-center">
                <span className="font-semibold text-gray-600 mr-1">
                  Sức chứa:
                </span>
                {element?.khach > 0 && element?.khach <= 8 && (
                  <span className="flex">
                    {[...Array(element.khach)].map((_, index) => (
                      <PersonIcon
                        fontSize="small"
                        key={index}
                        className="inline text-gray-500"
                      />
                    ))}
                  </span>
                )}
              </span>
              <span className="flex items-center mt-2">
                <span className="font-semibold text-gray-600 mr-1">
                  Giường:
                </span>
                {element?.giuong > 0 && element?.giuong <= 8 && (
                  <span className="flex">
                    {[...Array(element.giuong)].map((_, index) => (
                      <KingBedIcon
                        fontSize="small"
                        key={index}
                        className="inline text-gray-500"
                      />
                    ))}
                  </span>
                )}
              </span>
              <span className="flex items-center mt-2">
                <span className="font-semibold text-gray-600 mr-1">
                  Phòng tắm:
                </span>
                {element?.phong_tam > 0 && element?.phong_tam <= 8 && (
                  <span className="flex">
                    {[...Array(element.phong_tam)].map((_, index) => (
                      <ShowerIcon
                        fontSize="small"
                        key={index}
                        className="inline text-gray-500"
                      />
                    ))}
                  </span>
                )}
              </span>
              <span className="flex items-center font-semibold text-gray-600 mt-2">
                Các tiện ích:
                {element.dieu_hoa && (
                  <AcUnitIcon className="inline text-gray-500 ml-2" />
                )}
                {element.ban_ui && (
                  <IronIcon className="inline text-gray-500 ml-2" />
                )}
                {element.bep && (
                  <CountertopsIcon className="inline text-gray-500 ml-2" />
                )}
                {element.do_xe && (
                  <DirectionsCarIcon className="inline text-gray-500 ml-2" />
                )}
                {element.tivi && (
                  <TvIcon className="inline text-gray-500 ml-2" />
                )}
                {element.wifi && (
                  <WifiIcon className="inline text-gray-500 ml-2" />
                )}
              </span>
            </p>
            <p className="mt-1 text-xl text-gray-700">
              <span className="font-bold text-2xl text-gray-900">
                ${element.gia_tien}
              </span>
              <span className="text-base text-gray-500">/đêm</span>
            </p>
          </div>
        </Link>
      );
    });
  };
  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-10">
      {renderRoom()}
    </div>
  );
}
