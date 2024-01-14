import React from "react";
import { useRoutes } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthGuard from "../guards/AuthGuard";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import TicketByUser from "../pages/TicketByUser/TicketByUser";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import PersonaInfo from "../pages/PersonaInfo/PersonaInfo";
import RoomByCity from "../pages/RoomByCity/RoomByCity";
import AdminUser from "../pages/AdminUser/AdminUser";
import AdminEditUser from "../pages/AdminEditUser/AdminEditUser";
import AdminBookRoom from "../pages/AdminBookRoom/AdminBookRoom";
import AdminBookRoomDetail from "../pages/AdminBookRoom/BookRoomDetail/AdminBookRoomDetail";
import AdminAddUser from "../pages/AdminAddUser/AdminUserAdd";
import AdminRoom from "../pages/AdminRoom/AdminRoom";
import AdminAddRoom from "../pages/AdminAddRoom/AdminAddRoom";
import AdminEditRoom from "../pages/AdminEditRoom/AdminEditRoom";
import AdminLocation from "../pages/AdminLocation/AdminLocation";
import AdminAddLocation from "../pages/AdminAddLocation/AdminAddLocation";
import AdminEditLocation from "../pages/AdminEditLocation/AdminEditLocation";
import AdminComment from "../pages/AdminComment/AdminComment";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/room-detail/:roomId",
          element: (
            <AuthGuard>
              <RoomDetails />
            </AuthGuard>
          ),
        },
        {
          path: "/ticket-by-user",
          element: <TicketByUser />,
        },
        {
          path: "/personal-info",
          element: <PersonaInfo />,
        },
        {
          path: "/room-by-city/:roomCityId",
          element: <RoomByCity />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <AdminBookRoom />,
        },
        {
          path: "/admin/:idRoom",
          element: <AdminBookRoomDetail />,
        },
        {
          path: "/admin/user",
          element: <AdminUser />,
        },
        {
          path: "/admin/addUser",
          element: <AdminAddUser />,
        },
        {
          path: "/admin/editUser/:userId",
          element: <AdminEditUser />,
        },
        {
          path: "/admin/phongthue",
          element: <AdminRoom />,
        },
        {
          path: "/admin/addRoom",
          element: <AdminAddRoom />,
        },
        {
          path: "/admin/editRoom/:roomId",
          element: <AdminEditRoom />,
        },
        {
          path: "/admin/location",
          element: <AdminLocation />,
        },
        {
          path: "/admin/addlocation",
          element: <AdminAddLocation />,
        },
        {
          path: "/admin/editlocation/:locationId",
          element: <AdminEditLocation />,
        },
        {
          path: "/admin/comment",
          element: <AdminComment />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return routing;
}
