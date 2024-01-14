import React, { useEffect, useState } from 'react'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import "./BookingRoom.scss"
import moment from 'moment';
import { roomService } from '../../../../../services/Room';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function BookingRoom() {
  const userState = useSelector((state) => state.userReducer);
  const roomState = useSelector((state) => state.roomReducer);
  const roomId = roomState.roomInfo.id;

  const navigate = useNavigate();
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  const [countGuest, setCountGuest] = useState(0);

  const [numNights, setNumNights] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  const [basePrice, setBasePrice] = useState(0);

  const [serviceFee, setServiceFee] = useState(0);

  const [bookedRooms, setBookedRooms] = useState([]);

  // const [disabledDates, setDisabledDates] = useState([]);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const bookingData = {
    ma_phong: roomState.roomInfo.id,
    ngay_den: selectionRange.startDate,
    ngay_di: selectionRange.endDate,
    so_luong_khach: countGuest,
    ma_nguoi_dat: userState.userInfo ? userState.userInfo.id : "",
  };

  const disableBookingRoom = async () => {
    try {
      const result = await roomService.fetchBookingRoomApi();
      setBookedRooms(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const calculateNumNights = () => {
    const start = moment(selectionRange.startDate);
    const end = moment(selectionRange.endDate);
    const nights = end.diff(start, 'days');
    setNumNights(nights);
  };
  const calculateTotalPrice = () => {
    const pricePerNight = roomState.roomInfo.giaTien;
    if (pricePerNight && numNights >= 0) {
      const basePrice = pricePerNight * numNights;
      const calculatedServiceFee = (0.1 * basePrice);
      const totalPrice = basePrice + calculatedServiceFee;
      setBasePrice(basePrice);
      setServiceFee(calculatedServiceFee.toLocaleString());
      setTotalPrice(totalPrice);
    }
  };


  const updateCount = (action) => {
    if (action === 'increment') {
      setCountGuest(countGuest + 1);
    } else if (action === 'decrement' && countGuest > 0) {
      setCountGuest(countGuest - 1);
    }
  };

  const bookingRoom = async () => {
    try {
      await roomService.bookingRoomApi(bookingData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Bạn đã đặt phòng thành công',
      })
      navigate("/ticket-by-user")
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `${error.response.data.content}`,
        text: "Xin vui lòng thử lại",
      })
    }
  }

  const isDateBooked = (date, ma_phong) => {
    for (const room of bookedRooms) {
      if (room.ma_phong === ma_phong) {
        if (date >= new Date(room.ngay_den) && date <= new Date(room.ngay_di)) {
          return true;
        }
      }
    }
    return false;
  };

  const isRangeValid = (range, ma_phong) => {
    let startDate = range.startDate;
    while (startDate <= range.endDate) {
      if (isDateBooked(startDate, ma_phong)) {
        return false;
      }
      startDate = new Date(startDate);
      startDate.setDate(startDate.getDate() + 1);
    }
    return true;
  };
  const handleSelect = (ranges) => {
    const ma_phong = roomState.roomInfo.id;
    if (isRangeValid(ranges.selection, ma_phong)) {
      setSelectionRange(ranges.selection);
    } else {
      notification.warning({
        message: "Ngày Bạn Chọn Đã Hết Phòng",
        placement: "topRight",
      })
    }
  };
  const getDisabledDates = (ma_phong) => {
    const bookedDatesForRoom = bookedRooms
      .filter((room) => room.ma_phong === ma_phong)
      .map((room) => {
        const startDate = new Date(room.ngay_den);
        const endDate = new Date(room.ngay_di);
        const datesInRange = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
          datesInRange.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return datesInRange;
      })
      .flat();
    return bookedDatesForRoom;
  };

  useEffect(() => {
    disableBookingRoom();
    calculateNumNights();
    calculateTotalPrice();
  }, [selectionRange, roomState.roomInfo.gia_tien, numNights]);

  const handleReceiveRoom = () => {
    setShowDateRangePicker(true)
    const today = new Date();
    setSelectionRange({
      startDate: today,
      endDate: today,
      key: 'selection',
    });
  };
  return (
    <>
      <div className="flex flex-col border border-solid border-gray-400 rounded-md">
        <div className="flex w-full border-b border-solid border-gray-400">
          <div onClick={handleReceiveRoom} className="border-r border-solid border-gray-400 rounded-tl-md w-full p-2 cursor-pointer hover:bg-gray-100">
            <button className="text-xs uppercase font-semibold">
              Nhận phòng
            </button>
            <div className="m-1">{moment(selectionRange.startDate).format('DD-MM-YYYY')}</div>
          </div>
          <div onClick={handleReceiveRoom} className="rounded-tr-md w-full p-2 cursor-pointer hover:bg-gray-100">
            <button className="text-xs uppercase font-semibold">
              Trả phòng
            </button>
            <div className="m-1">{moment(selectionRange.endDate).format('DD-MM-YYYY')}</div>
          </div>
        </div>
        <div className="p-2">
          <div className="uppercase text-xs font-semibold">
            Khách
          </div>
          <div className="flex justify-between items-center m-1">
            <button
              className="w-8 h-8 bg-gray-300 hover:bg-red-400 duration-200 rounded-xl text-white cursor-pointer"
              onClick={() => updateCount("decrement")}
            >
              -
            </button>
            <div>{countGuest} khách</div>
            <button onClick={() => updateCount("increment")} className="w-8 h-8 bg-gray-300 hover:bg-red-400 duration-200 rounded-xl text-white cursor-pointer">
              +
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        onClick={bookingRoom}
        className="w-full py-3 mt-3 rounded-lg text-white text-lg font-semibold btn-bookroom"
        disabled={countGuest === 0 || numNights === 0 ? true : false}
      >
        Đặt phòng
      </button>
      {countGuest === 0 && numNights === 0 ? (
        <div className="text-center font-normal text-gray-400 my-2">
          <span>Bạn vẫn chưa bị trừ tiền</span>
        </div>
      ) : countGuest !== 0 && numNights !== 0 ? (
        <div className="text-center font-normal text-gray-400 my-2">
          <span>Số tiền bạn cần trả là : </span>
        </div>
      ) : null}
      <div className="border-b py-2">
        <div className="flex justify-between py-1 text-base">
          <div className="underline text-gray-600">
            ${roomState.roomInfo.gia_tien} x {numNights} đêm
          </div>
          <div>
            <span>{basePrice}</span> $
          </div>
        </div>
        <div className="flex justify-between py-1 text-base">
          <div className="underline text-gray-600">
            Phí dịch vụ
          </div>
          <div>
            <span>{serviceFee}</span> $
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-lg font-semibold pt-3">
        <div>Tổng giá</div>
        <div>{totalPrice} $</div>
      </div>
      {showDateRangePicker && (
        <div className='absolute top-0 right-0 border shadow-xl p-2 bg-white rounded-xl'>
          <div className='flex justify-between items-center p-3'>
            <div>
              <div>
                <div className="text-2xl font-semibold text-gray-800">{numNights} đêm</div>
                <div className="text-gray-400">{moment(selectionRange.startDate).format('DD-MM-YYYY')} đến {moment(selectionRange.endDate).format('DD-MM-YYYY')}</div>
              </div>
            </div>
            <button onClick={() => setShowDateRangePicker(false)} className="bg-gray-100 text-red-600 hover:bg-red-100 duration-200 px-2 py-3 rounded-2xl">Close</button>
          </div>
          <div className="date-range-picker">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              minDate={new Date()}
              disabledDates={getDisabledDates(roomId)}
            />
          </div>
        </div>
      )}
    </>


  )
}
