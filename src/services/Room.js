import { requestApi } from "../configs/callApi";

class RoomService {
  fetchRoomByLocationApi = () => {
    return requestApi({
      url: "/vi-tri",
      method: "GET",
    })
  };
  fetchRoomApi() {
    return requestApi({
      url: `/phong`,
      method: "GET",
    })
  };
  fetchCommentRoomApi(id) {
    return requestApi({
      url: `/binh-luan/get-comment-by-room/${id}`,
      method: "GET",
    })
  };
  fetchRoomDetailApi(roomId) {
    return requestApi({
      url: `/phong/room-detail/${roomId}`,
      method: "GET",
    })
  };
  fetchRoomLocationDetailApi(roomId) {
    return requestApi({
      url: `/vi-tri/location-detail/${roomId}`,
      method: "GET",
    })
  };
  fetchRoomByCityApi(cityId) {
    return requestApi({
      url: `/phong/search-room-by-local/${cityId}`,
      method: "GET",
    })
  };
  sendCommentApi(data) {
    return requestApi({
      url: `/binh-luan/post-comment`,
      method: "POST",
      data,
    })
  };
  bookingRoomApi(data) {
    return requestApi({
      url: `/dat-phong/post-book-room`,
      method: "POST",
      data,
    })
  };
  fetchBookingRoomApi() {
    return requestApi({
      url: `/dat-phong`,
      method: "GET",
    })
  };
  fetchRoomTicketApi(id) {
    return requestApi({
      url: `/dat-phong/book-room-by-id/${id}`,
      method: "GET",
    })
  };
}
export const roomService = new RoomService();
