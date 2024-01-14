import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminRoomService } from "../../services/AdminRoom";
import Swal from "sweetalert2";
import { Formik, Field, Form } from "formik";

export default function AdminEditRoom() {
  const navigate = useNavigate();
  const params = useParams();
  const [editRoomState, setEditRoomState] = useState({
    ten_phong: "",
    khach: 0,
    phong_ngu: 0,
    giuong: 0,
    phong_tam: 0,
    mo_ta: "",
    gia_tien: 0,
    may_giat: false,
    ban_la: false,
    tivi: false,
    dieu_hoa: false,
    wifi: false,
    bep: false,
    do_xe: false,
    ho_boi: false,
    ban_ui: false,
    ma_vi_tri: 0,
    hinhAnh: null,
  });

  useEffect(() => {
    fetchAdminRoomDetailApi();
  }, []);
  const fetchAdminRoomDetailApi = async () => {
    const result = await adminRoomService.fetchAdminDetailRoomApi(
      params.roomId
    );
    // console.log(result.data);
    setEditRoomState(result.data);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await adminRoomService.fetchAdminEditRoomApi(
        params.roomId,
        values
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Cập nhật Room thành công !",
      });
      resetForm();
      if (result.data) {
        navigate("/admin/phongthue");
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
    <div className="container mx-auto py-5 ml-5">
      <div className="md:block text-center text-3xl text-blue-800">
        <h1>Cập Nhật Phòng Thuê</h1>
      </div>
      <Formik
        enableReinitialize
        initialValues={editRoomState}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Tên Phòng :
            </label>
            <Field
              id="ten_phong"
              type="text"
              name="ten_phong"
              className="border text-sm rounded-md w-1/3 p-2 mb-2"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Số khách :
            </label>
            <Field
              id="khach"
              type="number"
              name="khach"
              className="border text-sm rounded-md w-0.5/3 p-2 "
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Phòng ngủ :
            </label>
            <Field
              id="phong_ngu"
              type="number"
              name="phong_ngu"
              className="border text-sm rounded-md  w-0.5/3 p-2 "
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Giường :
            </label>
            <Field
              id="giuong"
              type="number"
              name="giuong"
              className="border text-sm rounded-md  w-0.5/3 p-2 "
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Phòng Tắm :
            </label>
            <Field
              id="phong_tam"
              type="number"
              name="phong_tam"
              className="border text-sm rounded-md  w-0.5/3 p-2 "
            />
          </div>

          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Mã vị trí :
            </label>
            <Field
              id="ma_vi_tri"
              type="number"
              name="ma_vi_tri"
              className="border text-sm rounded-md  w-0.5/3 p-2 "
            />
          </div>

          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Mô tả :
            </label>
            <Field
              id="mo_ta"
              type="text"
              name="mo_ta"
              className="border text-sm rounded-md  w-0.5/3 p-2 "
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Giá tiền :
            </label>
            <Field
              id="gia_tien"
              type="number"
              name="gia_tien"
              className="border text-sm rounded-md  w-0.5/3 p-2 "
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Máy giặt :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="may_giat"
                id="may_giat"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Bàn là :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="ban_la"
                id="ban_la"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Tivi :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="tivi"
                id="tivi"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Điều hòa :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="dieu_hoa"
                id="dieu_hoa"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Wifi :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="wifi"
                id="wifi"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">Bếp :</label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="bep"
                id="bep"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Bãi đõ xe :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="do_xe"
                id="do_xe"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Hồ bơi :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="ho_boi"
                id="hoBoi"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium mr-3">
              Bàn Ủi :
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <Field
                type="checkbox"
                name="ban_ui"
                id="ban_ui"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="mb-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Cập Nhật
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
