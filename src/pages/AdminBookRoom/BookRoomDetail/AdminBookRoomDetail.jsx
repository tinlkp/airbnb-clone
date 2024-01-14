import { DatePicker, Form, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminBookRoomService } from "../../../services/AdminBookRoom";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function AdminBookRoomDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [bookRoomDetail, setBookRoomDetail] = useState({
    ma_phong: "",
    so_luong_khach: "",
    ma_nguoi_dat: "",
    ngay_den: "",
    ngay_di: "",
  });
  useEffect(() => {
    detaiBookRoomApi();
  }, []);
  const detaiBookRoomApi = async () => {
    const result = await adminBookRoomService.fetchAdminDetailBookRoomListApi(
      params.idRoom
    );
    setBookRoomDetail(result.data);
  };
  const handleChange = (event) => {
    setBookRoomDetail({
      ...bookRoomDetail,
      [event.target.name]: +event.target.value,
    });
  };
  const handleChangeDateNgayDen = (value) => {
    const ngay = dayjs(value);
    setBookRoomDetail({
      ...bookRoomDetail,
      ngay_den: ngay,
    });
  };
  const handleChangeDateNgayDi = (value) => {
    const ngay = dayjs(value);
    setBookRoomDetail({
      ...bookRoomDetail,
      ngay_di: ngay,
    });
  };
  const handleSubmit = async () => {
    try {
      const result = await adminBookRoomService.fetchAdminEditBookRoomListApi(
        params.idRoom,
        bookRoomDetail
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Cập nhật thành công !",
      });
      if (result.data) {
        navigate(`/admin/`);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data}`,
      });
    }
  };
  return (
    <div className="container mx-auto py-5">
      <div className="md:block text-center text-3xl text-blue-800 mb-5">
        <h1>CẬP NHẬT LẠI PHÒNG THUÊ</h1>
      </div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        style={{
          maxWidth: 1000,
        }}
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Mã Phòng">
          <input
            value={bookRoomDetail.ma_phong}
            onChange={handleChange}
            name="ma_phong"
            className="border text-sm rounded-md w-2/3 p-2"
            type="text"
          />
        </Form.Item>
        <Form.Item label="Mã Người Dùng">
          <input
            value={bookRoomDetail.ma_nguoi_dat}
            onChange={handleChange}
            name="ma_nguoi_dat"
            className="border text-sm rounded-md w-2/3 p-2"
            type="text"
          />
        </Form.Item>
        <Form.Item label="Số Lượng Khách">
          <input
            value={bookRoomDetail.so_luong_khach}
            onChange={handleChange}
            name="so_luong_khach"
            className="border text-sm rounded-md w-2/3 p-2"
            type="text"
          />
        </Form.Item>

        <Form.Item label="Ngày Đến">
          <DatePicker
            onChange={handleChangeDateNgayDen}
            value={dayjs(bookRoomDetail.ngay_den)}
            name="ngay_den"
            format={"DD/MM/YYYY"}
            className="border text-sm rounded-md w-1/3 p-2 "
          />
        </Form.Item>
        <Form.Item label="Ngày Đi">
          <DatePicker
            onChange={handleChangeDateNgayDi}
            value={dayjs(bookRoomDetail.ngay_di)}
            name="ngay_di"
            format={"DD/MM/YYYY"}
            className="border text-sm rounded-md w-1/3 p-2 "
          />
        </Form.Item>
        <Form.Item label="Button">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Cập Nhật
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
