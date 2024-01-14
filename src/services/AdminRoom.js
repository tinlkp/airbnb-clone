import { requestApi } from "../configs/callApi";

class AdminRoomService {
  fetchAdminRoomApi() {
    return requestApi({
      url: `/phong`,
      method: "GET",
    });
  }
  fetchAdminAddRoomApi(data) {
    return requestApi({
      url: `/phong/create-room`,
      method: "POST",
      data,
    });
  }
  fetchAdminUploadImgApi(id, data) {
    return requestApi({
      url: `/phong/upload-img-room/${id}`,
      method: "POST",
      data,
    });
  }
  fetchAdminDetailRoomApi(id) {
    return requestApi({
      url: `/phong/room-detail/${id}`,
      method: "GET",
    });
  }
  fetchAdminEditRoomApi(id, data) {
    return requestApi({
      url: `/phong/update-room/${id}`,
      method: "PUT",
      data,
    });
  }
  fetchAdminDeleteApi(idRoom) {
    return requestApi({
      url: `/phong/delete-room/${idRoom}`,
      method: "DELETE",
    });
  }
}

//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4ODMiLCJlbWFpbCI6Inp4emN4ekBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2OTc1OTM4OTQsImV4cCI6MTY5ODE5ODY5NH0.dq9xdj71fPQcBgsgFuG9Y8MP_p4uoND0b-mJbTl4SLo"

export const adminRoomService = new AdminRoomService();
