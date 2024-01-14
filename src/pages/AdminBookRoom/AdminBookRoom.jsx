import React, { Fragment, useEffect, useState } from "react";
import { Input, Table, notification } from "antd";
import { adminBookRoomService } from "../../services/AdminBookRoom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./AdminBookRoom.scss";

export default function AdminBookRoom() {
  const navigate = useNavigate();
  const { Search } = Input;
  const [bookRoomList, setBookRoomList] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
      width: "10%",
    },
    {
      title: "Mã Phòng",
      dataIndex: "ma_phong",
      width: "10%",
    },
    {
      title: "Số Khách",
      dataIndex: "so_luong_khach",
      width: "10%",
    },
    {
      title: "Mã người dùng",
      dataIndex: "ma_nguoi_dat",
      width: "10%",
    },
    {
      title: "Ngày Đến",
      dataIndex: "ngay_den",
      width: "20%",
    },
    {
      title: "Ngày Đi",
      dataIndex: "ngay_di",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
      render: (text, bookRoom) => {
        return (
          <Fragment>
            <button
              onClick={() => navigate(`/admin/${bookRoom.id}`)}
              className="m-2 btnBookRoom-edit"
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
            <button
              className="m-2 btnBookRoom-delete"
              onClick={() => handleDelete(bookRoom.id)}
            >
              <i className="fa-solid fa-trash" />
            </button>
          </Fragment>
        );
      },
    },
  ];
  const data = bookRoomList;
  useEffect(() => {
    bookRoomListApi();
  }, []);

  const bookRoomListApi = async () => {
    const result = await adminBookRoomService.fetchAdminBookRoomListApi();
    setBookRoomList(result.data);
  };
  const handleDelete = async (id) => {
    try {
      const confirmationResult = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (confirmationResult.isConfirmed) {
        const result =
          await adminBookRoomService.fetchAdminDeleteBookRoomListApi(id);
        if (result.data) {
          bookRoomListApi();
        }
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Xóa phòng đặt thành công !",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data}`,
      });
    }
  };
  const valicationNumber = (value, mes) => {
    if (/^[0-9]+$/.test(value)) {
      return true;
    }
    notification.warning({
      message: mes,
      placement: "topLeft",
    });
    return false;
  };
  const handleSearch = async (event) => {
    if (event.target.value) {
      let isValid = true;
      isValid = valicationNumber(event.target.value, "Vui lòng nhập số !!!");
      if (isValid) {
        const result = await adminBookRoomService.fetchAdminSearchBookRoomApi(
          event.target.value
        );
        setBookRoomList(result.data);
      }
    } else {
      bookRoomListApi();
    }
  };

  const onSearch = async (value, _e) => {
    if (value !== "") {
      let isValid = true;
      isValid = valicationNumber(value, "Nhập số !!!");
      if (isValid) {
        const result = await adminBookRoomService.fetchAdminSearchBookRoomApi(
          value
        );
        setBookRoomList(result.data);
      }
    } else {
      bookRoomListApi();
    }
  };
  return (
    <div className="container m-5 mx-auto adminUser-main">
      <div className="title-adminUser m-5">
        <h1 className=" mb-5 title-admin">Book Room</h1>
        <Search
          onChange={handleSearch}
          placeholder="Tìm kiếm theo mã người dùng ..."
          allowClear
          size="large"
          onSearch={onSearch}
        />
      </div>
      <hr />

      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
      />
    </div>
  );
}
