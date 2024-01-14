import { requestApi } from "../configs/callApi";

class AdminCommentService {
  fetchAdminCommentApi() {
    return requestApi({
      url: `/binh-luan`,
      method: "GET",
    });
  }
  fetchAdminSearchCommentApi(id) {
    return requestApi({
      url: `/binh-luan/get-comment-by-room/${id}`,
      method: "GET",
    });
  }
  fetchAdminDeleteCommentApi(id) {
    return requestApi({
      url: `/binh-luan/delete-comment/${id}`,
      method: "DELETE",
    });
  }
}

export const adminCommentService = new AdminCommentService();
