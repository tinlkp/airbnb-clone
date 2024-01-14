import React from "react";
import { adminUsersService } from "../../services/AdminUser";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";

export default function AdminAddUser() {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    pass_word: "",
    phone: "",
    birth_day: "",
    gender: "",
    role: "ADMIN",
  };

  const onSubmitRegister = async (values, { resetForm }) => {
    const formattedValues = {
      ...values,
      birth_day: values.birth_day
        ? dayjs(values.birth_day).format("DD-MM-YYYY")
        : null,
    };
    try {
      const result = await adminUsersService.fetchAdminAddUserApi(
        formattedValues
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "thêm User thành công !",
      });
      resetForm();
      if (result.data) {
        navigate(`/admin/user`);
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
    <Formik initialValues={initialValues} onSubmit={onSubmitRegister}>
      <div className="container mx-auto py-5 ml-5">
        <Form>
          <div className="mb-4 ">
            <div className="md:block text-center text-3xl text-blue-800">
              <h1>Đăng Ký Tài Khoản</h1>
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
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Password :
            </label>
            <Field
              type="pass_word"
              name="pass_word"
              className="border text-sm rounded-md w-1/3 p-2 "
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
                  format="DD/MM/YYYY"
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
              <option value="">Select Gender</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
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

          <div className="col-span-2 mt-3 ">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Add User
            </button>
          </div>
        </Form>
      </div>
    </Formik>
  );
}
