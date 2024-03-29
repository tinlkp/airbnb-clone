import React, { useEffect, useState } from "react";
import security from "../../assets/img/security.png";

import { Form, ErrorMessage, Field, Formik } from "formik";
import Swal from "sweetalert2";
import "./PersonaInfo.scss";
import { useSelector } from "react-redux";
import { userService } from "../../services/UserBooking";
import ImagePersonal from "./ImagePersonal/ImagePersonal";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export default function PersonaInfo() {
  const stateUser = useSelector((state) => state.userReducer);
  const [userInfo, setUserInfo] = useState({
    name: "",
    birth_day: "",
    email: "",
    phone: "",
    gender: "",
  });

  const [fieldErrors, setFieldErrors] = useState("");

  const getUserInfo = async () => {
    const result = await userService.userInfoApi(stateUser.userInfo.user.id);
    setUserInfo({
      ...result.data,
      birth_day: dayjs(result.data.birth_day),
    });
  };
  const handleChangeUserInfo = async (values, { resetForm }) => {
    const formattedValues = {
      ...values,
      birth_day: values.birth_day
        ? dayjs(values.birth_day).format("MM-DD-YYYY")
        : null,
    };
    try {
      await userService.updateUserInfoApi(
        stateUser.userInfo.id,
        formattedValues
      );
      getUserInfo();
      setFieldErrors("");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Bạn đã cập nhật thành công",
      });
      resetForm();
    } catch (error) {
      setFieldErrors(error.response.data);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data}`,
      });
      resetForm();
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="container mx-auto px-10 personal-info mb-20">
      <div className="h-28"></div>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/4 max-md:mb-2">
          <div className="w-full sticky top-32 border rounded-lg p-5">
            <ImagePersonal />
            <div className="mt-2">
              <div className="flex items-center">
                <img src={security} className="text-green-600 w-7" alt=".." />
                <span className="ml-2 font-semibold text-lg">
                  Xác minh danh tính
                </span>
              </div>
              <div className="">
                <p className="text-gray-600 py-1 text-base">
                  Xác minh danh tính của bạn với huy hiệu xác minh danh tính.
                </p>
                <button className="border px-5 py-2.5 rounded-lg hover:bg-gray-200 duration-200 font-semibold text-gray-800 my-1">
                  Nhận Huy Hiệu
                </button>
              </div>
            </div>
            <div className="mt-2 border-t py-2">
              <div className="font-semibold text-lg text-gray-800">
                Đã xác nhận
              </div>
              <div className="mt-2">
                <i className="fa-solid fa-check"></i>
                <span className="ml-2 text-sm italic">Địa chỉ email</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4 lg:w-3/5">
          <div className="px-10">
            <Formik
              enableReinitialize
              initialValues={userInfo}
              onSubmit={handleChangeUserInfo}
            >
              <Form className="personal-form">
                <div className="md:grid md:grid-cols-1 gap-x-4 gap-y-1">
                  <div className="form-group">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      <span className="text-red-600">*</span> Họ Tên
                    </label>
                    <Field
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="name"
                      type="text"
                      placeholder="Họ Tên"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="form-label text-red-600"
                    />
                  </div>

                  <div className="form-group">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      <span className="text-red-600">*</span> Ngày sinh
                    </label>
                    <Field name="birth_day">
                      {({ field, form }) => (
                        <DatePicker
                          {...field}
                          format="DD/MM/YYYY"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(value) =>
                            form.setFieldValue("birth_day", value)
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="birth_day"
                      component="div"
                      className="form-label text-red-600"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      <span className="text-red-600">*</span> Email
                    </label>
                    <Field
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="email"
                      type="text"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="form-label text-red-600"
                    />
                    {fieldErrors && (
                      <div className="text-red-600">(*) {fieldErrors}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      <span className="text-red-600">*</span> Số Điện Thoại
                    </label>
                    <Field
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="phone"
                      type="text"
                      placeholder="Số điện thoại"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="form-label text-red-600"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300r">
                      <span className="text-red-600">*</span> Giới tính
                    </label>
                    <Field
                      as="select"
                      id="gender"
                      name="gender"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value={true}>Nam</option>
                      <option value={false}>Nữ</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="form-label text-red-600"
                    />
                  </div>
                </div>
                <div className="col-span-2 text-center mt-2">
                  <button
                    type="submit"
                    className="text-white focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-red-500 hover:bg-red-800 duration-300 w-1/2"
                  >
                    CẬP NHẬT
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
