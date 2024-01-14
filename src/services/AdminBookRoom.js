import { requestApi } from "../configs/callApi";

class AdminBookRoomService {
  fetchAdminBookRoomListApi() {
    return requestApi({
      url: `/dat-phong`,
      method: "GET",
    });
  }
  fetchAdminDetailBookRoomListApi(id) {
    return requestApi({
      url: `/dat-phong/book-room-detail/${id}`,
      method: "GET",
    });
  }
  fetchAdminEditBookRoomListApi(id, data) {
    return requestApi({
      url: `/dat-phong/update-book-room/${id}`,
      method: "PUT",
      data,
    });
  }
  fetchAdminDeleteBookRoomListApi(id) {
    return requestApi({
      url: `/dat-phong/delete-book-room/${id}`,
      method: "DELETE",
    });
  }
  fetchAdminSearchBookRoomApi(value) {
    return requestApi({
      url: `/dat-phong/book-room-by-id/${value}`,
      method: "GET",
    });
  }
}

export const adminBookRoomService = new AdminBookRoomService();
