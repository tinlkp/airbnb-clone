import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { adminLocalService } from "../../services/AdminLocation";
import { useNavigate, useParams } from "react-router-dom";

import { Formik, Field, Form } from "formik";

export default function AdminAddLocation() {
  const params = useParams();
  const navigate = useNavigate();
  const [imgLocation, setImgLocation] = useState("");
  const [imgFileUpload, setImgFileUpload] = useState(null);
  const [editLocation, setEditLocation] = useState({
    ten_vi_tri: "",
    tinh_thanh: "",
    quoc_gia: "",
    hinh_anh: {},
  });

  useEffect(() => {
    fetchLocationDetail();
  }, []);
  const fetchLocationDetail = async () => {
    const result = await adminLocalService.fetchAdminDetailLocationApi(
      params.locationId
    );
    setEditLocation(result.data);
  };

  const handleChangeImg = (event) => {
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImgLocation(event.target.result);
    };
    setImgFileUpload(file);
  };

  const handleSubmitEdit = async (values, { resetForm }) => {
    try {
      const result = await adminLocalService.fetchAdminEditLocationApi(
        params.locationId,
        values
      );
      if (imgFileUpload !== null) {
        let formData = new FormData();
        formData.append("file", imgFileUpload, imgFileUpload.name);
        const resultUpload = await adminLocalService.fetchAdminImgLocationApi(
          params.locationId,
          formData
        );
        console.log(resultUpload);
      }
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Cập nhật vị trí thành công !",
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

      <Formik
        enableReinitialize
        initialValues={editLocation}
        onSubmit={handleSubmitEdit}
      >
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
            <label className="block mb-2 text-sm font-medium mr-3">
              Hình ảnh:
            </label>
            <input
              name="hinh_anh"
              type="File"
              onChange={handleChangeImg}
              className="mb-2"
            />
            <br />
            <img
              style={{ width: 150, height: 150 }}
              src={imgLocation === "" ? editLocation.hinhAnh : imgLocation}
              alt="..."
            />
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
