import React from "react";
import Swal from "sweetalert2";
import { adminLocalService } from "../../services/AdminLocation";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";

export default function AdminAddLocation() {
  const navigate = useNavigate();
  const initialValues = {
    ten_vi_tri: "",
    tinh_thanh: "",
    quoc_gia: "",
    hinh_anh: "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await adminLocalService.fetchAdminAddLocationApi(values);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Thêm vị trí thành công !",
      });
      resetForm();
      if (result.data) {
        navigate(`/admin/location`);
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
        <h1>Thêm Vị Trí</h1>
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Tên Vị trí :
            </label>
            <Field
              type="text"
              id="ten_vi_tri"
              name="ten_vi_tri"
              className="border text-sm rounded-md w-1/3 p-2 "
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Tên Tỉnh Thành :
            </label>
            <Field
              type="text"
              id="tinh_thanh"
              name="tinh_thanh"
              className="border text-sm rounded-md w-1/3 p-2 "
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium mr-3">
              Tên Quốc Gia:
            </label>
            <Field
              type="text"
              id="quoc_gia"
              name="quoc_gia"
              className="border text-sm rounded-md w-1/3 p-2 "
            />
          </div>

          <div className="mb-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Thêm
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
