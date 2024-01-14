import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminUsersService } from "../../services/AdminUser";
import dayjs from "dayjs";
import { DatePicker, notification } from "antd";
import Swal from "sweetalert2";

import { Form, ErrorMessage, Field, Formik } from "formik";

export default function AdminEditUser() {
  const params = useParams();
  const navigate = useNavigate();
  const [imgUser, setImgUser] = useState("");
  const [userImgFile, setUserImgFile] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    pass_word: "",
    phone: "",
    birth_day: "",
    gender: "",
    role: "",
    avatar: {},
  });

  const fetchAdminDetailApi = async () => {
    const result = await adminUsersService.fetchAdminDetailApi(params.userId);
    setUserInfo({
      ...result.data,
      birth_day: result.data.birth_day ? dayjs(result.data.birth_day) : "",
    });
    if (result.data) {
      notification.warning({
        message: "CHÚ Ý: KHÔNG THỂ CẬP NHẬT HÌNH ẢNH CHO ACCOUNT KHÁC !!!",
        placement: "topLeft",
      });
    }
  };

  useEffect(() => {
    fetchAdminDetailApi();
  }, []);
  const handChangeImgUser = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImgUser(event.target.result);
    };
    setUserImgFile(file);
  };

  const handleChangeUserInfo = async (values, { resetForm }) => {
    const formattedValues = {
      ...values,
      birth_day: values.birth_day
        ? dayjs(values.birth_day).format("DD-MM-YYYY")
        : null,
    };
    try {
      const result = await adminUsersService.fetchAdminUpdateApi(
        params.userId,
        formattedValues
      );
      if (userImgFile !== null) {
        let formData = new FormData();
        formData.append("file", userImgFile, userImgFile.name);
        await adminUsersService.fetchAdminImgApi(formData);
      }
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Cập nhật User thành công !",
      });
      fetchAdminDetailApi();
      if (result.data) {
        navigate(`/admin/user`);
      }
      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data}`,
      });
      resetForm();
    }
  };
  return (
    <div className="container mx-auto py-5 ml-5">
      <Formik
        enableReinitialize
        initialValues={userInfo}
        onSubmit={handleChangeUserInfo}
      >
        <Form>
          <div className="mb-4 ">
            <div className="md:block text-center text-3xl text-blue-800">
              <h1>Cập Nhật Tài Khoản</h1>
            </div>
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Tên Người Dùng :
            </label>
            <Field
              type="text"
              name="name"
              className="border text-sm rounded-md w-1/3 p-2 "
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Email :
            </label>
            <Field
              type="text"
              name="email"
              className="border text-sm rounded-md w-1/3 p-2 "
            />
            <ErrorMessage
              name="email"
              component="div"
              className="form-label text-red-600"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Phone Number :
            </label>
            <Field
              type="text"
              name="phone"
              className="border text-sm rounded-md w-1/3 p-2 "
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Birthday :
            </label>
            <Field name="birth_day">
              {({ field, form }) => (
                <DatePicker
                  {...field}
                  className="border text-sm rounded-md w-1/3 p-2"
                  onChange={(value) => form.setFieldValue("birth_day", value)}
                />
              )}
            </Field>
          </div>

          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Gender :
            </label>
            <Field
              as="select"
              name="gender"
              className="border text-sm rounded-md w-1/3 p-2"
            >
              <option value="true">MALE</option>
              <option value="false">FEMALE</option>
            </Field>
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              TYPE USER :
            </label>
            <Field
              as="select"
              name="role"
              className="border text-sm rounded-md w-1/3 p-2"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </Field>
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              AVATAR :
            </label>
            <input name="avatar" type="File" onChange={handChangeImgUser} />
            <br />
            <img
              className="mt-3"
              style={{ width: 150, height: 150 }}
              src={imgUser === "" ? userInfo.avatar : imgUser}
              alt="..."
            />
          </div>

          <div className="col-span-2 mt-3 ">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Update
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
